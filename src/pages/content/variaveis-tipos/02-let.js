// src/content/fundamentos/02-let.js
//
// Estrutura interna:
//   _dados      — todos os valores calculados, organizados por seção
//   _secoes     — funções que retornam o HTML de cada seção
//   content()   — compõe todas as seções em uma página única
//   initLet()   — injeta todos os outputs via DOM
//
// Observação importante:
// Este arquivo é um ES Module por usar `export`.
// Portanto, `var` declarado no nível superior deste arquivo NÃO
// se torna propriedade de `window`. Isso é diferente de um script
// clássico carregado com <script> sem `type="module">`.

// ═══════════════════════════════════════════════════════════════════════════════
// DADOS — valores calculados uma vez, usados pelo content() e initLet()
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {
  // ── Seção 1: declaração básica ─────────────────────────────────────────────

  let _decl = "JavaScript"

  const decl = {
    out: _decl,
  }

  // ── Seção 2: escopo de bloco ───────────────────────────────────────────────

  let bloco_capturado

  {
    let _b = "existo só no bloco"

    bloco_capturado = _b
  }

  let bloco_erro

  try {
    void _b
  } catch (e) {
    bloco_erro = `${e.constructor.name}: _b is not defined`
  }

  const bloco = {
    dentro: bloco_capturado,
    fora: bloco_erro,
  }

  // ── Seção 3: let em if ─────────────────────────────────────────────────────

  let if_capturado

  if (true) {
    let _if = "só existo no if"

    if_capturado = _if
  }

  let if_erro

  try {
    void _if
  } catch (e) {
    if_erro = `${e.constructor.name}: _if is not defined`
  }

  const bloco_if = {
    dentro: if_capturado,
    fora: if_erro,
  }

  // ── Seção 4: TDZ ───────────────────────────────────────────────────────────
  //
  // A variável _tdz_never é conhecida pelo ambiente léxico,
  // mas permanece não inicializada até a declaração.
  //
  // O acesso acontece antes da inicialização e gera ReferenceError.

  let tdz_erro

  try {
    void _tdz_never

    let _tdz_never = "tarde demais"
  } catch (e) {
    tdz_erro = `${e.constructor.name}: Cannot access '_tdz_never' before initialization`
  }

  const tdz = {
    erro: tdz_erro,
  }

  // ── Seção 5: sem redeclaração ──────────────────────────────────────────────
  //
  // Não podemos colocar:
  //
  // let nome = "primeiro"
  // let nome = "segundo"
  //
  // diretamente aqui, porque isso causaria SyntaxError no módulo inteiro.
  //
  // O erro é demonstrado visualmente no HTML.

  const redecl = {
    erro: "SyntaxError: Identifier 'nome' has already been declared",
  }

  // ── Seção 6: reatribuição ──────────────────────────────────────────────────

  let _reatrib = "inicial"

  const r1 = _reatrib

  _reatrib = "atualizado"

  const r2 = _reatrib

  const reatrib = {
    antes: r1,
    depois: r2,
  }

  // ── Seção 7: ambiente léxico / scope chain ─────────────────────────────────

  let lex_idioma = "pt-BR"

  function _lex_externa() {
    let lex_versao = 6

    function _lex_interna() {
      return [lex_idioma, lex_versao]
    }

    return _lex_interna()
  }

  const [lex_chain_1, lex_chain_2] = _lex_externa()

  const lexico = {
    chain1: lex_chain_1,
    chain2: lex_chain_2,
  }

  // ── Seção 8: let em loop — sem vazamento ───────────────────────────────────

  for (let _li = 0; _li < 3; _li++) {
    // intencionalmente vazio
  }

  let loop_fora_erro

  try {
    void _li
  } catch (e) {
    loop_fora_erro = `${e.constructor.name}: _li is not defined`
  }

  const loop = {
    fora_erro: loop_fora_erro,
  }

  // ── Seção 9: closure — var vs let ─────────────────────────────────────────
  //
  // Com var, existe uma única variável compartilhada:
  //
  // for (var i = 0; i < 3; i++) {
  //   setTimeout(() => console.log(i), 0)
  // }
  //
  // Resultado: 3, 3, 3
  //
  // Com let, cada iteração do for possui seu próprio binding de i:
  //
  // for (let i = 0; i < 3; i++) {
  //   setTimeout(() => console.log(i), 0)
  // }
  //
  // Resultado: 0, 1, 2

  let closure_var_i

  for (closure_var_i = 0; closure_var_i < 3; closure_var_i++) {
    // o loop termina com 3
  }

  const closure_var = [closure_var_i, closure_var_i, closure_var_i]

  const closure_let = [0, 1, 2]

  const closure = {
    com_var: closure_var,
    com_let: closure_let,
  }

  // ── Seção 10: let em switch ────────────────────────────────────────────────
  //
  // O switch possui um ambiente léxico para o CaseBlock.
  // Cada case abaixo possui suas próprias chaves,
  // portanto cada `let sw_val` pertence a um bloco diferente.

  let sw_resultado

  switch ("b") {
    case "a": {
      let sw_val = "caso A"

      sw_resultado = sw_val

      break
    }

    case "b": {
      let sw_val = "caso B"

      sw_resultado = sw_val

      break
    }

    default: {
      let sw_val = "padrão"

      sw_resultado = sw_val
    }
  }

  const sw = {
    resultado: sw_resultado,
  }

  // ── Seção 11: let/var e window ─────────────────────────────────────────────
  //
  // IMPORTANTE:
  //
  // Em um script clássico:
  //
  // var app = "minha app"
  // console.log(window.app) // "minha app"
  //
  // Já em um ES Module:
  //
  // var app = "minha app"
  // console.log(window.app) // undefined
  //
  // Isso acontece porque módulos possuem seu próprio escopo de módulo.
  //
  // O mesmo vale para let:
  //
  // let app = "minha app"
  // console.log(window.app) // undefined
  //
  // Portanto, nesta aula mostramos a diferença de contexto.

  const global = {
    modulo_var: undefined,
    modulo_let: undefined,

    mensagem:
      "Neste arquivo ES Module, nem var nem let no escopo superior viram propriedades de window.",
  }

  return {
    decl,
    bloco,
    bloco_if,
    tdz,
    redecl,
    reatrib,
    lexico,
    loop,
    closure,
    sw,
    global,
  }
})()

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTES AUXILIARES DE HTML
// ═══════════════════════════════════════════════════════════════════════════════

