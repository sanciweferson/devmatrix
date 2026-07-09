import { routes } from "@/routes";
import { getPage, hasPage, savePage } from "@core/cache";
import { initHome } from "@pages/home";
import { initModulePage } from "@pages/modulo";
import { initLesson } from "@pages/lesson";
import { initScrollTop } from "@core/scrollTop";
import { initLoginPage } from "../pages/login";
import { initLegalPage } from "../pages/legal";
import { applyChromeVisibility } from "@core/chrome";
import { applyAccountVisibility } from "@core/accountUI";
import { openProfilePanel } from "@core/profilePanel"; // NOVO

const LEGAL_SLUGS = ["privacidade", "termos", "cookies"];

let currentCleanup = null;
let cleanupScrollTop = null;

function matchRoute(path) {
  for (const route of routes) {
    if (route.path === "*") continue;

    const paramNames = [];
    const regexStr = route.path.replace(/:([^/]+)/g, (_, paramName) => {
      paramNames.push(paramName);
      return "([^/]+)";
    });

    const regex = new RegExp(`^${regexStr}$`);
    const match = path.match(regex);

    if (match) {
      const params = {};
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });
      return { component: route.component, params };
    }
  }

  const wildcard = routes.find((r) => r.path === "*");
  return wildcard ? { component: wildcard.component, params: {} } : null;
}

export function initPage(path) {
  const segments = path.split("/").filter(Boolean);

  if (path === "/") return initHome();
  if (path === "/login") return initLoginPage();

  // Perfil não é mais uma página própria — a rota renderiza a Home por
  // trás (ver routes.js) e o painel abre por cima. Cobre login com
  // ?redirect=/perfil, links compartilhados e F5 na URL.
  if (path === "/perfil") {
    const cleanup = initHome();
    openProfilePanel();
    return cleanup;
  }

  if (segments.length === 1 && LEGAL_SLUGS.includes(segments[0])) {
    return initLegalPage();
  }

  if (segments.length === 1) return initModulePage();
  if (segments.length === 2) return initLesson();

  return null;
}

export function renderPage() {
  const path = window.location.pathname;

  if (hasPage(path)) return getPage(path);

  const match = matchRoute(path);
  if (!match) return "<p>Página não encontrada.</p>";

  const content = match.component(match.params);
  savePage(path, content);

  return content;
}

export function updatePage() {
  currentCleanup?.();
  currentCleanup = null;

  cleanupScrollTop?.();
  cleanupScrollTop = null;

  const content = renderPage();
  const main = document.querySelector("main");

  if (!main) {
    console.warn("[render] Elemento <main> não encontrado no DOM.");
    return;
  }

  main.innerHTML = content;

  requestAnimationFrame(() => {
    currentCleanup = initPage(window.location.pathname);
    cleanupScrollTop = initScrollTop();
    applyChromeVisibility(window.location.pathname);
    applyAccountVisibility();
  });
}