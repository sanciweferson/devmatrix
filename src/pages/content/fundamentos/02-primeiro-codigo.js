// src/content/fundamentos/02-primeiro-codigo.js

// ── Valores usados nos exemplos ──────────────────────────────────────────────

const titulo1 = "Olá, mundo!"
const hora1 = new Date().toLocaleTimeString()


// ── Conteúdo HTML ─────────────────────────────────────────────────────────────

export function content() {
  return /* html */ `

    <!-- ── 1. Onde o JS entra na página ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Onde o JavaScript entra na página?</h2>
      <p>
        Todo JavaScript que roda no browser precisa ser carregado por uma página HTML.
        Não existe JS solto — ele sempre tem um ponto de entrada, e esse ponto é a tag
        <code>&lt;script&gt;</code>.
      </p>
      <p>
        Existem duas formas de incluir JavaScript em uma página: inline, diretamente
        dentro da tag, ou externo, apontando para um arquivo <code>.js</code> separado.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">&lt;!-- Inline: código diretamente na tag --&gt;</span>
&lt;<span class="syn-keyword">script</span>&gt;
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"Olá, browser!"</span>)
&lt;/<span class="syn-keyword">script</span>&gt;

<span class="syn-comment">&lt;!-- Externo: aponta para um arquivo .js --&gt;</span>
&lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log("Olá, browser!")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Olá, browser!"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Em projetos reais você quase sempre vai usar arquivos externos — o código
        fica separado do HTML, é mais fácil de manter e o browser consegue fazer
        cache do arquivo entre visitas.
      </p>
    </section>


    <!-- ── 2. Onde colocar o script ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Onde colocar a tag script?</h2>
      <p>
        A posição da tag <code>&lt;script&gt;</code> no HTML importa — e muito.
        O browser lê o HTML de cima para baixo. Quando encontra um
        <code>&lt;script&gt;</code>, para tudo, baixa e executa o código,
        só então continua lendo o resto da página.
      </p>
      <p>
        Se o script tentar acessar um elemento que ainda não foi lido pelo browser,
        vai encontrar <code>null</code> — e provavelmente quebrar.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">index.html — posição errada</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code">&lt;<span class="syn-keyword">head</span>&gt;
  <span class="syn-comment">&lt;!-- ⚠️ Script no &lt;head&gt; sem defer — roda antes do body existir --&gt;</span>
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;
&lt;/<span class="syn-keyword">head</span>&gt;
&lt;<span class="syn-keyword">body</span>&gt;
  &lt;<span class="syn-keyword">h1</span> <span class="syn-property">id</span>=<span class="syn-string">"titulo"</span>&gt;Olá&lt;/<span class="syn-keyword">h1</span>&gt;
&lt;/<span class="syn-keyword">body</span>&gt;</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — app.js tenta acessar #titulo</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">document.getElementById("titulo")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-null">null</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        A solução clássica — e que você ainda vai encontrar em muito código legado
        — é colocar o script no final do <code>&lt;body&gt;</code>, depois de todo
        o HTML. Assim o browser já leu toda a página antes de executar o JavaScript.
        Mas hoje existe uma forma melhor.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">index.html — final do body (legado)</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code">&lt;<span class="syn-keyword">body</span>&gt;
  &lt;<span class="syn-keyword">h1</span> <span class="syn-property">id</span>=<span class="syn-string">"titulo"</span>&gt;Olá&lt;/<span class="syn-keyword">h1</span>&gt;

  <span class="syn-comment">&lt;!-- Script no final do body — HTML já foi lido --&gt;</span>
  <span class="syn-comment">&lt;!-- Funciona, mas há uma abordagem mais moderna: defer --&gt;</span>
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;
&lt;/<span class="syn-keyword">body</span>&gt;</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — app.js agora encontra #titulo</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">document.getElementById("titulo")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">&lt;h1 id="titulo"&gt;Olá&lt;/h1&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 3. defer e async ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">defer e async — o jeito moderno</h2>
      <p>
        O padrão hoje é usar o atributo <code>defer</code> na tag script dentro
        do <code>&lt;head&gt;</code>. Com <code>defer</code>, o browser baixa o
        arquivo em paralelo enquanto continua lendo o HTML — e só executa o script
        quando a página inteira foi lida.
      </p>
      <p>
        É o melhor dos dois mundos: o script vai para o <code>&lt;head&gt;</code>
        onde faz sentido semanticamente, não bloqueia a renderização, e o DOM
        já está completo quando o código roda.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">index.html — defer e async</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code">&lt;<span class="syn-keyword">head</span>&gt;
  <span class="syn-comment">&lt;!-- defer: baixa em paralelo, executa depois do HTML --&gt;</span>
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span> <span class="syn-keyword">defer</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;

  <span class="syn-comment">&lt;!-- async: baixa em paralelo, executa assim que termina --&gt;</span>
  <span class="syn-comment">&lt;!-- ordem não garantida — use só em scripts independentes --&gt;</span>
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"analytics.js"</span> <span class="syn-keyword">async</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;
&lt;/<span class="syn-keyword">head</span>&gt;</code></pre>
      </div>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">⏳</div>
          <h3>Sem atributo</h3>
          <p>Bloqueia o HTML. Baixa e executa na hora. Evite no <code>&lt;head&gt;</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>
          <h3>defer</h3>
          <p>Baixa em paralelo. Executa após o HTML completo. Ordem entre scripts preservada. <strong>Use este na maioria dos casos.</strong></p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>async</h3>
          <p>Baixa em paralelo. Executa assim que termina, sem esperar o HTML. Ordem não garantida — ideal para scripts independentes como analytics.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>type="module"</h3>
          <p>Ativa ES Modules. Comporta-se como <code>defer</code> por padrão. Roda em <strong>strict mode</strong> automaticamente e tem escopo próprio — variáveis não vazam para o <code>window</code>.</p>
        </div>
      </div>
    </section>


    <!-- ── 4. O console do browser ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O console do browser</h2>
      <p>
        O <code>console</code> é a sua janela para dentro do JavaScript. É onde
        você inspeciona valores, confirma que o código chegou em certo ponto,
        e lê erros.
      </p>
      <p>
        Para abrir: <strong>F12</strong> ou <strong>Cmd/Ctrl + Shift + I</strong>
        em qualquer browser, depois clica na aba <em>Console</em>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">app.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Os métodos mais usados do console</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"mensagem comum"</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">warn</span>(<span class="syn-string">"atenção: algo pode estar errado"</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">error</span>(<span class="syn-string">"algo quebrou"</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-number">42</span>, <span class="syn-boolean">true</span>, [<span class="syn-number">1</span>, <span class="syn-number">2</span>, <span class="syn-number">3</span>])  <span class="syn-comment">// aceita múltiplos valores</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log("mensagem comum")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"mensagem comum"</span>
            </div>
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.warn("atenção...")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-warn">⚠ atenção: algo pode estar errado</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.error("algo quebrou")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">✖ algo quebrou</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(42, true, [1,2,3])</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">42</span>
              <span class="syn-output-bool">true</span>
              <span class="syn-output">[1, 2, 3]</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Primeiro código real ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Primeiro código real</h2>
      <p>
        Chega de teoria. Aqui está um exemplo completo — um HTML mínimo com
        JavaScript que modifica a página após o carregamento.
      </p>
      <p>
        Não se preocupe em entender cada detalhe agora. O objetivo é ver o ciclo
        completo: HTML carrega → script roda → página muda.
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
        <pre class="code-block__pre"><code class="code-block__code">&lt;!<span class="syn-keyword">DOCTYPE</span> <span class="syn-id">html</span>&gt;
&lt;<span class="syn-keyword">html</span> <span class="syn-property">lang</span>=<span class="syn-string">"pt-BR"</span>&gt;
&lt;<span class="syn-keyword">head</span>&gt;
  &lt;<span class="syn-keyword">meta</span> <span class="syn-property">charset</span>=<span class="syn-string">"UTF-8"</span>&gt;
  &lt;<span class="syn-keyword">title</span>&gt;Minha página&lt;/<span class="syn-keyword">title</span>&gt;
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"app.js"</span> <span class="syn-keyword">defer</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;
&lt;/<span class="syn-keyword">head</span>&gt;
&lt;<span class="syn-keyword">body</span>&gt;
  &lt;<span class="syn-keyword">h1</span> <span class="syn-property">id</span>=<span class="syn-string">"titulo"</span>&gt;Carregando...&lt;/<span class="syn-keyword">h1</span>&gt;
  &lt;<span class="syn-keyword">p</span>  <span class="syn-property">id</span>=<span class="syn-string">"hora"</span>&gt;&lt;/<span class="syn-keyword">p</span>&gt;
&lt;/<span class="syn-keyword">body</span>&gt;
&lt;/<span class="syn-keyword">html</span>&gt;</code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">app.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// defer garante que o DOM está pronto quando este código roda</span>
<span class="syn-keyword">const</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"titulo"</span>)
<span class="syn-keyword">const</span> <span class="syn-id">hora</span>   <span class="syn-operator">=</span> <span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"hora"</span>)

<span class="syn-id">titulo</span>.<span class="syn-property">textContent</span> <span class="syn-operator">=</span> <span class="syn-string">"Olá, mundo!"</span>
<span class="syn-id">hora</span>.<span class="syn-property">textContent</span>   <span class="syn-operator">=</span> <span class="syn-string">\`Página carregada às \${new Date().toLocaleTimeString()}\`</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Resultado no browser</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">titulo.textContent</span>
              <span class="code-console__arrow">→</span>
              <span id="out-titulo" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">hora.textContent</span>
              <span class="code-console__arrow">→</span>
              <span id="out-hora" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O <code>defer</code> no script garante que quando o <code>app.js</code>
        rodar, os elementos <code>#titulo</code> e <code>#hora</code> já existem
        no DOM. Sem ele, <code>getElementById</code> retornaria <code>null</code>
        e a atribuição quebraria silenciosamente.
      </p>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe como o JavaScript entra na página e como o browser o
        executa. Na próxima aula vamos descer um nível: como o browser
        realmente lê e processa seu arquivo <code>.js</code> — o que acontece
        antes da primeira linha do seu código rodar.
      </p>
    </section>

  `;
}


// ── Injeção de outputs via DOM ────────────────────────────────────────────────

export function init() {
  const injetar = (id, valor) => {
    const el = document.getElementById(id)
    if (el) el.textContent = valor
  }

  // Console da seção 5 — valores reais capturados no momento do carregamento
  injetar('out-titulo', `"${titulo1}"`)
  injetar('out-hora', `"Página carregada às ${hora1}"`)
}