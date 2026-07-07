// src/core/app.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidade deste módulo:
//   Orquestrar a inicialização completa da aplicação.
//   É o único lugar que sabe sobre todos os subsistemas e os conecta.
//
// Ordem de inicialização:
//   1. router()              → registra listeners de click e popstate
//   2. applyEffectiveTheme() → aplica o tema salvo antes de qualquer render (sem DOM)
//   3. renderPage()          → gera o HTML da rota atual (síncrono)
//   4. Layout({ children })  → envolve com header + footer (síncrono)
//   5. requestAnimationFrame → aguarda o DOM estar pintado para:
//        - buildPortalDropdowns() → cria os portais de dropdown no <body>
//        - setupMobileSubmenus()  → registra os listeners do drawer mobile
//        - initMenu()             → hamburger e drawer
//        - initTheme()            → conecta os botões de tema ao DOM
//        - initPage()             → lógica específica da página atual
//        - initScrollTop()        → botão flutuante de voltar ao topo
//
// Por que o rAF?
//   Layout() retorna uma string — o DOM ainda não existe quando App() roda.
//   O DOM só fica disponível depois que main.js atribui ao innerHTML do #app.
//   requestAnimationFrame agenda o callback para o próximo frame de pintura,
//   quando o browser já processou o HTML e o DOM está acessível.
// ─────────────────────────────────────────────────────────────────────────────

import { Layout } from "@layout/index";
import { renderPage, initPage } from "@core/render";
import { router } from "@core/router";

// initMenu → abre/fecha o drawer mobile e alterna ícone hamburger/X
// Arquivo: src/core/menuEvents.js
import { initMenu } from "@core/menuEvents";

// initTheme        → conecta os botões de tema ao DOM e registra listeners
// applyEffectiveTheme → lê localStorage e aplica data-theme no <html> (sem DOM)
// Arquivo: src/core/theme.init.js / src/core/theme.core.js
import { initTheme } from "@core/theme.init";
import { applyEffectiveTheme } from "@core/theme.core";

// buildPortalDropdowns → cria os dropdowns desktop no <body> via portal
// setupMobileSubmenus  → registra listeners de click/teclado no drawer mobile
import { buildPortalDropdowns, setupMobileSubmenus } from "@core/buildPortalDropdowns";

// initScrollTop → cria o botão flutuante de volta ao topo e retorna cleanup
// Arquivo: src/core/scrollTop.js
import { initScrollTop } from "@core/scrollTop";

// ─────────────────────────────────────────────────────────────────────────────
// App()
//
// Função principal — chamada uma única vez em main.js.
// Retorna a string HTML completa da aplicação para ser injetada no #app.
//
// Tudo que é síncrono roda antes do return.
// Tudo que precisa do DOM roda no rAF após o return.
// ─────────────────────────────────────────────────────────────────────────────
export function App() {

  // 1. Inicializa o router.
  //    Registra dois listeners globais:
  //      - click no document → intercepta links [data-link]
  //      - popstate no window → reage ao botão Voltar/Avançar do browser
  //    A partir daqui, qualquer clique em [data-link] dispara navigate().
  router();

  // 2. Aplica o tema salvo — SEM precisar do DOM.
  //    Lê localStorage e seta data-theme="dark"|"light" no <html>.
  //    Feito antes do render para evitar flash de tema errado (FOUC).
  //    Os botões ainda não existem aqui — por isso usamos applyEffectiveTheme
  //    e não initTheme (que faz querySelector nos botões).
  applyEffectiveTheme();

  // 3. Renderiza a página atual.
  //    Lê window.location.pathname, faz match com as rotas,
  //    chama o componente correspondente e retorna o HTML como string.
  //    Se a rota já estiver em cache (LRU + TTL), retorna do cache.
  const pageContent = renderPage();

  // 4. Agenda inicialização dos subsistemas que dependem do DOM.
  //
  //    Por que rAF e não setTimeout(fn, 0)?
  //    setTimeout(fn, 0) garante execução após a task atual, mas não
  //    garante que o browser já pintou o DOM.
  //    requestAnimationFrame garante execução no próximo frame de pintura —
  //    o DOM já foi processado e está acessível para querySelector.
  requestAnimationFrame(() => {

    // Busca o <header> gerado pelo Header() dentro do Layout.
    // Todos os subsistemas de navegação precisam dele como referência.
    const headerEl = document.querySelector("header");

    // Guard: se o header não existir no DOM, aborta silenciosamente.
    // Evita erros de runtime em ambientes onde o DOM não foi montado.
    if (!headerEl) return;

    // Cria os portais de dropdown no <body> para o nav desktop.
    // Cada item com [data-has-submenu] ganha um <ul> posicionado via fixed.
    buildPortalDropdowns(headerEl);

    // Registra os listeners de click e teclado no drawer mobile.
    // Usa event delegation — 1 listener no container, não 1 por botão.
    setupMobileSubmenus(headerEl);

    // Inicializa o botão hamburger e a lógica de abrir/fechar o drawer.
    initMenu();

    // Conecta os botões de tema ao DOM.
    //    Agora os botões .nav__btn-theme existem no DOM e podem ser
    //    encontrados via querySelectorAll. initTheme registra os listeners
    //    de click e mantém os aria-labels sincronizados com o tema atual.
    initTheme();

    // Inicializa a lógica específica da página atual.
    //    Home → relógio, mensagens rotativas, modal de reset
    //    ModulePage → animação de entrada
    //    Lesson → botão de concluir, botões de copiar código
    // Retorna uma função cleanup que é chamada na próxima navegação.
    initPage(window.location.pathname);

    // Inicializa o botão flutuante de volta ao topo.
    // Cria o elemento no <body> via portal e registra listeners de scroll.
    // Retorna cleanup — aqui no App() não precisamos guardar pois a rota
    // inicial só é "desmontada" quando updatePage() assume as navegações.
    initScrollTop();
  });

  // 5. Retorna o HTML completo da aplicação.
  //    Layout() envolve pageContent com Header() e Footer().
  //    Essa string vai para o innerHTML do #app em main.js.
  //    Após essa atribuição, o rAF acima pode acessar o DOM com segurança.
  return Layout({ children: pageContent });
}