// src/core/menuEvents.js

import {
  getMenuElements,
  openSideMenu,
  closeSideMenu,
  toggleSideMenu,
  restoreMenuState,
  trapFocusInsideMenu,
} from "./menuActions.js";

/* =========================================================
   MENU EVENTS - VERSÃO 10/10
   ---------------------------------------------------------
   Responsável por:
   - init
   - destroy
   - eventos de clique
   - eventos de teclado
   - resize
   - clique fora
   ========================================================= */

const MOBILE_BREAKPOINT = 768;

/* ---------------------------------------------------------
   VERIFICA SE É MOBILE
--------------------------------------------------------- */
function isMobileView() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

/* ---------------------------------------------------------
   CONTROLLER INTERNO
   ---------------------------------------------------------
   Mantemos referência do AbortController para poder
   destruir todos os listeners depois.
--------------------------------------------------------- */
let menuController = null;

/* ---------------------------------------------------------
   INIT MENU
   ---------------------------------------------------------
   - inicializa uma vez
   - protege contra duplicação
   - retorna funções úteis
--------------------------------------------------------- */
export function initMenu(root = document) {
  const elements = getMenuElements(root);
  const { btn, side } = elements;

  if (!btn || !side) {
    console.warn("Menu não inicializado: #menu-toggle ou #js-nav-aside não encontrado.");
    return null;
  }

  // se já existir um controller antigo, destruímos antes
  destroyMenu();

  const abortController = new AbortController();
  const { signal } = abortController;

  /* -------------------------------------------------------
     ESTADO INICIAL
  ------------------------------------------------------- */
  restoreMenuState(elements, { isMobileView });

  /* -------------------------------------------------------
     CLIQUE NO BOTÃO
     Só alterna no mobile.
  ------------------------------------------------------- */
  btn.addEventListener(
    "click",
    () => {
      if (!isMobileView()) return;
      toggleSideMenu(elements);
    },
    { signal }
  );

  /* -------------------------------------------------------
     CLIQUE EM LINKS INTERNOS
     Fecha menu ao navegar.
  ------------------------------------------------------- */
  side.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener(
      "click",
      () => {
        closeSideMenu(elements, { returnFocus: false });
      },
      { signal }
    );
  });

  /* -------------------------------------------------------
     TECLADO
     - Escape
     - Tab
     - foco preso no menu
  ------------------------------------------------------- */
  document.addEventListener(
    "keydown",
    (event) => {
      trapFocusInsideMenu(event, elements);
    },
    { signal }
  );

  /* -------------------------------------------------------
     RESIZE
     Se virar desktop, fecha o menu.
  ------------------------------------------------------- */
  window.addEventListener(
    "resize",
    () => {
      if (!isMobileView()) {
        closeSideMenu(elements, { returnFocus: false });
      }
    },
    { signal }
  );

  /* -------------------------------------------------------
     CLIQUE FORA
     Fecha o menu se clicar fora do botão e fora do aside.
  ------------------------------------------------------- */
  document.addEventListener(
    "click",
    (event) => {
      const isOpen = side.classList.contains("open");
      if (!isOpen) return;

      const clickedButton = btn.contains(event.target);
      const clickedInsideMenu = side.contains(event.target);

      if (!clickedButton && !clickedInsideMenu) {
        closeSideMenu(elements, { returnFocus: false });
      }
    },
    { signal }
  );

  /* -------------------------------------------------------
     SALVA REFERÊNCIA
  ------------------------------------------------------- */
  menuController = {
    abortController,
    elements,
    open() {
      if (!isMobileView()) return;
      openSideMenu(elements);
    },
    close() {
      closeSideMenu(elements);
    },
    toggle() {
      if (!isMobileView()) return;
      toggleSideMenu(elements);
    },
    destroy() {
      closeSideMenu(elements, { returnFocus: false });
      abortController.abort();
      menuController = null;
    },
  };

  return menuController;
}

/* ---------------------------------------------------------
   DESTROY MENU
   ---------------------------------------------------------
   Remove todos os listeners registrados no init.
--------------------------------------------------------- */
export function destroyMenu() {
  if (!menuController) return;
  menuController.destroy();
}