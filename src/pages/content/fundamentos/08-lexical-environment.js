// src/content/fundamentos/08-lexical-environment.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é o Lexical Environment ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é o Lexical Environment?</h2>
      <p>
        O <strong>Lexical Environment</strong> é a estrutura interna que o motor
        JavaScript usa para rastrear quais variáveis existem e onde elas estão.
        Cada Execution Context tem o seu — e eles se encadeiam formando uma
        cadeia de escopos.
      </p>
      <p>
        "Lexical" vem de léxico — onde o código está escrito. O escopo de uma
        variável é determinado por <em>onde ela foi declarada no código fonte</em>,
        não por onde a função é chamada. Essa é a regra fundamental do JavaScript.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">lexical.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">const</span> <span class="syn-id">ambiente</span> <span class="syn-operator">=</span> <span class="syn-string">"produção"</span>   <span class="syn-comment">// escopo global</span>

<span class="syn-keyword">function</span> <span class="syn-fn">configurar</span>() {
  <span class="syn-comment">// configurar() enxerga "ambiente" do escopo externo</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">ambiente</span>)
}

<span class="syn-keyword">function</span> <span class="syn-fn">executar</span>() {
  <span class="syn-keyword">const</span> <span class="syn-id">ambiente</span> <span class="syn-operator">=</span> <span class="syn-string">"desenvolvimento"</span>   <span class="syn-comment">// escopo local</span>
  <span class="syn-fn">configurar</span>()   <span class="syn-comment">// chamada de dentro de executar()</span>
}

<span class="syn-fn">executar</span>()</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">executar()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"produção"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Mesmo sendo chamada de dentro de <code>executar()</code> — onde existe
        um <code>ambiente</code> local — a função <code>configurar()</code>
        enxerga o <code>ambiente</code> do escopo onde <em>foi declarada</em>:
        o global. Isso é escopo léxico em ação.
      </p>
    </section>


    <!-- ── 2. Estrutura interna ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Estrutura interna do Lexical Environment</h2>
      <p>
        Internamente, cada Lexical Environment tem dois componentes:
        um <strong>Environment Record</strong> — onde as variáveis do escopo
        atual ficam armazenadas — e uma referência ao
        <strong>outer environment</strong> — o Lexical Environment do escopo
        externo.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">estrutura-interna.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">const</span> <span class="syn-id">loja</span> <span class="syn-operator">=</span> <span class="syn-string">"Scriptorium"</span>

<span class="syn-keyword">function</span> <span class="syn-fn">exibirProduto</span>(<span class="syn-id">nome</span>) {
  <span class="syn-keyword">const</span> <span class="syn-id">preco</span> <span class="syn-operator">=</span> <span class="syn-number">99.90</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">\`[\${<span class="syn-id">loja</span>}] \${<span class="syn-id">nome</span>}: R$ \${<span class="syn-id">preco</span>}\`</span>)
}

<span class="syn-fn">exibirProduto</span>(<span class="syn-string">"Notebook"</span>)

<span class="syn-comment">/*
  Lexical Environment de exibirProduto():
  {
    environmentRecord: {
      nome:  "Notebook",   // parametro
      preco: 99.90         // variavel local
    },
    outer: {               // aponta para o escopo global
      environmentRecord: {
        loja: "Scriptorium",
        exibirProduto: function
      },
      outer: null          // o global nao tem escopo externo
    }
  }
*/</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">exibirProduto("Notebook")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"[Scriptorium] Notebook: R$ 99.90"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 3. A Scope Chain ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">A Scope Chain — cadeia de escopos</h2>
      <p>
        Quando o motor precisa resolver um nome de variável, ele começa pelo
        Environment Record do contexto atual. Se não encontrar, sobe para o
        <code>outer</code> — o escopo externo. E assim por diante, até chegar
        ao escopo global. Se não encontrar em nenhum nível, lança
        <code>ReferenceError</code>.
      </p>
      <p>
        Essa cadeia de referências é chamada de <strong>Scope Chain</strong>.
        A busca sempre vai de dentro para fora — nunca ao contrário.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">scope-chain.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">const</span> <span class="syn-id">nivel1</span> <span class="syn-operator">=</span> <span class="syn-string">"global"</span>

