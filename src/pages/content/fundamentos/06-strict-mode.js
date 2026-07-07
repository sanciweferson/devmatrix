// src/content/fundamentos/06-strict-mode.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é o strict mode ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é o strict mode?</h2>
      <p>
        O JavaScript foi criado com muita permissividade — ele aceita código
        mal escrito sem reclamar, silencia erros que deveriam ser óbvios e
        permite comportamentos que só causam problema mais tarde.
      </p>
      <p>
        O <strong>strict mode</strong> é uma diretiva introduzida no ES5 que
        ativa um subconjunto mais restrito da linguagem. Com ele, erros que
        seriam silenciosos viram exceções, comportamentos ambíguos são
        proibidos e o motor consegue otimizar melhor o código.
      </p>
      <p>
        Você ativa com uma string literal no topo do arquivo ou da função:
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-string">"use strict"</span>  <span class="syn-comment">// ← ativa para o arquivo inteiro</span>

<span class="syn-comment">// Ou apenas dentro de uma função</span>
<span class="syn-keyword">function</span> <span class="syn-fn">minhaFuncao</span>() {
  <span class="syn-string">"use strict"</span>
  <span class="syn-comment">// strict mode ativo só aqui dentro</span>
}</code></pre>
      </div>

      <p>
        É uma string comum — não uma palavra-chave. Isso foi intencional:
        código antigo que não entendia a diretiva simplesmente a ignorava
        como uma expressão sem efeito.
      </p>
    </section>


    <!-- ── 2. Módulos ES6 já usam strict mode ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Módulos ES6 já são strict por padrão</h2>
      <p>
        Se você usa <code>import</code> e <code>export</code> — ou
        <code>type="module"</code> na tag script — o strict mode já está
        ativo automaticamente. Não precisa declarar.
      </p>
      <p>
        Na prática, qualquer projeto moderno com Vite, webpack ou bundlers
        similares já roda em strict mode. Mas entender o que ele faz é
        essencial para compreender por que certos erros aparecem.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">index.html</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">&lt;!-- type="module" ativa strict mode automaticamente --&gt;</span>
&lt;<span class="syn-keyword">script</span> <span class="syn-property">type</span>=<span class="syn-string">"module"</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;</code></pre>
      </div>
    </section>


    <!-- ── 3. Variáveis sem declaração ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Variáveis sem declaração viram erro</h2>
      <p>
        No modo não-strict, atribuir um valor a um identificador sem declarar
        com <code>var</code>, <code>let</code> ou <code>const</code> cria uma
        variável global silenciosamente. Isso é uma das fontes de bug mais
        difíceis de rastrear.
      </p>
      <p>
        No strict mode, isso vira um <code>ReferenceError</code> imediatamente.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">variaveis.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Sem strict mode — cria variável global silenciosamente</span>
<span class="syn-keyword">function</span> <span class="syn-fn">salvarNome</span>() {
  <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>   <span class="syn-comment">// ← sem var/let/const</span>
}
<span class="syn-fn">salvarNome</span>()
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// "Ana" — vazou para o escopo global</span>

<span class="syn-comment">// Com strict mode — erro imediato</span>
<span class="syn-string">"use strict"</span>
<span class="syn-keyword">function</span> <span class="syn-fn">salvarNome</span>() {
  <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>   <span class="syn-comment">// ← ReferenceError</span>
}</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">sem strict — console.log(nome)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Ana"</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">com strict — nome = "Ana"</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: nome is not defined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. this em funções globais ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">this em funções comuns vira undefined</h2>
      <p>
        No modo não-strict, uma função chamada sem contexto tem
        <code>this</code> apontando para o objeto global —
        <code>window</code> no browser, <code>global</code> no Node.js.
        Isso causa bugs sutis quando você acidentalmente modifica o global.
      </p>
      <p>
        No strict mode, <code>this</code> em funções chamadas sem contexto
        explícito é <code>undefined</code>. O erro aparece cedo, não depois.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">this-strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Sem strict mode</span>
