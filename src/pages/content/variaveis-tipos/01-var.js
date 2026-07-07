// src/content/fundamentos/01-var.js

// ── Valores usados nos exemplos ──────────────────────────────────────────────

// Seção 1 — declaração básica e undefined
var _decl
const _decl_antes = _decl        // undefined (hoisting)
_decl = "JavaScript"
const _decl_depois = _decl        // "JavaScript"

// Seção 2 — hoisting
const _hoist_antes = _hoist_var   // undefined (declaração içada, valor não)
var _hoist_var = "Ana"
const _hoist_depois = _hoist_var  // "Ana"

// Seção 3 — var sem valor inicial
var _sem_valor
const _sem_valor_out = _sem_valor  // undefined

// Seção 4 — múltiplas declarações na mesma linha
var _ma = 1, _mb = 2, _mc = 3

// Seção 5 — escopo de função
function _escopoFn() {
  var _fn_interno = "só existo aqui"
  return _fn_interno
}
const _fn_dentro = _escopoFn()
var _fn_fora
try { void _fn_interno }
catch (e) { _fn_fora = e.constructor.name + ": _fn_interno is not defined" }

// Seção 6 — escopo de bloco (var ignora blocos)
if (true) { var _bloco_var = "vazei do if!" }
const _bloco_dentro = _bloco_var   // "vazei do if!"
const _bloco_fora = _bloco_var   // "vazei do if!" — mesma variável

// Seção 7 — var em loop vaza pro escopo externo
for (var _loop_i = 0; _loop_i < 3; _loop_i++) { }
const _loop_fora = _loop_i         // 3 — i ainda existe após o loop

// Seção 8 — bug do var em loop com closure (setTimeout)
// O que o setTimeout realmente imprimiria: todos os callbacks leem o _ci final
var _ci
for (_ci = 0; _ci < 3; _ci++) { }
const _closure_real = [_ci, _ci, _ci]   // [3, 3, 3]

// Seção 9 — redeclaração silenciosa
var _redecl = "primeiro"
const _redecl_1 = _redecl
var _redecl = "segundo"
const _redecl_2 = _redecl

// Seção 10 — var no escopo global vira propriedade do window
// (verificação feita dentro do init() onde window existe com certeza)

// Seção 11 — var dentro de try/catch/finally
var _try_var
try {
  _try_var = "declarado no try"
} catch (e) { }
const _try_fora = _try_var         // "declarado no try" — vazou do bloco try

// Seção 12 — typeof em var não declarada não lança erro
const _typeof_nao_declarada = typeof _absolutamenteNaoExiste  // "undefined"
const _typeof_declarada = typeof _decl_depois              // "string"

// Seção 13 — var e arguments dentro de função
function _somaArgs() {
  var total = 0
  for (var i = 0; i < arguments.length; i++) {
    total += arguments[i]
  }
  return total
}
const _args_out = _somaArgs(10, 20, 30)   // 60


// ── Conteúdo HTML ─────────────────────────────────────────────────────────────

