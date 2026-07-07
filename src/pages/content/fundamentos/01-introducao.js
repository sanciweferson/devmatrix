// src/content/fundamentos/01-introducao.js

// ── Valores usados nos exemplos ──────────────────────────────────────────────

const mensagem = "JavaScript é interpretado"

const nome = "Sanciweferson"
function saudar(n) { return "Olá, " + n }

const nome1 = "Sanciweferson"
const saudar1 = n1 => `Olá, ${n1}`

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
        enquanto trabalhava na Netscape. O objetivo original era simples: permitir
        que páginas web respondessem a ações do usuário sem precisar recarregar a
        página inteira.
      </p>
      <p>
        O que começou como um script criado em dez dias se tornou a linguagem mais
        usada do mundo. Hoje ela roda em browsers, servidores, dispositivos móveis,
        televisões e microcontroladores.
      </p>
      <p>
        Entender onde ela nasceu ajuda a entender por que ela funciona do jeito que
        funciona — inclusive as partes confusas.
      </p>
    </section>


    <!-- ── 2. Interpretada vs compilada ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Uma linguagem interpretada</h2>
      <p>
        Diferente de linguagens como C ou Go, JavaScript não é compilado antes de
        rodar. O código é lido e executado diretamente pelo ambiente — browser ou
        Node.js — em tempo real.
      </p>
      <p>
        Engines modernas como o V8 usam uma técnica chamada <strong>JIT
        (Just-In-Time compilation)</strong>: o código é compilado durante a execução
        para melhorar performance. Mas do ponto de vista do programador, você escreve
        e o código roda — sem etapa de compilação manual.
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Este código roda direto — sem compilar antes</span>
<span class="syn-keyword">const</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript é interpretado"</span>
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
        A linguagem é a mesma em todo lugar. O que muda é o <strong>ambiente</strong>
        — e com ele, quais APIs estão disponíveis.
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
            Executa JavaScript fora do navegador, com acesso a sistema de
            arquivos, rede e processos do sistema operacional.
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
            Edge servers, desktops via Electron e até microcontroladores
            rodam JavaScript hoje.
          </p>
        </div>
      </div>

      <p>
        Essa distinção é essencial: <em>document</em> e <em>window</em> existem
        no browser. <em>fs</em> e <em>process</em> existem no Node.js. Nenhum
        dos dois existe no outro ambiente.
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

<span class="syn-comment">// No Node.js — process existe, window não</span>
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
        ECMAScript é a <strong>especificação</strong> que define como JavaScript
        funciona. Ela é mantida pela ECMA International e revisada anualmente.
      </p>
      <p>
        Quando você vê termos como <strong>ES6</strong> ou <strong>ES2015</strong>,
        está vendo versões dessa especificação. Essa versão em particular trouxe
        mudanças fundamentais: <code>let</code>, <code>const</code>, arrow functions,
        classes, módulos e muito mais.
      </p>
      <p>
        O nome JavaScript é uma marca registrada da Oracle — por isso a especificação
        usa o nome ECMAScript. Na prática, os dois termos se referem à mesma linguagem.
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

<span class="syn-comment es">// Com ES6 (ES2015) — mesma coisa, sintaxe moderna</span>
<span class="syn-keyword">const</span> <span class="syn-id">nome1</span> <span class="syn-operator">=</span> <span class="syn-string">"Sanciweferson"</span>
<span class="syn-keyword">const</span> <span class="syn-id">saudar1</span> <span class="syn-operator">=</span> <span class="syn-id">n1</span> <span class="syn-operator">=></span> <span class="syn-string">\`Olá, \${n1}\`</span>

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
        Uma característica fundamental do JavaScript é que ele roda em uma única
        thread. Isso significa que só uma coisa acontece por vez.
      </p>
      <p>
        Enquanto um trecho de código está rodando, nada mais roda —
        nenhum evento, nenhuma animação, nenhuma resposta do usuário.
        Se você travar essa thread, trava o browser inteiro.
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
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ⚠️ Não faça isso em produção — trava o browser por 5s</span>
<span class="syn-keyword">const</span> <span class="syn-id">inicio</span> <span class="syn-operator">=</span> <span class="syn-fn">Date</span>.<span class="syn-fn">now</span>()

<span class="syn-keyword">while</span> (<span class="syn-fn">Date</span>.<span class="syn-fn">now</span>() <span class="syn-operator">-</span> <span class="syn-id">inicio</span> <span class="syn-operator">&lt;</span> <span class="syn-number">5000</span>) {
  <span class="syn-comment">// loop vazio bloqueando a thread</span>
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
        Por isso o JavaScript tem um modelo de concorrência baseado em
        <strong>event loop</strong> e operações assíncronas. Vamos entender
        isso em detalhes no módulo de Async — mas é bom saber desde agora
        que bloquear a thread é sempre um problema.
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
  injetar('out-mensagem', `"${mensagem}"`)

  // Console 2 — ambientes.js (valores reais do browser atual)
  injetar('out-browser-window', `"${typeof window}"`)
  injetar('out-browser-document', `"${typeof document}"`)
  injetar('out-browser-process', `"${typeof process}"`)

  // Console 2 — ambientes.js (simulação Node.js — valores estáticos conhecidos)
  injetar('out-node-window', _node.window)
  injetar('out-node-document', _node.document)
  injetar('out-node-process', _node.process)

  // Console 3 — es6-exemplos.js
  injetar('out-saudar', `"${saudar(nome)}"`)
  injetar('out-saudar1', `"${saudar1(nome1)}"`)
}