// src/pages/content/fundamentos/01-var.js

// ── Valores usados nos exemplos ──────────────────────────────────────────────

// Seção 1 — declaração básica e undefined
var _decl
const _decl_antes = _decl // undefined
_decl = "JavaScript"
const _decl_depois = _decl // "JavaScript"

// Seção 2 — hoisting
const _hoist_antes = _hoist_var // undefined
var _hoist_var = "Ana"
const _hoist_depois = _hoist_var // "Ana"

// Seção 3 — var sem valor inicial
var _sem_valor
const _sem_valor_out = _sem_valor // undefined

// Seção 4 — múltiplas declarações na mesma linha
var _ma = 1,
  _mb = 2,
  _mc = 3

// Seção 5 — escopo de função
function _escopoFn() {
  var _fn_interno = "só existo aqui"
  return _fn_interno
}

const _fn_dentro = _escopoFn()

var _fn_fora

try {
  void _fn_interno
} catch (e) {
  _fn_fora = `${e.constructor.name}: _fn_interno is not defined`
}

// Seção 6 — escopo de bloco (var não possui escopo de bloco)
if (true) {
  var _bloco_var = "vazei do if!"
}

const _bloco_dentro = _bloco_var
const _bloco_fora = _bloco_var

// Seção 7 — var em loop vaza pro escopo externo
for (var _loop_i = 0; _loop_i < 3; _loop_i++) {}

const _loop_fora = _loop_i // 3

// Seção 8 — bug do var em loop com closure
//
// Esta demonstração precisa envolver funções que realmente capturam o
// binding de `_ci` — não apenas ler o valor de `_ci` três vezes depois
// do loop (isso não seria closure, só leitura tardia de uma variável).
//
// Por isso, criamos três callbacks DENTRO do loop e só os executamos
// DEPOIS que ele termina. Como var não cria um binding novo a cada
// iteração, os três callbacks compartilham o mesmo `_ci`. Quando são
// finalmente executados, `_ci` já vale 3 para todos eles.

var _closureCallbacks = []

for (var _ci = 0; _ci < 3; _ci++) {
  _closureCallbacks.push(function () {
    return _ci
  })
}

const _closure_real = _closureCallbacks.map((callback) => callback()) // [3, 3, 3]

// Seção 9 — redeclaração silenciosa
var _redecl = "primeiro"
const _redecl_1 = _redecl

var _redecl = "segundo"
const _redecl_2 = _redecl

// Seção 10 — var em ES Module NÃO vira propriedade de window
//
// Este arquivo usa `export`, portanto é um ES Module.
// Em módulos, declarações `var` ficam no escopo do módulo.
//
// A demonstração clássica `var global = ...` → `window.global`
// só se aplica a scripts clássicos executados no navegador.

// Seção 11 — var dentro de try/catch/finally

try {
  var _try_var = "declarado no try"
} catch (e) {}

const _try_fora = _try_var

// Seção 12 — typeof em identificador não declarado
const _typeof_nao_declarada = typeof _absolutamenteNaoExiste // "undefined"

const _typeof_declarada = typeof _decl_depois // "string"

// Seção 13 — var e arguments dentro de função
function _somaArgs() {
  var total = 0

  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i]
  }

  return total
}

const _args_out = _somaArgs(10, 20, 30) // 60

// ── Conteúdo HTML ─────────────────────────────────────────────────────────────

