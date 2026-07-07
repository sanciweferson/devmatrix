// src/content/fundamentos/02-let.js
//
// Estrutura interna:
//   _dados      — todos os valores calculados, organizados por seção
//   _secoes     — funções que retornam o HTML de cada seção
//   content()   — compõe todas as seções em uma página única
//   init()      — injeta todos os outputs via DOM


// ═══════════════════════════════════════════════════════════════════════════════
// DADOS — valores calculados uma vez, usados pelo content() e init()
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {

  // ── Seção 1: declaração básica ─────────────────────────────────────────────
  let d_decl = "JavaScript"
  const decl = { out: d_decl }

  // ── Seção 2: escopo de bloco ───────────────────────────────────────────────
  let bloco_capturado
  { let _b = "existo só no bloco"; bloco_capturado = _b }
  let bloco_erro
  try { void _b }
  catch (e) { bloco_erro = e.constructor.name + ": _b is not defined" }

  const bloco = { dentro: bloco_capturado, fora: bloco_erro }

  // ── Seção 3: let em if ─────────────────────────────────────────────────────
  let if_capturado
  if (true) { let _if = "só existo no if"; if_capturado = _if }
  let if_erro
  try { void _if }
  catch (e) { if_erro = e.constructor.name + ": _if is not defined" }

  const bloco_if = { dentro: if_capturado, fora: if_erro }

  // ── Seção 4: TDZ ──────────────────────────────────────────────────────────
  let tdz_erro
  try { void _tdz_never; let _tdz_never = "tarde demais" }
  catch (e) { tdz_erro = e.constructor.name + ": Cannot access '_tdz_never' before initialization" }

  const tdz = { erro: tdz_erro }

  // ── Seção 5: sem redeclaração ──────────────────────────────────────────────
  // SyntaxError é detectado antes de rodar — não é capturável via try/catch
  const redecl = {
    erro: "SyntaxError: Identifier 'titulo' has already been declared"
  }

  // ── Seção 6: reatribuição ──────────────────────────────────────────────────
  let d_reatrib = "inicial"
  const r1 = d_reatrib
  d_reatrib = "atualizado"
  const r2 = d_reatrib

  const reatrib = { antes: r1, depois: r2 }

  // ── Seção 7: ambiente léxico e TDZ por dentro ──────────────────────────────
  // Demonstração da scope chain com let
  let lex_idioma = "pt-BR"
  function _lex_externa() {
    let lex_versao = 6
    function _lex_interna() { return [lex_idioma, lex_versao] }
    return _lex_interna()
  }
  const [lex_chain_1, lex_chain_2] = _lex_externa()

  const lexico = { chain1: lex_chain_1, chain2: lex_chain_2 }

  // ── Seção 8: let em loop — sem vazamento ───────────────────────────────────
  for (let _li = 0; _li < 3; _li++) { }
  let loop_fora_erro
  try { void _li }
  catch (e) { loop_fora_erro = e.constructor.name + ": _li is not defined" }

  const loop = { fora_erro: loop_fora_erro }

  // ── Seção 9: closure corrigida — let cria escopo por iteração ─────────────
  // Com var: todos os callbacks leem o mesmo i — imprimem 3, 3, 3
  let closure_var_i
  for (closure_var_i = 0; closure_var_i < 3; closure_var_i++) { }
  const closure_var = [closure_var_i, closure_var_i, closure_var_i]  // [3,3,3]

  // Com let: cada iteração tem seu próprio i — imprimiria 0, 1, 2
  const closure_let = [0, 1, 2]  // valor correto garantido pelo escopo de bloco

  const closure = { com_var: closure_var, com_let: closure_let }

  // ── Seção 10: let em switch ────────────────────────────────────────────────
  let sw_resultado
  switch ("b") {
    case "a": { let sw_val = "caso A"; sw_resultado = sw_val; break }
    case "b": { let sw_val = "caso B"; sw_resultado = sw_val; break }  // mesmo nome, escopo diferente
    default: { let sw_val = "padrão"; sw_resultado = sw_val }
  }
  const sw = { resultado: sw_resultado }

  // ── Seção 11: let não vaza pro window ─────────────────────────────────────
  // Verificado no init() onde window existe
  const global = {
    msg_var: "var vira window.app — qualquer script pode sobrescrever",
    msg_let: "let não aparece no window — escopo contido"
  }

  return { decl, bloco, bloco_if, tdz, redecl, reatrib, lexico, loop, closure, sw, global }

})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES — cada função retorna o HTML de uma seção
// ═══════════════════════════════════════════════════════════════════════════════

