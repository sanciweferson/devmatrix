// src/content/fundamentos/05-comentarios.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que é um comentário ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é um comentário?</h2>
      <p>
        Comentários são trechos de texto ignorados pelo motor JavaScript.
        Eles existem apenas para quem lê o código — você no futuro, um
        colega de equipe, ou qualquer pessoa que precise entender o que
        aquele trecho faz.
      </p>
      <p>
        Em JavaScript existem dois tipos: comentário de linha e comentário
        de bloco.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">comentarios.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Comentário de linha — tudo após // é ignorado</span>
<span class="syn-keyword">const</span> <span class="syn-id">taxa</span> <span class="syn-operator">=</span> <span class="syn-number">0.1</span>  <span class="syn-comment">// 10% de taxa de serviço</span>

<span class="syn-comment">/*
  Comentário de bloco — útil para múltiplas linhas.
  Tudo entre /* e * / é ignorado pelo motor.
*/</span>
<span class="syn-keyword">function</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">preco</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">preco</span> <span class="syn-operator">*</span> (<span class="syn-number">1</span> <span class="syn-operator">+</span> <span class="syn-id">taxa</span>)
}</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">calcularTotal(100)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">110</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 2. Comentário bom vs comentário ruim ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comentário bom vs comentário ruim</h2>
      <p>
        A maior armadilha com comentários é usá-los para descrever
        <em>o que</em> o código faz — quando o próprio código já deveria
        deixar isso claro. Um comentário útil explica o <em>porquê</em>:
        a intenção, a restrição, a decisão que não está óbvia no código.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">comentario-ruim.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ✖ Comentários que repetem o código — ruído puro</span>

<span class="syn-comment">// incrementa i</span>
<span class="syn-id">i</span><span class="syn-operator">++</span>

<span class="syn-comment">// verifica se o usuário está logado</span>
<span class="syn-keyword">if</span> (<span class="syn-id">usuario</span>.<span class="syn-property">logado</span>) {

<span class="syn-comment">// retorna o dobro de x</span>
<span class="syn-keyword">return</span> <span class="syn-id">x</span> <span class="syn-operator">*</span> <span class="syn-number">2</span></code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">comentario-bom.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ✓ Comentários que explicam o porquê — valor real</span>

<span class="syn-comment">// Multiplicamos por 100 e arredondamos para evitar erros
// de ponto flutuante em cálculos financeiros.
// Ex: 0.1 + 0.2 === 0.30000000000000004 em JS</span>
<span class="syn-keyword">const</span> <span class="syn-id">totalCentavos</span> <span class="syn-operator">=</span> <span class="syn-id">Math</span>.<span class="syn-fn">round</span>(<span class="syn-id">preco</span> <span class="syn-operator">*</span> <span class="syn-number">100</span>)

<span class="syn-comment">// A API retorna datas em UTC — convertemos para o fuso
// do usuário apenas na exibição, nunca no armazenamento</span>
<span class="syn-keyword">const</span> <span class="syn-id">dataLocal</span> <span class="syn-operator">=</span> <span class="syn-keyword">new</span> <span class="syn-fn">Date</span>(<span class="syn-id">dataUTC</span>).<span class="syn-fn">toLocaleDateString</span>()

<span class="syn-comment">// usamos indexOf em vez de includes() por compatibilidade
// com a versão do Node usada no ambiente de produção (12.x)</span>
<span class="syn-keyword">const</span> <span class="syn-id">existe</span> <span class="syn-operator">=</span> <span class="syn-id">lista</span>.<span class="syn-fn">indexOf</span>(<span class="syn-id">item</span>) <span class="syn-operator">!==</span> <span class="syn-operator">-</span><span class="syn-number">1</span></code></pre>
      </div>

      <p>
        Se você precisar de um comentário para explicar o que uma linha faz,
        considere primeiro se o código poderia ser reescrito com um nome
        melhor. Um bom nome muitas vezes elimina a necessidade do comentário.
      </p>
    </section>


    <!-- ── 3. Quando comentários são essenciais ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Quando comentários são essenciais</h2>
      <p>
        Existem situações onde o comentário não é opcional — é parte da
        documentação do código e não pode ser substituído por um nome melhor.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">casos-essenciais.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// 1. Algoritmos não óbvios</span>
<span class="syn-comment">// Algoritmo de Luhn — valida números de cartão de crédito.
// Cada dígito par (da direita) é dobrado; se o resultado
// for maior que 9, subtrai 9. A soma total deve ser múltiplo de 10.</span>
<span class="syn-keyword">function</span> <span class="syn-fn">validarCartao</span>(<span class="syn-id">numero</span>) { <span class="syn-comment">/* ... */</span> }

<span class="syn-comment">// 2. Workarounds e bugs conhecidos</span>
<span class="syn-comment">// Bug do Safari 15: Date() não aceita formato "YYYY-MM-DD" corretamente.
// Substituímos hífens por barras como workaround temporário.
// Remover quando suporte ao Safari 15 for descontinuado.</span>
<span class="syn-keyword">const</span> <span class="syn-id">data</span> <span class="syn-operator">=</span> <span class="syn-keyword">new</span> <span class="syn-fn">Date</span>(<span class="syn-id">str</span>.<span class="syn-fn">replace</span>(<span class="syn-string">/-/g</span>, <span class="syn-string">"/"</span>))

<span class="syn-comment">// 3. Números mágicos</span>
<span class="syn-keyword">const</span> <span class="syn-id">TIMEOUT_MS</span> <span class="syn-operator">=</span> <span class="syn-number">3000</span>  <span class="syn-comment">// 3s — limite definido pelo contrato de SLA</span>

<span class="syn-comment">// 4. Decisões de design não óbvias</span>
<span class="syn-comment">// Usamos array em vez de Set aqui porque precisamos preservar
// a ordem de inserção e o índice para a animação de entrada.</span>
<span class="syn-keyword">const</span> <span class="syn-id">itens</span> <span class="syn-operator">=</span> []</code></pre>
      </div>
    </section>


    <!-- ── 4. Comentários como ferramenta temporária ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comentar código — uso temporário</h2>
      <p>
        Durante o desenvolvimento é comum comentar um trecho para testá-lo
        ou desativá-lo temporariamente. Isso é válido como ferramenta de
        trabalho — mas código comentado não deve entrar em produção nem
        ficar no repositório por muito tempo.
      </p>
      <p>
        Código comentado cria dúvida: isso ainda vai ser usado? Foi removido
        de propósito? Para isso existe o controle de versão — o Git guarda
        o histórico. Se você removeu algo, remova de verdade. O Git lembra.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">debug-temporario.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// ✓ Válido durante desenvolvimento — remover antes do commit</span>
<span class="syn-keyword">function</span> <span class="syn-fn">processarPedido</span>(<span class="syn-id">pedido</span>) {
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"[debug] pedido recebido:"</span>, <span class="syn-id">pedido</span>)   <span class="syn-comment">// remover</span>

  <span class="syn-keyword">const</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">pedido</span>)
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-string">"[debug] total calculado:"</span>, <span class="syn-id">total</span>)      <span class="syn-comment">// remover</span>

  <span class="syn-keyword">return</span> <span class="syn-fn">finalizarPedido</span>(<span class="syn-id">total</span>)
}