<span class="syn-keyword">function</span> <span class="syn-fn">mostrarThis</span>() {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">this</span>)
}
<span class="syn-fn">mostrarThis</span>()   <span class="syn-comment">// → Window { ... } — o objeto global inteiro</span>

<span class="syn-comment">// Com strict mode</span>
<span class="syn-string">"use strict"</span>
<span class="syn-keyword">function</span> <span class="syn-fn">mostrarThis</span>() {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">this</span>)
}
<span class="syn-fn">mostrarThis</span>()   <span class="syn-comment">// → undefined</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">sem strict — mostrarThis()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">Window { ... }</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">com strict — mostrarThis()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undef">undefined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Outras restrições importantes ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Outras restrições do strict mode</h2>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">restricoes.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-string">"use strict"</span>

<span class="syn-comment">// 1. Parâmetros duplicados são proibidos</span>
<span class="syn-keyword">function</span> <span class="syn-fn">somar</span>(<span class="syn-id">a</span>, <span class="syn-id">a</span>) { <span class="syn-keyword">return</span> <span class="syn-id">a</span> }
<span class="syn-comment">// → SyntaxError: Duplicate parameter name not allowed in strict mode</span>

<span class="syn-comment">// 2. Deletar variáveis é proibido</span>
<span class="syn-keyword">const</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>
<span class="syn-keyword">delete</span> <span class="syn-id">x</span>
<span class="syn-comment">// → SyntaxError: Delete of an unqualified identifier in strict mode</span>

<span class="syn-comment">// 3. Escrever em propriedades somente-leitura lança erro</span>
<span class="syn-keyword">const</span> <span class="syn-id">obj</span> <span class="syn-operator">=</span> {}
<span class="syn-id">Object</span>.<span class="syn-fn">defineProperty</span>(<span class="syn-id">obj</span>, <span class="syn-string">"id"</span>, { <span class="syn-property">value</span>: <span class="syn-number">1</span>, <span class="syn-property">writable</span>: <span class="syn-boolean">false</span> })
<span class="syn-id">obj</span>.<span class="syn-property">id</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>
<span class="syn-comment">// → TypeError: Cannot assign to read only property 'id'</span>

<span class="syn-comment">// 4. Palavras reservadas para o futuro são proibidas como identificadores</span>
<span class="syn-keyword">const</span> <span class="syn-id">implements</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>  <span class="syn-comment">// → SyntaxError</span>
<span class="syn-keyword">const</span> <span class="syn-id">interface</span>  <span class="syn-operator">=</span> <span class="syn-number">2</span>  <span class="syn-comment">// → SyntaxError</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">function somar(a, a)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">SyntaxError: Duplicate parameter name not allowed</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">delete x</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">SyntaxError: Delete of an unqualified identifier</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">obj.id = 2</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: Cannot assign to read only property 'id'</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. Resumo ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Por que isso importa na prática</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🐛</div>
          <h3>Menos bugs silenciosos</h3>
          <p>
            Erros que seriam ignorados em modo normal viram exceções visíveis.
            Você descobre o problema na hora, não semanas depois.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>Código mais rápido</h3>
          <p>
            O motor consegue otimizar melhor código strict porque o
            comportamento é mais previsível e sem ambiguidades.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>Ativo em módulos</h3>
          <p>
            Todo arquivo com <code>import</code>/<code>export</code> já
            está em strict mode. Em projetos modernos você já o usa sem
            perceber.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔮</div>
          <h3>Preparado para o futuro</h3>
          <p>
            Novas features do JS são projetadas assumindo strict mode.
            Código sem ele pode ter conflitos com recursos futuros.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 7. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Na próxima aula vamos entrar em um dos conceitos mais importantes
        do JavaScript: o <strong>Execution Context</strong> — o ambiente
        que o motor cria para executar cada trecho de código. Entender
        isso é a chave para compreender hoisting, escopo e como
        <code>this</code> funciona de verdade.
      </p>
    </section>

  `;
}