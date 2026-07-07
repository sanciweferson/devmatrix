// src/core/router.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidade deste módulo:
//   1. Expor navigate(url) — navegação programática via pushState + pipeline
//   2. Expor router()      — inicializa os listeners que capturam navegação
//
// Este módulo é o ponto de entrada do sistema de roteamento.
// Ele orquestra: pipeline, guards e render.
//
// Dois casos de navegação que precisamos cobrir:
//   A) Usuário clica em [data-link]   → listener de "click" no document
//   B) Usuário clica Voltar / Avançar → listener de "popstate" no window
//
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────

// updatePage → atualiza o <main> com o HTML da rota atual.
// Chamada após todos os guards aprovarem a navegação.
import { updatePage } from "@core/render"

// runPipeline → executa os guards em sequência antes de confirmar a navegação.
import { runPipeline } from "@core/pipeline";

// Os dois guards registrados globalmente:
//   logGuard  → registra toda tentativa de navegação no console
//   authGuard → protege rotas que exigem autenticação
import { authGuard, logGuard } from "@core/guards";


// ─── GUARDS GLOBAIS ───────────────────────────────────────────────────────────
//
// Array com os guards que rodam em TODA navegação, na ordem declarada.
//
// Ordem importa:
//   1. logGuard primeiro: registra a tentativa ANTES de qualquer bloqueio.
//      Se authGuard bloqueasse primeiro, nunca saberíamos que houve tentativa.
//   2. authGuard segundo: decide se a navegação é permitida.
//
// Para adicionar um novo guard global (ex: analyticsGuard):
//   Basta incluí-lo neste array na posição desejada — sem tocar em mais nada.
const globalGuards = [logGuard, authGuard];


// ─────────────────────────────────────────────────────────────────────────────
// navigate(url)
//
// Navegação programática. Chamada quando:
//   - Um [data-link] é clicado (pelo listener abaixo)
//   - Um guard redireciona para outra rota (via pipeline.js)
//   - Código da aplicação navega manualmente: navigate("/perfil")
//
// Fluxo:
//   1. Resolve `from` e `to` como pathnames normalizados
//   2. Aborta se já estamos na rota de destino (evita loop)
//   3. Roda a pipeline de guards
//   4. Se aprovado: pushState + updatePage
//   5. Se bloqueado ou redirecionado: nada acontece aqui
// ─────────────────────────────────────────────────────────────────────────────
export function navigate(url) {

  // pathname atual — só o caminho, sem query string ou hash.
  // Ex: "https://site.com/fundamentos?x=1" → from = "/fundamentos"
  const from = window.location.pathname;

  // `new URL(url, window.location.origin)`:
  //   Constrói um objeto URL completo a partir de qualquer formato:
  //   "/sobre"                 → relativo → "https://site.com/sobre"
  //   "https://site.com/sobre" → absoluto → mantém como está
  //   "/login?redirect=/admin" → com query string
  //
  // `.pathname` extrai só o caminho, descartando query string e hash.
  // Garante que guards e cache trabalhem com paths limpos.
  const to = new URL(url, window.location.origin).pathname;

  // Guard clause: já estamos na rota de destino — não faz nada.
  //
  // Sem isso:
  //   - Clicar duas vezes no mesmo link duplicaria entradas no histórico
  //   - pushState seria chamado desnecessariamente
  //   - Guards rodariam sem motivo
  //   - updatePage reconstruiria o DOM com o mesmo conteúdo
  if (from === to) return;

  // Executa a pipeline de guards ANTES de qualquer mudança de URL ou DOM.
  //
  // Por que guards antes do pushState?
  //   Se um guard bloquear, a URL original NÃO muda.
  //   Se fizéssemos pushState antes e um guard bloqueasse depois,
  //   o usuário veria a URL mudar mas o conteúdo não atualizaria.
  runPipeline(globalGuards, from, to, () => {

    // Todos os guards aprovaram — confirma a navegação.
    //
    // history.pushState(state, title, url):
    //   Adiciona entrada no histórico SEM recarregar a página.
    //   Atualiza a URL na barra de endereços imediatamente.
    //
    //   state → null: não precisamos de estado serializado no histórico.
    //   title → null: segundo argumento descontinuado pelos browsers.
    //   url   → a URL original (não o `to` normalizado) para preservar
    //           query strings e hash na barra de endereços.
    history.pushState(null, null, url);

    // Atualiza o <main> com o HTML da nova rota.
    // updatePage lê window.location.pathname internamente —
    // e agora que pushState rodou, pathname já aponta para `to`.
    updatePage();
  });
}


// ─────────────────────────────────────────────────────────────────────────────
// router()
//
// Inicializa os dois mecanismos de captura de navegação.
// Chamada UMA vez em app.js quando a aplicação inicializa.
// ─────────────────────────────────────────────────────────────────────────────
export function router() {

  // ── A) Interceptação de cliques em links ───────────────────────────────────
  //
  // Event delegation: um único listener no document cobre todos os links
  // presentes e futuros, sem precisar registrar listener em cada <a>.
  document.addEventListener("click", (e) => {

    // `e.target` → elemento exato que recebeu o clique.
    // Pode ser o próprio <a> ou um filho dele (ex: <span> dentro de <a>).
    //
    // `closest("[data-link]")` sobe no DOM a partir de e.target
    // procurando o ancestral mais próximo com o atributo [data-link].
    //
    // Por que closest e não e.target.matches?
    //   matches só verifica o elemento clicado, não seus ancestrais.
    //   Se o HTML for <a data-link><span>Texto</span></a> e o clique
    //   for no <span>, e.target seria o <span>, não o <a>.
    //   closest sobe até encontrar o <a data-link> corretamente.
    const link = e.target.closest("[data-link]");

    // Guard clause: clique não foi em [data-link] — deixa o browser agir.
    if (!link) return;

    // Cancela o comportamento padrão (requisição HTTP + reload da página).
    // Sem isso, a SPA seria destruída a cada clique em um link.
    e.preventDefault();

    // Navega usando nossa lógica de SPA.
    // link.href retorna a URL absoluta:
    //   <a href="/sobre"> → link.href = "https://site.com/sobre"
    navigate(link.href);
  });


  // ── B) Botões Voltar / Avançar do browser ──────────────────────────────────
  //
  // `popstate` dispara quando o usuário navega pelo histórico.
  // NÃO dispara pelo pushState — só pelas navegações pelo histórico.
  //
  // Por que não passa pelos guards aqui?
  //   O usuário já esteve nessa rota — ela foi aprovada na primeira visita.
  //   Re-validar seria redundante e causaria experiência confusa no "Voltar".
  //
  // Por que não precisamos atualizar a URL?
  //   O browser já atualizou window.location ao disparar o popstate.
  //   updatePage lê window.location.pathname internamente — já está correto.
  window.addEventListener("popstate", () => {
    updatePage();
  });
}