// src/core/profilePanel.js
// ─────────────────────────────────────────────────────────────────────────────
// Painel de edição de perfil — reaproveita o mesmo padrão visual do
// nav__drawer (overlay + painel deslizante via transform), mas:
//   • Mobile (<750px): modal centralizado
//   • Desktop (≥750px): sidebar fixa, ancorada à direita
// ─────────────────────────────────────────────────────────────────────────────

import { escapeHtml } from "@utils/helpers";
import { getIcon } from "@components/data/icons";
import { getProfile, saveProfile, clearAuthToken } from "@core/auth";

let panelEl = null;
let overlayEl = null;
let previouslyFocused = null;

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
              <label class="perfil__avatar-btn" for="js-avatar-camera-input">
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
              - camera-input tem capture="user" → abre a câmera frontal
                direto, sem passar pela galeria.
              - gallery-input não tem capture → abre o seletor de
                arquivos/galeria normal do sistema.
              Manter os dois explícitos, em vez de um único input sem
              capture (que deixava a critério do navegador mostrar ou
              não um atalho de câmera), garante o comportamento em
              qualquer aparelho.
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

export function openProfilePanel() {
  if (!panelEl) return;

  previouslyFocused = document.activeElement;

  panelEl.classList.add("open");
  overlayEl.classList.add("open");
  panelEl.inert = false;
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    document.getElementById("js-profile-close")?.focus();
  });
}

export function closeProfilePanel() {
  if (!panelEl) return;

  panelEl.classList.remove("open");
  overlayEl.classList.remove("open");
  panelEl.inert = true;
  document.body.style.overflow = "";

  previouslyFocused?.focus?.();
  previouslyFocused = null;
}

// Lê o arquivo escolhido (câmera ou galeria, tanto faz a origem) e
// aplica no avatar + salva no perfil. Função compartilhada pelos dois
// inputs — evita duplicar a mesma lógica de FileReader duas vezes.
function handleAvatarFile(file, avatarBox) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    const dataUrl = reader.result;

    avatarBox.innerHTML = /* html */ `
      <img src="${dataUrl}" alt="Foto de perfil" class="perfil__avatar-img" />
    `;

    const profile = getProfile() ?? { name: "", contact: "", avatar: null };
    saveProfile({ ...profile, avatar: dataUrl });
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

  document.querySelectorAll(".js-account-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openProfilePanel();
    });
  });

  closeBtn?.addEventListener("click", closeProfilePanel);
  overlayEl.addEventListener("click", closeProfilePanel);

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

    saveProfile({ ...profile, name, contact });
    closeProfilePanel();
  });

  logoutBtn?.addEventListener("click", () => {
    clearAuthToken();
    window.location.href = "/";
  });
}