// src/core/buildPortalDropdowns.js

import { menuItems } from "@/components/data/data";

// ============================================================
// CONTROLLERS DE CICLO DE VIDA
// ============================================================
// Em SPA, componentes podem ser recriados várias vezes.
// Se não cuidarmos disso, os listeners vão acumulando.
//
// Mantemos controllers fora das funções para conseguir:
// - abortar listeners antigos
// - reinicializar tudo com segurança
let _desktopAbortController = null;
let _mobileAbortController = null;

// ============================================================
// FACTORY DE IDs DE PORTAL
// ============================================================
// Antes usávamos uma variável module-global com Date.now(),
// que tinha dois problemas:
// 1. O ID mudava a cada render → aria-controls apontava pra nada
// 2. Um contador module-global vaza entre contextos paralelos
//    (ex: testes, iframes, múltiplas instâncias simultâneas)
//
// Agora criamos uma factory por chamada de buildPortalDropdowns.
// Cada ciclo de vida tem seu próprio contador isolado.
function createPortalIdFactory() {
  let count = 0;
  return () => `nav-portal-${count++}`;
}

// ============================================================
// DETECÇÃO DE INPUT: TOUCH VS POINTER
// ============================================================
// Em dispositivos touch (celular, tablet), hover não existe.
// Precisamos de toggle em vez de hover.
//
// Usamos matchMedia("(hover: none)") em vez de "touchstart" porque:
// - é CSS media query — reflete o input ativo real
// - tablets com teclado acoplado podem ter hover: none mas usar teclado
// - mais confiável que navigator.maxTouchPoints
//
// Verificamos em runtime (não cacheado) porque o usuário pode
// conectar/desconectar um teclado externo durante o uso.
const isTouchDevice = () => window.matchMedia("(hover: none)").matches;

// ============================================================
// HELPERS
// ============================================================

function closeDesktopDropdown({ navLi, portal, parentLink }) {
  navLi.classList.remove("is-open");
  portal.classList.remove("is-visible");
  parentLink?.setAttribute("aria-expanded", "false");
}

function openDesktopDropdown({ navLi, portal, parentLink, posicionar }) {
  posicionar();
  navLi.classList.add("is-open");
  portal.classList.add("is-visible");
  parentLink?.setAttribute("aria-expanded", "true");
}

function closeAllDesktopDropdowns(headerEl) {
  if (!headerEl) return;

  const items = headerEl.querySelectorAll(".nav__item--desktop[data-has-submenu]");

  items.forEach((navLi) => {
    const parentLink = navLi.querySelector(".nav__link");
    const portalId = navLi.getAttribute("data-portal-id");
    const portal = portalId ? document.getElementById(portalId) : null;

    navLi.classList.remove("is-open");
    parentLink?.setAttribute("aria-expanded", "false");
    portal?.classList.remove("is-visible");
  });
}

function closeAllMobileSubmenus(container, exceptItem = null) {
  const items = container.querySelectorAll(".nav__mobile-item--has-submenu");

  items.forEach((item) => {
    if (item === exceptItem) return;

    const submenu = item.querySelector(".nav__mobile-submenu");
    const button = item.querySelector(".nav__mobile-toggle");

    item.classList.remove("is-open");
    if (submenu) submenu.hidden = true;
    if (button) button.setAttribute("aria-expanded", "false");
  });
}