const _btn_copy = /* html */ `
  <button class="code-block__copy" type="button">
    <span class="code-block__copy-icon">
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
    </span>

    <span class="code-block__copy-label">
      Copiar
    </span>
  </button>
`

function _header(filename) {
  return /* html */ `
    <div class="code-block__header">
      <span class="code-block__filename">
        ${filename}
      </span>

      ${_btn_copy}
    </div>
  `
}

function _console_label(label) {
  return /* html */ `
    <div class="code-console">
      <div class="code-console__header">
        <span class="code-console__label">
          ${label}
        </span>
      </div>

      <div class="code-console__body">
  `
}

function _console_line(expr, id, cls = "") {
  return /* html */ `
    <div class="code-console__line${cls ? ` ${cls}` : ""}">
      <span class="code-console__prompt">›</span>

      <span class="code-console__expr">
        ${expr}
      </span>

      <span class="code-console__arrow">
        →
      </span>

      <span id="${id}"></span>
    </div>
  `
}

function _console_end() {
  return /* html */ `
      </div>
    </div>
  `
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {
  // ───────────────────────────────────────────────────────────────────────────
  // 1. INTRODUÇÃO
  // ───────────────────────────────────────────────────────────────────────────

  introducao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Declaração básica
      </h2>

      <p>
        <code>let</code> foi introduzido no ES6, em 2015, para resolver
        vários problemas associados ao <code>var</code>.
      </p>

      <p>
        A sintaxe é parecida com <code>var</code>, mas o comportamento
        é diferente. <code>let</code> possui escopo de bloco,
        respeita a <strong>Temporal Dead Zone (TDZ)</strong> e não
        permite redeclaração no mesmo escopo.
      </p>

      <div class="code-block">

        ${_header("declaracao.js")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>)</code></pre>

        ${_console_label("Console")}

        ${_console_line("linguagem", "out-decl", "syn-output-str")}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 2. ESCOPO DE BLOCO
  // ───────────────────────────────────────────────────────────────────────────

  escopo_bloco: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Escopo de bloco
      </h2>

      <p>
        A diferença mais importante entre <code>let</code> e
        <code>var</code> é o escopo.
      </p>

      <p>
        <code>let</code> respeita qualquer par de chaves como
        fronteira de escopo. O que foi declarado dentro de um bloco
        não existe fora dele.
      </p>

      <div class="code-block">

        ${_header("escopo-bloco.js")}

        <pre class="code-block__pre"><code class="code-block__code">{
  <span class="syn-keyword">let</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"existo só no bloco"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>) <span class="syn-comment">// ReferenceError</span></code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "mensagem // dentro do bloco",
          "out-bloco-dentro",
          "syn-output-str",
        )}

        ${_console_line(
          "mensagem // fora do bloco",
          "out-bloco-fora",
          "code-console__line--error syn-output-error",
        )}

        ${_console_end()}

      </div>

      <p>
        Isso vale para qualquer bloco — <code>if</code>, <code>for</code>,
        <code>while</code>, <code>try</code> ou simplesmente um par de
        chaves.
      </p>

      <div class="code-block">

        ${_header("escopo-if.js")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">if</span> (<span class="syn-boolean">true</span>) {
  <span class="syn-keyword">let</span> <span class="syn-id">resposta</span> <span class="syn-operator">=</span> <span class="syn-string">"só existo no if"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resposta</span>)
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resposta</span>) <span class="syn-comment">// ReferenceError</span></code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "resposta // dentro do if",
          "out-if-dentro",
          "syn-output-str",
        )}

        ${_console_line(
          "resposta // fora do if",
          "out-if-fora",
          "code-console__line--error syn-output-error",
        )}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 3. TDZ
  // ───────────────────────────────────────────────────────────────────────────

  tdz: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        TDZ — Temporal Dead Zone
      </h2>

      <p>
        <code>let</code> também é registrada durante a criação do
        ambiente léxico. A diferença é que ela não é inicializada
        imediatamente com <code>undefined</code>.
      </p>

      <p>
        Entre o início do escopo e a linha da declaração existe um
        período chamado <strong>Temporal Dead Zone (TDZ)</strong>.
      </p>

      <p>
        Qualquer tentativa de acessar a variável durante a TDZ lança
        <code>ReferenceError</code>.
      </p>

      <div class="code-block">

        ${_header("tdz.js — var vs let")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var: acessível antes da declaração</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comVar</span>) <span class="syn-comment">// undefined</span>
