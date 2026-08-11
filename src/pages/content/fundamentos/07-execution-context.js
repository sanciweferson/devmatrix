// src/content/fundamentos/07-execution-context.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é o Execution Context ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é o Execution Context?</h2>
      <p>
        Toda vez que o JavaScript executa código, ele cria um
        <strong>Execution Context</strong> — um ambiente que reúne as
        informações necessárias para executar aquele código, incluindo os
        ambientes léxicos usados para resolver variáveis e, quando
        aplicável, o valor de <code>this</code>.
      </p>
      <p>
        Entender o Execution Context é entender como o JavaScript realmente
        funciona por dentro. Hoisting, escopo, closures e
        <code>this</code> — todos esses conceitos são consequências diretas
        de como o motor estabelece e gerencia esses contextos.
      </p>
    </section>


    <!-- ── 2. Tipos de Execution Context ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Os três tipos de Execution Context</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🌍</div>
          <h3>Global</h3>
          <p>
            Criado quando o script começa a rodar. Existe um único contexto
            global. No contexto global de um script clássico no browser,
            <code>this</code> corresponde a <code>window</code>. Em módulos
            ES, <code>this</code> no topo é <code>undefined</code>. No
            Node.js, o comportamento depende do tipo de módulo e do
            ambiente de execução.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>Function</h3>
          <p>
            Criado toda vez que uma função é chamada. Cada chamada cria
            um novo contexto — mesmo que seja a mesma função chamada
            duas vezes.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>Eval</h3>
          <p>
            Criado quando código roda dentro de <code>eval()</code>.
            Raramente usado e fortemente desencorajado em código moderno.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 3. O que compõe um Execution Context ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que compõe um Execution Context</h2>
      <p>
        Para entender o conceito de forma didática, podemos pensar no
        Execution Context como tendo três informações importantes:
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">execution-context.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Representação conceitual e didática de um Execution Context</span>
<span class="syn-comment">// (não é código real, nem a estrutura formal da especificação —</span>
<span class="syn-comment">// é um modelo para entender o comportamento do motor)</span>

