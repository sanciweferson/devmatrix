// src/content/fundamentos/09-variable-environment.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é o Variable Environment ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é o Variable Environment?</h2>
      <p>
        O <strong>Variable Environment</strong> é a parte do Execution Context
        responsável por armazenar as declarações de <code>var</code> e funções
        durante a fase de criação — antes de qualquer linha ser executada.
      </p>
      <p>
        Ele é separado do Lexical Environment por uma razão histórica:
        <code>var</code> tem regras de hoisting diferentes de
        <code>let</code> e <code>const</code>. O Variable Environment
        foi projetado para o comportamento antigo do JavaScript, enquanto
        o Lexical Environment lida com o comportamento moderno.
      </p>
      <p>
        Na prática, em código moderno eles se sobrepõem — mas entender a
        distinção explica por que <code>var</code> se comporta de forma
        tão diferente.
      </p>
    </section>


    <!-- ── 2. Como var é tratado ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Como var é registrado na fase de criação</h2>
      <p>
        Durante a fase de criação do Execution Context, o motor varre o código
        inteiro à procura de declarações <code>var</code>. Cada uma encontrada
        é registrada no Variable Environment com valor
        <code>undefined</code> — independente de onde está no arquivo.
      </p>
      <p>
        É por isso que acessar um <code>var</code> antes da linha de declaração
        não lança erro — a variável já existe, só ainda não tem o valor certo.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">var-hoisting.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// O que você escreve:</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">produto</span>)   <span class="syn-comment">// undefined</span>
<span class="syn-keyword">var</span> <span class="syn-id">produto</span> <span class="syn-operator">=</span> <span class="syn-string">"notebook"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">produto</span>)   <span class="syn-comment">// "notebook"</span>

<span class="syn-comment">// Como o motor enxerga após a fase de criação:</span>
<span class="syn-keyword">var</span> <span class="syn-id">produto</span>            <span class="syn-comment">// ← içado para o topo com undefined</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">produto</span>)   <span class="syn-comment">// undefined</span>
<span class="syn-id">produto</span> <span class="syn-operator">=</span> <span class="syn-string">"notebook"</span>   <span class="syn-comment">// ← só a atribuição fica no lugar</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">produto</span>)   <span class="syn-comment">// "notebook"</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(produto) — antes</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undef">undefined</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(produto) — depois</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"notebook"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 3. Function declarations ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Function declarations são içadas por completo</h2>
      <p>
        Diferente do <code>var</code>, que é içado apenas com
        <code>undefined</code>, uma <strong>function declaration</strong>
        é içada por completo — nome e corpo. O motor registra a função
        inteira no Variable Environment durante a fase de criação.
      </p>
      <p>
        É por isso que você pode chamar uma function declaration antes de
        ela aparecer no código — ela já está disponível desde o início
        da execução.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">function-hoisting.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Chamada ANTES da declaração — funciona</span>
<span class="syn-keyword">const</span> <span class="syn-id">resultado</span> <span class="syn-operator">=</span> <span class="syn-fn">somar</span>(<span class="syn-number">10</span>, <span class="syn-number">20</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>)

<span class="syn-keyword">function</span> <span class="syn-fn">somar</span>(<span class="syn-id">a</span>, <span class="syn-id">b</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">a</span> <span class="syn-operator">+</span> <span class="syn-id">b</span>
}

<span class="syn-comment">// Function expression NÃO é içada por completo</span>
<span class="syn-comment">// A variável é içada com undefined — não a função</span>
<span class="syn-keyword">const</span> <span class="syn-id">resultado2</span> <span class="syn-operator">=</span> <span class="syn-fn">multiplicar</span>(<span class="syn-number">10</span>, <span class="syn-number">20</span>)  <span class="syn-comment">// ✖ TypeError</span>