<span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span>

<span class="syn-comment">// let: está na TDZ</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">comLet</span>) <span class="syn-comment">// ReferenceError</span>
<span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"ok"</span></code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "comVar // var antes da declaração",
          "out-tdz-var",
          "syn-output-null",
        )}

        ${_console_line(
          "comLet // let na TDZ",
          "out-tdz-erro",
          "code-console__line--error syn-output-error",
        )}

        ${_console_end()}

      </div>

      <p>
        A TDZ pode parecer mais restritiva, mas torna o erro explícito.
        Com <code>var</code>, um acesso antecipado pode produzir
        <code>undefined</code> silenciosamente.
      </p>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 4. REDECLARAÇÃO
  // ───────────────────────────────────────────────────────────────────────────

  redeclaracao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Sem redeclaração no mesmo escopo
      </h2>

      <p>
        Com <code>var</code>, é permitido declarar novamente a mesma
        variável no mesmo escopo.
      </p>

      <p>
        Com <code>let</code>, isso não é permitido. Tentar declarar
        novamente o mesmo identificador no mesmo escopo produz um
        <code>SyntaxError</code>.
      </p>

      <div class="code-block">

        ${_header("redeclaracao.js")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span> <span class="syn-comment">// ✓ permitido</span>

<span class="syn-keyword">let</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-keyword">let</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span> <span class="syn-comment">// ✖ SyntaxError</span></code></pre>

        ${_console_label("Console")}

        ${_console_line(
          'let nome = "segundo"',
          "out-redecl-erro",
          "code-console__line--error syn-output-error",
        )}

        ${_console_end()}

      </div>

      <p>
        O <code>SyntaxError</code> é detectado durante a análise do código,
        antes da execução normal do programa.
      </p>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 5. REATRIBUIÇÃO
  // ───────────────────────────────────────────────────────────────────────────

  reatribuicao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Reatribuição é permitida
      </h2>

      <p>
        Não confunda <strong>redeclaração</strong> com
        <strong>reatribuição</strong>.
      </p>

      <p>
        <code>let</code> não permite declarar o mesmo identificador
        duas vezes no mesmo escopo, mas permite alterar seu valor.
      </p>

      <div class="code-block">

        ${_header("reatribuicao.js")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">contador</span> <span class="syn-operator">=</span> <span class="syn-string">"inicial"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">contador</span>)

<span class="syn-id">contador</span> <span class="syn-operator">=</span> <span class="syn-string">"atualizado"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">contador</span>)</code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "contador // valor inicial",
          "out-reatrib-1",
          "syn-output-str",
        )}

        ${_console_line(
          "contador // após reatribuição",
          "out-reatrib-2",
          "syn-output-str",
        )}

        ${_console_end()}

      </div>

      <p>
        Se precisar de uma variável cujo binding não possa ser reatribuído,
        use <code>const</code>. Se o valor precisar mudar durante a execução,
        <code>let</code> é apropriado.
      </p>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 6. AMBIENTE LÉXICO
  // ───────────────────────────────────────────────────────────────────────────

  ambiente_lexico: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        let e o ambiente léxico
      </h2>

      <p>
        Assim como <code>var</code>, <code>let</code> é registrado no
        ambiente léxico durante a criação do contexto de execução.
      </p>

      <p>
        A diferença é que o binding de <code>let</code> permanece
        não inicializado até a execução chegar à sua declaração.
        É daí que surge a TDZ.
      </p>

      <p>
        Cada bloco pode criar um ambiente léxico próprio. Por isso,
        dois identificadores com o mesmo nome podem existir em blocos
        diferentes sem serem a mesma variável.
      </p>

      <div class="code-block">

        ${_header("ambiente-lexico.js — shadowing")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-string">"externo"</span>

{
  <span class="syn-keyword">let</span> <span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-string">"interno"</span>

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">valor</span>)
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">valor</span>)</code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "valor // dentro do bloco interno",
          "out-shadow-dentro",
          "syn-output-str",
        )}

        ${_console_line(
          "valor // fora do bloco interno",
          "out-shadow-fora",
          "syn-output-str",
        )}

        ${_console_end()}

      </div>

      <p>
        O segundo <code>valor</code> faz <strong>shadowing</strong> do
        primeiro dentro do bloco interno. Quando o bloco termina,
        o <code>valor</code> externo continua intacto.
      </p>

      <div class="code-block">

        ${_header("ambiente-lexico.js — scope chain")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">let</span> <span class="syn-id">idioma</span> <span class="syn-operator">=</span> <span class="syn-string">"pt-BR"</span>

<span class="syn-keyword">function</span> <span class="syn-fn">exibir</span>() {
  <span class="syn-keyword">let</span> <span class="syn-id">versao</span> <span class="syn-operator">=</span> <span class="syn-number">6</span>

  <span class="syn-keyword">function</span> <span class="syn-fn">detalhe</span>() {
    <span class="syn-comment">// encontra versao em exibir()</span>
    <span class="syn-comment">// encontra idioma no escopo externo</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">idioma</span>, <span class="syn-id">versao</span>)
  }

  <span class="syn-fn">detalhe</span>()
}

<span class="syn-fn">exibir</span>()</code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "idioma, versao // resolvidos pela scope chain",
          "out-lex-chain",
        )}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 7. LOOP
  // ───────────────────────────────────────────────────────────────────────────

  loop: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        let em loop — sem vazamento
      </h2>

      <p>
        Com <code>var</code>, o contador declarado no <code>for</code>
        continua existindo depois que o loop termina.
      </p>

      <p>
        Com <code>let</code>, o contador fica limitado ao escopo do
        próprio loop.
      </p>

      <div class="code-block">

        ${_header("loop.js — var vs let")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var — i vaza para fora do loop</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>) <span class="syn-comment">// 3</span>

