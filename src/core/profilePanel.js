// src/core/profilePanel.js
// ─────────────────────────────────────────────────────────────────────────────
// Painel de edição de perfil — mesmo padrão visual do nav__drawer
// (overlay + painel deslizante via transform). O FORMATO visual
// (modal mobile vs sidebar desktop) é resolvido inteiramente por CSS
// via @media — não existe nenhuma variante de HTML escolhida por JS.
//
// Comportamentos deste arquivo:
//
//   1. Independência mobile/desktop — se a tela cruzar o breakpoint de
//      750px enquanto o painel está aberto, ele fecha sozinho. Abrir no
//      mobile e redimensionar pra desktop (ou vice-versa) nunca deixa o
//      painel "grudado" aberto no formato errado.
//
//   2. Salvar só com confirmação — nome, contato e foto ficam em estado
//      "pendente" enquanto o painel está aberto. Só gravam de verdade no
//      localStorage quando "Salvar alterações" é submetido. Fechar pelo
//      X, clicando fora, apertando Esc, ou trocando de breakpoint
//      DESCARTA qualquer edição não salva.
//
//   3. Câmera só onde faz sentido — em dispositivos sem touch (desktop),
//      o botão "Tirar foto" fica escondido, porque o atributo `capture`
//      do <input> é ignorado por navegadores desktop: os dois botões
//      abririam exatamente o mesmo seletor de arquivos, o que é confuso
//      sem necessidade. Só "Da galeria" aparece nesses casos.
// ─────────────────────────────────────────────────────────────────────────────

import { escapeHtml } from "@utils/helpers";
import { getIcon } from "@components/data/icons";
import { getProfile, saveProfile, clearAuthToken } from "@core/auth";

let panelEl = null;
let overlayEl = null;
let previouslyFocused = null;

// Estado "pendente" — a foto que está na tela mas ainda não foi salva.
// Resetado pra null sempre que o painel fecha (com ou sem salvar).
let pendingAvatar = null;

// Mesma técnica de detecção de input já usada em outros pontos do app
// (menus/dropdowns, ver README) — dispositivos touch sem hover não têm
// suporte real a `capture` no input de arquivo, então o botão de
// câmera não faz sentido pra eles.
const touchMQ = window.matchMedia("(hover: none) and (pointer: coarse)");

// Breakpoint deste componente especificamente — 750px é diferente do
// resto do site (640/768/1024), ver profilePanel.css.
const desktopMQ = window.matchMedia("(min-width: 768px)");