export function content() {
  return /* html */ `

<!-- ── 1. Declaração básica ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Declaração básica</h2>

  <p>
    <code>var</code> é a forma original de declarar variáveis em JavaScript,
    disponível desde 1995. Durante muitos anos foi a principal forma de
    declaração — <code>let</code> e <code>const</code> só chegaram com o ES6,
    em 2015.
  </p>

  <p>
    Uma variável declarada com <code>var</code> é criada e inicializada com
    <code>undefined</code> antes da execução da atribuição. Isso está
    relacionado ao mecanismo conhecido como <strong>hoisting</strong>,
    que veremos na próxima seção.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">declaracao.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">linguagem</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>) <span class="syn-comment">// undefined</span>

<span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>) <span class="syn-comment">// "JavaScript"</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>linguagem</code>
      <span id="out-decl-antes">→</span>
    </div>

    <div class="lesson__output-row">
      <code>linguagem</code>
      <span id="out-decl-depois">→</span>
    </div>
  </div>
</section>


<!-- ── 2. Hoisting ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Hoisting — a declaração é inicializada antes da execução</h2>

  <p>
    Hoisting é o comportamento pelo qual determinadas declarações ficam
    disponíveis durante a inicialização do contexto antes da execução
    normal das instruções.
  </p>

  <p>
    No caso de <code>var</code>, o binding é criado e inicializado com
    <code>undefined</code>. A atribuição do valor continua acontecendo
    na posição original do código.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">hoisting.js — o que você escreve</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>) <span class="syn-comment">// undefined</span>

<span class="syn-keyword">var</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>) <span class="syn-comment">// "Ana"</span></code></pre>
  </div>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">hoisting.js — modelo didático</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">nome</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>) <span class="syn-comment">// undefined</span>

<span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>) <span class="syn-comment">// "Ana"</span></code></pre>
  </div>

  <p>
    Esse "modelo didático" é só uma forma de visualizar o comportamento —
    o JavaScript não move literalmente as linhas do código para cima.
    Na prática, o binding de <code>var</code> é criado durante a
    instanciação do contexto de execução, já inicializado com
    <code>undefined</code>; a atribuição continua ocorrendo na posição
    original, durante a execução normal das instruções.
  </p>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>nome</code>
      <span id="out-hoist-antes">→</span>
    </div>

    <div class="lesson__output-row">
      <code>nome</code>
      <span id="out-hoist-depois">→</span>
    </div>
  </div>
</section>


<!-- ── 3. Ambiente léxico ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Por dentro — o ambiente léxico</h2>

  <p>
    Em JavaScript, um identificador não deve ser entendido simplesmente
    como uma "caixa" que contém um valor. O mecanismo de execução mantém
    <strong>bindings</strong> que associam nomes a valores dentro de
    determinados ambientes.
  </p>

  <p>
    O <strong>Lexical Environment</strong> é uma estrutura interna definida
    pela especificação ECMAScript para representar um ambiente de resolução
    de identificadores. Ele possui um <strong>Environment Record</strong>,
    responsável por registrar os bindings, e uma referência ao ambiente
    externo.
  </p>

  <p>
    O comportamento de <code>var</code> durante o hoisting está relacionado
    à forma como esses bindings são criados e inicializados antes da execução
    das instruções.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">ambiente-lexico.js — modelo conceitual</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-1.1 2-1h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Modelo conceitual:</span>
<span class="syn-comment">// o binding de "linguagem" já existe e vale undefined</span>

<span class="syn-keyword">var</span> <span class="syn-id">linguagem</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>) <span class="syn-comment">// undefined</span>

<span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>) <span class="syn-comment">// "JavaScript"</span></code></pre>
  </div>

  <p>
    Cada função possui seu próprio ambiente de execução. Por isso,
    uma variável declarada com <code>var</code> dentro de uma função
    pertence ao escopo dessa função.
  </p>

  <p>
    Quando uma função tenta resolver um identificador que não está no
    ambiente atual, a resolução continua pelos ambientes externos.
    Essa sequência de ambientes forma a <strong>scope chain</strong>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">ambiente-lexico.js — scope chain</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-1.1 2-1h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">idioma</span> <span class="syn-operator">=</span> <span class="syn-string">"pt-BR"</span>

<span class="syn-keyword">function</span> <span class="syn-fn">exibir</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">versao</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>

  <span class="syn-keyword">function</span> <span class="syn-fn">detalhe</span>() {
    <span class="syn-comment">// detalhe() não possui idioma nem versao</span>
    <span class="syn-comment">// A resolução sobe pela scope chain.</span>

    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">idioma</span>, <span class="syn-id">versao</span>)
  }

  <span class="syn-fn">detalhe</span>()
}

<span class="syn-fn">exibir</span>()</code></pre>
  </div>
</section>


<!-- ── 4. var sem valor inicial ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var sem valor inicial</h2>

  <p>
    Declarar uma variável com <code>var</code> sem atribuir um valor
    é perfeitamente válido. Seu valor inicial será <code>undefined</code>
    até que uma atribuição aconteça.
  </p>

  <p>
    Isso é diferente de um identificador que nunca foi declarado.
    Acessar diretamente um identificador inexistente normalmente produz
    um <code>ReferenceError</code>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">sem-valor.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">resultado</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>) <span class="syn-comment">// undefined</span>

<span class="syn-id">resultado</span> <span class="syn-operator">=</span> <span class="syn-number">42</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>) <span class="syn-comment">// 42</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>resultado</code>
      <span id="out-sem-valor">→</span>
    </div>
  </div>
</section>


<!-- ── 5. Múltiplas declarações ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Múltiplas declarações na mesma linha</h2>

  <p>
    <code>var</code> permite declarar várias variáveis na mesma instrução,
    separando cada declaração por vírgula. Esse padrão era bastante comum
    em código ES5 e ainda pode aparecer em projetos legados.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">multiplas.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>,
    <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>,
    <span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span>, <span class="syn-id">b</span>, <span class="syn-id">c</span>)</code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>a, b, c</code>
      <span>
        <span id="out-multi-a">→</span>,
        <span id="out-multi-b">→</span>,
        <span id="out-multi-c">→</span>
      </span>
    </div>
  </div>
</section>


<!-- ── 6. Escopo de função ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Escopo de função</h2>

  <p>
    <code>var</code> possui <strong>escopo de função</strong>. Quando
    declarada dentro de uma função, a variável pertence ao ambiente
    daquela função e não pode ser acessada diretamente fora dela.
  </p>

  <p>
    Tentar acessar um identificador que não existe no escopo atual
    nem em seus ambientes externos produz um <code>ReferenceError</code>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">escopo-funcao.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">interno</span> <span class="syn-operator">=</span> <span class="syn-string">"só existo aqui"</span>

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">interno</span>)
}

<span class="syn-fn">saudar</span>()

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">interno</span>)
<span class="syn-comment">// ReferenceError</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>interno</code>
      <span id="out-fn-dentro">→</span>
    </div>

    <div class="lesson__output-row">
      <code>interno</code>
      <span id="out-fn-fora">→</span>
    </div>
  </div>
</section>


<!-- ── 7. Escopo de bloco ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var não possui escopo de bloco</h2>

  <p>
    Um bloco é delimitado por chaves <code>{ }</code> e aparece em estruturas
    como <code>if</code>, <code>for</code>, <code>while</code>,
    <code>try</code> e outras.
  </p>

  <p>
    <code>var</code> não possui escopo de bloco. Quando declarada dentro
    de um bloco, seu binding pertence ao escopo da função mais próxima
    ou ao escopo global/script quando não existe uma função envolvendo
    a declaração.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">escopo-bloco.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-1.1 2-1h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">if</span> (<span class="syn-boolean">true</span>) {
  <span class="syn-keyword">var</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"vazei do if!"</span>

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)
<span class="syn-comment">// "vazei do if!"</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>mensagem</code>
      <span id="out-bloco-dentro">→</span>
    </div>

    <div class="lesson__output-row">
      <code>mensagem</code>
      <span id="out-bloco-fora">→</span>
    </div>
  </div>
</section>


<!-- ── 8. var em loop ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var em loop permanece acessível fora do bloco</h2>

  <p>
    Quando o contador de um <code>for</code> é declarado com
    <code>var</code>, ele não fica limitado ao corpo do loop.
    Depois que a iteração termina, o identificador continua acessível.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">loop-vaza.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1 0-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>) <span class="syn-comment">// 3</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>i</code>
      <span id="out-loop-fora">→</span>
    </div>
  </div>
</section>


<!-- ── 9. Closure ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">O bug clássico — var em loop com closure</h2>

  <p>
    Este é um dos exemplos históricos mais conhecidos envolvendo
    <code>var</code>. Quando funções são criadas dentro de um loop,
    elas podem manter acesso ao mesmo binding de uma variável declarada
    com <code>var</code>.
  </p>

  <p>
    Com <code>setTimeout</code>, os callbacks são executados posteriormente.
    Quando eles executam, o loop já terminou e o mesmo <code>i</code>
    compartilhado possui o valor <code>3</code>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">closure-bug.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Resultado: 3, 3, 3</span>

<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(<span class="syn-keyword">function</span>() {
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>)
  }, <span class="syn-number">0</span>)
}</code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console — resultado real</span>
    </div>

    <div class="lesson__output-row">
      <code>callback #1 → i</code>
      <span id="out-closure-0">→</span>
    </div>

    <div class="lesson__output-row">
      <code>callback #2 → i</code>
      <span id="out-closure-1">→</span>
    </div>

    <div class="lesson__output-row">
      <code>callback #3 → i</code>
      <span id="out-closure-2">→</span>
    </div>
  </div>

  <p>
    Esse comportamento ajudou a popularizar padrões usados antes do ES6,
    como IIFEs e criação manual de closures para capturar valores.
    Com <code>let</code>, cada iteração de um loop pode possuir seu próprio
    binding, tornando esse padrão muito mais simples.
  </p>
</section>


<!-- ── 10. Redeclaração ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">Redeclaração silenciosa</h2>

  <p>
    <code>var</code> permite declarar novamente o mesmo identificador
    dentro do mesmo escopo. Isso não produz um erro de sintaxe.
  </p>

  <p>
    A segunda atribuição modifica o valor associado ao mesmo binding.
    Em código grande ou legado, isso pode facilitar sobrescritas acidentais.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">redeclaracao.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">titulo</span>)

<span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">titulo</span>)</code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>titulo</code>
      <span id="out-redecl-1">→</span>
    </div>

    <div class="lesson__output-row">
      <code>titulo</code>
      <span id="out-redecl-2">→</span>
    </div>
  </div>
</section>


<!-- ── 11. var e window ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var no script clássico e o objeto window</h2>

  <p>
    Em um <strong>script clássico</strong> executado diretamente no navegador,
    uma declaração global com <code>var</code> cria uma propriedade
    correspondente no objeto global, que no navegador é representado por
    <code>window</code>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">script-classico.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">app</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">app</span>)
<span class="syn-comment">// "minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">app</span> <span class="syn-operator">===</span> <span class="syn-id">window</span>.<span class="syn-id">app</span>)
<span class="syn-comment">// true</span></code></pre>
  </div>

  <div class="lesson__note">
    <strong>Importante:</strong>

    <p>
      Esta regra vale para <strong>scripts clássicos</strong>.
      Este arquivo de documentação usa <code>export</code>, portanto
      ele é um <strong>ES Module</strong>. Em módulos, uma declaração
      <code>var</code> não cria automaticamente uma propriedade em
      <code>window</code>.
    </p>
  </div>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">module.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Em um ES Module</span>

<span class="syn-keyword">var</span> <span class="syn-id">app</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">app</span>)
<span class="syn-comment">// undefined</span></code></pre>
  </div>
</section>


<!-- ── 12. try/catch ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var não possui escopo de bloco em try/catch</h2>

  <p>
    Assim como acontece com <code>if</code> e <code>for</code>, os blocos
    <code>try</code>, <code>catch</code> e <code>finally</code> não criam
    um escopo de bloco para uma variável declarada com <code>var</code>.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">try-vaza.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">try</span> {
  <span class="syn-keyword">var</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"declarado no try"</span>
} <span class="syn-keyword">catch</span> (e) {}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)
<span class="syn-comment">// "declarado no try"</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>mensagem</code>
      <span id="out-try-fora">→</span>
    </div>
  </div>
</section>


<!-- ── 13. typeof ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">typeof e identificadores não declarados</h2>

  <p>
    Acessar diretamente um identificador que não existe normalmente produz
    um <code>ReferenceError</code>.
  </p>

  <p>
    Porém, o operador <code>typeof</code> possui um comportamento especial:
    quando recebe um identificador não resolvido, retorna
    <code>"undefined"</code> em vez de lançar o erro.
  </p>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">typeof-seguro.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">naoExiste</span>)
<span class="syn-comment">// "undefined"</span>

<span class="syn-keyword">var</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">linguagem</span>)
<span class="syn-comment">// "string"</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>typeof naoExiste</code>
      <span id="out-typeof-nao">→</span>
    </div>

    <div class="lesson__output-row">
      <code>typeof linguagem</code>
      <span id="out-typeof-decl">→</span>
    </div>
  </div>

  <div class="lesson__note">
    <strong>Não confunda:</strong>

    <p>
      <code>var x</code> cria um binding cujo valor inicial é
      <code>undefined</code>. Já <code>naoExiste</code> não possui
      um binding. O resultado de <code>typeof</code> é igual nos dois
      casos, mas a situação interna é diferente.
    </p>
  </div>
</section>


<!-- ── 14. arguments ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">var e o objeto arguments</h2>

  <p>
    Dentro de funções tradicionais existe um objeto especial chamado
    <code>arguments</code>. Ele contém os argumentos fornecidos na chamada
    da função, mesmo quando nenhum parâmetro formal foi declarado.
  </p>

  <p>
    <code>arguments</code> é um objeto <strong>array-like</strong>, mas não
    é uma instância de <code>Array</code>.
  </p>

  <div class="lesson__callout">
    <span class="lesson__callout-icon">⚠️</span>

    <p>
      <strong>Não é uma característica de var:</strong>
      <code>arguments</code> está disponível em qualquer função
      tradicional, independentemente de você usar <code>var</code>,
      <code>let</code> ou <code>const</code> dentro dela. Ele aparece
      nesta aula porque, historicamente, era muito comum utilizá-lo em
      conjunto com <code>var</code>, antes de rest parameters existirem.
    </p>
  </div>

  <div class="code-block">
    <div class="code-block__header">
      <span class="code-block__filename">arguments.js</span>

      <button class="code-block__copy" type="button">
        <span class="code-block__copy-icon">
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <rect width="14" height="14" x="8" y="8" rx="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
          </svg>
        </span>

        <span class="code-block__copy-label">Copiar</span>
      </button>
    </div>

    <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">soma</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>

  <span class="syn-keyword">for</span> (
    <span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>;
    <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-id">arguments</span>.<span class="syn-id">length</span>;
    <span class="syn-id">i</span><span class="syn-operator">++</span>
  ) {
    <span class="syn-id">total</span> <span class="syn-operator">+=</span> <span class="syn-id">arguments</span>[<span class="syn-id">i</span>]
  }

  <span class="syn-keyword">return</span> <span class="syn-id">total</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">soma</span>(<span class="syn-number">10</span>, <span class="syn-number">20</span>, <span class="syn-number">30</span>))
<span class="syn-comment">// 60</span></code></pre>
  </div>

  <div class="lesson__output">
    <div class="lesson__output-header">
      <span>Console</span>
    </div>

    <div class="lesson__output-row">
      <code>soma(10, 20, 30)</code>
      <span id="out-args">→</span>
    </div>
  </div>

  <p>
    Em código moderno, é comum utilizar <strong>rest parameters</strong>,
    como <code>...args</code>, para esse tipo de função. Eles produzem
    um Array real e também funcionam em arrow functions.
  </p>
</section>


<!-- ── 15. Resumo ── -->
<section class="lesson__section">
  <h2 class="lesson__section-title">
    Resumo — tudo que você precisa saber sobre var
  </h2>

  <div class="lesson__cards">

    <div class="lesson__card">
      <div class="lesson__card-icon">⬆️</div>

      <h3>Hoisting</h3>

      <p>
        O binding de <code>var</code> é criado e inicializado com
        <code>undefined</code> antes da execução da atribuição.
      </p>
    </div>


    <div class="lesson__card">
      <div class="lesson__card-icon">🏠</div>

      <h3>Escopo de função</h3>

      <p>
        <code>var</code> possui escopo de função. Não possui escopo de bloco.
      </p>
    </div>


    <div class="lesson__card">
      <div class="lesson__card-icon">🧱</div>

      <h3>Ignora blocos</h3>

      <p>
        Blocos como <code>if</code>, <code>for</code> e <code>try</code>
        não criam um escopo de bloco para <code>var</code>.
      </p>
    </div>


    <div class="lesson__card">
      <div class="lesson__card-icon">🔁</div>

      <h3>Redeclaração</h3>

      <p>
        Permite redeclarar o mesmo identificador no mesmo escopo sem
        produzir erro de sintaxe.
      </p>
    </div>


    <div class="lesson__card">
      <div class="lesson__card-icon">🐛</div>

      <h3>Loop + closure</h3>

      <p>
        Callbacks podem compartilhar o mesmo binding criado por
        <code>var</code>, fazendo todos observarem o valor final.
      </p>
    </div>


    <div class="lesson__card">
      <div class="lesson__card-icon">🔍</div>

      <h3>typeof</h3>

      <p>
        <code>typeof</code> aplicado a um identificador não resolvido
        retorna <code>"undefined"</code> em vez de lançar
        <code>ReferenceError</code>.
      </p>
    </div>

  </div>

  <p>
    No próximo conteúdo veremos <code>let</code> e <code>const</code>,
    incluindo escopo de bloco, TDZ, redeclaração e o comportamento
    de <code>let</code> em loops.
  </p>
</section>

`
}