<span class="syn-comment">// let — i fica no escopo do for</span>
<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>) <span class="syn-comment">// ReferenceError</span></code></pre>

        ${_console_label("Console")}

        ${_console_line(
          "i // var — depois do loop",
          "out-loop-var",
          "syn-output-num",
        )}

        ${_console_line(
          "i // let — depois do loop",
          "out-loop-let",
          "code-console__line--error syn-output-error",
        )}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 8. CLOSURE
  // ───────────────────────────────────────────────────────────────────────────

  closure: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        O bug da closure — finalmente resolvido
      </h2>

      <p>
        Na aula sobre <code>var</code>, vimos o bug clássico:
        callbacks dentro de um loop com <code>var</code> compartilham
        o mesmo binding e acabam lendo o valor final.
      </p>

      <p>
        Com <code>let</code>, cada iteração do loop possui um binding
        próprio. O callback de cada iteração captura seu próprio
        <code>i</code>.
      </p>

      <div class="code-block">

        ${_header("closure-corrigida.js")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ✖ var — todos os callbacks compartilham o mesmo i</span>

<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() =&gt; <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}

<span class="syn-comment">// imprime: 3  3  3</span>


<span class="syn-comment">// ✓ let — cada iteração possui seu próprio i</span>

<span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() =&gt; <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}

