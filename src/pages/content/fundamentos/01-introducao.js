// src/content/fundamentos/01-introducao.js
//
// MDM JavaScript — Fundamentos
// Aula 1: Introdução ao JavaScript
//
// Arquitetura:
//   _node    — saídas simuladas do ambiente Node.js
//   _h       — helpers de markup compartilhados
//   content() — composição final do HTML
//   init()   — resolução dos outputs data-out
//
// Dependências:
//   @/pages/content/_shared/code-block.js
//
// O botão "Copiar" é gerenciado globalmente pelo sistema [data-copy].

import { _h } from "@/pages/content/_shared/code-block.js"

// ── Valores usados nos exemplos ──────────────────────────────────────────────

const mensagem = "JavaScript roda sem compilação manual"

const nome = "Sanciweferson"

function saudar(nome) {
  return "Olá, " + nome
}

const nomeModerno = "Sanciweferson"

const saudarModerno = (nome) => `Olá, ${nome}`

// ── Saídas simuladas do Node.js ───────────────────────────────────────────────
//
// Este arquivo é executado no navegador.
//
// Por isso, as informações referentes ao Node.js abaixo são representadas
// estaticamente para fins didáticos. Não estamos executando Node.js dentro
// desta página.

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
        <strong>JavaScript</strong> é uma linguagem de programação criada em
        <strong>1995</strong> por <strong>Brendan Eich</strong>, enquanto
        trabalhava na Netscape, empresa responsável pelo navegador
        Netscape Navigator.
      </p>

      <p>
        A linguagem foi criada originalmente para adicionar comportamento e
        interatividade às páginas web, permitindo que elas respondessem às
        ações do usuário, como cliques, preenchimento de formulários e outras
        interações diretamente no navegador.
      </p>

      <p>
        O que começou como uma linguagem criada em poucos dias se tornou uma
        das linguagens de programação mais utilizadas do mundo. Atualmente,
        JavaScript pode ser executado em navegadores, servidores, aplicações
        desktop, dispositivos móveis e diversos outros ambientes.
      </p>

      <p>
        Apesar de ter surgido no navegador, JavaScript não está limitado ao
        navegador. A linguagem pode ser executada em diferentes ambientes
        porque existem diferentes implementações e runtimes capazes de
        executar código JavaScript.
      </p>

      <div class="lesson__callout">
        <span class="lesson__callout-icon">💡</span>

        <p>
          <strong>Curiosidade:</strong> JavaScript foi criado originalmente
          para o Netscape Navigator. Posteriormente, a linguagem foi
          padronizada como <strong>ECMAScript</strong>, especificação que
          define suas regras fundamentais.
        </p>
      </div>

      <details class="lesson__deepdive">

        <summary class="lesson__deepdive-summary">
          Aprofundando: Netscape, Mozilla e Firefox
        </summary>

        <div class="lesson__deepdive-body">

          <p>
            A Netscape foi uma das empresas responsáveis pela popularização
            da Web durante os anos 1990. Seu navegador, o Netscape Navigator,
            teve grande importância na primeira fase da Web comercial.
          </p>

          <p>
            Em 1998, a Netscape iniciou a abertura do código de seu navegador,
            dando origem ao projeto Mozilla. Esse projeto posteriormente
            contribuiu para o surgimento do Firefox.
          </p>

          <p>
            Essa história é importante principalmente para entender a origem
            do JavaScript. Os detalhes sobre a evolução dos navegadores não
            são necessários para compreender a linguagem.
          </p>

        </div>

      </details>

    </section>


    <!-- ── 2. Como JavaScript é executado ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Como JavaScript é executado?
      </h2>

      <p>
        JavaScript não exige que o programador execute manualmente uma etapa
        separada de compilação antes de executar um arquivo. O ambiente de
        execução recebe o código e uma <strong>JavaScript engine</strong>
        fica responsável por processá-lo e executá-lo.
      </p>

      <p>
        Isso não significa que JavaScript nunca seja compilado. Engines
        modernas utilizam diferentes técnicas de processamento, incluindo
        interpretação, compilação e otimizações durante a execução.
      </p>

      <p>
        Uma dessas técnicas é a
        <strong>compilação JIT (Just-In-Time)</strong>, que permite que a
        engine compile determinadas partes do código durante a execução,
        aplicando otimizações com base no comportamento observado.
      </p>

      <p>
        Portanto, dizer que JavaScript "não precisa ser compilado" significa
        que o programador normalmente não precisa realizar manualmente uma
        etapa separada de compilação da linguagem antes de executar o código.
      </p>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">🧠</span>

        <p>
          <strong>Não confunda duas coisas:</strong>
          ferramentas de desenvolvimento podem transformar o código antes
          da execução, enquanto a própria engine possui mecanismos internos
          para analisar, interpretar, compilar e otimizar JavaScript.
        </p>

      </div>

      <p>
        Em projetos modernos, ferramentas como
        <strong>Vite</strong>, <strong>Babel</strong> e
        <strong>TypeScript</strong> também podem transformar, agrupar ou
        compilar código antes que ele chegue à engine. Essa etapa faz parte
        do fluxo de desenvolvimento e não muda o fato de que a execução
        final acontece em uma engine JavaScript.
      </p>

      ${_h.block(
        "exemplo.js",
        /* html */ `
<span class="syn-comment">// JavaScript roda sem uma etapa manual de compilação</span>
<span class="syn-keyword">const</span> <span class="syn-id">mensagem</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript roda sem compilação manual"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">mensagem</span>)`,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "console.log(mensagem)",
                key: "mensagem",
              },
            ],
          },
        ],
      )}

    </section>


    <!-- ── 3. O modelo mental ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        O modelo mental: linguagem, engine e runtime
      </h2>

      <p>
        Antes de continuar, é importante separar quatro conceitos que
        frequentemente são confundidos: <strong>JavaScript</strong>,
        <strong>ECMAScript</strong>, <strong>engine</strong> e
        <strong>runtime</strong>.
      </p>

      <div class="lesson__cards">

        <div class="lesson__card">
          <div class="lesson__card-icon">🟨</div>
          <h3>JavaScript</h3>
          <p>
            É o nome pelo qual a linguagem de programação é conhecida.
            Ela é padronizada principalmente pela especificação ECMAScript.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">📘</div>
          <h3>ECMAScript</h3>
          <p>
            É a especificação que define regras, sintaxe, tipos, objetos,
            funções e outros recursos fundamentais da linguagem.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">⚙️</div>
          <h3>Engine</h3>
          <p>
            É o software responsável por implementar e executar JavaScript.
            Exemplos incluem V8, SpiderMonkey e JavaScriptCore.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">🌍</div>
          <h3>Runtime</h3>
          <p>
            É o ambiente de execução que inclui uma engine e outros recursos
            e APIs necessários para executar aplicações.
          </p>
        </div>

      </div>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">🔑</span>

        <p>
          <strong>Guarde este modelo:</strong>
          ECMAScript define a especificação.
          Uma <strong>engine</strong> implementa e executa a linguagem.
          Um <strong>runtime</strong> fornece a engine junto com outros
          recursos necessários para executar aplicações em determinado
          ambiente.
        </p>

      </div>

    </section>


    <!-- ── 4. Onde JavaScript roda ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Onde JavaScript roda?
      </h2>

      <p>
        JavaScript pode ser executado em diferentes ambientes. O que muda
        de um ambiente para outro não é a essência da linguagem, mas os
        recursos e APIs disponibilizados pelo <strong>runtime</strong>.
      </p>

      <div class="lesson__cards">

        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>
          <h3>Browser</h3>
          <p>
            Navegadores como Chrome, Firefox e Safari possuem engines
            JavaScript e fornecem Web APIs, como DOM, eventos, timers e
            <code>fetch</code>.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">🖥️</div>
          <h3>Node.js</h3>
          <p>
            Executa JavaScript fora do navegador utilizando a engine V8
            e fornece APIs próprias para arquivos, rede, processos e
            outros recursos do sistema.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">📱</div>
          <h3>Mobile</h3>
          <p>
            Tecnologias como React Native permitem utilizar JavaScript
            para desenvolver aplicações móveis integradas aos recursos
            da plataforma.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">🧩</div>
          <h3>Outros ambientes</h3>
          <p>
            Runtimes como Bun e Deno, aplicações desktop e ambientes
            especializados também podem executar JavaScript.
          </p>
        </div>

      </div>

      <p>
        Isso leva a uma distinção fundamental:
        <strong>JavaScript não é o navegador.</strong>
      </p>

      <p>
        A linguagem JavaScript fornece suas próprias regras e recursos.
        O navegador fornece recursos adicionais por meio de APIs específicas
        do ambiente.
      </p>

      <p>
        Por exemplo, <code>window</code>, <code>document</code>, DOM,
        eventos e diversas outras <strong>Web APIs</strong> são fornecidos
        pelo ambiente do navegador e não constituem a linguagem JavaScript
        em si.
      </p>

      <p>
        Da mesma forma, o Node.js fornece APIs próprias para trabalhar com
        recursos que não pertencem ao ambiente de páginas web.
      </p>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">💡</span>

        <p>
          <strong>Exemplo:</strong>
          a linguagem JavaScript não precisa saber o que é um arquivo do
          computador para existir. O Node.js fornece APIs que permitem que
          programas JavaScript trabalhem com arquivos.
        </p>

      </div>

    </section>


    <!-- ── 5. Browser × Node.js ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Browser × Node.js
      </h2>

      <p>
        O mesmo código JavaScript pode encontrar ambientes diferentes.
        Por isso, determinados objetos globais e APIs podem existir em um
        ambiente e não existir em outro.
      </p>

      <p>
        No navegador, objetos como <code>window</code> e
        <code>document</code> estão associados ao ambiente de páginas web.
      </p>

      <p>
        No Node.js, esses objetos não fazem parte do ambiente global padrão.
        Em compensação, o Node.js fornece objetos e APIs próprios, como
        <code>process</code>.
      </p>

      <p>
        O exemplo abaixo mostra a mesma consulta feita em dois ambientes
        diferentes.
      </p>

      ${_h.block(
        "ambientes.js",
        /* html */ `
<span class="syn-comment">// Estas consultas podem ser executadas em ambientes diferentes</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">window</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">document</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">process</span>)`,
        [
          {
            label: "Console — Browser",
            linhas: [
              {
                expr: "typeof window",
                key: "browser.window",
              },
              {
                expr: "typeof document",
                key: "browser.document",
              },
              {
                expr: "typeof process",
                key: "browser.process",
              },
            ],
          },
          {
            label: "Console — Node.js",
            linhas: [
              {
                expr: "typeof window",
                key: "node.window",
              },
              {
                expr: "typeof document",
                key: "node.document",
              },
              {
                expr: "typeof process",
                key: "node.process",
              },
            ],
          },
        ],
      )}

      <p>
        No navegador atual, normalmente veremos:
      </p>

      <ul>
        <li><code>typeof window</code> → <code>"object"</code></li>
        <li><code>typeof document</code> → <code>"object"</code></li>
        <li><code>typeof process</code> → <code>"undefined"</code></li>
      </ul>

      <p>
        No Node.js, normalmente veremos:
      </p>

      <ul>
        <li><code>typeof window</code> → <code>"undefined"</code></li>
        <li><code>typeof document</code> → <code>"undefined"</code></li>
        <li><code>typeof process</code> → <code>"object"</code></li>
      </ul>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">⚠️</span>

        <p>
          <strong>Observação:</strong>
          ferramentas de desenvolvimento podem alterar o ambiente de execução,
          por exemplo, fornecendo polyfills ou compatibilidade para determinadas
          APIs. Por isso, o comportamento de alguns objetos pode variar conforme
          a configuração do projeto.
        </p>

      </div>

    </section>


    <!-- ── 6. JavaScript e ECMAScript ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        JavaScript e ECMAScript
      </h2>

      <p>
        <strong>ECMAScript</strong> é a especificação que define grande parte
        das regras fundamentais da linguagem JavaScript.
      </p>

      <p>
        A especificação é padronizada pela
        <strong>Ecma International</strong> e desenvolvida pelo
        <strong>TC39</strong>, um comitê técnico responsável pela evolução
        da linguagem.
      </p>

      <p>
        Quando você encontra nomes como <strong>ES6</strong> ou
        <strong>ES2015</strong>, está se referindo a uma edição da especificação
        ECMAScript. ES2015 foi uma atualização especialmente importante porque
        introduziu recursos como <code>let</code>, <code>const</code>,
        arrow functions, classes, módulos e muitos outros recursos.
      </p>

      <div class="lesson__cards">

        <div class="lesson__card">
          <div class="lesson__card-icon">📘</div>
          <h3>ECMAScript</h3>
          <p>
            Especificação que define as regras e os recursos fundamentais
            da linguagem.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">🟨</div>
          <h3>JavaScript</h3>
          <p>
            Nome pelo qual a linguagem é conhecida e implementada por
            diferentes engines.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">⚙️</div>
          <h3>Engine</h3>
          <p>
            Software que implementa e executa JavaScript.
            Exemplos: V8, SpiderMonkey e JavaScriptCore.
          </p>
        </div>

        <div class="lesson__card">
          <div class="lesson__card-icon">🌍</div>
          <h3>Runtime</h3>
          <p>
            Ambiente de execução que reúne uma engine e outros recursos
            necessários para executar aplicações.
          </p>
        </div>

      </div>

      <p>
        Apesar da semelhança no nome, <strong>JavaScript e Java são
        linguagens diferentes</strong>. Uma não é uma versão da outra.
      </p>

      ${_h.block(
        "es2015-exemplos.js",
        /* html */ `
<span class="syn-comment">// Antes do ES2015 (ES6)</span>
<span class="syn-keyword">var</span> <span class="syn-id">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Sanciweferson"</span>

<span class="syn-keyword">function</span> <span class="syn-fn">saudar</span>(<span class="syn-id">nome</span>) {
  <span class="syn-keyword">return</span> <span class="syn-string">"Olá, "</span> <span class="syn-operator">+</span> <span class="syn-id">nome</span>
}

<span class="syn-comment">// Com ES2015 (ES6)</span>
<span class="syn-keyword">const</span> <span class="syn-id">nomeModerno</span> <span class="syn-operator">=</span> <span class="syn-string">"Sanciweferson"</span>

<span class="syn-keyword">const</span> <span class="syn-id">saudarModerno</span> <span class="syn-operator">=</span> (<span class="syn-id">nome</span>) <span class="syn-operator">=&gt;</span> <span class="syn-string">\`Olá, \${nome}\`</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">saudar</span>(<span class="syn-id">nome</span>))
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">saudarModerno</span>(<span class="syn-id">nomeModerno</span>))`,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "saudar(nome)",
                key: "saudar",
              },
              {
                expr: "saudarModerno(nomeModerno)",
                key: "saudarModerno",
              },
            ],
          },
        ],
      )}

    </section>


    <!-- ── 7. JavaScript e a main thread ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        JavaScript e a main thread do navegador
      </h2>

      <p>
        No navegador, o código JavaScript principal de uma página normalmente
        é executado na <strong>main thread</strong>, também chamada de thread
        principal.
      </p>

      <p>
        Uma thread pode executar uma sequência de instruções. Enquanto um
        trecho de JavaScript síncrono está ocupando a main thread, outras
        tarefas que dependem dela precisam esperar.
      </p>

      <p>
        Isso é importante porque a main thread também participa de tarefas
        relacionadas à interação e à atualização da página. Um código
        excessivamente pesado pode prejudicar a responsividade da interface.
      </p>

      <p>
        Isso não significa que JavaScript seja incapaz de utilizar outras
        threads. No navegador, por exemplo, <strong>Web Workers</strong>
        permitem executar JavaScript em threads separadas da main thread.
      </p>

      ${_h.block(
        "bloqueio.js",
        /* html */ `
<span class="syn-comment">// ⚠️ Não faça isso em produção — bloqueia a página</span>
<span class="syn-keyword">const</span> <span class="syn-id">inicio</span> <span class="syn-operator">=</span> <span class="syn-fn">Date</span>.<span class="syn-fn">now</span>()

<span class="syn-keyword">while</span> (<span class="syn-fn">Date</span>.<span class="syn-fn">now</span>() <span class="syn-operator">-</span> <span class="syn-id">inicio</span> <span class="syn-operator">&lt;</span> <span class="syn-number">5000</span>) {
  <span class="syn-comment">// Loop ocupado bloqueando a main thread</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"Desbloqueado após 5 segundos"</span>)`,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "— 5 segundos de silêncio —",
                cls: "code-console__line--warn",
              },
              {
                expr: "console.log(...)",
                key: "bloqueio",
              },
            ],
          },
        ],
      )}

      <p>
        Esse comportamento está relacionado ao modelo de concorrência do
        ambiente. No navegador, o <strong>event loop</strong> coordena a
        execução de tarefas JavaScript com mecanismos assíncronos fornecidos
        pelo ambiente.
      </p>

      <p>
        O funcionamento detalhado do event loop, das filas de tarefas,
        das Promises e das operações assíncronas será estudado posteriormente
        no módulo de <strong>Async</strong>.
      </p>

    </section>


    <!-- ── 8. Por que aprender os fundamentos ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Por que aprender os fundamentos?
      </h2>

      <p>
        Aprender JavaScript apenas por meio de exemplos prontos pode fazer
        com que você saiba repetir determinadas soluções sem compreender
        completamente por que elas funcionam.
      </p>

      <p>
        Quando algo inesperado acontece, esse conhecimento superficial pode
        dificultar a depuração. Você conhece o <em>como</em>, mas ainda não
        entende o <em>porquê</em>.
      </p>

      <p>
        O objetivo desta documentação é construir esse entendimento
        progressivamente: primeiro observando o comportamento, depois
        entendendo as regras e, por fim, estudando os mecanismos que ajudam
        a explicar esse comportamento.
      </p>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">🧠</span>

        <p>
          <strong>Objetivo do MDM JavaScript:</strong>
          não apenas mostrar o código que funciona, mas explicar por que
          ele funciona e o que acontece quando o código é executado.
        </p>

      </div>

    </section>


    <!-- ── 9. O que vem a seguir ── -->
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        O que vem a seguir?
      </h2>

      <p>
        Nas próximas aulas vamos começar a executar código JavaScript de forma
        mais prática e observar como o ambiente reage ao programa.
      </p>

      <p>
        Depois, vamos aprofundar progressivamente conceitos como
        <strong>Parsing</strong>, <strong>AST</strong>,
        <strong>Execution Context</strong>,
        <strong>Lexical Environment</strong>,
        <strong>Scope</strong> e <strong>Hoisting</strong>.
      </p>

      <p>
        Esses conceitos não serão apresentados todos de uma vez. Cada aula
        acrescentará uma nova camada ao modelo mental construído anteriormente.
      </p>

      <p>
        Essa sequência será especialmente importante quando começarmos a
        estudar <code>var</code>, <code>let</code> e <code>const</code>,
        porque muitas diferenças entre eles só ficam realmente claras quando
        entendemos escopo, contexto de execução, ambiente léxico e hoisting.
      </p>

      <div class="lesson__callout">

        <span class="lesson__callout-icon">🚀</span>

        <p>
          <strong>Você não precisa decorar tudo nesta aula.</strong>
          O objetivo principal é construir o mapa. As próximas aulas vão
          preencher cada parte desse mapa com mais detalhes.
        </p>

      </div>

      <p>
        <strong>Resumo da aula:</strong>
        JavaScript é uma linguagem de programação padronizada principalmente
        pela especificação ECMAScript. Uma engine implementa e executa
        JavaScript, enquanto um runtime fornece a engine e outros recursos
        necessários para executar aplicações em determinado ambiente.
      </p>

      <p>
        JavaScript não exige uma etapa manual separada de compilação antes
        da execução. Engines modernas podem utilizar interpretação,
        compilação JIT e outras técnicas de otimização. Ferramentas de
        desenvolvimento também podem transformar o código antes que ele
        seja executado pela engine.
      </p>

      <p>
        No navegador, recursos como DOM, <code>window</code>,
        <code>document</code>, eventos e outras Web APIs são fornecidos
        pelo ambiente. No Node.js existem APIs e objetos próprios do runtime.
      </p>

      <p>
        No navegador, o código JavaScript principal normalmente é executado
        na main thread, embora Web Workers permitam executar JavaScript em
        threads separadas.
      </p>

    </section>

  `
}

// ── Inicialização ─────────────────────────────────────────────────────────────
//
// O helper _h.block() gera:
//
//   <span class="syn-output" data-out="..."></span>
//
// O init() resolve esses elementos depois que o conteúdo da página
// foi inserido no DOM.
//
// O botão "Copiar" NÃO é tratado aqui.
// Ele permanece sob responsabilidade do sistema global [data-copy].

export function init() {
  const injetar = (key, valor) => {
    const elementos = document.querySelectorAll(`[data-out="${key}"]`)

    if (!elementos.length) {
      if (
        typeof console !== "undefined" &&
        typeof console.warn === "function"
      ) {
        console.warn(
          `[01-introducao] elemento [data-out="${key}"] não encontrado ao injetar saída.`,
        )
      }

      return
    }

    elementos.forEach((el) => {
      el.textContent = valor
    })
  }

  // ── Console 1 — exemplo.js ────────────────────────────────────────────────

  injetar("mensagem", `"${mensagem}"`)

  // ── Console 2 — ambientes.js ─────────────────────────────────────────────
  //
  // Valores reais do navegador atual.
  //
  // Em um navegador comum, sem polyfill ou outra ferramenta que forneça
  // process, typeof process normalmente retorna "undefined".

  injetar("browser.window", `"${typeof window}"`)

  injetar("browser.document", `"${typeof document}"`)

  injetar("browser.process", `"${typeof process}"`)

  // ── Simulação Node.js ─────────────────────────────────────────────────────
  //
  // Valores estáticos porque esta página está sendo executada no navegador.

  injetar("node.window", _node.window)

  injetar("node.document", _node.document)

  injetar("node.process", _node.process)

  // ── Console 3 — es2015-exemplos.js ────────────────────────────────────────

  injetar("saudar", `"${saudar(nome)}"`)

  injetar("saudarModerno", `"${saudarModerno(nomeModerno)}"`)

  // ── Console 4 — bloqueio.js ───────────────────────────────────────────────

  injetar("bloqueio", `"Desbloqueado após 5 segundos"`)
}



