// src/content/fundamentos/01-introducao.js

// ── Valores usados nos exemplos ──────────────────────────────────────────────

const mensagem = "JavaScript roda sem compilação manual"

const nome = "Sanciweferson"
function saudar(n) {
  return "Olá, " + n
}

const nome1 = "Sanciweferson"
const saudar1 = (n1) => `Olá, ${n1}`

// Saída simulada de Node.js (não roda no browser — valores conhecidos)
const _node = {
  window: '"undefined"',
  document: '"undefined"',
  process: '"object"',
}

// ── Conteúdo HTML ─────────────────────────────────────────────────────────────

export function content() {
  return /* html */ `

    <!-- ── 1. O que é JavaScript ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é JavaScript?</h2>
      <p>
        JavaScript é uma linguagem de programação criada em 1995 por Brendan Eich
        enquanto trabalhava na Netscape — uma empresa de software americana,
        fundada em 1994 por Marc Andreessen e Jim Clark, famosa pelo navegador
        Netscape Navigator, que dominou a web nos anos 90, antes do Internet
        Explorer. O objetivo original era tornar as páginas web interativas,
        permitindo que respondessem a ações do usuário — como cliques e validação
        de formulários — diretamente no navegador.
      </p>
      <p>
        O que começou como um script criado em dez dias se tornou uma das linguagens
        de programação mais utilizadas do mundo. Hoje ela roda em browsers, servidores,
        dispositivos móveis, televisões e microcontroladores.
      </p>
      <p>
        Entender onde ela nasceu ajuda a entender por que ela funciona do jeito que
        funciona — inclusive as partes confusas.
      </p>

      <div class="lesson__callout">
        <span class="lesson__callout-icon">💡</span>
        <p>
          <strong>Curiosidade:</strong> a Netscape foi comprada pela AOL, e seu
          navegador deu origem, anos depois, ao Firefox — hoje mantido pela Mozilla.
        </p>
      </div>
    </section>


    <!-- ── 2. Como JavaScript é executado ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Como JavaScript é executado?</h2>
      <p>
        JavaScript não exige uma etapa de compilação manual e separada antes de rodar.
        O código é analisado, preparado e executado pela engine JavaScript do
        ambiente — browser ou Node.js.
      </p>
      <p>
        Engines modernas como o V8 utilizam diferentes técnicas para executar e
        otimizar o código. Entre elas está a <strong>compilação JIT
        (Just-In-Time compilation)</strong>, que pode compilar e otimizar partes
        do código durante a execução para melhorar a performance.
      </p>
      <p>
        Do ponto de vista do programador, a diferença é simples: você escreve o código
        e o ambiente se encarrega das etapas internas necessárias para executá-lo,
        sem que você precise realizar uma compilação manual.
      </p>
      <p>
        Isso tem uma consequência importante: muitos erros só aparecem em tempo de
        execução. Por isso entender o ambiente não é detalhe avançado — é base.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">exemplo.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1 0-2 2-2h10c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// JavaScript roda sem compilação manual</span>
<span class="syn-keyword">const</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript roda sem compilação manual"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(mensagem)</span>
              <span class="code-console__arrow">→</span>
              <span id="out-mensagem" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 3. Onde roda ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Onde JavaScript roda?</h2>
      <p>
        A linguagem JavaScript é essencialmente a mesma em diferentes ambientes.
        O que muda é o <strong>ambiente</strong> — e com ele, quais APIs e recursos
        estão disponíveis.
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>
          <h3>Browser</h3>
          <p>
            Chrome, Firefox e outros navegadores têm engines embutidas.
            Aqui você tem acesso ao DOM, eventos, fetch e APIs da web.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🖥️</div>
          <h3>Node.js</h3>
          <p>
            Executa JavaScript fora do navegador usando a engine V8, com
            acesso a sistema de arquivos, rede e processos do sistema
            operacional.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📱</div>
          <h3>Mobile</h3>
          <p>
            Com ferramentas como React Native é possível criar apps móveis
            nativos usando JavaScript.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🧩</div>
          <h3>Outros ambientes</h3>
          <p>
            Runtimes modernos como Bun e Deno, edge servers, desktops via
            Electron e até microcontroladores rodam JavaScript hoje.
          </p>
        </div>
      </div>

      <p>
        Essa distinção é essencial: <em>document</em> e <em>window</em> são
        APIs globais típicas do browser. No Node.js, <em>process</em> é global
        e módulos como <em>fs</em> fornecem acesso ao sistema de arquivos.
      </p>
      <p>
        No Node.js, <em>process</em> é uma variável <strong>global</strong>,
        disponível automaticamente em qualquer arquivo. Já módulos como
        <em>fs</em> (sistema de arquivos) precisam ser importados explicitamente,
        por exemplo: <code>const fs = require('fs')</code> ou
        <code>import fs from 'fs'</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">ambientes.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// No browser — window e document existem</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">window</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">document</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">process</span>)

<span class="syn-comment">// No Node.js — process existe, window e document não são globais</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">window</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">document</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">process</span>)</code></pre>

        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — browser</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof window</span>
              <span class="code-console__arrow">→</span>
              <span id="out-browser-window" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof document</span>
              <span class="code-console__arrow">→</span>
              <span id="out-browser-document" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof process</span>
              <span class="code-console__arrow">→</span>
              <span id="out-browser-process" class="syn-output-str"></span>
            </div>
          </div>
        </div>

        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — Node.js</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof window</span>
              <span class="code-console__arrow">→</span>
              <span id="out-node-window" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof document</span>
              <span class="code-console__arrow">→</span>
              <span id="out-node-document" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">typeof process</span>
              <span class="code-console__arrow">→</span>
              <span id="out-node-process" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. ECMAScript ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">JavaScript e ECMAScript</h2>
      <p>
        ECMAScript é a <strong>especificação</strong> que define a linguagem.
        Ela é desenvolvida pelo <strong>TC39</strong>, um comitê técnico da
        Ecma International, e recebe novas edições regularmente.
      </p>
      <p>
        Quando você vê termos como <strong>ES6</strong> ou <strong>ES2015</strong>,
        está vendo versões dessa especificação. Essa versão em particular trouxe
        mudanças fundamentais: <code>let</code>, <code>const</code>, arrow functions,
        classes, módulos e muito mais.
      </p>
      <p>
        <strong>ECMAScript</strong> é o nome da especificação; <strong>JavaScript</strong>
        é o nome pelo qual conhecemos a linguagem e suas implementações baseadas
        nessa especificação. O nome JavaScript é uma marca registrada da Oracle.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">es6-exemplos.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Antes do ES6 (ES5) — 2009</span>
<span class="syn-keyword">var</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Sanciweferson"</span>
<span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>(<span class="syn-id">n</span>) { <span class="syn-keyword">return</span> <span class="syn-string">"Olá, "</span> <span class="syn-operator">+</span> <span class="syn-id">n</span> }

<span class="syn-comment">// Com ES6 (ES2015) — sintaxe moderna</span>
<span class="syn-keyword">const</span> <span class="syn-id">nome1</span> <span class="syn-operator">=</span> <span class="syn-string">"Sanciweferson"</span>
<span class="syn-keyword">const</span> <span class="syn-id">saudar1</span> <span class="syn-operator">=</span> <span class="syn-id">n1</span> <span class="syn-operator">=></span> <span class="syn-string">${"`Olá, ${n1}`"}</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">saudar</span>(<span class="syn-id">nome</span>))
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">saudar1</span>(<span class="syn-id">nome1</span>))</code></pre>

        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">saudar(nome)</span>
              <span class="code-console__arrow">→</span>
              <span id="out-saudar" class="syn-output-str"></span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">saudar1(nome1)</span>
              <span class="code-console__arrow">→</span>
              <span id="out-saudar1" class="syn-output-str"></span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. Single-threaded ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">JavaScript é single-threaded</h2>
      <p>
        Uma característica fundamental do JavaScript no browser é que o código
        da página normalmente é executado em uma única thread
        <strong>principal</strong> (main thread). Isso significa que só uma
        tarefa de JavaScript é executada por vez nessa thread. Existem ferramentas
        como Web Workers que permitem executar JavaScript em threads separadas,
        para tarefas específicas.
      </p>
      <p>
        Enquanto um trecho de código está rodando na thread principal, outras tarefas
        que dependem dela precisam esperar — eventos de interação, atualizações da
        interface e outras operações de JavaScript na mesma thread.
        Se você bloquear essa thread, a página deixa de responder normalmente
        enquanto o código estiver executando.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">bloqueio.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ⚠️ Não faça isso em produção — bloqueia a página por 5s</span>
<span class="syn-keyword">const</span> <span class="syn-id">inicio</span> <span class="syn-operator">=</span> <span class="syn-fn">Date</span>.<span class="syn-fn">now</span>()

<span class="syn-keyword">while</span> (<span class="syn-fn">Date</span>.<span class="syn-fn">now</span>() <span class="syn-operator">-</span> <span class="syn-id">inicio</span> <span class="syn-operator">&lt;</span> <span class="syn-number">5000</span>) {
  <span class="syn-comment">// loop vazio bloqueando a thread principal</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"Desbloqueado após 5 segundos"</span>)</code></pre>

        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--warn">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">— 5 segundos de silêncio —</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(...)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"Desbloqueado após 5 segundos"</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        Por isso o JavaScript no browser tem um modelo de concorrência baseado
        em <strong>event loop</strong> e operações assíncronas. Vamos entender
        isso em detalhes no módulo de Async — mas é bom saber desde agora
        que bloquear a thread principal é sempre um problema para a responsividade
        da página.
      </p>
    </section>


    <!-- ── 6. Por que aprender do zero ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Por que aprender do zero?</h2>
      <p>
        Muitos cursos ensinam JavaScript mostrando apenas o que o código faz,
        sem explicar por que ele funciona assim.
      </p>
      <p>
        Isso cria um conhecimento superficial: você consegue copiar exemplos,
        mas trava quando algo sai do esperado. Você sabe o <em>como</em>, mas
        não o <em>porquê</em>.
      </p>
      <p>
        Aqui, o foco é diferente. Vamos entender o ambiente, o contexto de
        execução, o comportamento interno da linguagem — desde a base.
        Esse tipo de entendimento é o que separa quem depura de quem adivinha.
      </p>
    </section>


    <!-- ── 7. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Nas próximas aulas vamos aprofundar como o JavaScript é executado:
        o primeiro código no browser, como o motor lê seu arquivo, o que são
        erros e como lê-los, e como o contexto de execução funciona por dentro.
      </p>
      <p>
        Cada aula constrói sobre a anterior. Os fundamentos que você solidificar
        aqui vão aparecer em todo o resto do curso.
      </p>

      <p>
        <strong>Resumo da aula:</strong> JavaScript não exige compilação manual:
        o engine analisa, prepara e executa o código, podendo usar compilação JIT
        e outras otimizações. A linguagem roda em múltiplos ambientes com APIs
        diferentes, é baseada na especificação ECMAScript e, no browser, o código
        da página normalmente é executado na thread principal — daí a importância
        de entender concorrência mais adiante.
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

  // Console 1 — exemplo.js
  injetar("out-mensagem", `"${mensagem}"`)

  // Console 2 — ambientes.js (valores reais do browser atual)
  injetar("out-browser-window", `"${typeof window}"`)
  injetar("out-browser-document", `"${typeof document}"`)
  injetar("out-browser-process", `"${typeof process}"`)

  // Console 2 — ambientes.js (simulação Node.js — valores estáticos conhecidos)
  injetar("out-node-window", _node.window)
  injetar("out-node-document", _node.document)
  injetar("out-node-process", _node.process)

  // Console 3 — es6-exemplos.js
  injetar("out-saudar", `"${saudar(nome)}"`)
  injetar("out-saudar1", `"${saudar1(nome1)}"`)
}