// ============================================================
// ARROW KEYS NO DROPDOWN DESKTOP
// ============================================================
// Padrão ARIA "Navigation Menubar":
// https://www.w3.org/WAI/ARIA/apg/patterns/menubar/
//
// ArrowDown  → próximo item (com wrap)
// ArrowUp    → item anterior (com wrap)
// Home       → primeiro item
// End        → último item
// Tab        → fecha e segue fluxo natural do documento
//
// Registramos também ArrowDown no link pai para abrir e
// mover o foco diretamente pro primeiro item do portal.
function setupArrowKeys({ portal, parentLink, navLi, signal }) {
  // Navegação dentro do portal
  portal.addEventListener(
    "keydown",
    (event) => {
      const links = Array.from(
        portal.querySelectorAll(".nav__dropdown-link")
      );
      if (!links.length) return;

      const currentIndex = links.indexOf(document.activeElement);

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          const next =
            currentIndex < links.length - 1
              ? links[currentIndex + 1]
              : links[0]; // wrap around
          next.focus();
          break;
        }

        case "ArrowUp": {
          event.preventDefault();
          const prev =
            currentIndex > 0
              ? links[currentIndex - 1]
              : links[links.length - 1]; // wrap around
          prev.focus();
          break;
        }

        case "Home": {
          event.preventDefault();
          links[0].focus();
          break;
        }

        case "End": {
          event.preventDefault();
          links[links.length - 1].focus();
          break;
        }

        // Tab fecha o dropdown e deixa o foco seguir o fluxo do documento
        case "Tab": {
          closeDesktopDropdown({ navLi, portal, parentLink });
          break;
        }
      }
    },
    { signal }
  );

  // ArrowDown no link pai → abre portal e foca o primeiro item
  parentLink?.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "ArrowDown") return;
      event.preventDefault();

      // Garante que o portal foi aberto e posicionado
      if (!navLi.classList.contains("is-open")) {
        navLi.dispatchEvent(new Event("focusin", { bubbles: true }));
      }

      const firstLink = portal.querySelector(".nav__dropdown-link");
      firstLink?.focus();
    },
    { signal }
  );
}