<span class="syn-keyword">const</span> <span class="syn-id">multiplicar</span> <span class="syn-operator">=</span> (<span class="syn-id">a</span>, <span class="syn-id">b</span>) <span class="syn-operator">=></span> <span class="syn-id">a</span> <span class="syn-operator">*</span> <span class="syn-id">b</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">somar(10, 20)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">30</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">multiplicar(10, 20)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: Cannot access 'multiplicar' before initialization</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. let e const na Temporal Dead Zone ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">let e const — a Temporal Dead Zone</h2>
      <p>
        <code>let</code> e <code>const</code> também são içados — o motor os
        registra durante a fase de criação. Mas diferente do <code>var</code>,
        eles não são inicializados com <code>undefined</code>. Ficam em um
        estado especial chamado <strong>Temporal Dead Zone (TDZ)</strong> até
        a linha de declaração ser executada.
      </p>
      <p>
        Qualquer tentativa de acessá-los durante a TDZ lança um
        <code>ReferenceError</code>. Isso é intencional — é o comportamento
        correto e previsível que o <code>var</code> deveria ter tido desde
        o início.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">tdz.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// TDZ começa aqui para desconto e taxa</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">desconto</span>)  <span class="syn-comment">// ReferenceError — ainda na TDZ</span>

<span class="syn-keyword">const</span> <span class="syn-id">desconto</span> <span class="syn-operator">=</span> <span class="syn-number">0.15</span>   <span class="syn-comment">// TDZ termina aqui para desconto</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">desconto</span>)  <span class="syn-comment">// 0.15 — agora esta disponivel</span>

<span class="syn-keyword">let</span> <span class="syn-id">taxa</span> <span class="syn-operator">=</span> <span class="syn-number">0.1</span>          <span class="syn-comment">// TDZ termina aqui para taxa</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">taxa</span>)      <span class="syn-comment">// 0.1</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(desconto) — na TDZ</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: Cannot access 'desconto' before initialization</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(desconto) — após declaração</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">0.15</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(taxa)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">0.1</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Comparativo completo ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comparativo — var, let e const</h2>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">comparativo.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var: içado com undefined, escopo de função, reatribuível</span>
<span class="syn-keyword">var</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>
<span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>          <span class="syn-comment">// ✓ reatribuível</span>
<span class="syn-keyword">var</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>      <span class="syn-comment">// ✓ redeclarável</span>

<span class="syn-comment">// let: TDZ, escopo de bloco, reatribuível</span>
<span class="syn-keyword">let</span> <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>
<span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>          <span class="syn-comment">// ✓ reatribuível</span>
<span class="syn-keyword">let</span> <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>      <span class="syn-comment">// ✖ SyntaxError: já declarada</span>

<span class="syn-comment">// const: TDZ, escopo de bloco, não reatribuível</span>
<span class="syn-keyword">const</span> <span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>
<span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>          <span class="syn-comment">// ✖ TypeError: assignment to constant variable</span>
<span class="syn-keyword">const</span> <span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-number">3</span>    <span class="syn-comment">// ✖ SyntaxError: já declarada</span>

<span class="syn-comment">// const com objeto — a referência é constante, o conteúdo não</span>
<span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span> }
<span class="syn-id">user</span>.<span class="syn-property">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Carlos"</span>   <span class="syn-comment">// ✓ modifica o objeto</span>
<span class="syn-id">user</span> <span class="syn-operator">=</span> {}               <span class="syn-comment">// ✖ TypeError — não pode reatribuir a variável</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">let b = 3 — redeclaração</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">SyntaxError: Identifier 'b' has already been declared</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">c = 2</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: Assignment to constant variable</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">user.nome = "Carlos"</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Carlos"</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">user = {}</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: Assignment to constant variable</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Você agora entende como o Variable Environment funciona, o que é
        a Temporal Dead Zone, e por que <code>var</code>, <code>let</code>
        e <code>const</code> se comportam de formas tão diferentes. Na
        próxima aula vamos ver como usar módulos externos no JavaScript —
        como importar bibliotecas e organizar código em múltiplos arquivos.
      </p>
    </section>

  `;
}