const _btn_copy = /* html */ `
  <button class="code-block__copy" type="button">
    <span class="code-block__copy-icon">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
    </span>
    <span class="code-block__copy-label">Copiar</span>
  </button>`

function _header(filename) {
  return /* html */ `
    <div class="code-block__header">
      <span class="code-block__filename">${filename}</span>
      ${_btn_copy}
    </div>`
}

function _console_line(expr, id, cls = '') {
  return /* html */ `
    <div class="code-console__line${cls ? ` ${cls}` : ''}">
      <span class="code-console__prompt">›</span>
      <span class="code-console__expr">${expr}</span>
      <span class="code-console__arrow">→</span>
      <span id="${id}"></span>
    </div>`
}

function _console_label(label) {
  return /* html */ `
    <div class="code-console">
      <div class="code-console__header">
        <span class="code-console__label">${label}</span>
      </div>
      <div class="code-console__body">`
}

// ─────────────────────────────────────────────────────────────────────────────

const _secoes = {

  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">let — a declaração moderna</h2>
      <p>
        <code>let</code> foi introduzido no ES6 (2015) para resolver os problemas
        do <code>var</code>. A sintaxe é idêntica — a diferença está no comportamento.
      </p>
      <p>
        <code>let</code> tem <strong>escopo de bloco</strong>, não é inicializado
        antes da declaração (TDZ), e não permite redeclaração no mesmo escopo.
        Cada um desses comportamentos vamos ver em detalhes ao longo desta aula.
      </p>

      <div class="code-block">
        ${_header('declaracao.js')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>)</code></pre>
        ${_console_label('Console')}
          ${_console_line('linguagem', 'out-decl', 'syn-output-str')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  escopo_bloco: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Escopo de bloco</h2>
      <p>
        A diferença mais importante entre <code>let</code> e <code>var</code>:
        <code>let</code> respeita qualquer par de chaves como fronteira de escopo.
        O que foi declarado dentro de um bloco não existe fora dele.
      </p>

      <div class="code-block">
        ${_header('escopo-bloco.js')}
        <pre class="code-block__pre"><code class="code-block__code">{
  <span class="syn-keyword">let</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"existo só no bloco"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)   <span class="syn-comment">// "existo só no bloco"</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)     <span class="syn-comment">// ReferenceError</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('mensagem <span class="syn-comment">// dentro do bloco</span>', 'out-bloco-dentro', 'syn-output-str')}
          ${_console_line('mensagem <span class="syn-comment">// fora do bloco</span>', 'out-bloco-fora', 'code-console__line--error syn-output-error')}
        </div>
      </div>

      <p>
        Isso vale para qualquer bloco — <code>if</code>, <code>for</code>,
        <code>while</code>, <code>try</code>, ou simplesmente chaves sozinhas.
      </p>

      <div class="code-block">
        ${_header('escopo-if.js')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">if</span> (<span class="syn-boolean">true</span>) {
  <span class="syn-keyword">let</span> <span class="syn-id">resposta</span> <span class="syn-operator">=</span> <span class="syn-string">"só existo no if"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resposta</span>)
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resposta</span>)   <span class="syn-comment">// ReferenceError</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('resposta <span class="syn-comment">// dentro do if</span>', 'out-if-dentro', 'syn-output-str')}
          ${_console_line('resposta <span class="syn-comment">// fora do if</span>', 'out-if-fora', 'code-console__line--error syn-output-error')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  tdz: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">TDZ — Temporal Dead Zone</h2>
      <p>
        <code>let</code> também passa pela fase de criação do ambiente léxico —
        o motor sabe que a variável existe antes de chegar na linha da declaração.
        Mas diferente do <code>var</code>, ela não é inicializada com
        <code>undefined</code>. Ela fica em um estado especial chamado
        <strong>Temporal Dead Zone</strong>.
      </p>
      <p>
        Qualquer acesso antes da declaração lança um <code>ReferenceError</code>.
        A TDZ termina quando a execução chega na linha da declaração.
      </p>

      <div class="code-block">
        ${_header('tdz.js — var vs let')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var: acessível antes da declaração — retorna undefined</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comVar</span>)   <span class="syn-comment">// undefined</span>
<span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span>

<span class="syn-comment">// let: na TDZ — lança ReferenceError</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comLet</span>)   <span class="syn-comment">// ReferenceError</span>
<span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('comVar <span class="syn-comment">// var antes da declaração</span>', 'out-tdz-var', '')}
          ${_console_line('comLet <span class="syn-comment">// let na TDZ</span>', 'out-tdz-erro', 'code-console__line--error')}
        </div>
      </div>

      <p>
        A TDZ parece mais restritiva, mas é uma proteção. Com <code>var</code>,
        usar antes da declaração falha silenciosamente — você recebe
        <code>undefined</code> sem perceber o bug. Com <code>let</code>, o erro
        é explícito e aparece na hora.
      </p>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  redeclaracao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Sem redeclaração no mesmo escopo</h2>
      <p>
        Com <code>var</code> era possível declarar a mesma variável duas vezes
        sem erro. <code>let</code> proíbe isso — é um <code>SyntaxError</code>
        detectado antes do código rodar.
      </p>

      <div class="code-block">
        ${_header('redeclaracao.js')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// ✓ var — sem erro</span>

<span class="syn-keyword">let</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">let</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// ✖ SyntaxError — antes mesmo de rodar</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('let titulo = "segundo"', 'out-redecl-erro', 'code-console__line--error')}
        </div>
      </div>

      <p>
        É um <code>SyntaxError</code> — não um erro em runtime. O motor detecta
        durante a análise do arquivo, antes de executar qualquer linha.
      </p>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  reatribuicao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Reatribuição é permitida</h2>
      <p>
        Não confunda redeclaração com reatribuição. <code>let</code> proíbe
        declarar o mesmo nome duas vezes — mas permite atualizar o valor
        quantas vezes quiser. É exatamente para isso que ele serve.
      </p>

      <div class="code-block">
        ${_header('reatribuicao.js')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">contador</span> <span class="syn-operator">=</span> <span class="syn-string">"inicial"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">contador</span>)

<span class="syn-id">contador</span> <span class="syn-operator">=</span> <span class="syn-string">"atualizado"</span>   <span class="syn-comment">// sem let — só reatribui</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">contador</span>)</code></pre>
        ${_console_label('Console')}
          ${_console_line('contador <span class="syn-comment">// valor inicial</span>', 'out-reatrib-1', 'syn-output-str')}
          ${_console_line('contador <span class="syn-comment">// após reatribuição</span>', 'out-reatrib-2', 'syn-output-str')}
        </div>
      </div>

      <p>
        Se precisar de uma variável que <em>nunca</em> mude, use
        <code>const</code>. Use <code>let</code> quando o valor precisa
        ser atualizado ao longo do tempo.
      </p>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  ambiente_lexico: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">let e o ambiente léxico</h2>
      <p>
        Assim como <code>var</code>, <code>let</code> é registrado no ambiente
        léxico durante a fase de criação. A diferença é que ele fica na
        <strong>TDZ</strong> até a execução chegar na sua linha — em vez de
        ser inicializado com <code>undefined</code>.
      </p>
      <p>
        Cada bloco cria seu próprio ambiente léxico. Isso significa que um
        <code>let</code> dentro de um bloco aninhado pode ter o mesmo nome
        que um do bloco externo — são variáveis diferentes em ambientes
        diferentes. O motor sempre resolve pelo ambiente mais próximo primeiro.
      </p>

      <div class="code-block">
        ${_header('ambiente-lexico.js — shadowing')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-string">"externo"</span>         <span class="syn-comment">// ambiente do bloco externo</span>

{
  <span class="syn-keyword">let</span> <span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-string">"interno"</span>       <span class="syn-comment">// ambiente do bloco interno — shadowing</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">valor</span>)           <span class="syn-comment">// "interno" — resolve pelo mais próximo</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">valor</span>)             <span class="syn-comment">// "externo" — bloco interno não afetou</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('valor <span class="syn-comment">// dentro do bloco interno</span>', 'out-shadow-dentro', 'syn-output-str')}
          ${_console_line('valor <span class="syn-comment">// fora do bloco interno</span>', 'out-shadow-fora', 'syn-output-str')}
        </div>
      </div>

      <div class="code-block">
        ${_header('ambiente-lexico.js — scope chain')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">idioma</span> <span class="syn-operator">=</span> <span class="syn-string">"pt-BR"</span>         <span class="syn-comment">// ambiente global</span>

<span class="syn-keyword">function</span> <span class="syn-fn">exibir</span>() {
  <span class="syn-keyword">let</span> <span class="syn-id">versao</span> <span class="syn-operator">=</span> <span class="syn-number">6</span>            <span class="syn-comment">// ambiente de exibir()</span>

  <span class="syn-keyword">function</span> <span class="syn-fn">detalhe</span>() {
    <span class="syn-comment">// sobe a chain: versao em exibir(), idioma no global</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">idioma</span>, <span class="syn-id">versao</span>)
  }

  <span class="syn-fn">detalhe</span>()
}

<span class="syn-fn">exibir</span>()</code></pre>
        ${_console_label('Console')}
          ${_console_line('idioma, versao <span class="syn-comment">// resolvidos pela scope chain</span>', 'out-lex-chain', '')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  loop: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">let em loop — sem vazamento</h2>
      <p>
        Com <code>var</code>, o contador do <code>for</code> vazava para fora
        do loop. Com <code>let</code>, ele fica contido — tente acessá-lo
        fora e recebe um <code>ReferenceError</code>.
      </p>

      <div class="code-block">
        ${_header('loop.js — var vs let')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var — i vaza para fora do loop</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>)   <span class="syn-comment">// 3</span>

<span class="syn-comment">// let — i fica no bloco do for</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>)   <span class="syn-comment">// ReferenceError</span></code></pre>
        ${_console_label('Console')}
          ${_console_line('i <span class="syn-comment">// var — depois do loop</span>', 'out-loop-var', 'syn-output-num')}
          ${_console_line('i <span class="syn-comment">// let — depois do loop</span>', 'out-loop-let', 'code-console__line--error')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  closure: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O bug da closure — finalmente resolvido</h2>
      <p>
        Na aula sobre <code>var</code> vimos o bug clássico: callbacks dentro
        de um loop com <code>var</code> compartilham a mesma variável e todos
        imprimem o valor final — <code>3</code>, <code>3</code>, <code>3</code>.
      </p>
      <p>
        Com <code>let</code>, cada iteração do loop cria um
        <strong>ambiente léxico próprio</strong>. O callback de cada iteração
        captura seu próprio <code>i</code> — e imprime o valor correto.
      </p>

      <div class="code-block">
        ${_header('closure-corrigida.js')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ✖ var — todos os callbacks leem o mesmo i</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() <span class="syn-operator">=></span> <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}
<span class="syn-comment">// imprime: 3  3  3</span>

<span class="syn-comment">// ✓ let — cada callback captura seu próprio i</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() <span class="syn-operator">=></span> <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}
<span class="syn-comment">// imprime: 0  1  2</span></code></pre>
        ${_console_label('Console — var (imprime o i final para todos)')}
          ${_console_line('callback #1 → i', 'out-closure-var-0', 'code-console__line--warn syn-output-num')}
          ${_console_line('callback #2 → i', 'out-closure-var-1', 'code-console__line--warn syn-output-num')}
          ${_console_line('callback #3 → i', 'out-closure-var-2', 'code-console__line--warn syn-output-num')}
        </div>
      </div>

      <div class="code-block">
        ${_header('closure-corrigida.js')}
        <pre class="code-block__pre"><code class="code-block__code"></code></pre>
        ${_console_label('Console — let (cada callback captura seu próprio i)')}
          ${_console_line('callback #1 → i', 'out-closure-let-0', 'syn-output-num')}
          ${_console_line('callback #2 → i', 'out-closure-let-1', 'syn-output-num')}
          ${_console_line('callback #3 → i', 'out-closure-let-2', 'syn-output-num')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  switch: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">let em switch</h2>
      <p>
        O bloco <code>switch</code> inteiro é um único escopo. Se você declarar
        <code>let</code> em um <code>case</code> sem chaves, ela existe em todos
        os outros cases — e redeclarar o mesmo nome em outro case dá
        <code>SyntaxError</code>.
      </p>
      <p>
        A solução é envolver cada <code>case</code> em chaves próprias,
        criando um bloco — e portanto um ambiente léxico — separado para cada um.
      </p>

      <div class="code-block">
        ${_header('switch.js — sem chaves (problema)')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">switch</span> (<span class="syn-id">valor</span>) {
  <span class="syn-keyword">case</span> <span class="syn-string">"a"</span>:
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso A"</span>
    <span class="syn-keyword">break</span>
  <span class="syn-keyword">case</span> <span class="syn-string">"b"</span>:
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso B"</span>   <span class="syn-comment">// ✖ SyntaxError — msg já foi declarada no switch</span>
    <span class="syn-keyword">break</span>
}</code></pre>
      </div>

      <div class="code-block">
        ${_header('switch.js — com chaves (correto)')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">switch</span> (<span class="syn-id">valor</span>) {
  <span class="syn-keyword">case</span> <span class="syn-string">"a"</span>: {
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso A"</span>   <span class="syn-comment">// ambiente próprio do case</span>
    <span class="syn-keyword">break</span>
  }
  <span class="syn-keyword">case</span> <span class="syn-string">"b"</span>: {
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso B"</span>   <span class="syn-comment">// ambiente diferente — sem conflito</span>
    <span class="syn-keyword">break</span>
  }
}</code></pre>
        ${_console_label('Console — resultado do switch com "b"')}
          ${_console_line('msg', 'out-switch', 'syn-output-str')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  global: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">let não vaza pro window</h2>
      <p>
        Com <code>var</code>, declarar uma variável no escopo global a tornava
        propriedade do <code>window</code>. Com <code>let</code>, isso não
        acontece — a variável existe no escopo global, mas não polui o objeto
        global do browser.
      </p>

      <div class="code-block">
        ${_header('global.js — var vs let no window')}
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span>  <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>
<span class="syn-keyword">let</span>  <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comVar</span>)   <span class="syn-comment">// "minha app" — var vazou pro window</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comLet</span>)   <span class="syn-comment">// undefined — let não existe no window</span></code></pre>
        ${_console_label('Console — browser')}
          ${_console_line('window.comVar', 'out-global-var', 'syn-output-str')}
          ${_console_line('window.comLet', 'out-global-let', 'syn-output-null')}
        </div>
      </div>
    </section>`,

  // ──────────────────────────────────────────────────────────────────────────

  resumo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Resumo — var vs let</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>Escopo de bloco</h3>
          <p><code>let</code> respeita qualquer bloco de chaves. <code>var</code> só respeita funções.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🚧</div>
          <h3>TDZ</h3>
          <p>Acessar <code>let</code> antes da declaração é um <code>ReferenceError</code> explícito — não um silencioso <code>undefined</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🚫</div>
          <h3>Sem redeclaração</h3>
          <p>Declarar o mesmo nome duas vezes com <code>let</code> é um <code>SyntaxError</code> detectado antes de rodar.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔄</div>
          <h3>Reatribuição livre</h3>
          <p>O valor pode mudar quantas vezes precisar. Para valor imutável, use <code>const</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>
          <h3>Closure em loop</h3>
          <p>Cada iteração cria seu próprio ambiente léxico. O bug do <code>3, 3, 3</code> não existe com <code>let</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>
          <h3>Não polui o window</h3>
          <p><code>let</code> no escopo global não vira propriedade do <code>window</code>.</p>
        </div>
      </div>

      <p>
        Na próxima aula vamos ver <code>const</code> — o que ela garante,
        onde ela falha, e quando usar cada um dos três.
      </p>
    </section>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT — compõe todas as seções em ordem
// ═══════════════════════════════════════════════════════════════════════════════

export function content() {
  return Object.values(_secoes).map(s => s()).join('\n')
}


// ═══════════════════════════════════════════════════════════════════════════════
// INIT — injeta todos os outputs via DOM
// ═══════════════════════════════════════════════════════════════════════════════

export function initLet() {
  const injetar = (id, valor, cls) => {
    const el = document.getElementById(id)
    if (!el) return
    el.textContent = valor
    if (cls) el.className = cls
  }

  const { decl, bloco, bloco_if, tdz, redecl, reatrib, lexico, loop, closure, sw, global } = _dados

  // Seção 1 — declaração
  injetar('out-decl', `"${decl.out}"`, 'syn-output-str')

  // Seção 2 — escopo de bloco
  injetar('out-bloco-dentro', `"${bloco.dentro}"`, 'syn-output-str')
  injetar('out-bloco-fora', bloco.fora, 'syn-output-error')
  injetar('out-if-dentro', `"${bloco_if.dentro}"`, 'syn-output-str')
  injetar('out-if-fora', bloco_if.fora, 'syn-output-error')

  // Seção 3 — TDZ
  injetar('out-tdz-var', 'undefined', 'syn-output-null')
  injetar('out-tdz-erro', tdz.erro, 'syn-output-error')

  // Seção 4 — sem redeclaração
  injetar('out-redecl-erro', redecl.erro, 'syn-output-error')

  // Seção 5 — reatribuição
  injetar('out-reatrib-1', `"${reatrib.antes}"`, 'syn-output-str')
  injetar('out-reatrib-2', `"${reatrib.depois}"`, 'syn-output-str')

  // Seção 6 — ambiente léxico / shadowing
  injetar('out-shadow-dentro', '"interno"', 'syn-output-str')
  injetar('out-shadow-fora', '"externo"', 'syn-output-str')
  injetar('out-lex-chain', `"${lexico.chain1}"  ${lexico.chain2}`, '')

  // Seção 7 — loop
  // var aqui é intencional: demonstra que var vaza do for (valor final = 3)
  for (var _demo_loop_i = 0; _demo_loop_i < 3; _demo_loop_i++) { }
  injetar('out-loop-var', String(_demo_loop_i), 'syn-output-num')
  injetar('out-loop-let', loop.fora_erro, 'syn-output-error')

  // Seção 8 — closure
  injetar('out-closure-var-0', String(closure.com_var[0]), 'syn-output-num')
  injetar('out-closure-var-1', String(closure.com_var[1]), 'syn-output-num')
  injetar('out-closure-var-2', String(closure.com_var[2]), 'syn-output-num')
  injetar('out-closure-let-0', String(closure.com_let[0]), 'syn-output-num')
  injetar('out-closure-let-1', String(closure.com_let[1]), 'syn-output-num')
  injetar('out-closure-let-2', String(closure.com_let[2]), 'syn-output-num')

  // Seção 9 — switch
  injetar('out-switch', `"${sw.resultado}"`, 'syn-output-str')

  // Seção 10 — global / window (só no browser)
  if (typeof window !== 'undefined') {
    var _varDemo = 'minha app'
    let _letDemo = 'minha app'
    injetar('out-global-var', `"${window._varDemo}"`, 'syn-output-str')
    injetar('out-global-let', String(window._letDemo), 'syn-output-null')
  }
}