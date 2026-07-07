// src/content/fundamentos/04-var-let-const.js
//
// Página de comparação — var vs let vs const
//
// Arquitetura:
//   _dados    — IIFE com todos os valores calculados por seção
//   _h        — helpers de markup reutilizáveis
//   _secoes   — objeto com uma função por seção
//   content() — compõe _secoes em ordem
//   init()    — resolve data-out="chave.subchave" automaticamente


// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const _h = {

  btn_copy: /* html */ `
    <button class="code-block__copy" type="button">
      <span class="code-block__copy-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </span>
      <span class="code-block__copy-label">Copiar</span>
    </button>`,

  header: (filename) => /* html */ `
    <div class="code-block__header">
      <span class="code-block__filename">${filename}</span>
      ${_h.btn_copy}
    </div>`,

  console: (label, linhas) => /* html */ `
    <div class="code-console">
      <div class="code-console__header">
        <span class="code-console__label">${label}</span>
      </div>
      <div class="code-console__body">
        ${linhas.map(({ expr, key, cls = '', static_val = '' }) => /* html */ `
        <div class="code-console__line${cls ? ` ${cls}` : ''}">
          <span class="code-console__prompt">›</span>
          <span class="code-console__expr">${expr}</span>
          <span class="code-console__arrow">→</span>
          ${key
      ? `<span data-out="${key}"></span>`
      : `<span>${static_val}</span>`
    }
        </div>`).join('')}
      </div>
    </div>`,

  block: (filename, code, consoles = []) => /* html */ `
    <div class="code-block">
      ${_h.header(filename)}
      <pre class="code-block__pre"><code class="code-block__code">${code}</code></pre>
      ${consoles.map(c => _h.console(c.label, c.linhas)).join('')}
    </div>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// DADOS
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {

  const str = (v) => ({ text: `"${v}"`, cls: 'syn-output-str' })
  const num = (v) => ({ text: String(v), cls: 'syn-output-num' })
  const bool = (v) => ({ text: String(v), cls: 'syn-output-bool' })
  const nil = () => ({ text: 'undefined', cls: 'syn-output-null' })
  const err = (v) => ({ text: v, cls: 'syn-output-error' })
  const raw = (v) => ({ text: v, cls: '' })

  // ── 1. Hoisting — var undefined, let/const TDZ ────────────────────────────
  const hoist_var_antes = undefined   // var é inicializada com undefined
  const hoist_let_err = "ReferenceError: Cannot access 'comLet' before initialization"
  const hoist_const_err = "ReferenceError: Cannot access 'comConst' before initialization"

  // ── 2. Escopo — var vaza de bloco, let/const não ──────────────────────────
  let escopo_var_dentro, escopo_var_fora
  if (true) { var _escopoVar = "vazei!"; escopo_var_dentro = _escopoVar }
  escopo_var_fora = _escopoVar   // var vazou

  let escopo_let_dentro
  { let _escopoLet = "fico aqui"; escopo_let_dentro = _escopoLet }
  let escopo_let_err
  try { void _escopoLet }
  catch (e) { escopo_let_err = e.constructor.name + ": _escopoLet is not defined" }

  let escopo_const_dentro
  { const _escopoConst = "fico aqui"; escopo_const_dentro = _escopoConst }
  let escopo_const_err
  try { void _escopoConst }
  catch (e) { escopo_const_err = e.constructor.name + ": _escopoConst is not defined" }

  // ── 3. Redeclaração ───────────────────────────────────────────────────────
  var _rdVar = "primeiro"; var _rdVar = "segundo"
  const redecl_var = _rdVar                         // "segundo" — sem erro
  const redecl_let = "SyntaxError: Identifier 'x' has already been declared"
  const redecl_const = "SyntaxError: Identifier 'x' has already been declared"

  // ── 4. Reatribuição ───────────────────────────────────────────────────────
  var _reVar = "a"; _reVar = "b"; const reatrib_var = _reVar   // "b"
  let _reLet = "a"; _reLet = "b"; const reatrib_let = _reLet   // "b"
  const _reConst = "a"
  let reatrib_const_err
  try { eval('"use strict"; const _c = "a"; _c = "b"') }
  catch (e) { reatrib_const_err = e.constructor.name + ": Assignment to constant variable." }

  // ── 5. Loop + closure — var bug, let/const corretos ───────────────────────
  // var: todos os callbacks leem o valor final de i
  let _loopVarI; for (_loopVarI = 0; _loopVarI < 3; _loopVarI++) { }
  const loop_var = [_loopVarI, _loopVarI, _loopVarI]   // [3, 3, 3]

  // let/const: cada iteração tem escopo próprio
  const loop_let = [0, 1, 2]
  const loop_const = [0, 1, 2]

  // ── 6. window — var vaza, let/const não ──────────────────────────────────
  // verificado no init() onde window existe com certeza

  // ── 7. Valor inicial obrigatório ──────────────────────────────────────────
  var _initVar                    // undefined — ok
  let _initLet                    // undefined — ok
  const init_var_out = _initVar
  const init_let_out = _initLet
  const init_const_err = "SyntaxError: Missing initializer in const declaration"

  // ── 8. Objetos — referência vs conteúdo ──────────────────────────────────
  var _objVar = { x: 1 }; _objVar.x = 99; const obj_var_x = _objVar.x
  let _objLet = { x: 1 }; _objLet.x = 99; const obj_let_x = _objLet.x
  const _objConst = { x: 1 }; _objConst.x = 99; const obj_const_x = _objConst.x

  let obj_const_reatrib_err
  try { eval('"use strict"; const o = {}; o = {}') }
  catch (e) { obj_const_reatrib_err = e.constructor.name + ": Assignment to constant variable." }

  return {
    hoist: {
      var_antes: nil(),
      let_err: err(hoist_let_err),
      const_err: err(hoist_const_err),
    },
    escopo: {
      var_dentro: str(escopo_var_dentro),
      var_fora: str(escopo_var_fora),
      let_dentro: str(escopo_let_dentro),
      let_err: err(escopo_let_err),
      const_dentro: str(escopo_const_dentro),
      const_err: err(escopo_const_err),
    },
    redecl: {
      var: str(redecl_var),
      let: err(redecl_let),
      const: err(redecl_const),
    },
    reatrib: {
      var: str(reatrib_var),
      let: str(reatrib_let),
      const_err: err(reatrib_const_err),
    },
    loop: {
      var_0: num(loop_var[0]),
      var_1: num(loop_var[1]),
      var_2: num(loop_var[2]),
      let_0: num(loop_let[0]),
      let_1: num(loop_let[1]),
      let_2: num(loop_let[2]),
      const_0: num(loop_const[0]),
      const_1: num(loop_const[1]),
      const_2: num(loop_const[2]),
    },
    init: {
      var_out: nil(),
      let_out: nil(),
      const_err: err(init_const_err),
    },
    obj: {
      var_x: num(obj_var_x),
      let_x: num(obj_let_x),
      const_x: num(obj_const_x),
      const_reatrib: err(obj_const_reatrib_err),
    },
  }

})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {

  // ── Introdução ──────────────────────────────────────────────────────────────
  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">var vs let vs const — comparação direta</h2>
      <p>
        Nas últimas três aulas você aprendeu cada declaração separadamente.
        Agora vamos colocá-las lado a lado — mesmo comportamento, três formas
        diferentes de reagir. O objetivo é consolidar as diferenças e tornar
        a escolha entre elas automática.
      </p>
      <p>
        Cada seção parte do mesmo problema e mostra como cada declaração
        se comporta. No final, uma tabela de referência resume tudo.
      </p>
    </section>`,

  // ── 1. Hoisting ─────────────────────────────────────────────────────────────
  hoisting: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">1. Hoisting — como cada uma se comporta antes da declaração</h2>
      <p>
        As três declarações passam pela fase de criação do ambiente léxico.
        O que muda é o que acontece quando você tenta acessar a variável
        antes da linha da declaração.
      </p>
      <p>
        <code>var</code> é inicializada com <code>undefined</code> — o acesso
        não causa erro, mas o valor é enganoso. <code>let</code> e
        <code>const</code> ficam na <strong>TDZ</strong> e lançam
        <code>ReferenceError</code> explícito.
      </p>

      ${_h.block('hoisting.js', /* html */ `
<span class="syn-comment">// ── var ────────────────────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comVar</span>)     <span class="syn-comment">// undefined — hoisting inicializa com undefined</span>
<span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span>

<span class="syn-comment">// ── let ────────────────────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comLet</span>)     <span class="syn-comment">// ReferenceError — TDZ</span>
<span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span>

<span class="syn-comment">// ── const ──────────────────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comConst</span>)   <span class="syn-comment">// ReferenceError — TDZ</span>
<span class="syn-keyword">const</span> <span class="syn-id">comConst</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span>`, [
    {
      label: 'Console — var', linhas: [
        { expr: 'comVar <span class="syn-comment">// antes da declaração</span>', key: 'hoist.var_antes' },
      ]
    },
    {
      label: 'Console — let', linhas: [
        { expr: 'comLet <span class="syn-comment">// antes da declaração (TDZ)</span>', key: 'hoist.let_err', cls: 'code-console__line--error' },
      ]
    },
    {
      label: 'Console — const', linhas: [
        { expr: 'comConst <span class="syn-comment">// antes da declaração (TDZ)</span>', key: 'hoist.const_err', cls: 'code-console__line--error' },
      ]
    },
  ])}

      <p>
        <strong>Conclusão:</strong> o erro explícito do <code>let</code> e do
        <code>const</code> é uma vantagem — você descobre o bug na hora, não
        recebe um <code>undefined</code> silencioso que se propaga pelo código.
      </p>
    </section>`,

  // ── 2. Escopo ───────────────────────────────────────────────────────────────
  escopo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">2. Escopo — onde cada uma vive</h2>
      <p>
        <code>var</code> tem escopo de função — ignora blocos como
        <code>if</code>, <code>for</code> e <code>while</code> e vaza para
        o escopo externo. <code>let</code> e <code>const</code> têm escopo
        de bloco — qualquer par de chaves é uma fronteira.
      </p>

      ${_h.block('escopo.js', /* html */ `
