// src/core/menuActions.js

/* =========================================================
   MENU ACTIONS - VERSÃO 10/10
   ---------------------------------------------------------
   Responsável por:
   - pegar elementos do menu
   - abrir / fechar / alternar
   - sincronizar acessibilidade
   - controlar foco
   - persistir estado no localStorage
   ========================================================= */

/* ---------------------------------------------------------
   CONFIG
--------------------------------------------------------- */
const MENU_STORAGE_KEY = "menuOpen";
const OPEN_CLASS = "open";

/* ---------------------------------------------------------
   PEGA ELEMENTOS DO MENU
   ---------------------------------------------------------
   Pode receber um container específico.
   Se não receber, usa document.
--------------------------------------------------------- */
export function getMenuElements(root = document) {
  return {
    btn: root.querySelector("#menu-toggle"),
    side: root.querySelector("#js-nav-aside"),
  };
}

/* ---------------------------------------------------------
   PEGA ELEMENTOS FOCÁVEIS
   ---------------------------------------------------------
   Esses elementos entram no fluxo do Tab.
--------------------------------------------------------- */
function getFocusableElements(container) {
  if (!container) return [];

  return Array.from(
    container.querySelectorAll(
      [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ].join(", ")
    )
  ).filter(el => {
    return !el.hasAttribute("hidden") && el.offsetParent !== null;
  });
}

/* ---------------------------------------------------------
   CONTROLA SCROLL DO BODY
--------------------------------------------------------- */
function lockBodyScroll() {
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   SINCRONIZA ESTADO VISUAL + ACESSIBILIDADE
   ---------------------------------------------------------
   Usa setAttribute/removeAttribute para o hidden dos ícones
   em vez de classList.toggle("hidden") — mais robusto no
   build de produção porque não depende de regra CSS.
--------------------------------------------------------- */
function syncMenuState({ btn, side, isOpen }) {
  if (!btn || !side) return;

  side.classList.toggle(OPEN_CLASS, isOpen);

  if (isOpen) {
    side.removeAttribute("aria-hidden");
    side.removeAttribute("inert");
  } else {
    side.setAttribute("aria-hidden", "true");
    side.setAttribute("inert", "");
  }

  btn.setAttribute("aria-expanded", String(isOpen));
  btn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");

  // Controla ícones via atributo hidden nativo — não depende de CSS
  const iconOpen = btn.querySelector(".icon-open");
  const iconClose = btn.querySelector(".icon-close");

  if (iconOpen) isOpen
    ? iconOpen.setAttribute("hidden", "")
    : iconOpen.removeAttribute("hidden");

  if (iconClose) isOpen
    ? iconClose.removeAttribute("hidden")
    : iconClose.setAttribute("hidden", "");

  if (isOpen) {
    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }

  localStorage.setItem(MENU_STORAGE_KEY, String(isOpen));
}

/* ---------------------------------------------------------
   ABRE MENU
--------------------------------------------------------- */
export function openSideMenu(elements, options = {}) {
  const { btn, side } = elements;
  const { focusFirstItem = true } = options;

  if (!btn || !side) return;

  syncMenuState({ btn, side, isOpen: true });

  if (focusFirstItem) {
    const firstFocusable = getFocusableElements(side)[0];
    (firstFocusable || btn).focus();
  }
}

/* ---------------------------------------------------------
   FECHA MENU
--------------------------------------------------------- */
export function closeSideMenu(elements, options = {}) {
  const { btn, side } = elements;
  const { returnFocus = true } = options;

  if (!btn || !side) return;

  // Se algum elemento dentro do menu está focado, remove o foco
  if (side.contains(document.activeElement)) {
    document.activeElement.blur();
    if (returnFocus) btn.focus();
  }

  syncMenuState({ btn, side, isOpen: false });
}


/* ---------------------------------------------------------
   ALTERNA MENU
--------------------------------------------------------- */
export function toggleSideMenu(elements) {
  const { side } = elements;
  if (!side) return;

  const isOpen = side.classList.contains(OPEN_CLASS);

  if (isOpen) {
    closeSideMenu(elements);
  } else {
    openSideMenu(elements);
  }
}

/* ---------------------------------------------------------
   RESTAURA ESTADO DO MENU
   ---------------------------------------------------------
   Em desktop, forçamos fechado.
   Em mobile, podemos restaurar o estado salvo.
--------------------------------------------------------- */
export function restoreMenuState(elements, options = {}) {
  const { isMobileView } = options;
  const savedState = localStorage.getItem(MENU_STORAGE_KEY) === "true";

  if (typeof isMobileView === "function" && !isMobileView()) {
    closeSideMenu(elements, { returnFocus: false });
    return;
  }

  if (savedState) {
    openSideMenu(elements, { focusFirstItem: false });
  } else {
    closeSideMenu(elements, { returnFocus: false });
  }
}

/* ---------------------------------------------------------
   TRAVA O FOCO DENTRO DO MENU
   ---------------------------------------------------------
   Regras:
   - Escape fecha
   - Tab circula entre botão e itens do menu
--------------------------------------------------------- */
export function trapFocusInsideMenu(event, elements) {
  const { btn, side } = elements;
  if (!btn || !side) return;

  const isOpen = side.classList.contains(OPEN_CLASS);
  if (!isOpen) return;

  if (event.key === "Escape") {
    closeSideMenu(elements);
    return;
  }

  if (event.key !== "Tab") return;

  const focusables = getFocusableElements(side);

  if (focusables.length === 0) {
    event.preventDefault();
    btn.focus();
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const active = document.activeElement;

  if (event.shiftKey && active === first) {
    event.preventDefault();
    btn.focus();
    return;
  }

  if (!event.shiftKey && active === btn) {
    event.preventDefault();
    first.focus();
    return;
  }

  if (!event.shiftKey && active === last) {
    event.preventDefault();
    btn.focus();
  }
}