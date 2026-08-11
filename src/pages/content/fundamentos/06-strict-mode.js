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
        O <strong>strict mode</strong> (ou <em>modo estrito</em>) é uma
        diretiva introduzida no ES5 que ativa um subconjunto mais restrito
        da linguagem. Com ele, erros que seriam silenciosos viram exceções e
        alguns comportamentos problemáticos ou ambíguos são proibidos. O
        strict mode também fornece ao engine algumas garantias adicionais
        sobre o comportamento do código — mas não deve ser apresentado como
        uma forma direta de deixar o código mais rápido.
      </p>
      <p>
        Você pode ativá-lo com a diretiva <code>"use strict"</code> no início
        de um script ou de uma função:
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
        <code>"use strict"</code> é uma string literal reconhecida como uma
        diretiva quando aparece no início de um script ou de uma função. Isso
        permitiu introduzir o strict mode sem quebrar código JavaScript mais
        antigo.
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
        Na prática, código escrito como módulo ES (<code>import</code>/<code>export</code>)
        já executa em strict mode. Ferramentas de build como Vite ou webpack
        podem transformar e empacotar o código, mas isso não significa que
        todo código de qualquer projeto que usa essas ferramentas seja, por
        definição, strict mode — o que determina isso é o modelo de módulos,
        não a ferramenta de build.
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
        No modo não estrito, em determinados contextos, atribuir a um
        identificador não declarado (sem <code>var</code>, <code>let</code>
        ou <code>const</code>) pode criar uma propriedade no objeto global.
        Isso é uma das fontes de bug mais difíceis de rastrear.
      </p>
      <p>
        No strict mode, essa mesma atribuição lança um
        <code>ReferenceError</code> imediatamente.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">variaveis-sem-strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Em código não-strict, a atribuição pode criar uma propriedade global.</span>
<span class="syn-keyword">function</span> <span class="syn-fn">salvarNome</span>() {
  <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>   <span class="syn-comment">// ← sem var/let/const</span>
}
<span class="syn-fn">salvarNome</span>()
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nome</span>)   <span class="syn-comment">// "Ana" — vazou para o objeto global</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(nome)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Ana"</span>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">variaveis-com-strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Em strict mode, atribuir a um identificador não declarado lança ReferenceError.</span>
<span class="syn-string">"use strict"</span>
<span class="syn-keyword">function</span> <span class="syn-fn">salvarNome</span>() {
  <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>   <span class="syn-comment">// ← ReferenceError</span>
}
<span class="syn-fn">salvarNome</span>()</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">salvarNome()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: nome is not defined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. this em funções globais ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">this em funções comuns depende do strict mode</h2>
      <p>
        No modo não estrito, quando uma função comum é chamada sem um
        contexto explícito, o valor de <code>this</code> é substituído pelo
        objeto global — <code>window</code> no browser e, no modelo
        tradicional do Node.js, <code>global</code>. Isso causa bugs sutis
        quando você acidentalmente modifica o global.
      </p>
      <p>
        No strict mode, <code>this</code> em funções chamadas sem contexto
        explícito é <code>undefined</code>. O erro aparece cedo, não depois.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">this-sem-strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">mostrarThis</span>() {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">this</span>)
}
<span class="syn-fn">mostrarThis</span>()   <span class="syn-comment">// → Window — o objeto global</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">mostrarThis()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">Window { ... }</span>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">this-com-strict.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-string">"use strict"</span>
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
              <span class="code-console__expr">mostrarThis()</span>
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

<span class="syn-comment">// 1. Parâmetros duplicados são proibidos em funções strict</span>
<span class="syn-keyword">function</span> <span class="syn-fn">somar</span>(<span class="syn-id">a</span>, <span class="syn-id">a</span>) { <span class="syn-keyword">return</span> <span class="syn-id">a</span> }
<span class="syn-comment">// → SyntaxError: Duplicate parameter name not allowed in strict mode</span>

<span class="syn-comment">// 2. Deletar uma variável é proibido</span>
<span class="syn-keyword">let</span> <span class="syn-id">x</span> <span class="syn-operator">=</span> <span class="syn-number">1</span>
<span class="syn-keyword">delete</span> <span class="syn-id">x</span>
<span class="syn-comment">// → SyntaxError: Delete of an unqualified identifier in strict mode</span>

<span class="syn-comment">// 3. Escrever em propriedades somente-leitura lança erro</span>
<span class="syn-keyword">const</span> <span class="syn-id">obj</span> <span class="syn-operator">=</span> {}
<span class="syn-id">Object</span>.<span class="syn-fn">defineProperty</span>(<span class="syn-id">obj</span>, <span class="syn-string">"id"</span>, { <span class="syn-property">value</span>: <span class="syn-number">1</span>, <span class="syn-property">writable</span>: <span class="syn-boolean">false</span> })
<span class="syn-id">obj</span>.<span class="syn-property">id</span> <span class="syn-operator">=</span> <span class="syn-number">2</span>
<span class="syn-comment">// → TypeError: Cannot assign to read only property 'id'</span>

<span class="syn-comment">// 4. Algumas palavras reservadas não podem ser usadas como identificadores em strict mode</span>
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
          <h3>Comportamento mais previsível</h3>
          <p>
            O strict mode elimina algumas construções problemáticas e
            fornece ao engine garantias mais claras sobre o comportamento
            do código. O principal benefício para o desenvolvedor é detectar
            erros mais cedo e evitar comportamentos silenciosos — não um
            ganho de performance garantido.
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
          <h3>Menos código antigo problemático</h3>
          <p>
            O strict mode evita algumas construções antigas e problemáticas
            que não são permitidas em código moderno. Módulos ES já usam
            strict mode por padrão.
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
        conceitual que o JavaScript usa para executar código, mantendo
        informações como variáveis, escopo e o valor de <code>this</code>.
        Entender isso ajuda a conectar conceitos como hoisting, escopo e o
        funcionamento de <code>this</code>.
      </p>
    </section>

  `
}