export function content() {
  return /* html */ `

    <!-- ── 1. Declaração básica ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Declaração básica</h2>
      <p>
        <code>var</code> é a forma original de declarar variáveis em JavaScript,
        disponível desde 1995. Durante vinte anos foi a única opção —
        <code>let</code> e <code>const</code> só chegaram no ES6 em 2015.
      </p>
      <p>
        Antes de qualquer atribuição, uma variável <code>var</code> já existe
        e vale <code>undefined</code>. Isso acontece por causa do hoisting,
        que vamos ver na próxima seção.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">declaracao.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>)         <span class="syn-comment">// undefined — existe mas sem valor</span>

<span class="syn-keyword">var</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>)         <span class="syn-comment">// "JavaScript"</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">linguagem <span class="syn-comment">// antes</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-decl-antes" class="syn-output-null"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">linguagem <span class="syn-comment">// depois</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-decl-depois" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 2. Hoisting ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Hoisting — a declaração sobe</h2>
      <p>
        Antes de executar qualquer linha, o JavaScript lê o arquivo inteiro e
        içe todas as declarações <code>var</code> para o topo do escopo.
        A declaração sobe. O valor não.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">hoisting.js — o que você escreve</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// undefined — var içada, valor ainda não existe</span>
<span class="syn-keyword">var</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// "Ana"</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nome <span class="syn-comment">// antes da declaração</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-hoist-antes" class="syn-output-null"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nome <span class="syn-comment">// depois da declaração</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-hoist-depois" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">hoisting.js — o que o motor vê</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">nome</span>             <span class="syn-comment">// ← içado aqui, vale undefined</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// undefined</span>
<span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>         <span class="syn-comment">// atribuição fica no lugar original</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// "Ana"</span></code></pre>
      </div>
    </section>


    <!-- ── 3. Ambiente léxico ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Por dentro — o ambiente léxico</h2>

      <p>
        Em JavaScript, uma variável não é uma caixa que guarda valores.
        Ela é um identificador registrado no ambiente léxico, que aponta
        para um endereço de memória.
      </p>
      <p>
        O ambiente léxico é a estrutura interna do JavaScript responsável
        por registrar os identificadores, definir o escopo onde eles existem
        e manter a referência ao valor armazenado na memória.
      </p>

      <p>
        O hoisting não é mágica. Ele é uma consequência de como o motor JavaScript
        executa o código em duas fases distintas.
      </p>
      <p>
        Antes de rodar qualquer linha, o motor faz uma <strong>fase de criação</strong>:
        lê o escopo inteiro, registra todas as declarações <code>var</code> e já
        reserva espaço para elas com o valor <code>undefined</code>. Só depois
        começa a <strong>fase de execução</strong> — onde o código roda linha por linha
        e os valores são atribuídos.
      </p>
      <p>
        A estrutura que guarda essas variáveis é chamada de
        <strong>ambiente léxico</strong> (lexical environment). É um objeto interno
        que o motor cria para cada escopo — global, de função, ou de bloco —
        e que mapeia nomes de variáveis aos seus valores atuais.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">ambiente-lexico.js — duas fases</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ── Fase de criação (antes de rodar qualquer linha) ──────────</span>
<span class="syn-comment">// O motor lê o arquivo e monta o ambiente léxico:</span>
<span class="syn-comment">//   { linguagem: undefined, versao: undefined }</span>

<span class="syn-comment">// ── Fase de execução (linha por linha) ───────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>)   <span class="syn-comment">// undefined — já existe no ambiente</span>

<span class="syn-keyword">var</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>
<span class="syn-comment">// ambiente léxico agora: { linguagem: "JavaScript", versao: undefined }</span>

<span class="syn-keyword">var</span> <span class="syn-id">versao</span> <span class="syn-operator">=</span> <span class="syn-number">2015</span>
<span class="syn-comment">// ambiente léxico agora: { linguagem: "JavaScript", versao: 2015 }</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">linguagem</span>, <span class="syn-id">versao</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">linguagem <span class="syn-comment">// fase de criação: undefined</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-lexenv-antes" class="syn-output-null"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">linguagem, versao <span class="syn-comment">// fase de execução</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-lexenv-depois-1" class="syn-output-str"></span>
              <span id="out-lexenv-depois-2" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Cada função cria seu próprio ambiente léxico quando é chamada. É por isso
        que variáveis declaradas com <code>var</code> dentro de uma função não
        existem fora dela — elas pertencem ao ambiente léxico daquela função,
        não ao ambiente externo.
      </p>
      <p>
        Quando uma função referencia uma variável que não está no seu próprio
        ambiente, o motor sobe pela cadeia de ambientes — do mais interno para
        o mais externo — até encontrar. Essa cadeia é chamada de
        <strong>scope chain</strong>. É também o mecanismo por baixo das closures,
        que vamos ver na seção sobre o bug do loop.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">ambiente-lexico.js — cadeia de escopos</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">idioma</span> <span class="syn-operator">=</span> <span class="syn-string">"pt-BR"</span>   <span class="syn-comment">// ambiente léxico global</span>

<span class="syn-keyword">function</span> <span class="syn-fn">exibir</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">versao</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>        <span class="syn-comment">// ambiente léxico de exibir()</span>

  <span class="syn-keyword">function</span> <span class="syn-fn">detalhe</span>() {
    <span class="syn-comment">// detalhe() não tem versao nem idioma</span>
    <span class="syn-comment">// sobe a cadeia: encontra versao em exibir(), idioma no global</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">idioma</span>, <span class="syn-id">versao</span>)
  }

  <span class="syn-fn">detalhe</span>()
}

<span class="syn-fn">exibir</span>()</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">idioma, versao <span class="syn-comment">// resolvidos pela scope chain</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-lexenv-chain-1" class="syn-output-str"></span>
              <span id="out-lexenv-chain-2" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. var sem valor inicial ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var sem valor inicial</h2>
      <p>
        Declarar um <code>var</code> sem atribuir nada é perfeitamente válido.
        O valor será <code>undefined</code> até que uma atribuição aconteça.
        Isso é diferente de uma variável que não existe — não lança erro.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">sem-valor.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">resultado</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>)   <span class="syn-comment">// undefined — não é erro</span>

<span class="syn-id">resultado</span> <span class="syn-operator">=</span> <span class="syn-number">42</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>)   <span class="syn-comment">// 42</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">resultado <span class="syn-comment">// sem valor inicial</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-sem-valor" class="syn-output-null"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. Múltiplas declarações ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Múltiplas declarações na mesma linha</h2>
      <p>
        <code>var</code> permite declarar várias variáveis de uma vez separando
        por vírgula. Era um estilo muito comum em código ES5 que você vai
        encontrar em projetos legados.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">multiplas.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>, <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>, <span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span>, <span class="syn-id">b</span>, <span class="syn-id">c</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">a, b, c</span>
              <span class="code-console__arrow">→</span>
              <span id="out-multi-a" class="syn-output-num"></span>
              <span id="out-multi-b" class="syn-output-num"></span>
              <span id="out-multi-c" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Escopo de função ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Escopo de função</h2>
      <p>
        <code>var</code> tem escopo de <strong>função</strong>. Ela existe dentro
        da função onde foi declarada e não vaza para fora. Tentar acessá-la fora
        da função lança um <code>ReferenceError</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">escopo-funcao.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">interno</span> <span class="syn-operator">=</span> <span class="syn-string">"só existo aqui"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">interno</span>)
}

<span class="syn-fn">saudar</span>()
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">interno</span>)   <span class="syn-comment">// ReferenceError</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">interno <span class="syn-comment">// dentro da função</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-fn-dentro" class="syn-output-str"></span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">interno <span class="syn-comment">// fora da função</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-fn-fora" class="syn-output-error"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. Escopo de bloco ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var ignora blocos</h2>
      <p>
        Blocos são qualquer coisa entre chaves: <code>if</code>, <code>for</code>,
        <code>while</code>, <code>try</code>. <code>var</code> ignora completamente
        esses blocos e vaza para o escopo da função — ou para o global.
      </p>
      <p>
        Esse é o principal motivo pelo qual <code>var</code> foi substituído.
        É fácil sobrescrever variáveis sem perceber.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">escopo-bloco.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">if</span> (<span class="syn-boolean">true</span>) {
  <span class="syn-keyword">var</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"vazei do if!"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)   <span class="syn-comment">// "vazei do if!"</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)     <span class="syn-comment">// "vazei do if!" — var não respeitou o bloco</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">mensagem <span class="syn-comment">// dentro do if</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-bloco-dentro" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">mensagem <span class="syn-comment">// fora do if</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-bloco-fora" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 7. var em loop vaza ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var em loop vaza pro escopo externo</h2>
      <p>
        O contador de um <code>for</code> declarado com <code>var</code> não
        fica preso dentro do loop — ele existe depois que o loop termina,
        com o valor final da iteração.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">loop-vaza.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {}

<span class="syn-comment">// i ainda existe com o valor final</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>)   <span class="syn-comment">// 3</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">i <span class="syn-comment">// depois do loop</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-loop-fora" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 8. Bug clássico: var em loop com closure ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O bug clássico — var em loop com closure</h2>
      <p>
        Este é um dos bugs mais famosos do JavaScript. Quando você cria uma
        função dentro de um loop com <code>var</code>, todas as funções
        compartilham a <em>mesma</em> variável — não uma cópia do valor
        no momento em que foram criadas.
      </p>
      <p>
        O <code>setTimeout</code> é o exemplo clássico: os três callbacks
        só rodam depois que o loop terminou. Nesse momento <code>i</code>
        já vale <code>3</code> — e todos imprimem <code>3</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">closure-bug.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ⚠️ O que você espera: 0, 1, 2</span>
<span class="syn-comment">// O que você recebe:  3, 3, 3</span>

<span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-number">3</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
  <span class="syn-fn">setTimeout</span>(<span class="syn-keyword">function</span>() {
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">i</span>)   <span class="syn-comment">// todos leem o mesmo i — que vale 3</span>
  }, <span class="syn-number">0</span>)
}</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — o que realmente sai</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">callback #1 → i</span>
              <span class="code-console__arrow">→</span>
              <span id="out-closure-0" class="syn-output-num"></span>
            </div>
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">callback #2 → i</span>
              <span class="code-console__arrow">→</span>
              <span id="out-closure-1" class="syn-output-num"></span>
            </div>
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">callback #3 → i</span>
              <span class="code-console__arrow">→</span>
              <span id="out-closure-2" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Esse bug foi um dos motivadores diretos para a criação do <code>let</code>.
        Com <code>let</code>, cada iteração do loop cria um escopo próprio —
        cada callback captura seu próprio <code>i</code>. Vamos ver isso na
        próxima aula.
      </p>
    </section>


    <!-- ── 9. Redeclaração silenciosa ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Redeclaração silenciosa</h2>
      <p>
        Com <code>var</code>, você pode declarar a mesma variável duas vezes
        no mesmo escopo sem nenhum erro. O JavaScript simplesmente sobrescreve
        o valor. Em arquivos grandes isso é perigoso — o bug não aparece
        até o código rodar.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">redeclaracao.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"primeiro"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">titulo</span>)

<span class="syn-keyword">var</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-string">"segundo"</span>   <span class="syn-comment">// sem erro — var permite redeclarar</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">titulo</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">titulo <span class="syn-comment">// 1ª declaração</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-redecl-1" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">titulo <span class="syn-comment">// 2ª declaração</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-redecl-2" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 10. var no objeto global ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var no escopo global vira propriedade do window</h2>
      <p>
        Quando você declara um <code>var</code> fora de qualquer função, ele
        se torna uma propriedade do objeto global — <code>window</code> no browser.
        Qualquer script na página pode ler ou sobrescrever essa variável.
      </p>
      <p>
        Em projetos com múltiplos arquivos isso vira um problema sério — scripts
        diferentes podem acidentalmente sobrescrever variáveis uns dos outros.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">global.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">var</span> <span class="syn-id">app</span> <span class="syn-operator">=</span> <span class="syn-string">"minha app"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-id">app</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">app</span> <span class="syn-operator">===</span> <span class="syn-id">window</span>.<span class="syn-id">app</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — browser</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">window.app</span>
              <span class="code-console__arrow">→</span>
              <span id="out-global-window" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">app === window.app</span>
              <span class="code-console__arrow">→</span>
              <span id="out-global-igual" class="syn-output-bool"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 11. var em try/catch ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var vaza de try/catch também</h2>
      <p>
        Assim como <code>if</code> e <code>for</code>, os blocos
        <code>try</code>, <code>catch</code> e <code>finally</code> não
        contêm <code>var</code>. Uma variável declarada dentro do
        <code>try</code> existe fora dele.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">try-vaza.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">try</span> {
  <span class="syn-keyword">var</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"declarado no try"</span>
} <span class="syn-keyword">catch</span> (<span class="syn-id">e</span>) {}

<span class="syn-comment">// var vazou do bloco try</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)   <span class="syn-comment">// "declarado no try"</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">mensagem <span class="syn-comment">// fora do try</span></span>
              <span class="code-console__arrow">→</span>
              <span id="out-try-fora" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 12. typeof com var não declarada ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">typeof não lança erro em variáveis não declaradas</h2>
      <p>
        Acessar uma variável que não existe lança um <code>ReferenceError</code>.
        Mas usar <code>typeof</code> em uma variável não declarada é a exceção —
        retorna <code>"undefined"</code> em vez de lançar erro.
      </p>
      <p>
        Isso era comum em código legado para verificar se uma variável global
        existia antes de usá-la.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">typeof-seguro.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// naoExiste nunca foi declarada — mas typeof não lança erro</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">naoExiste</span>)   <span class="syn-comment">// "undefined"</span>

<span class="syn-keyword">var</span> <span class="syn-id">linguagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">linguagem</span>)   <span class="syn-comment">// "string"</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof naoExiste</span>
              <span class="code-console__arrow">→</span>
              <span id="out-typeof-nao" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof linguagem</span>
              <span class="code-console__arrow">→</span>
              <span id="out-typeof-decl" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 13. var e arguments ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">var e o objeto arguments</h2>
      <p>
        Dentro de qualquer função tradicional existe um objeto especial chamado
        <code>arguments</code> — ele contém todos os valores passados na chamada,
        independente de quantos parâmetros foram declarados.
      </p>
      <p>
        Era comum em código ES5 usar <code>var</code> com <code>arguments</code>
        para criar funções que aceitam número variável de argumentos.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">arguments.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">soma</span>() {
  <span class="syn-keyword">var</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>
  <span class="syn-keyword">for</span> (<span class="syn-keyword">var</span> <span class="syn-id">i</span> <span class="syn-operator">=</span> <span class="syn-number">0</span>; <span class="syn-id">i</span> <span class="syn-operator">&lt;</span> <span class="syn-id">arguments</span>.<span class="syn-property">length</span>; <span class="syn-id">i</span><span class="syn-operator">++</span>) {
    <span class="syn-id">total</span> <span class="syn-operator">+=</span> <span class="syn-id">arguments</span>[<span class="syn-id">i</span>]
  }
  <span class="syn-keyword">return</span> <span class="syn-id">total</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">soma</span>(<span class="syn-number">10</span>, <span class="syn-number">20</span>, <span class="syn-number">30</span>))   <span class="syn-comment">// 60</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">soma(10, 20, 30)</span>
              <span class="code-console__arrow">→</span>
              <span id="out-args" class="syn-output-num"></span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Hoje usamos <strong>rest parameters</strong> (<code>...args</code>) no
        lugar de <code>arguments</code> — mais claro, funciona em arrow functions
        e é um array de verdade. Vamos ver isso no módulo de funções.
      </p>
    </section>


    <!-- ── 14. Resumo ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Resumo — tudo que você precisa saber sobre var</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">⬆️</div>
          <h3>Hoisting</h3>
          <p>A declaração é içada para o topo do escopo. Existe antes da linha onde foi escrita — mas vale <code>undefined</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🏠</div>
          <h3>Escopo de função</h3>
          <p>Respeitada dentro de funções. Ignora completamente blocos como <code>if</code>, <code>for</code>, <code>while</code> e <code>try</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>
          <h3>Vaza pro window</h3>
          <p>No escopo global do browser, <code>var</code> vira propriedade do <code>window</code>. Qualquer script na página pode sobrescrevê-la.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚠️</div>
          <h3>Redeclaração silenciosa</h3>
          <p>Permite declarar a mesma variável duas vezes sem erro. Bugs de sobrescrita só aparecem em runtime.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🐛</div>
          <h3>Bug em loop + closure</h3>
          <p>Callbacks dentro de loops compartilham a mesma variável. Quando rodam, o loop já terminou — todos leem o valor final.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔍</div>
          <h3>typeof seguro</h3>
          <p><code>typeof</code> em variável não declarada retorna <code>"undefined"</code> em vez de lançar <code>ReferenceError</code>.</p>
        </div>
      </div>

      <p>
        Na próxima aula vamos ver <code>let</code> e <code>const</code> — e como
        cada um desses problemas foi resolvido no ES6.
      </p>
    </section>

  `;
}


