// src/content/fundamentos/07-execution-context.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é o Execution Context ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é o Execution Context?</h2>
      <p>
        Toda vez que o JavaScript executa código, ele cria um
        <strong>Execution Context</strong> — um ambiente que contém tudo
        que o motor precisa para rodar aquele trecho: as variáveis
        disponíveis, o valor de <code>this</code>, e uma referência ao
        escopo externo.
      </p>
      <p>
        Entender o Execution Context é entender como o JavaScript realmente
        funciona por dentro. Hoisting, escopo, closures e
        <code>this</code> — todos esses conceitos são consequências diretas
        de como o motor cria e gerencia esses contextos.
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
            global. No browser, <code>this</code> aponta para
            <code>window</code>. No Node.js, para <code>global</code>.
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
        Cada Execution Context tem três componentes principais que o motor
        monta antes de executar qualquer linha do código:
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Representação conceitual de um Execution Context</span>
<span class="syn-comment">// (não é código real — é como o motor pensa internamente)</span>

<span class="syn-keyword">const</span> <span class="syn-id">ExecutionContext</span> <span class="syn-operator">=</span> {

  <span class="syn-comment">// 1. Variable Environment
  //    Onde ficam as declarações de variáveis e funções
  //    É aqui que o hoisting acontece</span>
  <span class="syn-property">variableEnvironment</span>: {
    <span class="syn-property">nome</span>: <span class="syn-nullish">undefined</span>,      <span class="syn-comment">// var — içada com undefined</span>
    <span class="syn-property">saudar</span>: <span class="syn-keyword">function</span>() {},  <span class="syn-comment">// function — içada completa</span>
  },

  <span class="syn-comment">// 2. Lexical Environment
  //    Referência ao escopo externo — de onde vieram as variáveis
  //    que não foram declaradas neste contexto</span>
  <span class="syn-property">lexicalEnvironment</span>: <span class="syn-id">escopoExterno</span>,

  <span class="syn-comment">// 3. This Binding
  //    O valor de  dentro deste contexto</span>
  <span class="syn-property">thisBinding</span>: <span class="syn-id">window</span>,  <span class="syn-comment">// no contexto global do browser</span>
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
        Cada chamada de função empilha um novo contexto. Quando a função
        retorna, seu contexto é desempilhado e o controle volta para o contexto
        anterior.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ⚠️ Não rode isso — vai travar o browser</span>
<span class="syn-keyword">function</span> <span class="syn-fn">infinita</span>() {
  <span class="syn-keyword">return</span> <span class="syn-fn">infinita</span>()  <span class="syn-comment">// chama a si mesma sem parar</span>
}
<span class="syn-fn">infinita</span>()

<span class="syn-comment">// ✓ Recursão correta — sempre tem condição de parada</span>
<span class="syn-keyword">function</span> <span class="syn-fn">fatorial</span>(<span class="syn-id">n</span>) {
  <span class="syn-keyword">if</span> (<span class="syn-id">n</span> <span class="syn-operator">===</span> <span class="syn-number">1</span>) <span class="syn-keyword">return</span> <span class="syn-number">1</span>       <span class="syn-comment">// ← condição de parada</span>
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
        Cada Execution Context passa por duas fases antes e durante a execução.
        Isso explica por que o hoisting acontece — e por que ele se comporta
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

<span class="syn-comment">// FASE 1 — Criação (o motor varre o código antes de executar):
//   cidade → registrado com valor undefined (var)
//   saudar → registrado com a função completa

// FASE 2 — Execução (linha por linha):
//   console.log(cidade) → undefined (ainda não foi atribuída)
//   saudar("Ana")       → funciona (já foi registrada na fase 1)
//   cidade = "São Paulo" → agora recebe o valor
//   function saudar()    → já foi processada, ignorada aqui</span></code></pre>
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
    </section>


    <!-- ── 7. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe o que é um Execution Context, como a Call Stack
        gerencia múltiplos contextos e por que as duas fases de criação
        explicam o hoisting. Na próxima aula vamos aprofundar o
        <strong>Lexical Environment</strong> — a estrutura que define como
        o motor resolve nomes de variáveis e como os escopos se encadeiam.
      </p>
    </section>

  `;
}