<span class="syn-keyword">const</span> <span class="syn-id">ExecutionContext</span> <span class="syn-operator">=</span> {

  <span class="syn-comment">// 1. Variable Environment
  //    Onde ficam as declarações de variáveis e funções.
  //    É durante a criação/instanciação do contexto que essas
  //    declarações são registradas e inicializadas de acordo
  //    com suas regras.</span>
  <span class="syn-property">variableEnvironment</span>: {
    <span class="syn-property">nome</span>: <span class="syn-nullish">undefined</span>,      <span class="syn-comment">// var — registrada com undefined</span>
    <span class="syn-property">saudar</span>: <span class="syn-keyword">function</span>() {},  <span class="syn-comment">// function — registrada completa</span>
  },

  <span class="syn-comment">// 2. Lexical Environment
  //    Referência ao escopo externo — de onde vieram as variáveis
  //    que não foram declaradas neste contexto</span>
  <span class="syn-property">lexicalEnvironment</span>: <span class="syn-id">escopoExterno</span>,

  <span class="syn-comment">// 3. This Binding
  //    O valor de this dentro deste contexto</span>
  <span class="syn-property">thisBinding</span>: <span class="syn-id">window</span>,  <span class="syn-comment">// em um script clássico no contexto global do browser</span>
}</code></pre>
      </div>
    </section>


    <!-- ── 4. A Call Stack ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">A Call Stack — pilha de contextos</h2>
      <p>
        O motor gerencia os Execution Contexts através de uma estrutura
        chamada <strong>Call Stack</strong> (pilha de chamadas). Funciona
        como uma pilha de pratos: o último que entra é o primeiro que sai.
      </p>
      <p>
        Quando o script começa, o Global Execution Context vai para a pilha.
        Cada chamada de função normalmente cria e empilha um novo Function
        Execution Context. Quando a função retorna, seu contexto é
        desempilhado e o controle volta para o contexto anterior.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">formatarMoeda</span>(<span class="syn-id">valor</span>) {
  <span class="syn-keyword">return</span> <span class="syn-string">\`R$ \${<span class="syn-id">valor</span>.<span class="syn-fn">toFixed</span>(<span class="syn-number">2</span>)}\`</span>
}

<span class="syn-keyword">function</span> <span class="syn-fn">exibirTotal</span>(<span class="syn-id">preco</span>, <span class="syn-id">qtd</span>) {
  <span class="syn-keyword">const</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-id">preco</span> <span class="syn-operator">*</span> <span class="syn-id">qtd</span>
  <span class="syn-keyword">return</span> <span class="syn-fn">formatarMoeda</span>(<span class="syn-id">total</span>)
}

<span class="syn-keyword">const</span> <span class="syn-id">resultado</span> <span class="syn-operator">=</span> <span class="syn-fn">exibirTotal</span>(<span class="syn-number">49.90</span>, <span class="syn-number">3</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Call Stack — passo a passo</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">1</span>
              <span class="code-console__expr">[ Global EC ]</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">script começa</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">2</span>
              <span class="code-console__expr">[ exibirTotal EC ] [ Global EC ]</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">exibirTotal é chamada</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">3</span>
              <span class="code-console__expr">[ formatarMoeda EC ] [ exibirTotal EC ] [ Global EC ]</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">formatarMoeda é chamada</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">4</span>
              <span class="code-console__expr">[ exibirTotal EC ] [ Global EC ]</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">formatarMoeda retorna</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">5</span>
              <span class="code-console__expr">[ Global EC ]</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">exibirTotal retorna</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(resultado)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"R$ 149.70"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Stack Overflow ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Stack Overflow — quando a pilha transborda</h2>
      <p>
        A Call Stack tem um limite de tamanho. Se uma função continua se
        chamando sem uma condição de parada — recursão infinita — a pilha
        cresce até estourar. O motor lança um
        <code>RangeError: Maximum call stack size exceeded</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">stack-overflow.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ⚠️ Não rode isso — a recursão infinita vai causar um Stack Overflow</span>
<span class="syn-keyword">function</span> <span class="syn-fn">infinita</span>() {
  <span class="syn-keyword">return</span> <span class="syn-fn">infinita</span>()  <span class="syn-comment">// chama a si mesma sem parar</span>
}
<span class="syn-fn">infinita</span>()

<span class="syn-comment">// ✓ Recursão correta — sempre tem condição de parada</span>
<span class="syn-keyword">function</span> <span class="syn-fn">fatorial</span>(<span class="syn-id">n</span>) {
  <span class="syn-keyword">if</span> (<span class="syn-id">n</span> <span class="syn-operator">&lt;=</span> <span class="syn-number">1</span>) <span class="syn-keyword">return</span> <span class="syn-number">1</span>      <span class="syn-comment">// ← condição de parada (cobre 0 e 1)</span>
  <span class="syn-keyword">return</span> <span class="syn-id">n</span> <span class="syn-operator">*</span> <span class="syn-fn">fatorial</span>(<span class="syn-id">n</span> <span class="syn-operator">-</span> <span class="syn-number">1</span>)  <span class="syn-comment">// ← se aproxima da parada a cada chamada</span>
}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">fatorial</span>(<span class="syn-number">5</span>))</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">infinita()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">RangeError: Maximum call stack size exceeded</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">fatorial(5)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">120</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. As duas fases de criação ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">As duas fases de cada contexto</h2>
      <p>
        Para entender hoisting, podemos usar um modelo didático em duas
        fases: criação do contexto e execução do código. Isso ajuda a
        explicar por que o hoisting acontece — e por que ele se comporta
        diferente para <code>var</code>, <code>let</code>/<code>const</code>
        e funções.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">duas-fases.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Este código:</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">cidade</span>)   <span class="syn-comment">// undefined</span>
<span class="syn-fn">saudar</span>(<span class="syn-string">"Ana"</span>)          <span class="syn-comment">// "Olá, Ana!"</span>

<span class="syn-keyword">var</span> <span class="syn-id">cidade</span> <span class="syn-operator">=</span> <span class="syn-string">"São Paulo"</span>
<span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>(<span class="syn-id">nome</span>) { <span class="syn-keyword">return</span> <span class="syn-string">\`Olá, \${<span class="syn-id">nome</span>}!\`</span> }

<span class="syn-comment">// FASE 1 — Criação/instanciação (modelo didático):
//   as declarações são registradas e inicializadas de acordo
//   com as regras da linguagem, antes da execução das instruções.
//   cidade → registrada com valor undefined (var)
//   saudar → registrada com a função completa

// FASE 2 — Execução (linha por linha):
//   console.log(cidade) → undefined (ainda não foi atribuída)
//   saudar("Ana")       → funciona (já foi registrada na fase 1)
//   cidade = "São Paulo" → agora recebe o valor
//   a declaração de saudar já foi registrada durante a criação/
//   instanciação; por isso, a chamada anterior à declaração funciona</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(cidade)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undef">undefined</span>
            </div>
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
        Esse comportamento não significa que o código foi literalmente
        executado fora de ordem. As declarações foram tratadas durante a
        criação/instanciação do contexto; as instruções continuam sendo
        executadas na ordem do fluxo do programa.
      </p>
    </section>


    <!-- ── 7. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe o que é um Execution Context, como a Call Stack
        organiza os Execution Contexts ativos durante a execução, e por que
        as duas fases de criação explicam o hoisting. Na próxima aula vamos
        aprofundar o <strong>Lexical Environment</strong> — a estrutura que
        define como o motor resolve nomes de variáveis e como os escopos
        se encadeiam.
      </p>
    </section>

  `
}