export function ProfilePanel() {
  const profile = getProfile() ?? { name: "", contact: "", avatar: null };

  return /* html */ `
    <div class="profile-panel-overlay" id="js-profile-overlay"></div>
    <div class="profile-panel" id="js-profile-panel" role="dialog" aria-modal="true" aria-labelledby="js-profile-title">
      <div class="profile-panel__dialog">
        <div class="profile-panel__header">
          <h2 class="profile-panel__title" id="js-profile-title">Meu perfil</h2>
          <button type="button" class="profile-panel__close" id="js-profile-close" aria-label="Fechar">
            ${getIcon("close")}
          </button>
        </div>

        <div class="profile-panel__body">
          <div class="perfil__avatar-wrap">
            <div class="perfil__avatar" id="js-perfil-avatar">
              ${profile.avatar
      ? `<img src="${profile.avatar}" alt="Foto de perfil" class="perfil__avatar-img" />`
      : `<span class="perfil__avatar-fallback">${getIcon("user")}</span>`}
            </div>

            <div class="perfil__avatar-actions">
              <label class="perfil__avatar-btn" id="js-avatar-camera-label" for="js-avatar-camera-input">
                ${getIcon("camera")}
                Tirar foto
              </label>
              <label class="perfil__avatar-btn" for="js-avatar-gallery-input">
                ${getIcon("image")}
                Da galeria
              </label>
            </div>

            <!--
              Dois inputs separados de propósito:
              - camera-input tem capture="user" → em celular, abre a
                câmera frontal direto, sem passar pela galeria.
              - gallery-input não tem capture → abre o seletor de
                arquivos/galeria normal do sistema.
              Em desktop, o label da câmera fica hidden via JS
              (applyCameraButtonVisibility) — capture é ignorado por
              navegadores desktop, então os dois abririam a mesma coisa.
            -->
            <input type="file" accept="image/*" capture="user" id="js-avatar-camera-input" class="perfil__avatar-input" hidden />
            <input type="file" accept="image/*" id="js-avatar-gallery-input" class="perfil__avatar-input" hidden />
          </div>

          <form class="perfil__form" id="js-perfil-form">
            <label class="perfil__field" for="perfil-name">
              <span class="perfil__field-label">Nome</span>
              <input
                id="perfil-name"
                name="name"
                type="text"
                class="perfil__input"
                value="${escapeHtml(profile.name)}"
                placeholder="Seu nome"
                required
              />
            </label>

            <label class="perfil__field" for="perfil-contact">
              <span class="perfil__field-label">Email ou WhatsApp</span>
              <input
                id="perfil-contact"
                name="contact"
                type="text"
                class="perfil__input"
                value="${escapeHtml(profile.contact)}"
                placeholder="voce@exemplo.com"
              />
            </label>

            <button type="submit" class="perfil__btn-save">Salvar alterações</button>
          </form>

          <button type="button" id="js-logout-btn" class="perfil__btn-logout">
            Sair
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Sincroniza a tela com o que está REALMENTE salvo ────────────────────
// Chamada ao abrir o painel (garante os dados mais recentes, não os do
// boot da página) e ao fechar SEM salvar (descarta edição pendente).
function syncFormToSavedProfile() {
  const profile = getProfile() ?? { name: "", contact: "", avatar: null };
  const form = document.getElementById("js-perfil-form");
  const avatarBox = document.getElementById("js-perfil-avatar");

  if (form) {
    form.elements.name.value = profile.name ?? "";
    form.elements.contact.value = profile.contact ?? "";
  }

  if (avatarBox) {
    avatarBox.innerHTML = profile.avatar
      ? /* html */ `<img src="${profile.avatar}" alt="Foto de perfil" class="perfil__avatar-img" />`
      : /* html */ `<span class="perfil__avatar-fallback">${getIcon("user")}</span>`;
  }

  pendingAvatar = null;
}

// ── Mostra/esconde o botão de câmera conforme o tipo de dispositivo ─────
function applyCameraButtonVisibility() {
  const cameraLabel = document.getElementById("js-avatar-camera-label");
  if (!cameraLabel) return;

  cameraLabel.hidden = !touchMQ.matches;
}

export function openProfilePanel() {
  if (!panelEl) return;

  previouslyFocused = document.activeElement;

  // Sempre sincroniza com o que está salvo de verdade ao abrir — evita
  // mostrar uma edição não salva deixada de uma sessão anterior.
  syncFormToSavedProfile();
  applyCameraButtonVisibility();

  panelEl.classList.add("open");
  overlayEl.classList.add("open");
  panelEl.inert = false;
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    document.getElementById("js-profile-close")?.focus();
  });
}

// options.saved = true → veio de um save bem-sucedido, mantém o que
// acabou de ser gravado. Em qualquer outro caso (X, clique fora, Esc,
// ou troca de breakpoint) descarta as edições pendentes.
export function closeProfilePanel(options = {}) {
  if (!panelEl) return;

  const { saved = false } = options;

  panelEl.classList.remove("open");
  overlayEl.classList.remove("open");
  panelEl.inert = true;
  document.body.style.overflow = "";

  if (saved) {
    pendingAvatar = null;
  } else {
    syncFormToSavedProfile();
  }

  previouslyFocused?.focus?.();
  previouslyFocused = null;
}

// Lê o arquivo escolhido (câmera ou galeria) e mostra o preview — NÃO
// salva ainda. Fica em `pendingAvatar` até o formulário ser submetido.
function handleAvatarFile(file, avatarBox) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const dataUrl = reader.result;

    pendingAvatar = dataUrl;

    avatarBox.innerHTML = /* html */ `
      <img src="${dataUrl}" alt="Foto de perfil" class="perfil__avatar-img" />
    `;
  };

  reader.readAsDataURL(file);
}

export function initProfilePanel() {
  panelEl = document.getElementById("js-profile-panel");
  overlayEl = document.getElementById("js-profile-overlay");

  if (!panelEl || !overlayEl) return;

  panelEl.inert = true;

  const closeBtn = document.getElementById("js-profile-close");
  const cameraInput = document.getElementById("js-avatar-camera-input");
  const galleryInput = document.getElementById("js-avatar-gallery-input");
  const avatarBox = document.getElementById("js-perfil-avatar");
  const form = document.getElementById("js-perfil-form");
  const logoutBtn = document.getElementById("js-logout-btn");

  applyCameraButtonVisibility();

  document.querySelectorAll(".js-account-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openProfilePanel();
    });
  });

  closeBtn?.addEventListener("click", () => closeProfilePanel());
  overlayEl.addEventListener("click", () => closeProfilePanel());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panelEl.classList.contains("open")) {
      closeProfilePanel();
    }
  });

  cameraInput?.addEventListener("change", () => {
    handleAvatarFile(cameraInput.files?.[0], avatarBox);
  });

  galleryInput?.addEventListener("change", () => {
    handleAvatarFile(galleryInput.files?.[0], avatarBox);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = getProfile() ?? { name: "", contact: "", avatar: null };
    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();

    saveProfile({
      ...profile,
      name,
      contact,
      avatar: pendingAvatar ?? profile.avatar,
    });

    closeProfilePanel({ saved: true });
  });

  logoutBtn?.addEventListener("click", () => {
    clearAuthToken();
    window.location.href = "/";
  });

  // ── Independência mobile/desktop ─────────────────────────────────────
  // Cruzou o breakpoint de 750px com o painel aberto? Fecha sozinho
  // (e descarta edição pendente, mesma regra de qualquer outro fechamento).
  desktopMQ.addEventListener("change", () => {
    if (panelEl.classList.contains("open")) {
      closeProfilePanel();
    }
  });

  // Suporte a câmera pode mudar em runtime — ex: tablet conectando um
  // teclado/mouse externo muda de "touch" pra "hover" — reavalia o
  // botão quando isso acontece.
  touchMQ.addEventListener("change", applyCameraButtonVisibility);
}