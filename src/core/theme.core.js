// src/core/theme.core.js

// ============================================================
// CONFIGURAÇÕES
// ============================================================
//
// Guardamos a chave do localStorage em constante para:
// - evitar string solta repetida
// - facilitar manutenção futura
const STORAGE_KEY = "darkMode";

// O <html> é a raiz do tema.
// Usamos data-theme="dark" ou data-theme="light".
export const htmlElement = document.documentElement;

// null  -> usuário nunca escolheu manualmente
// true  -> usuário escolheu dark
// false -> usuário escolheu light
export let userPrefersDark = null;

// Controller do observador do tema do sistema.
// Serve para evitar múltiplos listeners em SPA.
let _systemThemeAbortController = null;

// ============================================================
// PERSISTÊNCIA
// ============================================================

// Salva a preferência manual do usuário no localStorage
// e atualiza a variável em memória.
export const setUserPrefersDark = (value) => {
  userPrefersDark = value;
  localStorage.setItem(STORAGE_KEY, String(value));
};

// Remove a preferência manual.
// Depois disso, o tema volta a seguir o sistema operacional.
export const clearUserThemePreference = () => {
  userPrefersDark = null;
  localStorage.removeItem(STORAGE_KEY);
};

// Lê a preferência salva.
// Retorna:
// - true
// - false
// - null (quando o usuário nunca escolheu)
export const getStoredUserPrefersDark = () => {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "true") return true;
  if (stored === "false") return false;

  return null;
};

// ============================================================
// TEMA DO SISTEMA
// ============================================================

// Verifica o tema preferido do sistema operacional.
export const getSystemPrefersDark = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// ============================================================
// APLICAÇÃO DO TEMA
// ============================================================
//
// IMPORTANTE:
// Aqui o JS controla APENAS o estado do tema no <html>.
// A aparência (cores, ícones, etc.) fica no CSS.
//
// Exemplo de CSS ideal:
//
// [data-theme="dark"] .icon--moon { display: none; }
// [data-theme="dark"] .icon--sun  { display: inline-flex; }
// [data-theme="light"] .icon--moon { display: inline-flex; }
// [data-theme="light"] .icon--sun  { display: none; }
//
// Assim o JS não precisa sair percorrendo ícones no DOM.
export const updateTheme = (isDark) => {
  htmlElement.classList.add("theme-changing");

  htmlElement.setAttribute("data-theme", isDark ? "dark" : "light");

  requestAnimationFrame(() => {
    htmlElement.classList.remove("theme-changing");
  });

  document.dispatchEvent(
    new CustomEvent("themechange", {
      detail: {
        theme: isDark ? "dark" : "light",
        isDark,
        source: userPrefersDark === null ? "system" : "user",
      },
    })
  );
};

// Decide qual tema efetivo deve ser aplicado AGORA.
// Regra:
// 1. se o usuário escolheu manualmente, usa essa escolha
// 2. senão, segue o sistema
export const applyEffectiveTheme = () => {
  const stored = getStoredUserPrefersDark();
  userPrefersDark = stored;

  const isDark = stored !== null ? stored : getSystemPrefersDark();
  updateTheme(isDark);
};

// Alterna entre light e dark manualmente.
// Ao fazer isso, o usuário passa a sobrescrever o sistema.
export const toggleTheme = () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newIsDark = currentTheme !== "dark";

  setUserPrefersDark(newIsDark);
  updateTheme(newIsDark);
};

// Define explicitamente um tema manual.
export const setTheme = (theme) => {
  const isDark = theme === "dark";
  setUserPrefersDark(isDark);
  updateTheme(isDark);
};

// Faz o app voltar a seguir o tema do sistema.
export const syncThemeWithSystem = () => {
  clearUserThemePreference();
  updateTheme(getSystemPrefersDark());
};

// Retorna o tema atual aplicado no DOM.
export const getCurrentTheme = () => {
  return htmlElement.getAttribute("data-theme") || "light";
};

// ============================================================
// OBSERVADOR DO TEMA DO SISTEMA
// ============================================================
//
// Se o usuário NÃO escolheu manualmente tema,
// o app acompanha mudanças do sistema operacional.
//
// Exemplo:
// - sistema estava light
// - sistema mudou para dark
// - app acompanha automaticamente
//
// Mas se o usuário já escolheu manualmente,
// a escolha dele prevalece.
export const setupSystemThemeObserver = () => {
  // Cancela o observador anterior, se existir
  _systemThemeAbortController?.abort();
  _systemThemeAbortController = new AbortController();

  const { signal } = _systemThemeAbortController;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const onSystemThemeChange = (event) => {
    // Só acompanha o sistema se o usuário NÃO fixou um tema manualmente
    if (userPrefersDark === null) {
      updateTheme(event.matches);
    }
  };

  // Padrão moderno
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", onSystemThemeChange, { signal });
    return;
  }

  // Fallback antigo
  mediaQuery.addListener(onSystemThemeChange);

  // Como addListener/removeListener não aceitam AbortController,
  // conectamos a limpeza manualmente ao abort.
  signal.addEventListener(
    "abort",
    () => {
      mediaQuery.removeListener(onSystemThemeChange);
    },
    { once: true }
  );
};

// Permite encerrar o observador explicitamente, se quiser.
export const cleanupSystemThemeObserver = () => {
  _systemThemeAbortController?.abort();
  _systemThemeAbortController = null;
};