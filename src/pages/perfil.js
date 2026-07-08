// src/pages/perfil.js
// ─────────────────────────────────────────────────────────────────────────────
// Página de perfil — protegida por authGuard.
// Edita nome, contato (email/WhatsApp) e foto — tudo salvo em localStorage
// via auth.js (getProfile/saveProfile). Sem backend real.
// ─────────────────────────────────────────────────────────────────────────────
import { escapeHtml } from "@utils/helpers";
import { getIcon } from "@components/data/icons";
import { getProfile, saveProfile, clearAuthToken } from "@core/auth";

export function PerfilPage() {
  const profile = getProfile() ?? { name: "", contact: "", avatar: null };

  return /* html */ `
    <div class="perfil">
      <div class="perfil__card">
        <h1 class="perfil__title">Meu perfil</h1>

        <div class="perfil__avatar-wrap">
          <div class="perfil__avatar" id="js-perfil-avatar">
            ${profile.avatar
      ? `<img src="${profile.avatar}" alt="Foto de perfil" class="perfil__avatar-img" />`
      : `<span class="perfil__avatar-fallback">${getIcon("user")}</span>`}
          </div>

          <label class="perfil__avatar-btn" for="js-avatar-input">
            ${getIcon("camera")}
            Trocar foto
          </label>
          <input type="file" accept="image/*" id="js-avatar-input" class="perfil__avatar-input" hidden />
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
          <p class="perfil__saved-msg" id="js-perfil-saved" hidden>Alterações salvas!</p>
        </form>

        <button type="button" id="js-logout-btn" class="perfil__btn-logout">
          Sair
        </button>
      </div>
    </div>
  `;
}

export function initPerfilPage() {
  const avatarInput = document.getElementById("js-avatar-input");
  const avatarBox = document.getElementById("js-perfil-avatar");
  const form = document.getElementById("js-perfil-form");
  const savedMsg = document.getElementById("js-perfil-saved");
  const logoutBtn = document.getElementById("js-logout-btn");

  // ── Trocar foto ──────────────────────────────────────────────────────
  // FileReader converte o arquivo escolhido em base64 (data URL) —
  // funciona sem upload real, mas fotos grandes pesam no localStorage.
  avatarInput?.addEventListener("change", () => {
    const file = avatarInput.files?.[0];
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
  });

  // ── Salvar nome/contato ──────────────────────────────────────────────
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const profile = getProfile() ?? { name: "", contact: "", avatar: null };
    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();

    saveProfile({ ...profile, name, contact });

    savedMsg.hidden = false;
    setTimeout(() => { savedMsg.hidden = true; }, 2000);
  });

  // ── Logout ───────────────────────────────────────────────────────────
  logoutBtn?.addEventListener("click", () => {
    clearAuthToken();
    // Reload completo de propósito: reavalia tudo do zero, inclusive
    // o boot guard em app.js e o link "Perfil" no header (accountUI.js).
    window.location.href = "/";
  });

  return function cleanup() { };
}