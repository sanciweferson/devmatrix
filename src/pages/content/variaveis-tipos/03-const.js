// src/pages/content/fundamentos/03-const.js
//
// Arquitetura:
//   _dados      — IIFE que calcula e retorna todos os valores por seção
//   _secoes     — objeto com uma função por seção retornando HTML
//   _helpers    — funções puras de markup reutilizáveis
//   content()   — compõe _secoes em ordem numa única string
//   initConst() — resolve data-out="chave.subchave" automaticamente via DOM
//
// Convenção data-out:
//
//   initConst() lê _dados.decl.pi e injeta textContent + classe automaticamente.
//
//   Formato do valor em _dados:
//     { text, cls } → aplica texto e classe
//     string        → aplica apenas texto
//
// Observação:
//   Este arquivo é um ES Module e, portanto, executa em strict mode.
//   Isso é relevante para os exemplos de const e Object.freeze() — inclusive
//   para os eval() abaixo, que herdam o strict mode do escopo que os chama.

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS — markup puro, sem lógica de negócio
// ═══════════════════════════════════════════════════════════════════════════════

const _h = {
  // Botão reutilizável de copiar código
  btn_copy: /* html */ `
    <button class="code-block__copy" type="button">
      <span class="code-block__copy-icon">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect width="14" height="14" x="8" y="8" rx="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      </span>

      <span class="code-block__copy-label">Copiar</span>
    </button>
  `,

  // Header do bloco de código
  header: (filename) => /* html */ `
    <div class="code-block__header">
      <span class="code-block__filename">${filename}</span>
      ${_h.btn_copy}
    </div>
  `,

  // Console visual
  //
  // label  — texto do header do console
  // linhas — array de:
  //   {
  //     expr, // expressão exibida
  //     key,  // chave data-out
  //     cls   // classe extra opcional
  //   }
  //
  // Exemplo:
  //   {
  //     expr: 'PI',
  //     key: 'decl.pi'
  //   }
  //
  console: (label, linhas) => /* html */ `
    <div class="code-console">

      <div class="code-console__header">
        <span class="code-console__label">${label}</span>
      </div>

      <div class="code-console__body">
        ${linhas
          .map(
            ({ expr, key, cls = "" }) => /* html */ `
          <div class="code-console__line ${cls}">
            <span class="code-console__expr">
              › ${expr}
            </span>

            <span
              class="code-console__output"
              data-out="${key}"
            ></span>
          </div>
        `,
          )
          .join("")}
      </div>

    </div>
  `,

  // Bloco completo:
  // header + código + consoles opcionais
  block: (filename, code, consoles = []) => /* html */ `
    <div class="code-block">

      ${_h.header(filename)}

      <pre class="code-block__pre"><code class="code-block__code">${code}</code></pre>

      ${consoles
        .map((consoleData) => _h.console(consoleData.label, consoleData.linhas))
        .join("")}

    </div>
  `,
}