// ============================================================
// DROPDOWNS DESKTOP VIA PORTAL
// ============================================================
//
// Por que portal?
// O dropdown pode ser cortado por overflow no nav/header.
// Ao criar no <body> e posicionar via fixed, esse problema
// nunca existe, independente do layout do header.
//
export function buildPortalDropdowns(headerEl) {
  if (!headerEl) return;

  _desktopAbortController?.abort();
  _desktopAbortController = new AbortController();

  const { signal } = _desktopAbortController;

  // Remove portais de ciclos anteriores antes de recriar
  document.querySelectorAll(".nav-portal-dropdown").forEach((el) => el.remove());

  // Contador de IDs isolado para este ciclo de vida
  const nextPortalId = createPortalIdFactory();

  const desktopItems = headerEl.querySelectorAll(
    ".nav__item--desktop[data-has-submenu]"
  );

  desktopItems.forEach((navLi) => {
    const parentLink = navLi.querySelector(".nav__link");
    const href = parentLink?.getAttribute("href");

    const item = menuItems.find((menuItem) => menuItem.href === href);
    if (!item?.sub?.length) return;

    const portalId = nextPortalId();
    navLi.setAttribute("data-portal-id", portalId);

    // ========================================================
    // CRIAÇÃO DO PORTAL
    // ========================================================
    const portal = document.createElement("ul");
    portal.id = portalId;
    portal.className = "nav__dropdown nav-portal-dropdown";
    portal.setAttribute("role", "menu");
    portal.setAttribute("aria-label", `Submenu de ${item.label}`);

    portal.innerHTML = /* html */ `
      <li class="nav__dropdown-header" role="none">
        <a href="${item.href}" class="nav__dropdown-link" role="menuitem">
          ${item.label} — Ver tudo
        </a>
      </li>
      ${item.sub
        .map(
          (sub) => /* html */ `
            <li role="none">
              <a href="${sub.href}" class="nav__dropdown-link" role="menuitem">
                ${sub.label}
              </a>
            </li>
          `
        )
        .join("")}
    `;

    document.body.appendChild(portal);
    parentLink?.setAttribute("aria-controls", portalId);

    // ========================================================
    // POSICIONAMENTO
    // ========================================================
    const DROP_WIDTH = 260;
    const EDGE_GAP = 8;

    const posicionar = () => {
      const rect = navLi.getBoundingClientRect();
      const left = Math.max(
        EDGE_GAP,
        Math.min(
          rect.left + rect.width / 2 - DROP_WIDTH / 2,
          window.innerWidth - DROP_WIDTH - EDGE_GAP
        )
      );

      portal.style.cssText = `
        position: fixed;
        left: ${left}px;
        top: ${rect.bottom + EDGE_GAP}px;
        width: ${DROP_WIDTH}px;
      `;
    };

    // ========================================================
    // ABRIR / FECHAR
    // ========================================================
    // Guard de estado: se já está aberto, não roda closeAll + posicionar.
    const abrir = () => {
      if (navLi.classList.contains("is-open")) return;
      closeAllDesktopDropdowns(headerEl);
      openDesktopDropdown({ navLi, portal, parentLink, posicionar });
    };

    const fechar = ({ relatedTarget } = {}) => {
      if (relatedTarget && portal.contains(relatedTarget)) return;
      if (relatedTarget && navLi.contains(relatedTarget)) return;
      closeDesktopDropdown({ navLi, portal, parentLink });
    };

    const onPortalLeave = ({ relatedTarget } = {}) => {
      if (relatedTarget && navLi.contains(relatedTarget)) return;
      if (relatedTarget && portal.contains(relatedTarget)) return;
      closeDesktopDropdown({ navLi, portal, parentLink });
    };

    // ========================================================
    // TOUCH: TOQUE ABRE/FECHA (TOGGLE)
    // ========================================================
    // Em dispositivos touch, hover não existe.
    // O toque no link pai alterna o dropdown em vez de navegar.
    //
    // Usamos pointerdown com pointerType === "touch" porque:
    // - é o padrão moderno para input unificado (touch + stylus + mouse)
    // - permite checar o tipo de ponteiro com precisão
    //
    // Bloqueamos o comportamento padrão (seguir o href)
    // somente em touch — no desktop o link continua funcionando.
    parentLink?.addEventListener(
      "pointerdown",
      (event) => {
        if (event.pointerType !== "touch") return;

        event.preventDefault();

        const isOpen = navLi.classList.contains("is-open");
        isOpen
          ? closeDesktopDropdown({ navLi, portal, parentLink })
          : abrir();
      },
      { signal }
    );

    // ========================================================
    // EVENTOS DE MOUSE (apenas dispositivos com hover)
    // ========================================================
    // Checamos isTouchDevice() em runtime para cobrir o caso
    // de tablet com teclado externo conectado/desconectado.
    navLi.addEventListener(
      "mouseenter",
      () => { if (!isTouchDevice()) abrir(); },
      { signal }
    );

    navLi.addEventListener(
      "mouseleave",
      (event) => { if (!isTouchDevice()) fechar(event); },
      { signal }
    );

    portal.addEventListener(
      "mouseenter",
      () => { if (!isTouchDevice()) abrir(); },
      { signal }
    );

    portal.addEventListener(
      "mouseleave",
      (event) => { if (!isTouchDevice()) onPortalLeave(event); },
      { signal }
    );

    // ========================================================
    // FOCO / TECLADO
    // ========================================================
    navLi.addEventListener("focusin", abrir, { signal });

    navLi.addEventListener(
      "focusout",
      ({ relatedTarget }) => {
        if (relatedTarget && navLi.contains(relatedTarget)) return;
        if (relatedTarget && portal.contains(relatedTarget)) return;
        closeDesktopDropdown({ navLi, portal, parentLink });
      },
      { signal }
    );

    portal.addEventListener("focusin", abrir, { signal });

    portal.addEventListener(
      "focusout",
      ({ relatedTarget }) => {
        if (relatedTarget && portal.contains(relatedTarget)) return;
        if (relatedTarget && navLi.contains(relatedTarget)) return;
        closeDesktopDropdown({ navLi, portal, parentLink });
      },
      { signal }
    );

    // Escape fecha e devolve foco ao link pai
    const onEscape = (event) => {
      if (event.key !== "Escape") return;
      if (!portal.classList.contains("is-visible")) return;

      closeDesktopDropdown({ navLi, portal, parentLink });
      parentLink?.focus();
    };

    navLi.addEventListener("keydown", onEscape, { signal });
    portal.addEventListener("keydown", onEscape, { signal });

    // Arrow keys: ArrowDown/Up/Home/End dentro do portal
    setupArrowKeys({ portal, parentLink, navLi, signal });

    // ========================================================
    // FECHAR AO CLICAR/TOCAR FORA
    // ========================================================
    document.addEventListener(
      "pointerdown",
      (event) => {
        const isTouch = event.pointerType === "touch";
        const clickedInsideNavLi = navLi.contains(event.target);
        const clickedInsidePortal = portal.contains(event.target);

        if (clickedInsideNavLi || clickedInsidePortal) return;

        // Touch já tem handler próprio no parentLink acima,
        // mas precisamos fechar se o toque for completamente fora.
        if (isTouch || !isTouch) {
          closeDesktopDropdown({ navLi, portal, parentLink });
        }
      },
      { signal }
    );

    // ========================================================
    // REPOSICIONAMENTO COM rAF (throttle)
    // ========================================================
    // rAF garante no máximo 1 reposicionamento por frame,
    // independente da velocidade do scroll ou resize.
    let _rafId = null;

    const posicionarThrottled = () => {
      if (!portal.classList.contains("is-visible")) return;
      cancelAnimationFrame(_rafId);
      _rafId = requestAnimationFrame(posicionar);
    };

    window.addEventListener("resize", posicionarThrottled, { signal });
    window.addEventListener("scroll", posicionarThrottled, { passive: true, signal });
  });
}