<span class="syn-comment">// imprime: 0  1  2</span></code></pre>

        ${_console_label("Console — var")}

        ${_console_line(
          "callback #1 → i",
          "out-closure-var-0",
          "code-console__line--warn syn-output-num",
        )}

        ${_console_line(
          "callback #2 → i",
          "out-closure-var-1",
          "code-console__line--warn syn-output-num",
        )}

        ${_console_line(
          "callback #3 → i",
          "out-closure-var-2",
          "code-console__line--warn syn-output-num",
        )}

        ${_console_end()}

      </div>

      <div class="code-block">

        ${_header("closure-corrigida.js — let")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">for</span> (<span class="syn-keyword">let</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(() =&gt; <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>), <span class="syn-number">0</span>)
}

<span class="syn-comment">// imprime: 0  1  2</span></code></pre>

        ${_console_label("Console — let")}

        ${_console_line(
          "callback #1 → i",
          "out-closure-let-0",
          "syn-output-num",
        )}

        ${_console_line(
          "callback #2 → i",
          "out-closure-let-1",
          "syn-output-num",
        )}

        ${_console_line(
          "callback #3 → i",
          "out-closure-let-2",
          "syn-output-num",
        )}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 9. SWITCH
  // ───────────────────────────────────────────────────────────────────────────

  switch: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        let em switch
      </h2>

      <p>
        O <code>switch</code> possui um escopo próprio, mas os
        <code>case</code> não criam automaticamente um novo bloco.
      </p>

      <p>
        Por isso, declarar o mesmo <code>let</code> em dois
        <code>case</code> sem chaves pode produzir conflito.
      </p>

      <div class="code-block">

        ${_header("switch.js — sem chaves (problema)")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">switch</span> (<span class="syn-id">valor</span>) {
  <span class="syn-keyword">case</span> <span class="syn-string">"a"</span>:
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso A"</span>
    <span class="syn-keyword">break</span>

  <span class="syn-keyword">case</span> <span class="syn-string">"b"</span>:
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso B"</span>
    <span class="syn-comment">// ✖ SyntaxError — msg já foi declarada</span>
    <span class="syn-keyword">break</span>
}</code></pre>

      </div>

      <p>
        Uma forma simples de criar um escopo separado para cada
        <code>case</code> é envolver o conteúdo em chaves.
      </p>

      <div class="code-block">

        ${_header("switch.js — com chaves (correto)")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">switch</span> (<span class="syn-id">valor</span>) {

  <span class="syn-keyword">case</span> <span class="syn-string">"a"</span>: {
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso A"</span>
    <span class="syn-keyword">break</span>
  }

  <span class="syn-keyword">case</span> <span class="syn-string">"b"</span>: {
    <span class="syn-keyword">let</span> <span class="syn-id">msg</span> <span class="syn-operator">=</span> <span class="syn-string">"caso B"</span>
    <span class="syn-keyword">break</span>
  }

}</code></pre>

        ${_console_label('Console — resultado do switch com "b"')}

        ${_console_line("msg", "out-switch", "syn-output-str")}

        ${_console_end()}

      </div>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 10. WINDOW
  // ───────────────────────────────────────────────────────────────────────────

  global: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        let e o objeto window
      </h2>

      <p>
        Existe uma diferença importante entre um
        <strong>script clássico</strong> e um <strong>ES Module</strong>.
      </p>

      <p>
        Em um script clássico executado no escopo global, uma declaração
        com <code>var</code> pode criar uma propriedade correspondente
        no objeto global <code>window</code>.
      </p>

      <p>
        Porém, este arquivo usa <code>export</code> e, portanto, é um
        <strong>ES Module</strong>. Nesse contexto, o <code>var</code>
        do módulo não vira propriedade de <code>window</code>.
      </p>

      <div class="code-block">

        ${_header("global-classic.js — script clássico")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>
<span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comVar</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comLet</span>)</code></pre>

        ${_console_label("Console — script clássico")}

        ${_console_line(
          "window.comVar",
          "out-global-classic-var",
          "syn-output-str",
        )}

        ${_console_line(
          "window.comLet",
          "out-global-classic-let",
          "syn-output-null",
        )}

        ${_console_end()}

      </div>

      <div class="code-block">

        ${_header("global-module.js — ES Module")}

        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">comVar</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>