// ── Injeção de outputs via DOM ────────────────────────────────────────────────

export function initVar() {
  const injetar = (id, valor) => {
    const el = document.getElementById(id)

    if (el) {
      el.textContent = valor
    }
  }

  // ── Seção 1 — declaração básica ───────────────────────────────────────────

  injetar("out-decl-antes", String(_decl_antes))

  injetar("out-decl-depois", `"${_decl_depois}"`)

  // ── Seção 2 — hoisting ────────────────────────────────────────────────────

  injetar("out-hoist-antes", String(_hoist_antes))

  injetar("out-hoist-depois", `"${_hoist_depois}"`)

  // ── Seção 3 — sem valor inicial ───────────────────────────────────────────

  injetar("out-sem-valor", String(_sem_valor_out))

  // ── Seção 4 — múltiplas declarações ───────────────────────────────────────

  injetar("out-multi-a", String(_ma))

  injetar("out-multi-b", String(_mb))

  injetar("out-multi-c", String(_mc))

  // ── Seção 5 — escopo de função ────────────────────────────────────────────

  injetar("out-fn-dentro", `"${_fn_dentro}"`)

  injetar("out-fn-fora", _fn_fora)

  // ── Seção 6 — escopo de bloco ─────────────────────────────────────────────

  injetar("out-bloco-dentro", `"${_bloco_dentro}"`)

  injetar("out-bloco-fora", `"${_bloco_fora}"`)

  // ── Seção 7 — loop ────────────────────────────────────────────────────────

  injetar("out-loop-fora", String(_loop_fora))

  // ── Seção 8 — closure ─────────────────────────────────────────────────────

  injetar("out-closure-0", String(_closure_real[0]))

  injetar("out-closure-1", String(_closure_real[1]))

  injetar("out-closure-2", String(_closure_real[2]))

  // ── Seção 9 — redeclaração ────────────────────────────────────────────────

  injetar("out-redecl-1", `"${_redecl_1}"`)

  injetar("out-redecl-2", `"${_redecl_2}"`)

  // ── Seção 10 — ES Module vs window ────────────────────────────────────────
  //
  // Este arquivo é um ES Module.
  // Portanto, uma variável `var` declarada aqui NÃO vira propriedade
  // automática de `window`.

  if (typeof window !== "undefined") {
    var _moduleDemo = "minha app"

    injetar("out-global-window", String(window._moduleDemo))

    injetar("out-global-igual", String(_moduleDemo === window._moduleDemo))
  }

  // ── Seção 11 — try/catch ──────────────────────────────────────────────────

  injetar("out-try-fora", `"${_try_fora}"`)

  // ── Seção 12 — typeof ─────────────────────────────────────────────────────

  injetar("out-typeof-nao", `"${_typeof_nao_declarada}"`)

  injetar("out-typeof-decl", `"${_typeof_declarada}"`)

  // ── Seção 13 — arguments ──────────────────────────────────────────────────

  injetar("out-args", String(_args_out))
}