// ============================================================
// SUBMENUS MOBILE
// ============================================================
export function setupMobileSubmenus(headerEl) {
  if (!headerEl) return;

  _mobileAbortController?.abort();
  _mobileAbortController = new AbortController();

  const { signal } = _mobileAbortController;

  const mobileList = headerEl.querySelector(".nav__mobile-list");
  if (!mobileList) return;

  // ========================================================
  // CLICK POR DELEGAÇÃO
  // ========================================================
  // 1 listener no container em vez de 1 por botão.
  // Escala bem e não acumula listeners em SPA.
  mobileList.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(".nav__mobile-toggle");
      if (!button) return;

      const currentItem = button.closest(".nav__mobile-item--has-submenu");
      if (!currentItem) return;

      const currentSubmenu = currentItem.querySelector(".nav__mobile-submenu");
      if (!currentSubmenu) return;

      const isCurrentlyOpen = currentItem.classList.contains("is-open");

      closeAllMobileSubmenus(mobileList, currentItem);

      if (isCurrentlyOpen) {
        currentItem.classList.remove("is-open");
        currentSubmenu.hidden = true;
        button.setAttribute("aria-expanded", "false");
        return;
      }

      currentItem.classList.add("is-open");
      currentSubmenu.hidden = false;
      button.setAttribute("aria-expanded", "true");
    },
    { signal }
  );

  // ========================================================
  // ESCAPE — fecha e devolve foco
  // ========================================================
  // Capturamos o botão ativo ANTES de fechar tudo,
  // porque depois do closeAll o item não tem mais .is-open.
  mobileList.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;

      const activeButton = mobileList.querySelector(
        ".nav__mobile-item--has-submenu.is-open .nav__mobile-toggle"
      );

      closeAllMobileSubmenus(mobileList);
      activeButton?.focus();
    },
    { signal }
  );

  // ========================================================
  // ARROW KEYS NO SUBMENU MOBILE
  // ========================================================
  // Tablets com teclado externo também se beneficiam disso.
  // ArrowDown/Up/Home/End navegam dentro do submenu aberto.
  mobileList.addEventListener(
    "keydown",
    (event) => {
      const submenu = event.target.closest(".nav__mobile-submenu");
      if (!submenu) return;

      const links = Array.from(
        submenu.querySelectorAll(".nav__mobile-sublink ")
      );
      if (!links.length) return;

      const currentIndex = links.indexOf(document.activeElement);

      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          const next =
            currentIndex < links.length - 1
              ? links[currentIndex + 1]
              : links[0];
          next.focus();
          break;
        }

        case "ArrowUp": {
          event.preventDefault();
          const prev =
            currentIndex > 0
              ? links[currentIndex - 1]
              : links[links.length - 1];
          prev.focus();
          break;
        }

        case "Home": {
          event.preventDefault();
          links[0].focus();
          break;
        }
 
        case "End": {
          event.preventDefault();
          links[links.length - 1].focus();
          break;
        }
      }
    },
    { signal }
  );
}
