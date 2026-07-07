// src/core/render.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. matchRoute(path) → encontra qual componente corresponde a uma URL
//   2. renderPage()     → gera o HTML da rota atual (com cache)
//   3. updatePage()     → atualiza o <main> durante navegações SPA
//   4. initPage(path)   → inicializa a lógica JS da página atual
//
// Fluxo na carga inicial (chamado por App()):
//   renderPage() → matchRoute() → component(params) → savePage() → retorna HTML
//
// Fluxo em navegações subsequentes (chamado por router.js):
//   updatePage() → cleanup anterior → renderPage() → main.innerHTML → initPage()
//
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────

import { routes } from "@/routes";
import { getPage, hasPage, savePage } from "@core/cache";
import { initHome } from "@pages/home";
import { initModulePage } from "@pages/modulo";
import { initLesson } from "@pages/lesson";
import { initScrollTop } from "@core/scrollTop";


// ─── CLEANUP ──────────────────────────────────────────────────────────────────
//
// Referências às funções de cleanup da página e do scrollTop ativos.
// Armazenadas fora das funções para persistir entre chamadas de updatePage().
//
// Por que módulo-global e não dentro de updatePage()?
//   Se fossem locais a updatePage(), perderíamos a referência ao cleanup
//   da chamada anterior — não conseguiríamos cancelar timers e listeners.
//
// Ciclo de vida:
//   updatePage() chama currentCleanup() → remove listeners da página antiga
//   initPage()   retorna novo cleanup   → armazenado em currentCleanup
//   próximo updatePage() repete o ciclo
let currentCleanup = null;
let cleanupScrollTop = null;


// ─────────────────────────────────────────────────────────────────────────────
// matchRoute(path)
//
// Percorre o array `routes` procurando uma rota que case com `path`.
// Suporta rotas estáticas ("/fundamentos") e dinâmicas ("/:modulo/:slug").
//
// Retorna:
//   { component, params } se encontrou uma rota
//   null                  se nenhuma rota bateu (antes do wildcard)
//
// O wildcard "*" é tratado separadamente no final — não entra no loop principal.
// ─────────────────────────────────────────────────────────────────────────────
function matchRoute(path) {
  for (const route of routes) {

    // Pula o wildcard no loop principal — ele é o fallback do final.
    if (route.path === "*") continue;

    // Extrai nomes de parâmetros dinâmicos do padrão da rota.
    //
    // Regex: /:([^/]+)/g
    //   :      → literal dois-pontos (início de parâmetro)
    //   (      → abre grupo de captura
    //   [^/]+  → um ou mais caracteres que NÃO sejam barra
    //   )      → fecha grupo de captura
    //   /g     → global — encontra todos os parâmetros no path
    //
    // Ex: "/:modulo/:slug"
    //   Iteração 1: match[1] = "modulo" → paramNames = ["modulo"]
    //   Iteração 2: match[1] = "slug"   → paramNames = ["modulo", "slug"]
    const paramNames = [];
    const regexStr = route.path.replace(/:([^/]+)/g, (_, paramName) => {
      paramNames.push(paramName);

      // Substitui ":modulo" por "([^/]+)" na string de regex.
      // "([^/]+)" captura qualquer sequência sem barra — o valor do parâmetro.
      return "([^/]+)";
    });

    // Monta a regex final e testa contra o path atual.
    // ^ e $ garantem que o match é exato (não parcial).
    const regex = new RegExp(`^${regexStr}$`);
    const match = path.match(regex);

    if (match) {
      // match[0] → o path completo
      // match[1] → primeiro grupo de captura (primeiro parâmetro)
      // match[2] → segundo grupo de captura (segundo parâmetro)
      // match[index + 1] → valor do parâmetro na posição `index`
      const params = {};
      paramNames.forEach((name, index) => {
        params[name] = match[index + 1];
      });

      return { component: route.component, params };
    }
  }

  // Nenhuma rota estática ou dinâmica bateu — retorna o wildcard como fallback.
  const wildcard = routes.find((r) => r.path === "*");
  return wildcard ? { component: wildcard.component, params: {} } : null;
}