<span class="syn-keyword">function</span> <span class="syn-fn">externo</span>() {
  <span class="syn-keyword">const</span> <span class="syn-id">nivel2</span> <span class="syn-operator">=</span> <span class="syn-string">"externo"</span>

  <span class="syn-keyword">function</span> <span class="syn-fn">interno</span>() {
    <span class="syn-keyword">const</span> <span class="syn-id">nivel3</span> <span class="syn-operator">=</span> <span class="syn-string">"interno"</span>

    <span class="syn-comment">// interno() enxerga os três níveis</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nivel3</span>)   <span class="syn-comment">// encontra no próprio escopo</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nivel2</span>)   <span class="syn-comment">// sobe um nível — encontra em externo()</span>
    <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nivel1</span>)   <span class="syn-comment">// sobe dois níveis — encontra no global</span>
  }

  <span class="syn-fn">interno</span>()
}

<span class="syn-fn">externo</span>()

<span class="syn-comment">// externo() NÃO enxerga nivel3 — a busca não vai para dentro</span>
<span class="syn-comment">// console.log(nivel3)  → ReferenceError</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nivel3</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"interno"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nivel2</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"externo"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nivel1</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"global"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. Shadowing ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Shadowing — variável que esconde outra</h2>
      <p>
        Quando você declara uma variável com o mesmo nome em um escopo interno,
        ela <strong>shadowa</strong> (obscurece) a variável do escopo externo.
        O motor encontra a variável interna primeiro e para de buscar — a externa
        fica inacessível dentro daquele escopo.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">shadowing.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">const</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"ativo"</span>   <span class="syn-comment">// escopo global</span>

<span class="syn-keyword">function</span> <span class="syn-fn">processarPedido</span>() {
  <span class="syn-keyword">const</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"pendente"</span>   <span class="syn-comment">// shadowa o global</span>

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)   <span class="syn-comment">// "pendente" — motor encontra aqui e para</span>
}

<span class="syn-fn">processarPedido</span>()
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)   <span class="syn-comment">// "ativo" — fora da função, o global continua intacto</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">processarPedido() → status interno</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"pendente"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(status) → status global</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"ativo"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Shadowing não modifica a variável externa — cria uma nova no escopo
        interno. A externa continua intacta para quem está fora. Use com
        consciência: shadowing excessivo torna o código difícil de rastrear.
      </p>
    </section>


    <!-- ── 5. Block scope com let e const ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Block scope — let e const respeitam blocos</h2>
      <p>
        O <code>var</code> ignora blocos <code>{ }</code> — ele pertence à função
        inteira ou ao global. Já <code>let</code> e <code>const</code> criam um
        novo Lexical Environment por bloco: <code>if</code>, <code>for</code>,
        <code>while</code>, ou qualquer par de chaves.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">block-scope.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">processar</span>(<span class="syn-id">itens</span>) {
  <span class="syn-keyword">if</span> (<span class="syn-id">itens</span>.<span class="syn-property">length</span> <span class="syn-operator">></span> <span class="syn-number">0</span>) {
    <span class="syn-keyword">var</span>   <span class="syn-id">totalVar</span>   <span class="syn-operator">=</span> <span class="syn-id">itens</span>.<span class="syn-property">length</span>   <span class="syn-comment">// var — vaza para a função</span>
    <span class="syn-keyword">const</span> <span class="syn-id">totalConst</span> <span class="syn-operator">=</span> <span class="syn-id">itens</span>.<span class="syn-property">length</span>   <span class="syn-comment">// const — fica no bloco</span>
  }

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">totalVar</span>)    <span class="syn-comment">// 3 — var vazou do bloco if</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">totalConst</span>)  <span class="syn-comment">// ReferenceError — const ficou no bloco</span>
}

<span class="syn-fn">processar</span>([<span class="syn-string">"a"</span>, <span class="syn-string">"b"</span>, <span class="syn-string">"c"</span>])</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(totalVar)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">3</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(totalConst)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: totalConst is not defined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Você agora entende como o Lexical Environment funciona, como a Scope
        Chain resolve variáveis de dentro para fora, e a diferença entre
        <code>var</code> e <code>let</code>/<code>const</code> em relação
        a blocos. Na próxima aula vamos entrar no
        <strong>Variable Environment</strong> — a estrutura que explica em
        detalhes como o hoisting de <code>var</code> e funções realmente
        funciona por dentro.
      </p>
    </section>

  `;
}