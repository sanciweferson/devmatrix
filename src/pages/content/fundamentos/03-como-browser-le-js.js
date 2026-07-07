// src/content/fundamentos/03-como-browser-le-js.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que acontece antes do seu código rodar ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que acontece antes do seu código rodar?</h2>
      <p>
        Quando o browser encontra um arquivo <code>.js</code>, ele não sai
        executando linha por linha imediatamente. Antes disso, o motor JavaScript
        passa pelo arquivo inteiro em duas fases distintas: <strong>compilação</strong>
        e <strong>execução</strong>.
      </p>
      <p>
        Entender essas duas fases explica comportamentos que parecem mágica —
        como variáveis que existem antes de serem declaradas, ou funções que
        você pode chamar antes de defini-las.
      </p>
    </section>


    <!-- ── 2. Fase 1: Compilação ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Fase 1 — Compilação (parsing)</h2>
      <p>
        Na primeira fase, o motor lê o arquivo inteiro e constrói uma representação
        interna do código chamada <strong>AST</strong> (Abstract Syntax Tree —
        Árvore Sintática Abstrata). Pense nisso como o motor "entendendo a estrutura"
        do código antes de rodar qualquer coisa.
      </p>
      <p>
        Durante essa fase, o motor também registra todas as declarações de variáveis
        e funções — esse processo se chama <strong>hoisting</strong>. As declarações
        são "içadas" para o topo do escopo antes da execução começar.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">hoisting.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Chamamos saudar() antes de declará-la — e funciona</span>
<span class="syn-comment">// Por quê? O motor já registrou a função na fase de compilação</span>
<span class="syn-fn">saudar</span>(<span class="syn-string">"Ana"</span>)

<span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>(<span class="syn-id">nome</span>) {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">\`Olá, \${<span class="syn-id">nome</span>}!\`</span>)
}</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">saudar("Ana")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Olá, Ana!"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Isso só funciona com <code>function</code> declarations. Arrow functions
        e expressões de função armazenadas em variáveis <strong>não</strong>
        são içadas da mesma forma — vamos explorar isso no módulo de Funções.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">hoisting-var.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var é içada, mas o valor não</span>
<span class="syn-comment">// O motor registra "existe uma variável chamada x"</span>
<span class="syn-comment">// mas ainda não sabe o valor — inicializa com undefined</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">x</span>)   <span class="syn-comment">// undefined — não é ReferenceError</span>
<span class="syn-keyword">var</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-number">10</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">x</span>)   <span class="syn-comment">// 10</span>

<span class="syn-comment">// let e const não têm esse comportamento</span>
<span class="syn-comment">// Acessá-las antes da declaração lança ReferenceError</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">y</span>)   <span class="syn-comment">// ✖ ReferenceError: Cannot access 'y' before initialization</span>
<span class="syn-keyword">let</span> <span class="syn-id">y</span> <span class="syn-operator">=</span> <span class="syn-number">20</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(x) — antes da declaração</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undef">undefined</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(x) — depois da declaração</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">10</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(y) — antes de let</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: Cannot access 'y' before initialization</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 3. Fase 2: Execução ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Fase 2 — Execução</h2>
      <p>
        Depois da compilação, o motor executa o código linha por linha, de cima
        para baixo. É nessa fase que os valores são atribuídos, as funções são
        chamadas e o programa realmente "roda".
      </p>
      <p>
        O motor mantém uma estrutura chamada <strong>Call Stack</strong> (pilha de
        chamadas) para controlar o que está sendo executado em cada momento.
        Cada vez que uma função é chamada, ela é empilhada. Quando termina,
        é desempilhada.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">call-stack.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">preco</span>, <span class="syn-id">quantidade</span>) {
  <span class="syn-keyword">const</span> <span class="syn-id">subtotal</span> <span class="syn-operator">=</span> <span class="syn-fn">multiplicar</span>(<span class="syn-id">preco</span>, <span class="syn-id">quantidade</span>)
  <span class="syn-keyword">return</span> <span class="syn-id">subtotal</span>
}

<span class="syn-keyword">function</span> <span class="syn-fn">multiplicar</span>(<span class="syn-id">a</span>, <span class="syn-id">b</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">a</span> <span class="syn-operator">*</span> <span class="syn-id">b</span>
}

<span class="syn-keyword">const</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-number">49.90</span>, <span class="syn-number">3</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">total</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Call Stack — ordem de execução</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">1</span>
              <span class="code-console__expr">global → calcularTotal(49.90, 3)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">empilha calcularTotal</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">2</span>
              <span class="code-console__expr">calcularTotal → multiplicar(49.90, 3)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">empilha multiplicar</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">3</span>
              <span class="code-console__expr">multiplicar retorna</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">149.7</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">4</span>
              <span class="code-console__expr">calcularTotal retorna</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">149.7</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(total)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">149.7</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. O que o motor faz com erros de sintaxe ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Erros de sintaxe param tudo</h2>
      <p>
        Se o motor encontrar um erro de sintaxe durante a fase de compilação,
        ele para <strong>antes</strong> de executar qualquer linha. O arquivo
        inteiro é descartado.
      </p>
      <p>
        Isso é diferente de um erro em tempo de execução, que para o código
        apenas naquele ponto. Um <code>SyntaxError</code> impede qualquer
        execução.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">sintaxe-errada.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"isso nunca vai rodar"</span>)

<span class="syn-keyword">const</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-operator">{</span>    <span class="syn-comment">// ← chave aberta sem fechar</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"isso também não"</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">parsing</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">SyntaxError: Unexpected end of input</span>
            </div>
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">nenhuma linha foi executada</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Resumo visual ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O ciclo completo</h2>
      <p>
        Toda vez que o browser carrega um arquivo <code>.js</code>, esse ciclo
        acontece:
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">📥</div>
          <h3>1. Download</h3>
          <p>
            O browser baixa o arquivo <code>.js</code> via rede.
            Com <code>defer</code>, isso acontece em paralelo com o HTML.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔍</div>
          <h3>2. Parsing</h3>
          <p>
            O motor lê o código inteiro, verifica a sintaxe e constrói a AST.
            Hoisting acontece aqui. Erros de sintaxe param tudo.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>3. Compilação JIT</h3>
          <p>
            O V8 compila partes do código para código de máquina durante
            a execução, otimizando trechos que rodam com frequência.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">▶️</div>
          <h3>4. Execução</h3>
          <p>
            O código roda linha por linha. A Call Stack controla o que
            está ativo. Erros de runtime param apenas naquele ponto.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe que o motor passa pelo código duas vezes antes de
        qualquer coisa aparecer na tela. Na próxima aula vamos focar em
        erros — como lê-los, o que cada tipo significa, e como o console
        do browser te ajuda a depurar.
      </p>
    </section>

  `;
}