<span class="syn-keyword">let</span> <span class="syn-id">comLet</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comVar</span>) <span class="syn-comment">// undefined</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">comLet</span>) <span class="syn-comment">// undefined</span></code></pre>

        ${_console_label("Console — ES Module")}

        ${_console_line(
          "window.comVar",
          "out-global-module-var",
          "syn-output-null",
        )}

        ${_console_line(
          "window.comLet",
          "out-global-module-let",
          "syn-output-null",
        )}

        ${_console_end()}

      </div>

      <p>
        Portanto, não é correto dizer simplesmente que
        <code>var</code> sempre vira uma propriedade de
        <code>window</code>. Isso depende do tipo de script e do contexto.
      </p>

    </section>
  `,

  // ───────────────────────────────────────────────────────────────────────────
  // 11. RESUMO
  // ───────────────────────────────────────────────────────────────────────────

  resumo: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Resumo — tudo que você precisa saber sobre let
      </h2>

      <div class="lesson__cards">

        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>

          <h3>Escopo de bloco</h3>

          <p>
            <code>let</code> respeita blocos delimitados por chaves,
            como <code>if</code>, <code>for</code>, <code>while</code>
            e blocos explícitos.
          </p>
        </div>


        <div class="lesson__card">
          <div class="lesson__card-icon">🚧</div>

          <h3>TDZ</h3>

          <p>
            O binding existe no ambiente léxico, mas permanece
            não inicializado até a declaração. Acessá-lo antes disso
            produz <code>ReferenceError</code>.
          </p>
        </div>


        <div class="lesson__card">
          <div class="lesson__card-icon">🚫</div>

          <h3>Sem redeclaração</h3>

          <p>
            Declarar o mesmo identificador duas vezes com
            <code>let</code> no mesmo escopo produz
            <code>SyntaxError</code>.
          </p>
        </div>


        <div class="lesson__card">
          <div class="lesson__card-icon">🔄</div>

          <h3>Reatribuição</h3>

          <p>
            O valor de uma variável declarada com <code>let</code>
            pode ser alterado quantas vezes forem necessárias.
          </p>
        </div>


        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>

          <h3>Closure em loop</h3>

          <p>
            Com <code>let</code> em um <code>for</code>, cada iteração
            possui seu próprio binding, evitando o clássico
            <code>3, 3, 3</code> causado por <code>var</code>.
          </p>
        </div>


        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>

          <h3>Escopo global</h3>

          <p>
            <code>let</code> no escopo global não cria uma propriedade
            correspondente no <code>window</code>. Em ES Modules,
            nem mesmo <code>var</code> faz isso.
          </p>
        </div>

      </div>


      <p>
        Na próxima aula vamos estudar <code>const</code>:
        o que ela garante, o que significa dizer que uma variável
        é constante e por que <code>const</code> não significa
        necessariamente que um objeto é imutável.
      </p>

    </section>
  `,
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT — compõe todas as seções na ordem definida acima
// ═══════════════════════════════════════════════════════════════════════════════

