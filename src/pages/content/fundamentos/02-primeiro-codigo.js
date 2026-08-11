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
        Em uma página web, o JavaScript normalmente é carregado pelo HTML por meio
        da tag <code>&lt;script&gt;</code>. É esse o ponto de entrada mais comum —
        embora existam outros contextos de execução, como módulos dinâmicos e Web
        Workers, que veremos mais adiante.
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
        O browser lê o HTML de cima para baixo. Por padrão, um <code>&lt;script&gt;</code>
        <strong>sem os atributos <code>defer</code> ou <code>async</code></strong> pausa
        essa leitura assim que é encontrado: baixa e executa o código ali mesmo,
        e só então continua lendo o resto da página.
      </p>
      <p>
        Se esse script tentar acessar um elemento que ainda não foi criado no DOM,
        métodos como <code>getElementById()</code> podem retornar <code>null</code>.
        Isso, por si só, não gera erro nenhum — o problema aparece depois, quando o
        código tenta <em>usar</em> esse valor como se fosse um elemento de verdade.
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
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">titulo.textContent = "Olá"</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">✖ TypeError: Cannot set properties of null (setting 'textContent')</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Repare na diferença: a primeira linha só retorna <code>null</code>, sem
        quebrar nada. O erro só acontece na segunda linha, quando o código tenta
        acessar <code>.textContent</code> de um valor que é <code>null</code>.
        Essa distinção — "retornar <code>null</code>" vs. "lançar um erro" — vai
        aparecer bastante ao longo do curso.
      </p>

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
        Para scripts clássicos externos que precisam acessar o DOM, uma abordagem
        comum é usar o atributo <code>defer</code> na tag <code>&lt;script&gt;</code>
        dentro do <code>&lt;head&gt;</code>. Com <code>defer</code>, o browser baixa
        o arquivo em paralelo enquanto continua fazendo o <em>parsing</em> do HTML
        — e só executa o script depois que todo o documento foi interpretado,
        antes do evento <code>DOMContentLoaded</code>.
      </p>
      <p>
        É o melhor dos dois mundos: o script vai para o <code>&lt;head&gt;</code>
        onde faz sentido semanticamente, não bloqueia o parsing do HTML, e o DOM
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
  <span class="syn-comment">&lt;!-- ordem entre múltiplos scripts async não é garantida — use só em scripts independentes --&gt;</span>
  &lt;<span class="syn-keyword">script</span> <span class="syn-property">src</span>=<span class="syn-string">"analytics.js"</span> <span class="syn-keyword">async</span>&gt;&lt;/<span class="syn-keyword">script</span>&gt;
&lt;/<span class="syn-keyword">head</span>&gt;</code></pre>
      </div>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">⏳</div>
          <h3>Sem atributo</h3>
          <p>Script clássico sem <code>defer</code> ou <code>async</code>: bloqueia o parsing do HTML, baixa e executa antes de continuar. Evite no <code>&lt;head&gt;</code> quando o script não precisa desse comportamento.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>
          <h3>defer</h3>
          <p>Baixa em paralelo, sem bloquear o parsing. Executa após o HTML completo. Ordem entre scripts preservada. <strong>Use este na maioria dos casos.</strong></p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>async</h3>
          <p>Baixa em paralelo. Executa assim que termina, sem esperar o HTML terminar de ser processado — por isso um script <code>async</code> também não deve assumir que o DOM inteiro já está disponível. Ordem não garantida entre múltiplos scripts async — ideal para scripts independentes como analytics.</p>
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


    <!-- ── 4.5. REPL vs Script: de onde vem aquele "undefined"? ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">REPL vs Script: de onde vem aquele "undefined"?</h2>
      <p>
        Se você já rodou <code>console.log("san")</code> no console do navegador, deve ter
        reparado em algo estranho: a mensagem aparece, e logo embaixo surge um
        <code>undefined</code> que ninguém pediu. Isso não é bug — é o comportamento normal
        do ambiente onde o console roda.
      </p>

      <p>
        <strong>Duas coisas independentes acontecem quando uma função roda:</strong>
        o que ela <em>faz</em> (efeito colateral, como imprimir algo na tela) e o que ela
        <em>devolve</em> (valor de retorno). Toda função em JavaScript sempre retorna algo,
        mesmo sem <code>return</code> escrito — nesse caso, o retorno padrão é
        <code>undefined</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">Console do navegador</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"san"</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log("san")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"san"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__expr">(valor retornado, exibido automaticamente pelo REPL)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undefined">undefined</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O console do navegador é um <strong>REPL</strong> — sigla para
        <em>Read-Eval-Print-Loop</em>: ele lê o que você digitou, avalia (executa), mostra o
        resultado da expressão e volta a esperar a próxima linha. O "Print" desse ciclo é
        justamente o que exibe o <code>undefined</code>: o REPL sempre mostra o
        <strong>valor de retorno</strong> de qualquer expressão que você roda, além de
        qualquer efeito colateral que ela tenha (como o print do próprio
        <code>console.log</code>).
      </p>

      <p>
        Repare que são dois "prints" diferentes acontecendo ali: o efeito colateral da
        função <code>console.log</code> (que manda <code>"san"</code> pra tela) e o "Print"
        do próprio REPL, que exibe o retorno da expressão inteira. Fora de um REPL, só o
        primeiro existe.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">Terminal — node app.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// app.js</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"san"</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Saída do terminal</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__expr">$ node app.js</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">san</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Mesmo código, mesma função, mesmo efeito colateral — <code>"san"</code> ainda é
        impresso. A diferença é que <strong>não existe REPL</strong> rodando um arquivo
        <code>.js</code> via <code>node app.js</code>: isso é execução em modo
        <em>script</em>. O motor do JavaScript ainda calcula o retorno da função por baixo
        dos panos (o <code>undefined</code> existe, sempre existe), mas nada exibe esse
        valor na tela — a menos que você peça explicitamente com outro
        <code>console.log()</code>.
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🔁</div>
          <h3>Ambiente REPL</h3>
          <p>Console do navegador, ou <code>node</code> sem arquivo (REPL do Node no terminal). Cada expressão digitada tem seu <strong>valor de retorno exibido automaticamente</strong>, além de qualquer efeito colateral.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📜</div>
          <h3>Modo script</h3>
          <p><code>node app.js</code>, ou qualquer arquivo <code>.js</code> executado direto. O motor do JS calcula o retorno normalmente, mas <strong>só exibe na tela</strong> o que for passado explicitamente para <code>console.log()</code>.</p>
        </div>
      </div>

      <p>
        Essa distinção fica ainda mais clara quando a função <em>tem</em> um
        <code>return</code> explícito, porque aí o valor retornado deixa de ser
        <code>undefined</code>:
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">Console do navegador — com e sem return</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">semReturn</span>() {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"oi"</span>)
}