<span class="syn-comment">// ✖ Evite — código comentado sem contexto gera dúvida</span>
<span class="syn-keyword">function</span> <span class="syn-fn">calcularDesconto</span>(<span class="syn-id">preco</span>) {
  <span class="syn-comment">// const desconto = preco * 0.15</span>
  <span class="syn-comment">// return preco - desconto</span>
  <span class="syn-keyword">return</span> <span class="syn-id">preco</span> <span class="syn-operator">*</span> <span class="syn-number">0.85</span>
}</code></pre>
      </div>
    </section>


    <!-- ── 5. JSDoc — comentários que geram documentação ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">JSDoc — comentários que documentam funções</h2>
      <p>
        O padrão <strong>JSDoc</strong> é uma convenção de comentários de bloco
        que editores como o VS Code entendem. Com ele, você documenta parâmetros,
        tipos e o retorno de uma função — e o editor exibe essas informações
        ao passar o mouse sobre a chamada.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">jsdoc.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">/**
 * Calcula o valor total de um pedido com taxa de serviço.
 *
 * @param {number} preco      - Valor base do produto em reais
 * @param {number} quantidade - Quantidade de itens
 * @param {number} taxa       - Taxa de serviço (padrão: 0.1 = 10%)
 * @returns {number} Valor total já com a taxa aplicada
 */</span>
<span class="syn-keyword">function</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">preco</span>, <span class="syn-id">quantidade</span>, <span class="syn-id">taxa</span> <span class="syn-operator">=</span> <span class="syn-number">0.1</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">preco</span> <span class="syn-operator">*</span> <span class="syn-id">quantidade</span> <span class="syn-operator">*</span> (<span class="syn-number">1</span> <span class="syn-operator">+</span> <span class="syn-id">taxa</span>)
}

<span class="syn-comment">// O VS Code exibe a documentação ao passar o mouse sobre a chamada</span>
<span class="syn-keyword">const</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-number">49.90</span>, <span class="syn-number">3</span>)</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">calcularTotal(49.90, 3)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-num">164.67</span>
            </div>
          </div>
        </div>
      </div>

      <p>
        JSDoc é especialmente útil em funções públicas de bibliotecas ou módulos
        compartilhados. Para funções internas simples, um comentário de linha
        curto já é suficiente.
      </p>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Na próxima aula vamos falar sobre <strong>strict mode</strong> — uma
        diretiva que muda o comportamento do JavaScript, elimina armadilhas
        silenciosas e é ativada automaticamente em módulos ES6. Entender o
        que ele faz te ajuda a escrever código mais previsível desde o início.
      </p>
    </section>

  `;
}