// src/core/theme.init.js

import {
  applyEffectiveTheme,
  toggleTheme,
  setupSystemThemeObserver,
} from "./theme.core.js";

// Controller para evitar listeners duplicados em SPA
let _themeButtonsAbortController = null;

// ============================================================
// HELPERS
// ============================================================

// Atualiza os aria-labels de todos os botões de tema.
// Isso melhora acessibilidade porque o leitor de tela
// anuncia corretamente a AÇÃO do botão.
const updateThemeButtonsAriaLabels = (buttons) => {
  const isDark =
    document.documentElement.getAttribute("data-theme") === "dark";

  buttons.forEach((button) => {
    button.setAttribute(
      "aria-label",
      isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
    );

    // Informação extra opcional, útil em alguns cenários de acessibilidade
    button.setAttribute("aria-pressed", String(isDark));
  });
};

// ============================================================
// BOTÕES DE TEMA
// ============================================================
//
// Essa função é segura para rodar várias vezes.
// Em SPA isso é importante, porque o header pode ser renderizado de novo.
const setupThemeButtons = (root = document) => {
  // Cancela listeners anteriores
  _themeButtonsAbortController?.abort();
  _themeButtonsAbortController = new AbortController();

  const { signal } = _themeButtonsAbortController;

  const buttons = root.querySelectorAll(".nav__btn-theme");
  if (!buttons.length) return;

  // Estado inicial dos botões
  updateThemeButtonsAriaLabels(buttons);

  // Clique manual no botão
  buttons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        toggleTheme();
        updateThemeButtonsAriaLabels(buttons);
      },
      { signal }
    );
  });

  // Se o tema mudar por outro motivo
  // (ex: mudança do sistema, outra parte do app, sincronização),
  // atualizamos os rótulos automaticamente.
  document.addEventListener(
    "themechange",
    () => {
      updateThemeButtonsAriaLabels(buttons);
    },
    { signal }
  );
};

// ============================================================
// INIT DO TEMA
// ============================================================
//
// Ordem correta:
// 1. aplica o tema efetivo logo
// 2. conecta botões
// 3. observa mudanças do sistema
//
// Sem setTimeout.
// A função deve ser chamada depois que o DOM relevante existir.
export const initTheme = (root = document) => {
  applyEffectiveTheme();
  setupThemeButtons(root);
  setupSystemThemeObserver();
};

// Limpeza opcional, útil em apps SPA mais organizados.
export const cleanupTheme = () => {
  _themeButtonsAbortController?.abort();
  _themeButtonsAbortController = null;
};