<span class="syn-keyword">function</span> <span class="syn-fn">comReturn</span>() {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"oi"</span>)
  <span class="syn-keyword">return</span> <span class="syn-string">"valor real"</span>
}</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">semReturn()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"oi"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__expr">(retorno)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undefined">undefined</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">comReturn()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"oi"</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__expr">(retorno)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"valor real"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O efeito colateral (<code>"oi"</code> impresso) é idêntico nas duas funções. O que
        muda é só o retorno: sem <code>return</code>, o REPL mostra <code>undefined</code>;
        com <code>return "valor real"</code>, o REPL mostra exatamente esse valor. Em modo
        script (VS Code, <code>node app.js</code>), nenhum dos dois retornos apareceria na
        tela — só o <code>"oi"</code>.
      </p>
    </section>


    <!-- ── 5. Primeiro código real ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Primeiro código real</h2>
      <p>
        Chega de teoria. Aqui está um exemplo completo — um HTML mínimo com
        JavaScript que modifica a página depois que o HTML foi analisado.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// defer faz o script executar depois que o HTML foi completamente analisado</span>
<span class="syn-keyword">const</span> <span class="syn-id">titulo</span> <span class="syn-operator">=</span> <span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"titulo"</span>)
<span class="syn-keyword">const</span> <span class="syn-id">hora</span>   <span class="syn-operator">=</span> <span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"hora"</span>)

<span class="syn-id">titulo</span>.<span class="syn-property">textContent</span> <span class="syn-operator">=</span> <span class="syn-string">"Olá, mundo!"</span>
<span class="syn-id">hora</span>.<span class="syn-property">textContent</span>   <span class="syn-operator">=</span><span class="syn-string">&#96;Página carregada às &#36;{new Date().toLocaleTimeString()}&#96;</span></code></pre>

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
        Nesse exemplo, o script está no <code>&lt;head&gt;</code>. O <code>defer</code>
        garante que quando o <code>app.js</code> rodar, os elementos
        <code>#titulo</code> e <code>#hora</code> já existem no DOM. Sem esse
        atributo, com o script nessa posição, <code>getElementById</code>
        retornaria <code>null</code>. A tentativa de acessar
        <code>.textContent</code> nesse valor causaria um <code>TypeError</code>.
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

  `
}

// ── Injeção de outputs via DOM ────────────────────────────────────────────────

export function init() {
  const injetar = (id, valor) => {
    const el = document.getElementById(id)
    if (el) el.textContent = valor
  }

  // Console da seção 5 — valores reais capturados no momento do carregamento
  injetar("out-titulo", `"${titulo1}"`)
  injetar("out-hora", `"Página carregada às ${hora1}"`)
}