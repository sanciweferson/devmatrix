// src/core/pipeline.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidade deste módulo:
//   Executar uma sequência de guards antes de confirmar uma navegação.
//   Cada guard pode aprovar, bloquear ou redirecionar.
//
// Padrão de projeto: Chain of Responsibility
//   Cada guard na cadeia decide se passa a responsabilidade adiante (next())
//   ou interrompe o fluxo (bloqueando ou redirecionando).
//   Nenhum guard sabe quantos outros existem — cada um só decide sobre si.
//
// Visualizando o fluxo com 3 guards todos aprovando:
//
//   runPipeline([A, B, C], from, to, render)
//
//   next()  → index=0, executa A(from, to, next)
//     A chama next() → index=1, executa B(from, to, next)
//       B chama next() → index=2, executa C(from, to, next)
//         C chama next() → index=3, guards[3] = undefined → onComplete()
//
// Visualizando com bloqueio no guard B:
//
//   next() → A aprovado → B NÃO chama next()
//   onComplete nunca é chamado. Navegação cancelada silenciosamente.
//
// Visualizando com redirecionamento no guard B:
//
//   next() → A aprovado → B chama next("/login")
//   navigate("/login") é chamado. C nunca executa. onComplete nunca é chamado.
//
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────

// `navigate` é importado aqui para que um guard possa redirecionar.
// Isso cria uma dependência circular aparente (router → pipeline → router),
// mas o JS resolve módulos em grafo — não em árvore — então funciona.
// A dependência real é: navigate() existe antes de runPipeline() ser chamado.
import { navigate } from "@core/router";


// ─────────────────────────────────────────────────────────────────────────────
// runPipeline(guards, from, to, onComplete)
//
// Parâmetros:
//   guards     → Array de funções guard. Assinatura: (from, to, next) => void
//   from       → pathname de origem  (ex: "/")
//   to         → pathname de destino (ex: "/admin")
//   onComplete → função chamada SE E SOMENTE SE todos os guards aprovaram.
//                Normalmente é o callback que confirma a navegação:
//                pushState + updatePage.
// ─────────────────────────────────────────────────────────────────────────────
export function runPipeline(guards, from, to, onComplete) {

  // Cursor que rastreia qual guard executa na próxima chamada de next().
  // Começa em 0 (primeiro guard) e incrementa a cada avanço da cadeia.
  //
  // Por que `let` e não `const`?
  //   `let` porque o valor muda — é um cursor mutável.
  //
  // Por que não passar `index` como parâmetro de next()?
  //   next() é uma closure — ela "enxerga" e modifica `index` do escopo pai
  //   diretamente. Isso evita passar estado extra entre chamadas.
  let index = 0;

  // ── next(redirectTo?) ──────────────────────────────────────────────────────
  //
  // Função que cada guard recebe como terceiro argumento.
  // É a única forma de um guard comunicar sua decisão para a pipeline.
  //
  // Três comportamentos:
  //   next()           → "aprovado, passa pro próximo guard"
  //   next("/caminho") → "redireciona para este path e para tudo"
  //   (não chama)      → "bloqueado, para tudo silenciosamente"
  function next(redirectTo) {

    // Guard clause: next() foi chamada COM argumento — o guard quer redirecionar.
    // navigate() cuida de tudo: pushState, pipeline, updatePage.
    // `return` interrompe next() — nenhum guard subsequente executa.
    if (redirectTo) {
      navigate(redirectTo);
      return;
    }

    // next() foi chamada SEM argumento: guard aprovou.
    // Avança para o próximo guard.
    //
    // Lê o guard ANTES de incrementar — assim `currentGuard` é o guard atual.
    // Depois incrementa — na próxima chamada de next(), index já aponta pro próximo.
    //
    // Por que ler antes de incrementar?
    //   Se incrementássemos antes: guards[1] seria executado na primeira chamada,
    //   pulando guards[0]. A ordem seria errada.
    const currentGuard = guards[index];
    index++;

    if (currentGuard) {
      // Ainda há guards na fila — executa o atual.
      // Passa `next` para que o guard possa continuar ou encerrar a cadeia.
      currentGuard(from, to, next);
    } else {
      // `currentGuard` é undefined: todos os guards executaram e aprovaram.
      // Pipeline completa com sucesso — confirma a navegação.
      onComplete();
    }
  }

  // Dispara a cadeia chamando next() pela primeira vez.
  // Este é o único ponto de entrada — tudo começa aqui.
  //
  // Por que não chamar guards[0] diretamente?
  //   Reutilizar next() centraliza toda a lógica de avanço em um lugar.
  //   Chamar guards[0] diretamente duplicaria a lógica de "verifica se existe,
  //   incrementa, chama onComplete" fora do next().
  next();
}