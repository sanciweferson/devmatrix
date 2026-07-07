import { createLogo } from "@components/logo"
import { escapeHtml, cx } from "@utils/helpers"
import { menuItems } from "@components/data/data"
import { getIcon } from "@components/data/icons"

import { Copy } from "@utils/copy";


// ============================================================
// CONTEÚDO INTERNO DO LINK (ícone + label)
// ============================================================
const createNavContent = ({ icon, label, navVariant = "" }) => /* html */`
  <span class="nav__link__content">
    <span class="${cx("nav__icon", navVariant && `nav__icon--modificadores--${navVariant}`)}">${icon}</span>
    ${escapeHtml(label)}
  </span>
`


// ============================================================
// ITEM SIMPLES — SEM SUBMENU
// ============================================================
const createSimpleNavItem = ({ href, icon, label, className = "", navVariant = "" }) => /* html */`
  <li class="${cx("nav__item", className)}">
    <a data-link href="${escapeHtml(href)}" class="nav__link">
      ${createNavContent({ icon, label, navVariant })}
    </a>
  </li>
`


// ============================================================
// ITEM DESKTOP COM SUBMENU
// ============================================================
const createDesktopNavItemWithSubmenu = ({
  id, href, label, icon, sub, className = "", navVariant = "",
}) => {
  const submenuId = `submenu-desktop-${id}`;

  const subItemsHtml = sub.map((subItem) => /* html */`
    <li>
      <a data-link href="${escapeHtml(subItem.href)}" class="nav__dropdown-link">
        ${escapeHtml(subItem.label)}
      </a>
    </li>
  `).join("");

  return /* html */`
    <li class="${cx("nav__item", className)}" data-has-submenu>
      <a data-link
        href="${escapeHtml(href)}"
        class="nav__link nav__link--parent"
        aria-haspopup="menu"
        aria-expanded="false"
        aria-controls="${submenuId}"
      >
        ${createNavContent({ icon, label, navVariant })}
        <span class="nav__chevron">${getIcon("chevron")}</span>
      </a>
      <ul id="${submenuId}" class="nav__dropdown" role="menu" hidden>
        ${subItemsHtml}
      </ul>
    </li>
  `;
};


// ============================================================
// ITEM MOBILE COM SUBMENU
// ============================================================
const createMobileNavItemWithSubmenu = ({
  id, href, label, icon, sub, className = "", navVariant = "",
}) => {
  const submenuId = `submenu-${id}`;

  const subItemsHtml = sub
    .map((subItem) => /* html */ `
        <li>
          <a data-link href="${escapeHtml(subItem.href)}" class="nav__mobile-sublink">
            ${escapeHtml(subItem.label)}
          </a>
        </li>
      `)
    .join("");

  return /* html */ `
    <li class="${cx("nav__item", "nav__mobile-item--has-submenu", className)}">
      <div class="nav__mobile-row">
        <a data-link href="${escapeHtml(href)}" class="nav__link">
          ${createNavContent({ icon, label, navVariant })}
        </a>

        <button
          type="button"
          class="nav__mobile-toggle"
          aria-label="${escapeHtml(`Expandir ${label}`)}"
          aria-expanded="false"
          aria-controls="${submenuId}"
        >
          <span class="nav__chevron">${getIcon("chevron")}</span>
        </button>
      </div>

      <ul id="${submenuId}" class="nav__mobile-submenu" hidden>
        ${subItemsHtml}
      </ul>
    </li>
  `;
};


// ============================================================
// DISPATCHER — decide qual variação de item renderizar
// ============================================================
// navVariant  → "desktop--icons" | "mobile--icons" (define a família)
// iconVariant → "default" | "noIcon" — default GLOBAL, pode ser
//               sobrescrito por item via hideIconOn
// hideOn      → esconde o item INTEIRO numa família (data.js)
// hideIconOn  → esconde só o ÍCONE numa família (data.js)
const createNavLink = ({
  id, href, label, sub, className = "", navVariant = "desktop",
  iconVariant = "default", hideOn = [], hideIconOn = [],
}) => {
  const family = navVariant.startsWith("mobile") ? "mobile" : "desktop";

  if (hideOn.includes(family)) return "";

  const effectiveIconVariant = hideIconOn.includes(family) ? "noIcon" : iconVariant;

  const hasSubmenu = Array.isArray(sub) && sub.length > 0;
  const icon = getIcon(id, effectiveIconVariant);

  if (!hasSubmenu) {
    return createSimpleNavItem({ href, label, icon, className, navVariant });
  }

  if (family === "desktop") {
    return createDesktopNavItemWithSubmenu({ id, href, label, icon, sub, className, navVariant });
  }

  return createMobileNavItemWithSubmenu({ id, href, label, icon, sub, className, navVariant });
};


// ============================================================
// BOTÃO DE TEMA
// ============================================================
const createThemeToggle = ({
  ariaLabel = "Alternar tema claro/escuro",
  className = "",
  variant = "desktop",
} = {}) => /* html */ `
  <button type="button" class="${cx("nav__btn-theme", `nav__btn-theme--${variant}`, className)}" aria-label="${escapeHtml(ariaLabel)}">
    <span class="icon--moon">${getIcon("moon")}</span>
    <span class="icon--sun">${getIcon("sun")}</span>
  </button>
`;


const createHamburgerButton = ({
  className = "",
  ariaLabel = "Abrir menu",
} = {}) => /* html */ `
  <button
    id="menu-toggle"
    type="button"
    class="${cx("menu-toggle", className)}"
    aria-label="${escapeHtml(ariaLabel)}"
    aria-expanded="false"
    aria-controls="js-nav-aside"
  >
    <span class="icon icon-open">${getIcon("hamburger")}</span>
    <span class="icon icon-close" hidden>${getIcon("close")}</span>
  </button>
`;


// ============================================================
// HEADER — FUNÇÃO PRINCIPAL
// ============================================================
export const Header = () => {
  const desktopNav = menuItems.map((item) =>
    createNavLink({
      ...item,
      navVariant: "desktop--icons",
      className: "nav__item--desktop", // FIX: era "desktop--links" — CSS espera esse nome exato (seção 09)
      iconVariant: "noIcon",
    })
  ).join("")

  const mobileNav = menuItems.map((item) =>
    createNavLink({
      ...item,
      navVariant: "mobile--icons",
      className: "nav__item--mobile", // FIX: era "mobile--links" — CSS espera esse nome exato (seção 08)
      iconVariant: "default",
    })
  ).join("")
  const year = new Date().getFullYear();
  return /* html */ `
    <header class="header">
      <nav class="nav">
        <div class="nav__brand">
          ${createLogo({ href: "/", svgVariant: "logo__svg--lg" })}
        </div>
        <ul class="nav__list">${desktopNav}</ul>
        <div class="nav__actions">
          ${createThemeToggle({ variant: "desktop", className: "nav__btn-toggle-desktop" })}
          ${createHamburgerButton()}
        </div>
      </nav>

      <div class="nav__drawer-overlay" id="js-nav-overlay"></div>

      <aside class="nav__drawer" id="js-nav-aside">
    <!-- Header do drawer -->
  <div class="drawer__header">
    <span class="drawer__title">Menu</span>
    ${createThemeToggle({ variant: "mobile", className: "nav__btn-toggle-mobile" })}
  </div>
        <ul class="nav__mobile-list">${mobileNav}
    
        </ul>
                <!-- Footer do drawer -->
  <footer class="drawer__footer">

 ${Copy()}
  </footer>
      </aside>

    </header>
  `
}