// ─────────────────────────────────────────────────────────────────────────────
// initPage(path)
//
// Inicializa a lógica JS específica da página atual após o DOM estar pronto.
// Cada tipo de página tem sua própria função init que:
//   - Registra listeners de eventos
//   - Inicia timers (relógio, mensagens rotativas)
//   - Adiciona animações de entrada
//   - Retorna uma função cleanup para ser chamada na próxima navegação
//
// Por que três casos e não um único initPage genérico?
//   Cada página tem necessidades diferentes. A home tem relógio e modal.
//   A lesson tem botão de concluir e copy buttons. O módulo só tem animação.
//   Centralizar em uma função genérica seria mais complexo sem ganho real.
// ─────────────────────────────────────────────────────────────────────────────
export function initPage(path) {

  // Divide o path em segmentos, removendo strings vazias.
  // "/" → [] (vazio)
  // "/fundamentos" → ["fundamentos"]
  // "/fundamentos/01-introducao" → ["fundamentos", "01-introducao"]
  const segments = path.split("/").filter(Boolean);

  // Home: path é "/" → segments é vazio
  if (path === "/") {
    return initHome();
  }

  // ModulePage: um segmento → "/fundamentos", "/funcoes", etc.
  if (segments.length === 1) {
    return initModulePage();
  }

  // Lesson: dois segmentos → "/fundamentos/01-introducao"
  if (segments.length === 2) {
    return initLesson();
  }

  // Path com 3+ segmentos não existe nas rotas atuais — retorna null.
  return null;
}


// ─────────────────────────────────────────────────────────────────────────────
// renderPage()
//
// Gera e retorna o HTML da rota atual como string.
// Consulta o cache antes de chamar o componente — evita reprocessamento.
//
// Fluxo:
//   1. Lê window.location.pathname
//   2. hasPage? → retorna do cache (sem chamar o componente)
//   3. Não tem? → matchRoute → component(params) → savePage → retorna HTML
// ─────────────────────────────────────────────────────────────────────────────
export function renderPage() {
  const path = window.location.pathname;

  // Cache hit: rota já foi renderizada e ainda está válida (dentro do TTL).
  // Retorna o HTML armazenado sem chamar o componente.
  if (hasPage(path)) return getPage(path);

  // Cache miss: precisa renderizar.
  const match = matchRoute(path);
  if (!match) return "<p>Página não encontrada.</p>";

  // Chama o componente da rota passando os parâmetros dinâmicos extraídos.
  // Ex: Lesson({ modulo: "fundamentos", slug: "01-introducao" })
  const content = match.component(match.params);

  // Salva no cache para a próxima visita.
  savePage(path, content);

  return content;
}


// ─────────────────────────────────────────────────────────────────────────────
// updatePage()
//
// Atualiza o <main> com o HTML da rota atual durante navegações SPA.
// Chamada por router.js após pushState (navigate) e no popstate (Voltar).
//
// Fluxo:
//   1. Executa cleanup da página anterior (limpa timers, listeners)
//   2. Executa cleanup do scrollTop anterior (remove botão do DOM)
//   3. Gera HTML da nova rota via renderPage()
//   4. Injeta no <main>
//   5. No próximo frame: initPage() + initScrollTop()
// ─────────────────────────────────────────────────────────────────────────────
export function updatePage() {

  // Cleanup da página anterior.
  // currentCleanup pode ser: a função retornada por initHome/initLesson,
  // ou null se ainda não houve navegação.
  // O `?.()` é optional chaining para chamada de função:
  //   se currentCleanup for null → não faz nada (sem erro)
  //   se for função → chama normalmente
  currentCleanup?.();
  currentCleanup = null;

  // Cleanup do scrollTop anterior.
  // Remove o botão do DOM e cancela o listener de scroll.
  cleanupScrollTop?.();
  cleanupScrollTop = null;

  // Gera o HTML da nova rota (do cache ou do componente).
  const content = renderPage();

  // Seleciona o <main> gerado pelo Layout() na carga inicial.
  const main = document.querySelector("main");

  if (!main) {
    console.warn("[render] Elemento <main> não encontrado no DOM.");
    return;
  }

  // Substitui o conteúdo do <main> com o HTML da nova rota.
  // Só o <main> é atualizado — Header e Footer permanecem intactos.
  // Isso é o que diferencia SPA de MPA: o shell nunca é reconstruído.
  main.innerHTML = content;

  // Aguarda o próximo frame para inicializar a lógica da nova página.
  // O innerHTML já foi processado — o DOM está pronto para querySelector.
  requestAnimationFrame(() => {

    // Inicializa a lógica da nova página e armazena o cleanup retornado.
    // O cleanup será chamado na próxima vez que updatePage() rodar.
    currentCleanup = initPage(window.location.pathname);

    // Inicializa o scrollTop para a nova página.
    // Cria o botão no <body> via portal e registra listener de scroll.
    cleanupScrollTop = initScrollTop();
  });
}