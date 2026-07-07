/**
 * escapeHtml — converte caracteres especiais em entidades HTML.
 *
 * Por que isso existe?
 * Se você inserir texto do usuário direto no innerHTML, ele pode
 * conter tags/scripts (<script>alert(1)</script>) que o browser
 * vai INTERPRETAR como HTML — isso é um ataque XSS.
 *
 * Escapando os caracteres especiais, o navegador mostra o texto
 * literal "<script>" na tela, em vez de executá-lo.
 *
 * Ordem importa: o & precisa ser o primeiro a ser trocado.
 * Se trocássemos < por &lt; primeiro, e só depois & por &amp;,
 * o "&" que acabamos de criar em "&lt;" seria escapado de novo,
 * virando "&amp;lt;" (errado).
 */
export const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")   // 1º — não pode escapar os &amp; já criados depois
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");


/**
 * cx — combina nomes de classes CSS, ignorando valores falsy.
 *
 * Por que isso existe?
 * Em vez de escrever:
 *   `card ${isActive ? "card--active" : ""} ${isDone ? "card--done" : ""}`
 * — que gera espaços extras quando uma condição é falsa —
 * você escreve:
 *   cx("card", isActive && "card--active", isDone && "card--done")
 *
 * .flat()    → permite passar arrays também: cx("card", [a, b])
 * .filter()  → remove false, null, undefined, "" — sobra só strings válidas
 * .join(" ") → junta tudo com espaço, sem espaços duplicados
 *
 * Exemplo:
 *   cx("btn", false, "btn--primary", null, undefined, "btn--lg")
 *   → "btn btn--primary btn--lg"
 */
export const cx = (...classes) =>
  classes.flat().filter(Boolean).join(" ");


// ─── TESTES ───────────────────────────────────────────────────────────────────
//
// Esses console.log só existem para confirmar que as funções funcionam.
// Em produção, delete ou comente esse bloco inteiro.
// ─────────────────────────────────────────────────────────────────────────────


// ── escapeHtml ────────────────────────────────────────────────────────────────

console.log(escapeHtml('<script>alert("oi")</script>'))
// → &lt;script&gt;alert(&quot;oi&quot;)&lt;/script&gt;
// < vira &lt;, > vira &gt;, " vira &quot;

console.log(escapeHtml("O'Brien & Cia"))
// → O&#39;Brien &amp; Cia
// ' vira &#39;, & vira &amp;

console.log(escapeHtml("texto normal"))
// → texto normal
// sem caracteres especiais — nada muda


// ── cx ────────────────────────────────────────────────────────────────────────

console.log(cx("card", "active"))
// → "card active"
// duas strings simples — junta com espaço

console.log(cx("card", false, "active", null, undefined, ""))
// → "card active"
// false, null, undefined e "" são falsy — filter() os remove

// Teste com variável booleana — o erro anterior era usar isLoggedIn
// sem declarar. Aqui declaramos explicitamente antes de usar.
const isLoggedIn = true
console.log(cx("card", isLoggedIn && "card--logged"))
// → "card card--logged"
// isLoggedIn é true → true && "card--logged" → "card--logged" (string truthy)

const isLoggedOut = false
console.log(cx("card", isLoggedOut && "card--logged"))
// → "card"
// isLoggedOut é false → false && "card--logged" → false (falsy, removido)

// Dica: você pode testar os dois casos sem variável:
console.log(cx("card", true && "card--logged"))   // → "card card--logged"
console.log(cx("card", false && "card--logged"))  // → "card"

console.log(cx("base", ["a", "b", false, "c"]))
// → "base a b c"
// .flat() transforma ["a", "b", false, "c"] em argumentos separados
// filter() remove o false — sobra "base", "a", "b", "c"