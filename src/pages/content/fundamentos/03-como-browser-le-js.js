// src/pages/content/fundamentos/03-como-browser-le-js.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que acontece antes do seu código rodar ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que acontece antes do seu código rodar?</h2>
      <p>
        Quando o browser encontra um arquivo <code>.js</code>, ele não sai
        executando linha por linha imediatamente. Antes disso, e também durante
        a execução, o motor JavaScript analisa, prepara e otimiza o código —
        um processo com várias etapas internas, não só duas fases estanques.
      </p>
      <p>
        Entender esse processo explica comportamentos que parecem mágica —
        como variáveis que existem antes de serem declaradas, ou funções que
        você pode chamar antes de defini-las.
      </p>
    </section>


    <!-- ── 2. Fase 1: Parsing ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Parsing — análise e preparação do código</h2>
      <p>
        Durante o <strong>parsing</strong>, o motor analisa a estrutura do
        código e constrói representações internas, como a <strong>AST</strong>
        (Abstract Syntax Tree — Árvore Sintática Abstrata), para poder executar
        o programa. É assim que o motor "entende a estrutura" do código antes
        de rodar qualquer coisa.
      </p>
      <p>
        <em>Parsing</em> e <em>compilação</em> não são exatamente a mesma coisa
        — compilação é um termo mais amplo, que pode incluir várias etapas
        internas do engine (incluindo otimizações que acontecem depois, durante
        a execução, como o JIT que vamos ver adiante).
      </p>
      <p>
        Antes da execução do código, o ambiente de execução é preparado com os
        <em>bindings</em> das declarações de variáveis e funções. É esse
        comportamento — que faz algumas declarações estarem disponíveis antes
        da posição em que aparecem no código — que chamamos, de forma didática,
        de <strong>hoisting</strong>. Não é uma etapa formal separada do engine,
        mas uma forma prática de descrever esse comportamento.
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
<span class="syn-comment">// Por quê? O ambiente de execução já registrou a função antes da execução começar</span>
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
        são içadas da mesma forma: a variável pode existir no ambiente antes da
        linha da atribuição, mas a função em si não está disponível para ser
        chamada antes dessa atribuição acontecer — vamos explorar isso em
        detalhes no módulo de Funções.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// var é declarada e inicializada com undefined antes da execução</span>
<span class="syn-comment">// A atribuição com 10 só acontece quando esta linha é executada</span>
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

      <p>
        Esse período entre o início do escopo e a linha onde <code>let</code> ou
        <code>const</code> são de fato declaradas é chamado de
        <strong>Temporal Dead Zone (TDZ)</strong>. É durante esse período que
        tentar acessar a variável lança o <code>ReferenceError</code> que você
        viu acima. Vamos aprofundar isso mais à frente — por enquanto, basta
        conhecer o nome, porque ele vai aparecer bastante daqui pra frente.
      </p>
    </section>


    <!-- ── 3. Fase 2: Execução ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Execução</h2>
      <p>
        Depois que o código necessário foi analisado e o ambiente de execução
        preparado, o motor começa a executar as instruções na ordem determinada
        pelo fluxo do programa. É nessa fase que os valores são atribuídos, as
        funções são chamadas e o programa realmente "roda".
      </p>
      <p>
        Essa ordem não é simplesmente "de cima para baixo, linha por linha":
        estruturas como funções, condicionais, loops e callbacks alteram o
        caminho que o código percorre. O que se mantém é a lógica do fluxo —
        o motor sempre segue a sequência que o próprio programa determina.
      </p>
      <p>
        O motor mantém uma estrutura chamada <strong>Call Stack</strong> (pilha de
        chamadas) para controlar o que está sendo executado em cada momento.
        A execução começa em um contexto global e, quando uma função é chamada,
        seu contexto é colocado no topo da Call Stack. Quando a função termina,
        esse contexto é removido.
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
        Se o motor encontrar um erro de sintaxe durante o parsing, ele para
        <strong>antes</strong> de executar qualquer linha. O script não é
        executado.
      </p>
      <p>
        Isso é diferente de um erro em tempo de execução (<em>runtime</em>).
        Um erro em tempo de execução interrompe o fluxo síncrono atual a partir
        do ponto em que ocorreu. Se houver tratamento com <code>try/catch</code>,
        o programa pode continuar a partir do tratamento definido. Um
        <code>SyntaxError</code>, por outro lado, impede qualquer execução
        do arquivo inteiro — mesmo o código antes do erro nunca chega a rodar.
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
        Quando o browser precisa executar um arquivo JavaScript, esse processo
        envolve etapas como carregamento, análise e execução:
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">📥</div>
          <h3>1. Obtenção do arquivo</h3>
          <p>
            O browser obtém o arquivo <code>.js</code> — normalmente por uma
            requisição de rede, mas podendo também vir de cache ou outras
            fontes. Com <code>defer</code>, isso acontece em paralelo com o
            HTML.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔍</div>
          <h3>2. Parsing</h3>
          <p>
            O motor analisa a estrutura do código, verifica a sintaxe e
            constrói representações internas como a AST. Hoisting é um efeito
            desse processo. Erros de sintaxe param tudo.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">▶️</div>
          <h3>3. Execução (com otimização JIT)</h3>
          <p>
            O código roda na ordem determinada pelo programa, e a Call Stack
            controla o que está ativo. Durante a execução, o motor (ex: V8)
            pode compilar e recompilar trechos que executam com frequência
            para melhorar o desempenho — esse processo faz parte das
            otimizações JIT e não é uma etapa fixa que acontece antes da
            execução. Erros de runtime não tratados interrompem o trecho
            síncrono em que ocorrem.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe que, antes e durante a execução, o motor precisa
        analisar, preparar e executar o código — um processo contínuo, não
        duas passagens rígidas e separadas. Na próxima aula vamos focar em
        erros — como lê-los, o que cada tipo significa, e como o console
        do browser te ajuda a depurar.
      </p>
    </section>

  `
}