// ═══════════════════════════════════════════════════════════════════════════════
// DADOS — IIFE que calcula todos os valores e retorna objeto estruturado
//
// Cada folha pode ser:
//
//   string pura
//     → textContent = valor
//
//   { text, cls }
//     → textContent = text
//     → adiciona cls ao elemento
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {
  // ── Formatadores de saída ──────────────────────────────────────────────────

  const str = (v) => ({
    text: `"${v}"`,
    cls: "syn-output-str",
  })

  const num = (v) => ({
    text: String(v),
    cls: "syn-output-num",
  })

  const bool = (v) => ({
    text: String(v),
    cls: "syn-output-bool",
  })

  const err = (v) => ({
    text: v,
    cls: "syn-output-error",
  })

  const raw = (v) => ({
    text: v,
    cls: "",
  })

  // Executa fn() e devolve "Nome: mensagem" do erro capturado, ou null
  // se não lançar. Centraliza o padrão try/catch repetido nas demos de
  // erro abaixo (reatribuição, TDZ, freeze etc).
  const captureErr = (fn) => {
    try {
      fn()
      return null
    } catch (e) {
      return `${e.name}: ${e.message}`
    }
  }

  // ── 1. Declaração básica ──────────────────────────────────────────────────

  const PI = 3.14159
  const VERSAO = "ES2015"

  // ── 2. Sem reatribuição ───────────────────────────────────────────────────
  //
  // A tentativa é executada dentro de eval() para que o erro não
  // interrompa a execução deste módulo.

  const reatrib_erro = captureErr(() => {
    eval("const _x = 1; _x = 2")
  })

  // ── 3. Obrigatoriedade de valor inicial ───────────────────────────────────
  //
  // "const MAX" é SyntaxError durante o parsing.
  // Portanto, não pode ser colocado diretamente neste módulo para
  // ser capturado por try/catch.
  //
  // O erro é representado como dado estático para a demonstração.

  const sem_init_erro = "SyntaxError: Missing initializer in const declaration"

  // ── 4. TDZ — igual ao let ─────────────────────────────────────────────────

  const tdz_erro = captureErr(() => {
    void _tdz_const
    const _tdz_const = "tarde"
  })

  // ── 5. Sem redeclaração ───────────────────────────────────────────────────
  //
  // Redeclaração lexical é erro de parsing.
  // Assim como no caso de "const MAX", o erro é representado
  // estaticamente para não invalidar este módulo.

  const redecl_erro = "SyntaxError: Identifier 'MAX' has already been declared"

  // ── 6. Escopo de bloco ────────────────────────────────────────────────────

  let bloco_capturado

  {
    const _bc = "só no bloco"
    bloco_capturado = _bc
  }

  const bloco_erro = captureErr(() => {
    void _bc
  })

  // ── 7. Objeto — referência constante, propriedades mutáveis ───────────────

  const _user = {
    nome: "Ana",
    idade: 25,
  }

  const obj_antes_nome = _user.nome
  const obj_antes_idade = _user.idade

  // Propriedades podem ser alteradas.
  _user.nome = "Carlos"
  _user.idade = 30

  const obj_depois_nome = _user.nome
  const obj_depois_idade = _user.idade

  // Tentativa de reatribuir a variável inteira.
  const obj_reatrib_erro = captureErr(() => {
    eval("const u = {}; u = {}")
  })

  // ── 8. Array — referência constante, conteúdo mutável ────────────────────

  const _arr = [1, 2, 3]

  const arr_antes = JSON.stringify(_arr)

  _arr.push(4)
  _arr[0] = 99

  const arr_depois = JSON.stringify(_arr)

  const arr_reatrib_erro = captureErr(() => {
    eval("const a = []; a = []")
  })

  // ── 9. Object.freeze() — propriedades não podem ser alteradas ────────────
  //
  // Como este arquivo é um ES Module, strict mode está ativo.
  // Portanto, tentar alterar uma propriedade congelada lança TypeError.

  const _frozen = Object.freeze({
    x: 10,
    y: 20,
  })

  const frozen_antes_x = _frozen.x

  const frozen_strict_err = captureErr(() => {
    _frozen.x = 999
  })

  const frozen_depois_x = _frozen.x

  // ── 10. Object.freeze() é superficial ─────────────────────────────────────

  const _deep = Object.freeze({
    config: {
      debug: false,
    },
  })

  // O objeto externo está congelado, mas "config" não.
  _deep.config.debug = true

  const deep_debug = _deep.config.debug

  // ── Retorno estruturado ───────────────────────────────────────────────────

  return {
    decl: {
      pi: num(PI),
      versao: str(VERSAO),
    },

    reatrib: {
      erro: err(reatrib_erro),
    },

    sem_init: {
      erro: err(sem_init_erro),
    },

    tdz: {
      erro: err(tdz_erro),
    },

    redecl: {
      erro: err(redecl_erro),
    },

    bloco: {
      dentro: str(bloco_capturado),
      fora: err(bloco_erro),
    },

    obj: {
      antes_nome: str(obj_antes_nome),
      antes_idade: num(obj_antes_idade),

      depois_nome: str(obj_depois_nome),
      depois_idade: num(obj_depois_idade),

      reatrib_erro: err(obj_reatrib_erro),
    },

    arr: {
      antes: raw(arr_antes),
      depois: raw(arr_depois),

      reatrib_erro: err(arr_reatrib_erro),
    },

    freeze: {
      antes_x: num(frozen_antes_x),
      depois_x: num(frozen_depois_x),

      strict_err: err(frozen_strict_err),

      deep_debug: bool(deep_debug),
    },
  }
})()

// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {
  // ── 1. Introdução ─────────────────────────────────────────────────────────

  introducao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        const — valores que não mudam de referência
      </h2>

      <p>
        <code>const</code> foi introduzido junto com <code>let</code> no ES6.
        Compartilha com ele o escopo de bloco, a TDZ e a proibição de
        redeclaração.
        A diferença principal é que <code>const</code> não permite
        reatribuição.
      </p>

      <p>
        Uma variável <code>const</code> precisa ser inicializada na declaração
        e não pode receber um novo valor depois. Mas — e esse é o ponto mais
        importante da aula — isso não significa imutabilidade.
        Um objeto declarado com <code>const</code> ainda pode ter suas
        propriedades alteradas.
      </p>

      <p>
        Pense em <code>const</code> como uma associação que não pode apontar
        para outro valor.
      </p>

      ${_h.block(
        "declaracao.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">PI</span>     <span class="syn-operator">=</span> <span class="syn-number">3.14159</span>
<span class="syn-keyword">const</span> <span class="syn-id">VERSAO</span> <span class="syn-operator">=</span> <span class="syn-string">"ES2015"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">PI</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">VERSAO</span>)
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "PI",
                key: "decl.pi",
              },
              {
                expr: "VERSAO",
                key: "decl.versao",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 2. Sem reatribuição ───────────────────────────────────────────────────

  reatribuicao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Sem reatribuição
      </h2>

      <p>
        Tentar atribuir um novo valor a uma variável <code>const</code>
        lança um <code>TypeError</code> em runtime.
        Isso é diferente da redeclaração, que é um
        <code>SyntaxError</code> detectado antes da execução.
      </p>

      ${_h.block(
        "reatribuicao.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"original"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)

<span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"alterado"</span>   <span class="syn-comment">// ✖ TypeError</span>
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: 'status = "alterado"',
                key: "reatrib.erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 3. Obrigatoriedade de valor inicial ───────────────────────────────────

  sem_init: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Valor inicial é obrigatório
      </h2>

      <p>
        Uma declaração <code>const</code> precisa receber um valor no momento
        da declaração. Como <code>const</code> não permite reatribuição,
        não existe uma etapa posterior para fornecer esse valor.
      </p>

      <p>
        O motor detecta a ausência do inicializador durante a análise
        sintática e lança um <code>SyntaxError</code> antes da execução.
      </p>

      ${_h.block(
        "sem-init.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span>   <span class="syn-comment">// ✖ SyntaxError — const sem valor inicial</span>

<span class="syn-keyword">let</span>   <span class="syn-id">total</span> <span class="syn-comment">// ✓ let pode — undefined até atribuição</span>
<span class="syn-keyword">var</span>   <span class="syn-id">count</span> <span class="syn-comment">// ✓ var pode — undefined até atribuição</span>
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "const MAX",
                key: "sem_init.erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 4. TDZ ────────────────────────────────────────────────────────────────

  tdz: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        TDZ — igual ao let
      </h2>

      <p>
        <code>const</code> segue as mesmas regras de TDZ que
        <code>let</code>.
        A variável existe no ambiente léxico desde o início do bloco,
        mas permanece não inicializada até a execução da declaração.
      </p>

      <p>
        Qualquer acesso antes da inicialização lança
        <code>ReferenceError</code>.
      </p>

      ${_h.block(
        "tdz.js",
        /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">LIMITE</span>)          <span class="syn-comment">// ✖ ReferenceError — TDZ</span>

<span class="syn-keyword">const</span> <span class="syn-id">LIMITE</span> <span class="syn-operator">=</span> <span class="syn-number">100</span>
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: 'LIMITE <span class="syn-comment">// antes da declaração</span>',
                key: "tdz.erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 5. Sem redeclaração ───────────────────────────────────────────────────

  redeclaracao: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Sem redeclaração
      </h2>

      <p>
        Assim como <code>let</code>, uma variável <code>const</code>
        não pode ser redeclarada no mesmo escopo.
        Isso gera um <code>SyntaxError</code>.
      </p>

      <p>
        A regra também impede misturar <code>let</code> e
        <code>const</code> usando o mesmo identificador no mesmo escopo.
      </p>

      ${_h.block(
        "redeclaracao.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">100</span>
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">200</span>   <span class="syn-comment">// ✖ SyntaxError</span>
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "const MAX = 200",
                key: "redecl.erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

      ${_h.block(
        "redeclaracao-let-const.js",
        /* html */ `
<span class="syn-keyword">let</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">100</span>
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">200</span>   <span class="syn-comment">// ✖ SyntaxError</span>
        `,
      )}

    </section>
  `,

  // ── 6. Escopo de bloco ────────────────────────────────────────────────────

  escopo_bloco: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Escopo de bloco
      </h2>

      <p>
        <code>const</code> tem escopo de bloco — idêntico ao
        <code>let</code>.
        O que foi declarado dentro de um bloco não pode ser acessado
        fora dele.
      </p>

      ${_h.block(
        "escopo-bloco.js",
        /* html */ `
{
  <span class="syn-keyword">const</span> <span class="syn-id">CONFIG</span> <span class="syn-operator">=</span> <span class="syn-string">"só no bloco"</span>

  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">CONFIG</span>)   <span class="syn-comment">// "só no bloco"</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">CONFIG</span>)     <span class="syn-comment">// ReferenceError</span>
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: 'CONFIG <span class="syn-comment">// dentro do bloco</span>',
                key: "bloco.dentro",
              },
              {
                expr: 'CONFIG <span class="syn-comment">// fora do bloco</span>',
                key: "bloco.fora",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 7. Objetos ────────────────────────────────────────────────────────────

  objetos: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        const com objetos — referência constante, não conteúdo
      </h2>

      <p>
        Este é um dos comportamentos mais importantes — e mais mal
        entendidos — de <code>const</code>.
      </p>

      <p>
        <code>const</code> impede que a variável seja reatribuída para
        outro objeto. Porém, as propriedades do objeto continuam podendo
        ser alteradas.
      </p>

      <p>
        Uma forma didática de pensar é:
        <strong><code>const</code> impede trocar a referência, mas não
        torna automaticamente o objeto imutável.</strong>
      </p>

      ${_h.block(
        "objetos.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> {
  <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span>,
  <span class="syn-property">idade</span>: <span class="syn-number">25</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">user</span>.<span class="syn-property">nome</span>, <span class="syn-id">user</span>.<span class="syn-property">idade</span>)

<span class="syn-comment">// ✓ propriedades podem mudar</span>
<span class="syn-id">user</span>.<span class="syn-property">nome</span>  <span class="syn-operator">=</span> <span class="syn-string">"Carlos"</span>
<span class="syn-id">user</span>.<span class="syn-property">idade</span> <span class="syn-operator">=</span> <span class="syn-number">30</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">user</span>.<span class="syn-property">nome</span>, <span class="syn-id">user</span>.<span class="syn-property">idade</span>)

<span class="syn-comment">// ✖ reatribuir o objeto inteiro — TypeError</span>
<span class="syn-id">user</span> <span class="syn-operator">=</span> {
  <span class="syn-property">nome</span>: <span class="syn-string">"outro"</span>
}
        `,
        [
          {
            label: "Console — antes das alterações",
            linhas: [
              {
                expr: "user.nome",
                key: "obj.antes_nome",
              },
              {
                expr: "user.idade",
                key: "obj.antes_idade",
              },
            ],
          },
          {
            label: "Console — depois das alterações",
            linhas: [
              {
                expr: "user.nome",
                key: "obj.depois_nome",
              },
              {
                expr: "user.idade",
                key: "obj.depois_idade",
              },
            ],
          },
          {
            label: "Console — reatribuição",
            linhas: [
              {
                expr: 'user = { nome: "outro" }',
                key: "obj.reatrib_erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 8. Arrays ─────────────────────────────────────────────────────────────

  arrays: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        const com arrays
      </h2>

      <p>
        O mesmo princípio dos objetos se aplica aos arrays.
        A referência não pode ser reatribuída, mas o conteúdo do array
        pode ser alterado.
      </p>

      <p>
        Você pode usar métodos como <code>push()</code>,
        <code>pop()</code> e <code>splice()</code>, além de alterar
        índices diretamente.
      </p>

      ${_h.block(
        "arrays.js",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">nums</span> <span class="syn-operator">=</span> [<span class="syn-number">1</span>, <span class="syn-number">2</span>, <span class="syn-number">3</span>]

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nums</span>)

<span class="syn-comment">// ✓ conteúdo pode mudar</span>
<span class="syn-id">nums</span>.<span class="syn-fn">push</span>(<span class="syn-number">4</span>)
<span class="syn-id">nums</span>[<span class="syn-number">0</span>] <span class="syn-operator">=</span> <span class="syn-number">99</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nums</span>)

<span class="syn-comment">// ✖ reatribuição — TypeError</span>
<span class="syn-id">nums</span> <span class="syn-operator">=</span> [<span class="syn-number">7</span>, <span class="syn-number">8</span>, <span class="syn-number">9</span>]
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: 'nums <span class="syn-comment">// antes</span>',
                key: "arr.antes",
              },
              {
                expr: 'nums <span class="syn-comment">// depois</span>',
                key: "arr.depois",
              },
              {
                expr: "nums = [7, 8, 9]",
                key: "arr.reatrib_erro",
                cls: "code-console__line--error",
              },
            ],
          },
        ],
      )}

    </section>
  `,

  // ── 9. Object.freeze() ────────────────────────────────────────────────────

  freeze: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        Object.freeze() — impede alterações diretas
      </h2>

      <p>
        Se você precisa impedir alterações nas propriedades diretas de um
        objeto, pode usar <code>Object.freeze()</code>.
      </p>

      <p>
        Fora do strict mode, tentativas de alterar propriedades congeladas
        são ignoradas silenciosamente.
        Em strict mode, elas lançam <code>TypeError</code>.
      </p>

      <p>
        Como este arquivo é um ES Module, o strict mode está ativo
        automaticamente.
      </p>

      ${_h.block(
        "freeze.js — strict mode",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">ponto</span> <span class="syn-operator">=</span> <span class="syn-id">Object</span>.<span class="syn-fn">freeze</span>({
  <span class="syn-property">x</span>: <span class="syn-number">10</span>,
  <span class="syn-property">y</span>: <span class="syn-number">20</span>
})

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">ponto</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 10</span>

<span class="syn-id">ponto</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">999</span>         <span class="syn-comment">// ✖ TypeError</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">ponto</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// ainda 10</span>
        `,
        [
          {
            label: "Console — antes",
            linhas: [
              {
                expr: "ponto.x",
                key: "freeze.antes_x",
              },
            ],
          },
          {
            label: "Console — tentativa de alteração",
            linhas: [
              {
                expr: "ponto.x = 999",
                key: "freeze.strict_err",
                cls: "code-console__line--error",
              },
            ],
          },
          {
            label: "Console — depois",
            linhas: [
              {
                expr: "ponto.x",
                key: "freeze.depois_x",
              },
            ],
          },
        ],
      )}

      ${_h.block(
        "freeze.js — freeze é raso",
        /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">config</span> <span class="syn-operator">=</span> <span class="syn-id">Object</span>.<span class="syn-fn">freeze</span>({
  <span class="syn-property">db</span>: {
    <span class="syn-property">debug</span>: <span class="syn-boolean">false</span>
  }
})

<span class="syn-id">config</span>.<span class="syn-property">db</span>.<span class="syn-property">debug</span> <span class="syn-operator">=</span> <span class="syn-boolean">true</span>
<span class="syn-comment">// ✓ funciona — objeto aninhado não foi congelado</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">config</span>.<span class="syn-property">db</span>.<span class="syn-property">debug</span>)
        `,
        [
          {
            label: "Console",
            linhas: [
              {
                expr: "config.db.debug",
                key: "freeze.deep_debug",
              },
            ],
          },
        ],
      )}

      <p>
        <strong>Atenção:</strong>
        <code>Object.freeze()</code> é superficial.
        Objetos aninhados não são congelados automaticamente.
      </p>

      <p>
        Para obter uma estrutura profundamente imutável, seria necessário
        congelar também os objetos internos, normalmente por meio de uma
        estratégia de <em>deep freeze</em>.
      </p>

    </section>
  `,

  // ── 10. O que vem a seguir ────────────────────────────────────────────────

  proximo: () => /* html */ `
    <section class="lesson__section">

      <h2 class="lesson__section-title">
        O que vem a seguir
      </h2>

      <p>
        Você agora conhece <code>const</code> em profundidade:
        sabe o que ele garante, o que ele não garante e como
        <code>Object.freeze()</code> pode ser usado quando você precisa
        impedir alterações nas propriedades de um objeto.
      </p>

      <p>
        Na próxima aula vamos colocar
        <code>var</code>, <code>let</code> e <code>const</code> lado a lado,
        comparando seus comportamentos de forma direta para consolidar
        tudo o que foi estudado nas três aulas.
      </p>

    </section>
  `,
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT — compõe todas as seções em ordem
//
// A ordem é explícita (em vez de depender da ordem de inserção das chaves
// de _secoes) para deixar clara a intenção e evitar que um refactor em
// _secoes altere silenciosamente a ordem da aula renderizada.
// ═══════════════════════════════════════════════════════════════════════════════

const _ORDEM = [
  "introducao",
  "reatribuicao",
  "sem_init",
  "tdz",
  "redeclaracao",
  "escopo_bloco",
  "objetos",
  "arrays",
  "freeze",
  "proximo",
]

export function content() {
  return _ORDEM.map((chave) => _secoes[chave]()).join("\n")
}

// ═══════════════════════════════════════════════════════════════════════════════
// INIT — resolução automática de data-out via _dados
//
// Convenção:
//
//   data-out="secao.chave"
//     → _dados.secao.chave
//
//   valor string
//     → textContent = valor
//
//   valor { text, cls }
//     → textContent = text
//     → adiciona cls ao elemento
// ═══════════════════════════════════════════════════════════════════════════════

export function initConst() {
  // Resolve caminhos como:
  //
  //   "decl.pi"
  //   "obj.depois_nome"
  //   "freeze.deep_debug"
  //
  const resolver = (caminho) =>
    caminho.split(".").reduce((obj, chave) => obj?.[chave], _dados)

  document.querySelectorAll("[data-out]").forEach((el) => {
    const valor = resolver(el.dataset.out)

    // Não existe dado correspondente.
    if (valor == null) return

    // Valor simples.
    if (typeof valor === "string") {
      el.textContent = valor
      return
    }

    // Valor estruturado: { text, cls }.
    el.textContent = valor.text

    // Mantém as classes estruturais existentes
    // e adiciona somente a classe semântica da saída.
    if (valor.cls) {
      el.classList.add(valor.cls)
    }
  })
}
