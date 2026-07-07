// src/content/fundamentos/04-erros-e-console.js

export function content() {
  return /* html */ `

    <!-- ── 1. Por que erros são seus aliados ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Erros são informação, não falha</h2>
      <p>
        Todo desenvolvedor experiente aprendeu a ler erros com atenção — não
        a ignorá-los. Um erro bem lido te diz exatamente o que quebrou, em qual
        arquivo e em qual linha. É o motor te ajudando a depurar.
      </p>
      <p>
        O problema é que no início a mensagem parece intimidadora. Nessa aula
        vamos dissecar os tipos de erro mais comuns, aprender a ler o stack trace
        e usar o console do browser como ferramenta real de trabalho.
      </p>
    </section>


    <!-- ── 2. Os três tipos de erro ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Os quatros tipos de erro</h2>
      <p>
        No JavaScript existem quatros categorias de erro. Entender a diferença
        entre eles acelera muito o processo de depuração.
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🔴</div>
          <h3>SyntaxError</h3>
          <p>
            O código está escrito de forma inválida. O motor detecta na fase
            de parsing — antes de executar qualquer linha.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🟠</div>
          <h3>ReferenceError</h3>
          <p>
            Você tentou usar uma variável que não existe no escopo atual.
            Acontece em tempo de execução.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🟡</div>
          <h3>TypeError</h3>
          <p>
            Você tentou fazer uma operação em um valor do tipo errado —
            como chamar algo que não é função, ou acessar propriedade de
            <code>null</code>.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔵</div>
          <h3>RangeError</h3>
          <p>
            Um valor está fora do intervalo permitido — como criar um array
            com tamanho negativo ou causar recursão infinita.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 3. SyntaxError ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">SyntaxError — código inválido</h2>
      <p>
        Um <code>SyntaxError</code> significa que o motor não conseguiu nem
        interpretar o código. É como entregar um texto com erros de gramática
        tão graves que o leitor não consegue nem processar a frase.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">syntax-error.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Parêntese sem fechar</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"olá")</span>

<span class="syn-comment">// Vírgula sobrando no objeto</span>
<span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span>, }  <span class="syn-comment">// ← isso é válido em JS moderno</span>
<span class="syn-keyword">const</span> <span class="syn-id">ok</span>   <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span> <span class="syn-property">idade</span>: <span class="syn-number">30</span> }  <span class="syn-comment">// ← isso não — falta vírgula</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
        
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">parsing</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">SyntaxError: Unexpected identifier 'idade'</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O motor aponta a linha onde <em>percebeu</em> o problema — que nem sempre
        é onde você cometeu o erro. Um parêntese não fechado na linha 10 pode
        gerar um erro apontando para a linha 15. Olhe sempre para as linhas
        anteriores ao erro.
      </p>
    </section>


    <!-- ── 4. ReferenceError ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">ReferenceError — variável inexistente</h2>
      <p>
        Um <code>ReferenceError</code> acontece quando você tenta usar um
        identificador que o motor não consegue encontrar no escopo atual.
        Causas mais comuns: typo no nome, variável fora do escopo, ou
        uso antes da declaração com <code>let</code>/<code>const</code>.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">reference-error.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Typo no nome da variável</span>
<span class="syn-keyword">const</span> <span class="syn-id">usuario</span> <span class="syn-operator">=</span> <span class="syn-string">"Ana"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">usario</span>)   <span class="syn-comment">// ← faltou o "u"</span>

<span class="syn-comment">// Variável fora do escopo</span>
<span class="syn-keyword">function</span> <span class="syn-fn">calcular</span>() {
  <span class="syn-keyword">const</span> <span class="syn-id">resultado</span> <span class="syn-operator">=</span> <span class="syn-number">42</span>
}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">resultado</span>)   <span class="syn-comment">// ← resultado só existe dentro de calcular()</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(usario)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: usario is not defined</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(resultado)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: resultado is not defined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 5. TypeError ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">TypeError — operação no tipo errado</h2>
      <p>
        O <code>TypeError</code> é o mais comum no dia a dia. Acontece quando
        você tenta fazer algo que o tipo do valor não suporta — chamar
        <code>undefined</code> como função, acessar propriedade de
        <code>null</code>, ou iterar sobre algo que não é iterável.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">type-error.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Chamar undefined como função</span>
<span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span> }
<span class="syn-id">user</span>.<span class="syn-fn">saudar</span>()   <span class="syn-comment">// saudar não existe em user — é undefined</span>

<span class="syn-comment">// Acessar propriedade de null</span>
<span class="syn-keyword">const</span> <span class="syn-id">elemento</span> <span class="syn-operator">=</span> <span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"nao-existe"</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">elemento</span>.<span class="syn-property">textContent</span>)   <span class="syn-comment">// elemento é null</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">user.saudar()</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: user.saudar is not a function</span>
            </div>
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">elemento.textContent</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">TypeError: Cannot read properties of null</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O <code>TypeError: Cannot read properties of null</code> é provavelmente
        o erro mais visto por qualquer dev JavaScript. Quase sempre significa que
        um <code>getElementById</code>, <code>querySelector</code> ou fetch
        retornou <code>null</code> porque o elemento não existe ou o dado
        ainda não chegou.
      </p>
    </section>


    <!-- ── 6. Lendo o stack trace ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Lendo o stack trace</h2>
      <p>
        Quando um erro acontece, o browser exibe o <strong>stack trace</strong> —
        a pilha de chamadas que levou até o erro. Leia de baixo para cima:
        a linha de baixo é onde tudo começou, a de cima é onde quebrou.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">stack-trace.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">function</span> <span class="syn-fn">renderizarPerfil</span>(<span class="syn-id">user</span>) {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">user</span>.<span class="syn-property">nome</span>.<span class="syn-fn">toUpperCase</span>())  <span class="syn-comment">// ← quebra aqui se nome for null</span>
}

<span class="syn-keyword">function</span> <span class="syn-fn">carregarUser</span>() {
  <span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-nullish">null</span> }   <span class="syn-comment">// API retornou null no nome</span>
  <span class="syn-fn">renderizarPerfil</span>(<span class="syn-id">user</span>)
}

<span class="syn-fn">carregarUser</span>()</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console — stack trace completo</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">TypeError: Cannot read properties of null (reading 'toUpperCase')</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt"> </span>
              <span class="code-console__expr">at renderizarPerfil (app.js:2)</span>
              <span class="code-console__arrow">←</span>
              <span class="syn-output">onde quebrou</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt"> </span>
              <span class="code-console__expr">at carregarUser (app.js:7)</span>
              <span class="code-console__arrow">←</span>
              <span class="syn-output">quem chamou</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt"> </span>
              <span class="code-console__expr">at app.js:10</span>
              <span class="code-console__arrow">←</span>
              <span class="syn-output">onde tudo começou</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        O stack trace te diz: o erro aconteceu em <code>renderizarPerfil</code>
        na linha 2, que foi chamado por <code>carregarUser</code> na linha 7,
        que foi chamado globalmente na linha 10. Com essa informação você vai
        direto ao ponto — sem adivinhar.
      </p>
    </section>


    <!-- ── 7. O console como ferramenta ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O console como ferramenta real</h2>
      <p>
        Além do <code>console.log</code>, o browser oferece métodos que tornam
        a depuração muito mais eficiente.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">console-avancado.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">const</span> <span class="syn-id">pedido</span> <span class="syn-operator">=</span> {
  <span class="syn-property">id</span>: <span class="syn-number">1042</span>,
  <span class="syn-property">cliente</span>: <span class="syn-string">"Ana"</span>,
  <span class="syn-property">itens</span>: [<span class="syn-string">"notebook"</span>, <span class="syn-string">"mouse"</span>],
  <span class="syn-property">total</span>: <span class="syn-number">2490</span>
}

<span class="syn-comment">// log simples — imprime o objeto</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">pedido</span>)

<span class="syn-comment">// table — muito melhor para arrays de objetos</span>
<span class="syn-fn">console</span>.<span class="syn-fn">table</span>([<span class="syn-id">pedido</span>])

<span class="syn-comment">// group — agrupa logs relacionados</span>
<span class="syn-fn">console</span>.<span class="syn-fn">group</span>(<span class="syn-string">"Pedido #1042"</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"cliente:"</span>, <span class="syn-id">pedido</span>.<span class="syn-property">cliente</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"total:"</span>, <span class="syn-id">pedido</span>.<span class="syn-property">total</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">groupEnd</span>()

<span class="syn-comment">// time — mede quanto tempo um trecho leva</span>
<span class="syn-fn">console</span>.<span class="syn-fn">time</span>(<span class="syn-string">"processamento"</span>)
<span class="syn-comment">// ... código a medir ...</span>
<span class="syn-fn">console</span>.<span class="syn-fn">timeEnd</span>(<span class="syn-string">"processamento"</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(pedido)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">{ id: 1042, cliente: "Ana", itens: [...], total: 2490 }</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.table([pedido])</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">tabela com colunas id | cliente | itens | total</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">▶ Pedido #1042</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt"> </span>
              <span class="code-console__expr">cliente: Ana</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt"> </span>
              <span class="code-console__expr">total: 2490</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">processamento</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output">0.42ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 8. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora você sabe ler erros, interpretar o stack trace e usar o console
        como ferramenta de depuração. Na próxima aula vamos falar sobre
        comentários — quando usá-los, quando evitá-los, e o que diferencia
        um comentário útil de ruído no código.
      </p>
    </section>

  `;
}