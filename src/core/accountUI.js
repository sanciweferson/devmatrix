// src/core/accountUI.js
// ─────────────────────────────────────────────────────────────────────────────
// Mostra/esconde o link "Perfil" no header (desktop + mobile) conforme o
// usuário está autenticado ou não.
//
// Mesmo padrão de chrome.js: os itens já existem no DOM desde o boot —
// "reagir" ao login/logout não é re-renderizar o header, é alternar o
// atributo [hidden] nos elementos que já estão lá.
// ─────────────────────────────────────────────────────────────────────────────

import { isAuthenticated } from "@core/auth";

export function applyAccountVisibility() {
  const authed = isAuthenticated();

  document.querySelectorAll(".js-account-link").forEach((el) => {
    el.hidden = !authed;
  });
}