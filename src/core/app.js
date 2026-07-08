import { Layout } from "@layout/index";
import { renderPage, initPage } from "@core/render";
import { router } from "@core/router";
import { initMenu } from "@core/menuEvents";
import { initTheme } from "@core/theme.init";
import { applyEffectiveTheme } from "@core/theme.core";
import { buildPortalDropdowns, setupMobileSubmenus } from "@core/buildPortalDropdowns";
import { initScrollTop } from "@core/scrollTop";
import { applyChromeVisibility } from "@core/chrome";
import { applyAccountVisibility } from "@core/accountUI"; // NOVO

import { runPipeline } from "@core/pipeline";
import { authGuard, logGuard } from "@core/guards";

export function App() {
  router();
  applyEffectiveTheme();

  runPipeline([logGuard, authGuard], "", window.location.pathname, () => { });

  const pageContent = renderPage();

  requestAnimationFrame(() => {
    const headerEl = document.querySelector("header");
    if (!headerEl) return;

    applyChromeVisibility(window.location.pathname);
    applyAccountVisibility(); // NOVO — mostra "Perfil" se já tiver token salvo

    buildPortalDropdowns(headerEl);
    setupMobileSubmenus(headerEl);
    initMenu();
    initTheme();
    initPage(window.location.pathname);
    initScrollTop();
  });

  return Layout({ children: pageContent });
}