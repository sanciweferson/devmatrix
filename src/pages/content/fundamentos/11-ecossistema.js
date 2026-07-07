// src/content/fundamentos/11-ecossistema.js

export function content() {
  return /* html */ `

    <!-- ── 1. O ecossistema ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O ecossistema JavaScript</h2>
      <p>
        JavaScript não é só uma linguagem — é um ecossistema inteiro de
        ferramentas, runtimes, gerenciadores de pacotes e convenções que
        evoluíram ao longo de décadas. Entender esse mapa é essencial para
        navegar em qualquer projeto real.
      </p>
      <p>
        Nessa aula vamos fazer um tour pelas peças principais: o que cada
        uma faz, por que existe, e como elas se conectam.
      </p>
    </section>


    <!-- ── 2. Runtimes ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Runtimes — onde o JavaScript roda</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">🌐</div>
          <h3>Browser</h3>
          <p>
            O ambiente original. Cada browser tem seu motor: V8 no Chrome,
            SpiderMonkey no Firefox, JavaScriptCore no Safari. Além do motor,
            o browser fornece APIs web: DOM, fetch, localStorage, WebSockets.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🖥️</div>
          <h3>Node.js</h3>
          <p>
            Criado em 2009, usa o V8 fora do browser. Adiciona APIs de sistema:
            fs, http, path, process. É onde backends, CLIs e scripts rodam.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>Deno</h3>
          <p>
            Criado pelo mesmo autor do Node.js em 2018. TypeScript nativo,
            permissões explícitas, sem node_modules. Ainda menos adotado
            que o Node, mas ganhando espaço.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔥</div>
          <h3>Bun</h3>
          <p>
            Runtime moderno focado em velocidade. Motor JavaScriptCore,
            bundler e test runner embutidos. Compatível com a maioria
            dos pacotes npm.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 3. npm e gerenciamento de pacotes ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">npm — o repositório de pacotes</h2>
      <p>
        O <strong>npm</strong> (Node Package Manager) é o maior repositório
        de código aberto do mundo. Qualquer biblioteca JavaScript publicada
        está lá — mais de 2 milhões de pacotes. Você instala, atualiza e
        remove dependências com comandos simples.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">terminal</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment"># Inicializa um projeto — cria o package.json</span>
npm init -y

<span class="syn-comment"># Instala uma dependência de produção</span>
npm install date-fns

<span class="syn-comment"># Instala uma dependência de desenvolvimento</span>
npm install --save-dev vite

<span class="syn-comment"># Remove um pacote</span>
npm uninstall lodash

<span class="syn-comment"># Instala tudo listado no package.json (após clonar um projeto)</span>
npm install</code></pre>
      </div>

      <p>
        O <code>package.json</code> é o arquivo central do projeto — lista
        todas as dependências, scripts e metadados. O
        <code>package-lock.json</code> trava as versões exatas instaladas,
        garantindo que todos do time usem o mesmo código.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">package.json</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code">{
  <span class="syn-string">"name"</span>: <span class="syn-string">"meu-projeto"</span>,
  <span class="syn-string">"version"</span>: <span class="syn-string">"1.0.0"</span>,
  <span class="syn-string">"scripts"</span>: {
    <span class="syn-string">"dev"</span>:     <span class="syn-string">"vite"</span>,
    <span class="syn-string">"build"</span>:   <span class="syn-string">"vite build"</span>,
    <span class="syn-string">"preview"</span>: <span class="syn-string">"vite preview"</span>
  },
  <span class="syn-string">"dependencies"</span>: {
    <span class="syn-string">"date-fns"</span>: <span class="syn-string">"^3.6.0"</span>
  },
  <span class="syn-string">"devDependencies"</span>: {
    <span class="syn-string">"vite"</span>: <span class="syn-string">"^5.0.0"</span>
  }
}</code></pre>
      </div>
    </section>


    <!-- ── 4. Bundlers ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Bundlers — empacotando o código</h2>
      <p>
        Um <strong>bundler</strong> pega todos os seus arquivos JavaScript,
        CSS e assets, resolve as dependências e gera arquivos otimizados
        para produção. Sem ele, você teria centenas de requisições de rede
        para carregar cada módulo separadamente.
      </p>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">⚡</div>
          <h3>Vite</h3>
          <p>
            O mais moderno. Dev server extremamente rápido usando ES Modules
            nativos. Build de produção com Rollup. É o que esta plataforma usa.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>webpack</h3>
          <p>
            O mais antigo e ainda mais usado em produção. Extremamente
            configurável. Mais lento no dev, mas maduro e com ecossistema
            enorme.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔄</div>
          <h3>Rollup</h3>
          <p>
            Especializado em bibliotecas. Gera bundles menores e mais limpos.
            O Vite usa o Rollup por baixo para o build de produção.
          </p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🚀</div>
          <h3>esbuild</h3>
          <p>
            Escrito em Go — absurdamente rápido. Usado por dentro do Vite
            para transformações durante o desenvolvimento.
          </p>
        </div>
      </div>
    </section>


    <!-- ── 5. TypeScript ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">TypeScript — JavaScript com tipos</h2>
      <p>
        O <strong>TypeScript</strong> é um superset de JavaScript desenvolvido
        pela Microsoft. Você escreve JavaScript com anotações de tipo — e o
        compilador do TypeScript verifica os tipos antes de gerar JavaScript
        puro.
      </p>
      <p>
        Não é uma linguagem separada — é JavaScript com uma camada de
        verificação em cima. Todo JavaScript válido é TypeScript válido.
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">pedido.ts</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">// TypeScript — tipos explícitos</span>
<span class="syn-keyword">interface</span> <span class="syn-id">Produto</span> {
  <span class="syn-property">id</span>:    <span class="syn-id">number</span>
  <span class="syn-property">nome</span>:  <span class="syn-id">string</span>
  <span class="syn-property">preco</span>: <span class="syn-id">number</span>
}

<span class="syn-keyword">function</span> <span class="syn-fn">calcularTotal</span>(<span class="syn-id">itens</span>: <span class="syn-id">Produto</span>[]): <span class="syn-id">number</span> {
  <span class="syn-keyword">return</span> <span class="syn-id">itens</span>.<span class="syn-fn">reduce</span>((<span class="syn-id">acc</span>, <span class="syn-id">item</span>) <span class="syn-operator">=></span> <span class="syn-id">acc</span> <span class="syn-operator">+</span> <span class="syn-id">item</span>.<span class="syn-property">preco</span>, <span class="syn-number">0</span>)
}

<span class="syn-comment">// O compilador detecta erros antes de rodar</span>
<span class="syn-fn">calcularTotal</span>(<span class="syn-string">"notebook"</span>)
<span class="syn-comment">// ✖ Argument of type 'string' is not assignable to parameter of type 'Produto[]'</span></code></pre>
        <div class="code-console">
          <div class="code-console__header">
            <span class="code-console__label">Compilador TypeScript</span>
          </div>
          <div class="code-console__body">
            <div class="code-console__line code-console__line--error">
              <span class="code-console__prompt">›</span>
              <span class="code-console__expr">calcularTotal("notebook")</span>
              <span class="code-console__arrow">→</span>
              <span class="syn-output-error">Type 'string' is not assignable to type 'Produto[]'</span>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- ── 6. O mapa completo ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">O mapa completo</h2>
      <p>
        Veja como todas as peças se encaixam em um projeto real:
      </p>

      <div class="code-block">
        <div class="code-block__header">
          <span class="code-block__filename">fluxo de um projeto moderno</span>
          <button class="code-block__copy" type="button">
            <span class="code-block__copy-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </span>
            <span class="code-block__copy-label">Copiar</span>
          </button>
        </div>
        <pre class="code-block__pre"><code class="code-block__code"><span class="syn-comment">/*
  DESENVOLVIMENTO:

  Você escreve → TypeScript / JavaScript (ES Modules)
  npm install  → instala dependências do node_modules
  npm run dev  → Vite inicia o dev server
                 esbuild transforma os arquivos em tempo real
                 browser recebe ES Modules nativos via HTTP

  BUILD DE PRODUÇÃO:

  npm run build → Vite chama o Rollup
                  Rollup resolve todos os imports
                  Minifica JS e CSS
                  Gera arquivos em /dist prontos para deploy

  DEPLOY:

  /dist → servidor estático (Vercel, Netlify, S3...)
          browser baixa os arquivos empacotados
          JavaScript roda no motor do browser
*/</span></code></pre>
      </div>
    </section>


    <!-- ── 7. Conclusão do módulo ── -->
    <section class="lesson__section">
      <h2 class="lesson__section-title">Fim do módulo — o que vem a seguir</h2>
      <p>
        Você completou o módulo de Fundamentos. Agora você sabe como
        JavaScript nasceu, como o motor o executa, como erros funcionam,
        o que é strict mode, como os contextos de execução e escopos se
        estruturam, e como o ecossistema moderno é organizado.
      </p>
      <p>
        Esses fundamentos aparecem em todo o resto do curso. Cada módulo
        que vem a seguir — variáveis, funções, objetos, async — vai
        construir em cima do que você aprendeu aqui.
      </p>
      <p>
        O próximo módulo é <strong>Variáveis &amp; Tipos</strong> — onde
        vamos aprofundar como o JavaScript representa e interpreta dados,
        coerção de tipos, e as diferenças que importam na prática.
      </p>
    </section>

  `;
}