// ── Injeção de outputs via DOM ────────────────────────────────────────────────

// Nenhum resultado é escrito à mão no HTML.
// Todos os valores são calculados no topo do arquivo e injetados aqui.

export function initVar() {
  const injetar = (id, valor) => {
    const el = document.getElementById(id)
    if (el) el.textContent = valor
  }

  // Seção 1 — declaração básica
  injetar('out-decl-antes', String(_decl_antes))           // undefined
  injetar('out-decl-depois', `"${_decl_depois}"`)           // "JavaScript"

  // Seção 2 — hoisting
  injetar('out-hoist-antes', String(_hoist_antes))         // undefined
  injetar('out-hoist-depois', `"${_hoist_depois}"`)         // "Ana"

  // Seção 3 — sem valor inicial
  injetar('out-sem-valor', String(_sem_valor_out))          // undefined

  // Seção 4 — múltiplas declarações
  injetar('out-multi-a', String(_ma))                       // 1
  injetar('out-multi-b', String(_mb))                       // 2
  injetar('out-multi-c', String(_mc))                       // 3

  // Seção 5 — escopo de função
  injetar('out-fn-dentro', `"${_fn_dentro}"`)               // "só existo aqui"
  injetar('out-fn-fora', _fn_fora)                        // ReferenceError: ...

  // Seção 6 — escopo de bloco
  injetar('out-bloco-dentro', `"${_bloco_dentro}"`)         // "vazei do if!"
  injetar('out-bloco-fora', `"${_bloco_fora}"`)           // "vazei do if!"

  // Seção 7 — loop vaza
  injetar('out-loop-fora', String(_loop_fora))              // 3

  // Seção 8 — bug closure
  injetar('out-closure-0', String(_closure_real[0]))        // 3
  injetar('out-closure-1', String(_closure_real[1]))        // 3
  injetar('out-closure-2', String(_closure_real[2]))        // 3

  // Seção 9 — redeclaração
  injetar('out-redecl-1', `"${_redecl_1}"`)                 // "primeiro"
  injetar('out-redecl-2', `"${_redecl_2}"`)                 // "segundo"

  // Seção 10 — var no window (guard: só no browser)
  if (typeof window !== "undefined") {
    var _globalDemo = "minha app"
    injetar('out-global-window', `"${window._globalDemo}"`)
    injetar('out-global-igual', String(_globalDemo === window._globalDemo))
  }

  // Seção 11 — try/catch
  injetar('out-try-fora', `"${_try_fora}"`)                 // "declarado no try"

  // Seção 12 — typeof
  injetar('out-typeof-nao', `"${_typeof_nao_declarada}"`)  // "undefined"
  injetar('out-typeof-decl', `"${_typeof_declarada}"`)      // "string"

  // Seção 13 — arguments
  injetar('out-args', String(_args_out))                    // 60
}