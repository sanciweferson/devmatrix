// src/pages/login.js
// ─────────────────────────────────────────────────────────────────────────────
// Tela de login — SÓ FRONT-END. Nenhuma chamada de API real.
// ─────────────────────────────────────────────────────────────────────────────
import { Logo } from "@components/logo";
import { getIcon } from "@components/data/icons";
import { navigate } from "@core/router";
import { setAuthToken, getProfile, saveProfile } from "@core/auth";
import { formatWhatsapp, isValidWhatsapp } from "@utils/helpers";

export function LoginPage() {
  return /* html */ `
    <div class="login">
      <div class="login__card" id="js-login-card">

        <div class="login__brand">
          ${Logo({ className: "logo__svg logo__svg--sm" })}
        </div>

        <div class="login__heading">
          <h1 class="login__title">Entrar no DevMatrix</h1>
          <p class="login__subtitle">Continue de onde parou nos seus estudos.</p>
        </div>

        <div class="login__social">
          <button type="button" class="login__btn-social" data-provider="google">
            <span class="login__btn-icon">${getIcon("google")}</span>
            Continuar com Google
          </button>
          <button type="button" class="login__btn-social" data-provider="github">
            <span class="login__btn-icon login__btn-icon--mono">${getIcon("github")}</span>
            Continuar com GitHub
          </button>
        </div>

        <div class="login__divider"><span>ou</span></div>

        <div class="login__tabs" role="tablist" aria-label="Método de contato">
          <button type="button" class="login__tab login__tab--active" role="tab" aria-selected="true" data-method="email">
            ${getIcon("mail")}
            Email
          </button>
          <button type="button" class="login__tab" role="tab" aria-selected="false" data-method="whatsapp">
            ${getIcon("whatsapp")}
            WhatsApp
          </button>
        </div>

        <form class="login__form" id="js-login-form" novalidate>
          <label class="login__field" for="login-input">
            <span class="login__field-label" id="js-login-field-label">Seu email</span>
            <input
              id="login-input"
              name="identifier"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="voce@exemplo.com"
              class="login__input"
            />
            <span class="login__field-error" id="js-login-error" role="alert"></span>
          </label>

          <button type="submit" class="login__btn-submit">
            Continuar
            ${getIcon("arrow-right")}
          </button>
        </form>

        <p class="login__terms">
          Ao continuar, você concorda com os
          <a href="/termos" data-link>Termos de uso</a> e a
          <a href="/privacidade" data-link>Política de privacidade</a>.
        </p>

      </div>
    </div>
  `;
}

export function initLoginPage() {
  const tabs = document.querySelectorAll(".login__tab");
  const input = document.getElementById("login-input");
  const fieldLabel = document.getElementById("js-login-field-label");
  const errorEl = document.getElementById("js-login-error");
  const form = document.getElementById("js-login-form");

  let currentMethod = "email";

  const CONFIG = {
    email: {
      label: "Seu email",
      type: "email",
      inputmode: "email",
      autocomplete: "email",
      placeholder: "voce@exemplo.com",
      empty: "Preencha seu email para continuar.",
      invalid: "Digite um email válido.",
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    },
    whatsapp: {
      label: "Seu WhatsApp",
      type: "tel",
      inputmode: "tel",
      autocomplete: "tel",
      placeholder: "(11) 91234-5678",
      empty: "Preencha seu WhatsApp para continuar.",
      invalid: "Digite um WhatsApp válido, com DDD. Ex: (11) 91234-5678.",
      test: isValidWhatsapp,
    },
  };

  function clearError() {
    errorEl.textContent = "";
    errorEl.classList.remove("login__field-error--visible");
    input.classList.remove("login__input--error");
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.add("login__field-error--visible");
    input.classList.add("login__input--error");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const method = tab.dataset.method;
      const config = CONFIG[method];
      if (!config) return;

      currentMethod = method;

      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle("login__tab--active", isActive);
        t.setAttribute("aria-selected", String(isActive));
      });

      fieldLabel.textContent = config.label;
      input.type = config.type;
      input.inputMode = config.inputmode;
      input.autocomplete = config.autocomplete;
      input.placeholder = config.placeholder;
      input.value = "";

      // maxlength exato de "(XX) XXXXX-XXXX" — só faz sentido no WhatsApp,
      // que tem tamanho fixo por causa da máscara.
      if (method === "whatsapp") {
        input.maxLength = 15;
      } else {
        input.removeAttribute("maxlength");
      }

      clearError();
      input.focus();
    });
  });

  // Limpa erro E aplica a máscara de WhatsApp em tempo real —
  // a máscara só roda quando currentMethod é "whatsapp", pra não
  // interferir na digitação normal de email.
  input?.addEventListener("input", () => {
    clearError();

    if (currentMethod === "whatsapp") {
      input.value = formatWhatsapp(input.value);
    }
  });

  function showWelcomeAndRedirect(destination) {
    const card = document.getElementById("js-login-card");
    if (card) {
      card.innerHTML = /* html */ `
        <div class="login__success">
          <span class="login__success-icon">${getIcon("check")}</span>
          <h1 class="login__success-title">Bem-vindo(a) de volta!</h1>
          <p class="login__success-subtitle">Redirecionando...</p>
        </div>
      `;
    }

    setTimeout(() => navigate(destination), 1800);
  }

  function simulateLogin({ contact = "", providerLabel = "" } = {}) {
    setAuthToken("fake-token-para-teste");

    if (!getProfile()) {
      saveProfile({
        name: providerLabel ? `Usuário ${providerLabel}` : "Novo usuário",
        contact,
        avatar: null,
      });
    }

    const params = new URLSearchParams(window.location.search);
    showWelcomeAndRedirect(params.get("redirect") || "/");
  }

  document.querySelectorAll(".login__btn-social").forEach((btn) => {
    btn.addEventListener("click", () => {
      const provider = btn.dataset.provider;
      console.log(`[login] TODO: iniciar OAuth com "${provider}"`);
      simulateLogin({
        providerLabel: provider.charAt(0).toUpperCase() + provider.slice(1),
      });
    });
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const config = CONFIG[currentMethod];
    const value = input.value.trim();

    if (!value) {
      showError(config.empty);
      input.focus();
      return;
    }

    if (!config.test(value)) {
      showError(config.invalid);
      input.focus();
      return;
    }

    clearError();
    console.log(`[login] TODO: enviar código de verificação para "${value}"`);
    simulateLogin({ contact: value });
  });

  return function cleanup() { };
}