<span class="syn-comment">// ── var — vaza do bloco ────────────────────────────────────────</span>
<span class="syn-keyword">if</span> (<span class="syn-boolean">true</span>) {
  <span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"vazei!"</span>
}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comVar</span>)   <span class="syn-comment">// "vazei!" — var ignorou o bloco</span>

<span class="syn-comment">// ── let — fica no bloco ────────────────────────────────────────</span>
{
  <span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"fico aqui"</span>
}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comLet</span>)   <span class="syn-comment">// ReferenceError</span>

<span class="syn-comment">// ── const — fica no bloco ──────────────────────────────────────</span>
{
  <span class="syn-keyword">const</span> <span class="syn-id">comConst</span> <span class="syn-operator">=</span> <span class="syn-string">"fico aqui"</span>
}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comConst</span>) <span class="syn-comment">// ReferenceError</span>`, [
    {
      label: 'Console — var', linhas: [
        { expr: 'comVar <span class="syn-comment">// dentro do if</span>', key: 'escopo.var_dentro' },
        { expr: 'comVar <span class="syn-comment">// fora do if</span>', key: 'escopo.var_fora' },
      ]
    },
    {
      label: 'Console — let', linhas: [
        { expr: 'comLet <span class="syn-comment">// dentro do bloco</span>', key: 'escopo.let_dentro' },
        { expr: 'comLet <span class="syn-comment">// fora do bloco</span>', key: 'escopo.let_err', cls: 'code-console__line--error' },
      ]
    },
    {
      label: 'Console — const', linhas: [
        { expr: 'comConst <span class="syn-comment">// dentro do bloco</span>', key: 'escopo.const_dentro' },
        { expr: 'comConst <span class="syn-comment">// fora do bloco</span>', key: 'escopo.const_err', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 3. Redeclaração ─────────────────────────────────────────────────────────
  redeclaracao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">3. Redeclaração — quem permite, quem proíbe</h2>
      <p>
        <code>var</code> permite declarar o mesmo nome duas vezes no mesmo
        escopo sem qualquer aviso — a segunda declaração simplesmente
        sobrescreve. <code>let</code> e <code>const</code> lançam
        <code>SyntaxError</code> detectado antes de rodar.
      </p>

      ${_h.block('redeclaracao.js', /* html */ `
<span class="syn-comment">// ── var — redeclaração silenciosa ──────────────────────────────</span>
<span class="syn-keyword">var</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">var</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// sem erro — x vale "segundo"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">x</span>)

<span class="syn-comment">// ── let — SyntaxError ──────────────────────────────────────────</span>
<span class="syn-keyword">let</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">let</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// ✖ SyntaxError</span>

<span class="syn-comment">// ── const — SyntaxError ────────────────────────────────────────</span>
<span class="syn-keyword">const</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">const</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// ✖ SyntaxError</span>`, [
    {
      label: 'Console — var', linhas: [
        { expr: 'x <span class="syn-comment">// após 2ª declaração</span>', key: 'redecl.var' },
      ]
    },
    {
      label: 'Console — let', linhas: [
        { expr: 'let x = "segundo"', key: 'redecl.let', cls: 'code-console__line--error' },
      ]
    },
    {
      label: 'Console — const', linhas: [
        { expr: 'const x = "segundo"', key: 'redecl.const', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 4. Reatribuição ─────────────────────────────────────────────────────────
  reatribuicao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">4. Reatribuição — quem aceita novo valor</h2>
      <p>
        <code>var</code> e <code>let</code> aceitam reatribuição livremente.
        <code>const</code> proíbe — qualquer tentativa de apontar a variável
        para outro valor lança <code>TypeError</code> em runtime.
      </p>

      ${_h.block('reatribuicao.js', /* html */ `
<span class="syn-comment">// ── var — reatribuição livre ───────────────────────────────────</span>
<span class="syn-keyword">var</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"a"</span>
<span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"b"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)   <span class="syn-comment">// "b"</span>

<span class="syn-comment">// ── let — reatribuição livre ───────────────────────────────────</span>
<span class="syn-keyword">let</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"a"</span>
<span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"b"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)   <span class="syn-comment">// "b"</span>

<span class="syn-comment">// ── const — TypeError ──────────────────────────────────────────</span>
<span class="syn-keyword">const</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"a"</span>
<span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"b"</span>   <span class="syn-comment">// ✖ TypeError</span>`, [
    {
      label: 'Console — var', linhas: [
        { expr: 'status', key: 'reatrib.var' },
      ]
    },
    {
      label: 'Console — let', linhas: [
        { expr: 'status', key: 'reatrib.let' },
      ]
    },
    {
      label: 'Console — const', linhas: [
        { expr: 'status = "b"', key: 'reatrib.const_err', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 5. Loop + closure ───────────────────────────────────────────────────────
  closure: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">5. Loop + closure — o bug e a correção</h2>
      <p>
        Com <code>var</code>, todos os callbacks de um loop compartilham a
        mesma variável — quando rodam, o loop já terminou e todos leem o
        valor final. Com <code>let</code> e <code>const</code>, cada iteração
        cria um ambiente léxico próprio — cada callback captura seu próprio valor.
      </p>

      ${_h.block('closure.js', /* html */ `
<span class="syn-comment">// ── var — bug: todos imprimem o valor final ────────────────────</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() <span class="syn-operator">=></span> <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}

<span class="syn-comment">// ── let — correto: cada callback captura seu próprio i ─────────</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() <span class="syn-operator">=></span> <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}

<span class="syn-comment">// ── const — correto: útil em loops for...of ────────────────────</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">const</span> <span class="syn-id">item</span> <span class="syn-keyword">of</span> [<span class="syn-number">0</span>, <span class="syn-number">1</span>, <span class="syn-number">2</span>]) {
  <span class="syn-fn">setTimeout</span>(() <span class="syn-operator">=></span> <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">item</span>), <span class="syn-number">0</span>)
}`, [
    {
      label: 'Console — var (imprime o i final para todos)', linhas: [
        { expr: 'callback #1 → i', key: 'loop.var_0', cls: 'code-console__line--warn' },
        { expr: 'callback #2 → i', key: 'loop.var_1', cls: 'code-console__line--warn' },
        { expr: 'callback #3 → i', key: 'loop.var_2', cls: 'code-console__line--warn' },
      ]
    },
    {
      label: 'Console — let (cada callback captura seu i)', linhas: [
        { expr: 'callback #1 → i', key: 'loop.let_0' },
        { expr: 'callback #2 → i', key: 'loop.let_1' },
        { expr: 'callback #3 → i', key: 'loop.let_2' },
      ]
    },
    {
      label: 'Console — const com for...of (cada item é uma constante nova)', linhas: [
        { expr: 'callback #1 → item', key: 'loop.const_0' },
        { expr: 'callback #2 → item', key: 'loop.const_1' },
        { expr: 'callback #3 → item', key: 'loop.const_2' },
      ]
    },
  ])}
    </section>`,

  // ── 6. Valor inicial obrigatório ────────────────────────────────────────────
  valor_inicial: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">6. Valor inicial — obrigatório só para const</h2>
      <p>
        <code>var</code> e <code>let</code> podem ser declarados sem valor
        inicial — ficam como <code>undefined</code> até uma atribuição.
        <code>const</code> exige valor na declaração, pois não pode receber
        um depois.
      </p>

      ${_h.block('valor-inicial.js', /* html */ `
<span class="syn-keyword">var</span>   <span class="syn-id">semVar</span>            <span class="syn-comment">// undefined — ok</span>
<span class="syn-keyword">let</span>   <span class="syn-id">semLet</span>            <span class="syn-comment">// undefined — ok</span>
<span class="syn-keyword">const</span> <span class="syn-id">semConst</span>          <span class="syn-comment">// ✖ SyntaxError — const exige valor inicial</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">semVar</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">semLet</span>)`, [
    {
      label: 'Console', linhas: [
        { expr: 'semVar', key: 'init.var_out' },
        { expr: 'semLet', key: 'init.let_out' },
        { expr: 'semConst', key: 'init.const_err', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 7. Objetos e arrays ─────────────────────────────────────────────────────
  objetos: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">7. Objetos e arrays — referência vs conteúdo</h2>
      <p>
        As três declarações permitem alterar propriedades de objetos e itens
        de arrays — isso é mutabilidade de conteúdo. O que muda é a capacidade
        de <em>reatribuir</em> a variável para um objeto completamente diferente.
        Só <code>const</code> proíbe isso.
      </p>

      ${_h.block('objetos.js', /* html */ `
<span class="syn-comment">// ── as três permitem alterar propriedades ──────────────────────</span>
<span class="syn-keyword">var</span>   <span class="syn-id">objVar</span>   <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">1</span> }; <span class="syn-id">objVar</span>.<span class="syn-property">x</span>   <span class="syn-operator">=</span> <span class="syn-number">99</span>
<span class="syn-keyword">let</span>   <span class="syn-id">objLet</span>   <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">1</span> }; <span class="syn-id">objLet</span>.<span class="syn-property">x</span>   <span class="syn-operator">=</span> <span class="syn-number">99</span>
<span class="syn-keyword">const</span> <span class="syn-id">objConst</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">1</span> }; <span class="syn-id">objConst</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">99</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">objVar</span>.<span class="syn-property">x</span>, <span class="syn-id">objLet</span>.<span class="syn-property">x</span>, <span class="syn-id">objConst</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 99  99  99</span>

<span class="syn-comment">// ── só const proíbe reatribuir o objeto inteiro ─────────────────</span>
<span class="syn-id">objVar</span>   <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">0</span> }   <span class="syn-comment">// ✓ var — ok</span>
<span class="syn-id">objLet</span>   <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">0</span> }   <span class="syn-comment">// ✓ let — ok</span>
<span class="syn-id">objConst</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">0</span> }   <span class="syn-comment">// ✖ TypeError — const proíbe reatribuição</span>`, [
    {
      label: 'Console — propriedades após alteração (todos = 99)', linhas: [
        { expr: 'objVar.x', key: 'obj.var_x' },
        { expr: 'objLet.x', key: 'obj.let_x' },
        { expr: 'objConst.x', key: 'obj.const_x' },
      ]
    },
    {
      label: 'Console — reatribuição do objeto inteiro', linhas: [
        { expr: 'objConst = { x: 0 }', key: 'obj.const_reatrib', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 8. window ───────────────────────────────────────────────────────────────
  window_global: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">8. Escopo global — quem polui o window</h2>
      <p>
        Declarações no escopo global se comportam de forma diferente.
        <code>var</code> vira propriedade do objeto <code>window</code> —
        qualquer script na página pode acessá-la ou sobrescrevê-la.
        <code>let</code> e <code>const</code> ficam num escopo global
        separado, sem poluir o <code>window</code>.
      </p>

      ${_h.block('window.js', /* html */ `
<span class="syn-keyword">var</span>   <span class="syn-id">comVar</span>   <span class="syn-operator">=</span> <span class="syn-string">"var"</span>
<span class="syn-keyword">let</span>   <span class="syn-id">comLet</span>   <span class="syn-operator">=</span> <span class="syn-string">"let"</span>
<span class="syn-keyword">const</span> <span class="syn-id">comConst</span> <span class="syn-operator">=</span> <span class="syn-string">"const"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comVar</span>)    <span class="syn-comment">// "var"      — vazou pro window</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comLet</span>)    <span class="syn-comment">// undefined — não está no window</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comConst</span>)  <span class="syn-comment">// undefined — não está no window</span>`, [
    {
      label: 'Console — browser', linhas: [
        { expr: 'window.comVar', key: 'window.var_out', },
        { expr: 'window.comLet', key: 'window.let_out', },
        { expr: 'window.comConst', key: 'window.const_out', },
      ]
    },
  ])}
    </section>`,

  // ── 9. Tabela de referência ─────────────────────────────────────────────────
  // Substitua a função tabela: () => dentro de _secoes por esta versão

  tabela: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Tabela de referência completa</h2>
      <p>
        Use como consulta rápida sempre que tiver dúvida sobre qual
        declaração usar ou como cada uma se comporta.
      </p>

      <div class="lesson__table-wrapper">

        <!-- Cabeçalho das colunas -->
        <div class="lesson__table-header">
          <div></div>
          <div class="lesson__table-col-head lesson__table-col-head--var"><code>var</code></div>
          <div class="lesson__table-col-head lesson__table-col-head--let"><code>let</code></div>
          <div class="lesson__table-col-head lesson__table-col-head--const"><code>const</code></div>
        </div>

        <!-- Linhas -->
        <div class="lesson__table-body">

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Escopo</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Função
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Bloco
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Bloco
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Hoisting</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              <code>undefined</code> silencioso
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--warn">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L14 13H2L8 2z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>
              TDZ → <code>ReferenceError</code>
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--warn">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L14 13H2L8 2z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>
              TDZ → <code>ReferenceError</code>
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Acesso antes da declaração</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              <code>undefined</code> silencioso
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              <code>ReferenceError</code> explícito
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              <code>ReferenceError</code> explícito
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Redeclaração no mesmo escopo</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Permitida sem aviso
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              <code>SyntaxError</code>
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              <code>SyntaxError</code>
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Reatribuição</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Permitida
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Permitida
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Proibida — <code>TypeError</code>
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Valor inicial obrigatório</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Não
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Não
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Sim — <code>SyntaxError</code>
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Vaza pro <code>window</code></div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Sim
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Não
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Não
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Loop + closure</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Bug clássico
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Escopo por iteração
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Escopo por iteração
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Mutação de objetos</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Permitida
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Permitida
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--good">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Permitida
            </div>
          </div>

          <div class="lesson__table-row">
            <div class="lesson__table-row-label">Imutabilidade real</div>
            <div class="lesson__table-cell lesson__table-cell--var cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Use <code>Object.freeze()</code>
            </div>
            <div class="lesson__table-cell lesson__table-cell--let cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Use <code>Object.freeze()</code>
            </div>
            <div class="lesson__table-cell lesson__table-cell--const cell--bad">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Use <code>Object.freeze()</code>
            </div>
          </div>

        </div>

        <!-- Rodapé — Recomendação -->
        <div class="lesson__table-footer">
          <div class="lesson__table-footer-row">
            <div class="lesson__table-footer-label">Recomendação</div>
            <div class="lesson__table-footer-cell lesson__table-footer-cell--var">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              Evite — só legado
            </div>
            <div class="lesson__table-footer-cell lesson__table-footer-cell--let">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2L14 13H2L8 2z"/><line x1="8" y1="7" x2="8" y2="10"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg>
              Quando precisar reatribuir
            </div>
            <div class="lesson__table-footer-cell lesson__table-footer-cell--const">
              <svg class="lesson__table-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,8 6,13 14,3"/></svg>
              Padrão — use sempre
            </div>
          </div>
        </div>

      </div>
    </section>`,
  // ── 10. Guia de decisão ─────────────────────────────────────────────────────
  guia: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Guia de decisão — qual usar?</h2>
      <p>
        A regra é simples: comece sempre com <code>const</code>. Se perceber
        que precisa reatribuir, troque para <code>let</code>. Só use
        <code>var</code> em código legado que você não controla.
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>
          <h3>const — padrão</h3>
          <p>
            Referências que não mudam: URLs, configurações, objetos e arrays
            cujo conteúdo pode mudar mas a variável em si não é reatribuída.
            É a declaração certa na maioria dos casos.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔄</div>
          <h3>let — quando necessário</h3>
          <p>
            Contadores, acumuladores, flags de estado, variáveis de loop com
            índice numérico. Qualquer caso em que o valor precisa ser
            substituído por outro.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚠️</div>
          <h3>var — evite</h3>
          <p>
            Hoisting opaco, escopo de função, redeclaração silenciosa e
            vazamento pro <code>window</code>. Use apenas em código legado
            que não pode ser refatorado.
          </p>
        </div>
      </div>

      ${_h.block('guia.js — exemplos práticos', /* html */ `
<span class="syn-comment">// ✓ const — referência não muda</span>
<span class="syn-keyword">const</span> <span class="syn-id">API_URL</span>   <span class="syn-operator">=</span> <span class="syn-string">"https://api.exemplo.com"</span>
<span class="syn-keyword">const</span> <span class="syn-id">usuario</span>   <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span> }     <span class="syn-comment">// propriedades podem mudar</span>
<span class="syn-keyword">const</span> <span class="syn-id">itens</span>     <span class="syn-operator">=</span> []                     <span class="syn-comment">// push/pop livres</span>
<span class="syn-keyword">const</span> <span class="syn-id">MAX_RETRY</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>

<span class="syn-comment">// ✓ let — valor vai mudar</span>
<span class="syn-keyword">let</span> <span class="syn-id">tentativas</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>
<span class="syn-keyword">let</span> <span class="syn-id">logado</span>     <span class="syn-operator">=</span> <span class="syn-boolean">false</span>
<span class="syn-keyword">let</span> <span class="syn-id">total</span>      <span class="syn-operator">=</span> <span class="syn-number">0</span>

<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-id">itens</span>.<span class="syn-property">length</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-id">total</span> <span class="syn-operator">+=</span> <span class="syn-id">itens</span>[<span class="syn-id">i</span>]
}

<span class="syn-comment">// ✖ var — evite em código novo</span>
<span class="syn-keyword">var</span> <span class="syn-id">legado</span> <span class="syn-operator">=</span> <span class="syn-string">"só em código legado que não posso tocar"</span>`)}
    </section>`,

  // ── 11. O que vem a seguir ──────────────────────────────────────────────────
  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Com as declarações de variáveis consolidadas, o próximo tema são
        os <strong>tipos de dados</strong>: o que JavaScript considera
        primitivo, como o motor determina o tipo de um valor em runtime,
        e por que <code>typeof null</code> retorna <code>"object"</code>.
      </p>
    </section>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

export function content() {
  return Object.values(_secoes).map(s => s()).join('\n')
}


// ═══════════════════════════════════════════════════════════════════════════════
// INIT — resolução automática de data-out + seção window em runtime
// ═══════════════════════════════════════════════════════════════════════════════

export function initVarLetConst() {
  // Resolve caminho "a.b.c" em _dados
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return
    if (typeof val === 'string') {
      el.textContent = val
    } else {
      el.textContent = val.text
      if (val.cls) el.className = val.cls
    }
  })

  // Seção 8 — window: calculado em runtime pois depende do ambiente do browser
  if (typeof window !== 'undefined') {
    var _demoVar = 'var'
    let _demoLet = 'let'
    const _demoCst = 'const'

    const set = (key, text, cls) => {
      const el = document.querySelector(`[data-out="${key}"]`)
      if (!el) return
      el.textContent = text
      if (cls) el.className = cls
    }

    set('window.var_out', `"${window._demoVar}"`, 'syn-output-str')
    set('window.let_out', String(window._demoLet), 'syn-output-null')
    set('window.const_out', String(window._demoCst), 'syn-output-null')
  }
}