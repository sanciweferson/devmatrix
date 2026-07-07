// src/content/fundamentos/10-modulos-externos.js

export function content() {
  return /* html */ `

    <!-- ── 1. O que são módulos ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que são módulos?</h2>
      <p>
        Um módulo é simplesmente um arquivo JavaScript que exporta coisas
        — funções, variáveis, classes — para que outros arquivos possam
        importar e usar. É o sistema oficial de organização de código do
        JavaScript moderno.
      </p>
      <p>
        Antes dos módulos ES6, o JavaScript não tinha um sistema nativo de
        organização. Tudo ficava no escopo global, arquivos dependiam de
        ordem de carregamento, e conflitos de nomes eram comuns. Os módulos
        resolveram esse problema de vez.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">utils.js — exportando</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// utils.js — exporta funções para outros arquivos usarem</span>
<span class="syn-keyword">export function</span> <span class="syn-fn">formatarMoeda</span>(<span class="syn-id">valor</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">valor</span>.<span class="syn-fn">toLocaleString</span>(<span class="syn-string">"pt-BR"</span>, {
    <span class="syn-property">style</span>: <span class="syn-string">"currency"</span>,
    <span class="syn-property">currency</span>: <span class="syn-string">"BRL"</span>
  })
}

<span class="syn-keyword">export function</span> <span class="syn-fn">formatarData</span>(<span class="syn-id">data</span>) {
  <span class="syn-keyword">return</span> <span class="syn-keyword">new</span> <span class="syn-fn">Date</span>(<span class="syn-id">data</span>).<span class="syn-fn">toLocaleDateString</span>(<span class="syn-string">"pt-BR"</span>)
}

<span class="syn-keyword">export const</span> <span class="syn-id">TAXA_SERVICO</span> <span class="syn-operator">=</span> <span class="syn-number">0.1</span></code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">app.js — importando</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-keyword">import</span> { <span class="syn-id">formatarMoeda</span>, <span class="syn-id">TAXA_SERVICO</span> } <span class="syn-keyword">from</span> <span class="syn-string">"./utils.js"</span>

<span class="syn-keyword">const</span> <span class="syn-id">preco</span> <span class="syn-operator">=</span> <span class="syn-number">149.90</span>
<span class="syn-keyword">const</span> <span class="syn-id">total</span> <span class="syn-operator">=</span> <span class="syn-id">preco</span> <span class="syn-operator">*</span> (<span class="syn-number">1</span> <span class="syn-operator">+</span> <span class="syn-id">TAXA_SERVICO</span>)

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">formatarMoeda</span>(<span class="syn-id">total</span>))</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">formatarMoeda(total)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"R$ 164,89"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 2. Export default vs named ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Export default vs named exports</h2>
      <p>
        Existem dois tipos de export: <strong>named</strong> (nomeado) e
        <strong>default</strong>. Um módulo pode ter quantos named exports
        quiser, mas apenas um default export.
      </p>
      <p>
        Named exports são importados com chaves e o nome exato.
        Default exports são importados sem chaves e podem receber qualquer
        nome na importação.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">carrinho.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Named exports — exportados com nome fixo</span>
<span class="syn-keyword">export function</span> <span class="syn-fn">adicionarItem</span>(<span class="syn-id">carrinho</span>, <span class="syn-id">item</span>) {
  <span class="syn-keyword">return</span> [...<span class="syn-id">carrinho</span>, <span class="syn-id">item</span>]
}

<span class="syn-keyword">export function</span> <span class="syn-fn">removerItem</span>(<span class="syn-id">carrinho</span>, <span class="syn-id">id</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">carrinho</span>.<span class="syn-fn">filter</span>(<span class="syn-id">i</span> <span class="syn-operator">=></span> <span class="syn-id">i</span>.<span class="syn-property">id</span> <span class="syn-operator">!==</span> <span class="syn-id">id</span>)
}

<span class="syn-comment">// Default export — a exportação principal do módulo</span>
<span class="syn-keyword">export default function</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">carrinho</span>) {
  <span class="syn-keyword">return</span> <span class="syn-id">carrinho</span>.<span class="syn-fn">reduce</span>((<span class="syn-id">acc</span>, <span class="syn-id">item</span>) <span class="syn-operator">=></span> <span class="syn-id">acc</span> <span class="syn-operator">+</span> <span class="syn-id">item</span>.<span class="syn-property">preco</span>, <span class="syn-number">0</span>)
}</code></pre>
      </div>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">checkout.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Default import — sem chaves, qualquer nome</span>
<span class="syn-keyword">import</span> <span class="syn-id">calcularTotal</span> <span class="syn-keyword">from</span> <span class="syn-string">"./carrinho.js"</span>

<span class="syn-comment">// Named imports — com chaves, nome exato</span>
<span class="syn-keyword">import</span> { <span class="syn-id">adicionarItem</span>, <span class="syn-id">removerItem</span> } <span class="syn-keyword">from</span> <span class="syn-string">"./carrinho.js"</span>

<span class="syn-comment">// Os dois juntos</span>
<span class="syn-keyword">import</span> <span class="syn-id">calcularTotal</span>, { <span class="syn-id">adicionarItem</span> } <span class="syn-keyword">from</span> <span class="syn-string">"./carrinho.js"</span></code></pre>
      </div>
    </section>


    <!-- ── 3. Importando de bibliotecas externas ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Importando de bibliotecas externas</h2>
      <p>
        Além de módulos locais, você pode importar código de pacotes
        instalados via npm. A sintaxe é a mesma — a diferença é que
        o caminho é o nome do pacote, não um caminho relativo.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">app.js — imports de pacotes npm</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Caminho relativo → módulo local</span>
<span class="syn-keyword">import</span> { <span class="syn-id">formatarMoeda</span> } <span class="syn-keyword">from</span> <span class="syn-string">"./utils.js"</span>

<span class="syn-comment">// Nome do pacote → biblioteca do node_modules</span>
<span class="syn-keyword">import</span> _ <span class="syn-keyword">from</span> <span class="syn-string">"lodash"</span>
<span class="syn-keyword">import</span> { <span class="syn-id">format</span> } <span class="syn-keyword">from</span> <span class="syn-string">"date-fns"</span>
<span class="syn-keyword">import</span> <span class="syn-id">axios</span> <span class="syn-keyword">from</span> <span class="syn-string">"axios"</span>

<span class="syn-comment">// Alias — renomeia o import para evitar conflito</span>
<span class="syn-keyword">import</span> { <span class="syn-id">format</span> <span class="syn-keyword">as</span> <span class="syn-id">formatDate</span> } <span class="syn-keyword">from</span> <span class="syn-string">"date-fns"</span>

<span class="syn-comment">// Namespace import — importa tudo como um objeto</span>
<span class="syn-keyword">import</span> * <span class="syn-keyword">as</span> <span class="syn-id">utils</span> <span class="syn-keyword">from</span> <span class="syn-string">"./utils.js"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">utils</span>.<span class="syn-fn">formatarMoeda</span>(<span class="syn-number">100</span>))</code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">utils.formatarMoeda(100)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-str">"R$ 100,00"</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 4. Dynamic import ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Dynamic import — carregamento sob demanda</h2>
      <p>
        Os imports que vimos até agora são estáticos — declarados no topo
        do arquivo e carregados antes de qualquer código rodar. O
        <strong>dynamic import</strong> carrega um módulo sob demanda,
        retornando uma Promise. É útil para carregar código pesado só
        quando necessário.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">lazy-load.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// Carrega o módulo de gráficos só quando o usuário clica em "ver relatório"</span>
<span class="syn-keyword">async function</span> <span class="syn-fn">abrirRelatorio</span>() {
  <span class="syn-comment">// import() retorna uma Promise — o módulo só é baixado aqui</span>
  <span class="syn-keyword">const</span> { <span class="syn-id">renderizarGrafico</span> } <span class="syn-operator">=</span> <span class="syn-keyword">await</span> <span class="syn-keyword">import</span>(<span class="syn-string">"./graficos.js"</span>)
  <span class="syn-fn">renderizarGrafico</span>(<span class="syn-id">dados</span>)
}

<span class="syn-id">document</span>.<span class="syn-fn">getElementById</span>(<span class="syn-string">"btn-relatorio"</span>)
  .<span class="syn-fn">addEventListener</span>(<span class="syn-string">"click"</span>, <span class="syn-id">abrirRelatorio</span>)</code></pre>
      </div>

      <p>
        Bundlers como o Vite entendem o dynamic import e fazem
        <strong>code splitting</strong> automaticamente — o módulo é
        empacotado em um arquivo separado e só baixado quando a função
        é chamada. Menos código na carga inicial, página mais rápida.
      </p>
    </section>


    <!-- ── 5. Módulos têm escopo próprio ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Módulos têm escopo próprio</h2>
      <p>
        Cada módulo tem seu próprio escopo. Variáveis declaradas em um
        módulo não vazam para o escopo global — ficam privadas a menos
        que sejam explicitamente exportadas. Isso elimina o problema de
        conflito de nomes que existia antes dos módulos.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">escopo-modulo.js</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// config.js</span>
<span class="syn-keyword">const</span> <span class="syn-id">API_KEY</span> <span class="syn-operator">=</span> <span class="syn-string">"chave-privada-123"</span>    <span class="syn-comment">// privado — não exportado</span>
<span class="syn-keyword">export const</span> <span class="syn-id">BASE_URL</span> <span class="syn-operator">=</span> <span class="syn-string">"https://api.exemplo.com"</span>  <span class="syn-comment">// público</span>

<span class="syn-comment">// Em qualquer outro arquivo:</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">API_KEY</span>)   <span class="syn-comment">// ✖ ReferenceError — não está disponível</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">window</span>.<span class="syn-property">API_KEY</span>)   <span class="syn-comment">// ✖ undefined — não vazou para o global</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Console</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(API_KEY)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">ReferenceError: API_KEY is not defined</span>
            </div>
            <div class="code-console__line">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">console.log(window.API_KEY)</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-undef">undefined</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. O que vem a seguir ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Na última aula deste módulo vamos ter uma visão geral do
        <strong>ecossistema JavaScript</strong> — npm, bundlers, runtimes
        e como todas essas peças se encaixam no dia a dia de um projeto
        real. É o mapa que vai contextualizar tudo que você aprendeu
        até aqui.
      </p>
    </section>

  `;
}