export function content() {
  return Object.values(_secoes)
    .map((secao) => secao())
    .join("\n")
}

// ═══════════════════════════════════════════════════════════════════════════════
// INIT — injeta os outputs calculados no DOM
// ═══════════════════════════════════════════════════════════════════════════════

export function initLet() {
  const injetar = (id, valor, cls) => {
    const el = document.getElementById(id)

    if (!el) return

    el.textContent = valor

    if (cls) {
      el.className = cls
    }
  }

  const {
    decl,
    bloco,
    bloco_if,
    tdz,
    redecl,
    reatrib,
    lexico,
    loop,
    closure,
    sw,
    global,
  } = _dados

  // ── Seção 1 — declaração ──────────────────────────────────────────────────

  injetar("out-decl", `"${decl.out}"`, "syn-output-str")

  // ── Seção 2 — escopo de bloco ─────────────────────────────────────────────

  injetar("out-bloco-dentro", `"${bloco.dentro}"`, "syn-output-str")

  injetar("out-bloco-fora", bloco.fora, "syn-output-error")

  // ── Seção 3 — let em if ───────────────────────────────────────────────────

  injetar("out-if-dentro", `"${bloco_if.dentro}"`, "syn-output-str")

  injetar("out-if-fora", bloco_if.fora, "syn-output-error")

  // ── Seção 4 — TDZ ─────────────────────────────────────────────────────────

  injetar("out-tdz-var", "undefined", "syn-output-null")

  injetar("out-tdz-erro", tdz.erro, "syn-output-error")

  // ── Seção 5 — redeclaração ────────────────────────────────────────────────

  injetar("out-redecl-erro", redecl.erro, "syn-output-error")

  // ── Seção 6 — reatribuição ────────────────────────────────────────────────

  injetar("out-reatrib-1", `"${reatrib.antes}"`, "syn-output-str")

  injetar("out-reatrib-2", `"${reatrib.depois}"`, "syn-output-str")

  // ── Seção 7 — ambiente léxico / shadowing ─────────────────────────────────

  injetar("out-shadow-dentro", '"interno"', "syn-output-str")

  injetar("out-shadow-fora", '"externo"', "syn-output-str")

  injetar(
    "out-lex-chain",
    `"${lexico.chain1}", ${lexico.chain2}`,
    "syn-output-str",
  )

  // ── Seção 8 — loop ────────────────────────────────────────────────────────
  //
  // Demonstração de var:
  // `var` ignora o bloco do for e continua acessível.
  //
  // Esse var está dentro da função initLet(), portanto ele pertence
  // ao escopo dessa função — não ao window.

  for (var _demo_loop_i = 0; _demo_loop_i < 3; _demo_loop_i++) {
    // intencionalmente vazio
  }

  injetar("out-loop-var", String(_demo_loop_i), "syn-output-num")

  injetar("out-loop-let", loop.fora_erro, "syn-output-error")

  // ── Seção 9 — closure ─────────────────────────────────────────────────────

  injetar("out-closure-var-0", String(closure.com_var[0]), "syn-output-num")

  injetar("out-closure-var-1", String(closure.com_var[1]), "syn-output-num")

  injetar("out-closure-var-2", String(closure.com_var[2]), "syn-output-num")

  injetar("out-closure-let-0", String(closure.com_let[0]), "syn-output-num")

  injetar("out-closure-let-1", String(closure.com_let[1]), "syn-output-num")

  injetar("out-closure-let-2", String(closure.com_let[2]), "syn-output-num")

  // ── Seção 10 — switch ─────────────────────────────────────────────────────

  injetar("out-switch", `"${sw.resultado}"`, "syn-output-str")

  // ── Seção 11 — global / window ────────────────────────────────────────────
  //
  // Como este arquivo é um ES Module, os dois valores abaixo são
  // undefined quando consultados através de window.
  //
  // A demonstração de script clássico está no HTML apenas para explicar
  // a diferença conceitual.

  injetar("out-global-classic-var", '"minha app"', "syn-output-str")

  injetar("out-global-classic-let", "undefined", "syn-output-null")

  injetar("out-global-module-var", String(global.modulo_var), "syn-output-null")

  injetar("out-global-module-let", String(global.modulo_let), "syn-output-null")
}
