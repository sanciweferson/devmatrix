// src/content/fundamentos/03-const.js
//
// Arquitetura:
//   _dados      — IIFE que calcula e retorna todos os valores por seção
//   _secoes     — objeto com uma função por seção retornando HTML
//   _helpers    — funções puras de markup reutilizáveis
//   content()   — compõe _secoes em ordem numa única string
//   init()      — resolve data-out="chave.subchave" automaticamente via DOM
//
// Convenção data-out:
//   <span data-out="decl.valor"></span>
//   init() lê _dados.decl.valor e injeta textContent + className automaticamente
//   Formato do valor em _dados: { text, cls } ou string pura


// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS — markup puro, sem lógica
// ═══════════════════════════════════════════════════════════════════════════════

const _h = {

  btn_copy: /* html */ `
    <button class="code-block__copy" type="button">
      <span class="code-block__copy-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </span>
      <span class="code-block__copy-label">Copiar</span>
    </button>`,

  header: (filename) => /* html */ `
    <div class="code-block__header">
      <span class="code-block__filename">${filename}</span>
      ${_h.btn_copy}
    </div>`,

  // label  — texto do header do console
  // linhas — array de { expr, key, cls? }
  //   expr  — expressão exibida na coluna esquerda
  //   key   — chave data-out para injeção automática (ex: "decl.valor")
  //   cls   — classe extra opcional na linha (ex: 'code-console__line--error')
  console: (label, linhas) => /* html */ `
    <div class="code-console">
      <div class="code-console__header">
        <span class="code-console__label">${label}</span>
      </div>
      <div class="code-console__body">
        ${linhas.map(({ expr, key, cls = '' }) => /* html */ `
        <div class="code-console__line${cls ? ` ${cls}` : ''}">
          <span class="code-console__prompt">›</span>
          <span class="code-console__expr">${expr}</span>
          <span class="code-console__arrow">→</span>
          <span data-out="${key}"></span>
        </div>`).join('')}
      </div>
    </div>`,

  // bloco de código com header + pre + consoles opcionais
  // consoles — array de { label, linhas } passados para _h.console()
  block: (filename, code, consoles = []) => /* html */ `
    <div class="code-block">
      ${_h.header(filename)}
      <pre class="code-block__pre"><code class="code-block__code">${code}</code></pre>
      ${consoles.map(c => _h.console(c.label, c.linhas)).join('')}
    </div>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// DADOS — IIFE que calcula todos os valores e retorna objeto estruturado
// Cada folha pode ser:
//   string pura  → textContent = valor, className inalterada
//   { text, cls } → textContent = text, className = cls
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {

  const str = (v) => ({ text: `"${v}"`, cls: 'syn-output-str' })
  const num = (v) => ({ text: String(v), cls: 'syn-output-num' })
  const bool = (v) => ({ text: String(v), cls: 'syn-output-bool' })
  const nil = () => ({ text: 'undefined', cls: 'syn-output-null' })
  const err = (v) => ({ text: v, cls: 'syn-output-error' })
  const raw = (v) => ({ text: v, cls: '' })

  // ── 1. Declaração básica ───────────────────────────────────────────────────
  const PI = 3.14159
  const VERSAO = "ES2015"

  // ── 2. Sem reatribuição ────────────────────────────────────────────────────
  let reatrib_erro
  try {
    const _c = "original"
    // eslint-disable-next-line no-const-assign
    eval('"use strict"; const _x = 1; _x = 2')
  } catch (e) { reatrib_erro = e.constructor.name + ": Assignment to constant variable." }

  // ── 3. Obrigatoriedade de valor inicial ────────────────────────────────────
  const sem_init_erro = "SyntaxError: Missing initializer in const declaration"

  // ── 4. TDZ — igual ao let ──────────────────────────────────────────────────
  let tdz_erro
  try { void _tdz_const; const _tdz_const = "tarde" }
  catch (e) { tdz_erro = e.constructor.name + ": Cannot access '_tdz_const' before initialization" }

  // ── 5. Sem redeclaração ────────────────────────────────────────────────────
  const redecl_erro = "SyntaxError: Identifier 'MAX' has already been declared"

  // ── 6. Escopo de bloco ─────────────────────────────────────────────────────
  let bloco_capturado
  { const _bc = "só no bloco"; bloco_capturado = _bc }
  let bloco_erro
  try { void _bc }
  catch (e) { bloco_erro = e.constructor.name + ": _bc is not defined" }

  // ── 7. Objeto — referência constante, propriedades mutáveis ───────────────
  const _user = { nome: "Ana", idade: 25 }
  const obj_antes_nome = _user.nome
  const obj_antes_idade = _user.idade
  _user.nome = "Carlos"
  _user.idade = 30
  const obj_depois_nome = _user.nome
  const obj_depois_idade = _user.idade

  // tentativa de reatribuir o objeto inteiro
  let obj_reatrib_erro
  try { eval('"use strict"; const u = {}; u = {}') }
  catch (e) { obj_reatrib_erro = e.constructor.name + ": Assignment to constant variable." }

  // ── 8. Array — referência constante, conteúdo mutável ────────────────────
  const _arr = [1, 2, 3]
  const arr_antes = JSON.stringify(_arr)
  _arr.push(4)
  _arr[0] = 99
  const arr_depois = JSON.stringify(_arr)

  let arr_reatrib_erro
  try { eval('"use strict"; const a = []; a = []') }
  catch (e) { arr_reatrib_erro = e.constructor.name + ": Assignment to constant variable." }

  // ── 9. Object.freeze() — imutabilidade real ────────────────────────────────
  // ES modules rodam em strict mode — _frozen.x = 999 lançaria TypeError aqui.
  // Usamos try/catch para capturar o erro e ainda mostrar o valor original.
  const _frozen = Object.freeze({ x: 10, y: 20 })
  const frozen_antes_x = _frozen.x
  try { _frozen.x = 999 } catch (_) { }  // engole o TypeError — valor fica 10
  const frozen_depois_x = _frozen.x     // ainda 10 — freeze funcionou

  // O erro em strict mode é representado como string estática —
  // o comportamento já foi provado acima pelo try/catch
  const frozen_strict_err = "TypeError: Cannot assign to read only property 'x' of object '#<Object>'"

  // ── 10. freeze superficial — objetos aninhados não são congelados ──────────
  const _deep = Object.freeze({ config: { debug: false } })
  _deep.config.debug = true   // funciona — freeze é raso
  const deep_debug = _deep.config.debug

  // ── 11. const vs let — quando usar cada um ────────────────────────────────
  // (sem cálculo — só texto, representado no HTML)

  // ── 12. Comparação const / let / var ──────────────────────────────────────
  // (tabela — sem cálculo)

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

  // ── 1. Introdução ───────────────────────────────────────────────────────────
  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">const — valores que não mudam de referência</h2>
      <p>
        <code>const</code> foi introduzido junto com <code>let</code> no ES6.
        Compartilha com ele o escopo de bloco, a TDZ e a proibição de redeclaração.
        A diferença é uma só: <strong>não permite reatribuição</strong>.
      </p>
      <p>
        Uma variável <code>const</code> precisa ser inicializada na declaração
        e não pode receber um novo valor depois. Mas — e esse é o ponto mais
        importante da aula — <em>não é o mesmo que imutabilidade</em>.
        Um objeto declarado com <code>const</code> ainda pode ter suas
        propriedades alteradas.
      </p>

      ${_h.block('declaracao.js', /* html */ `
<span class="syn-comment">// const é usada para valores que não mudam de referência</span>
<span class="syn-keyword">const</span> <span class="syn-id">PI</span>     <span class="syn-operator">=</span> <span class="syn-number">3.14159</span>
<span class="syn-keyword">const</span> <span class="syn-id">VERSAO</span> <span class="syn-operator">=</span> <span class="syn-string">"ES2015"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">PI</span>)
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">VERSAO</span>)`, [
    {
      label: 'Console', linhas: [
        { expr: 'PI', key: 'decl.pi' },
        { expr: 'VERSAO', key: 'decl.versao' },
      ]
    },
  ])}
    </section>`,

  // ── 2. Sem reatribuição ─────────────────────────────────────────────────────
  reatribuicao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Sem reatribuição</h2>
      <p>
        Tentar atribuir um novo valor a uma <code>const</code> lança um
        <code>TypeError</code> em runtime — diferente da redeclaração, que é
        um <code>SyntaxError</code> detectado antes de rodar.
      </p>

      ${_h.block('reatribuicao.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"original"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">status</span>)

<span class="syn-id">status</span> <span class="syn-operator">=</span> <span class="syn-string">"alterado"</span>   <span class="syn-comment">// ✖ TypeError</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'status = "alterado"', key: 'reatrib.erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 3. Obrigatoriedade de valor inicial ─────────────────────────────────────
  sem_init: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Valor inicial é obrigatório</h2>
      <p>
        Como <code>const</code> não permite reatribuição, declarar sem valor
        inicial não faz sentido — você nunca poderia atribuir nada depois.
        O motor detecta isso na análise do código e lança um
        <code>SyntaxError</code> antes de rodar qualquer linha.
      </p>

      ${_h.block('sem-init.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span>   <span class="syn-comment">// ✖ SyntaxError — const sem valor inicial</span>

<span class="syn-keyword">let</span>   <span class="syn-id">total</span> <span class="syn-comment">// ✓ let pode — undefined até atribuição</span>
<span class="syn-keyword">var</span>   <span class="syn-id">count</span> <span class="syn-comment">// ✓ var pode — undefined até atribuição</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'const MAX', key: 'sem_init.erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 4. TDZ ──────────────────────────────────────────────────────────────────
  tdz: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">TDZ — igual ao let</h2>
      <p>
        <code>const</code> segue exatamente as mesmas regras de TDZ que
        <code>let</code>. A variável existe no ambiente léxico desde o início
        do bloco, mas qualquer acesso antes da declaração lança
        <code>ReferenceError</code>.
      </p>

      ${_h.block('tdz.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">LIMITE</span>)          <span class="syn-comment">// ✖ ReferenceError — TDZ</span>
<span class="syn-keyword">const</span> <span class="syn-id">LIMITE</span> <span class="syn-operator">=</span> <span class="syn-number">100</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'LIMITE <span class="syn-comment">// antes da declaração</span>', key: 'tdz.erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 5. Sem redeclaração ─────────────────────────────────────────────────────
  redeclaracao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Sem redeclaração</h2>
      <p>
        Assim como <code>let</code>, redeclarar uma <code>const</code> no
        mesmo escopo é um <code>SyntaxError</code>. Isso vale também para
        misturar — tentar redeclarar um <code>let</code> com <code>const</code>
        ou vice-versa no mesmo escopo também é erro.
      </p>

      ${_h.block('redeclaracao.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">100</span>
<span class="syn-keyword">const</span> <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">200</span>   <span class="syn-comment">// ✖ SyntaxError</span>

<span class="syn-keyword">let</span>   <span class="syn-id">MAX</span> <span class="syn-operator">=</span> <span class="syn-number">200</span>   <span class="syn-comment">// ✖ SyntaxError — mesmo nome, escopo diferente não salva</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'const MAX = 200', key: 'redecl.erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 6. Escopo de bloco ──────────────────────────────────────────────────────
  escopo_bloco: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Escopo de bloco</h2>
      <p>
        <code>const</code> tem escopo de bloco — idêntico ao <code>let</code>.
        O que foi declarado dentro de um bloco não existe fora.
      </p>

      ${_h.block('escopo-bloco.js', /* html */ `
{
  <span class="syn-keyword">const</span> <span class="syn-id">CONFIG</span> <span class="syn-operator">=</span> <span class="syn-string">"só no bloco"</span>
  <span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">CONFIG</span>)   <span class="syn-comment">// "só no bloco"</span>
}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">CONFIG</span>)     <span class="syn-comment">// ReferenceError</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'CONFIG <span class="syn-comment">// dentro do bloco</span>', key: 'bloco.dentro' },
        { expr: 'CONFIG <span class="syn-comment">// fora do bloco</span>', key: 'bloco.fora', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 7. Objetos — referência constante ───────────────────────────────────────
  objetos: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">const com objetos — referência constante, não conteúdo</h2>
      <p>
        Este é o comportamento mais importante — e mais mal entendido — do
        <code>const</code>. Ele garante que a <strong>referência</strong> não
        muda. Ou seja, a variável sempre aponta para o mesmo objeto na memória.
        Mas as <strong>propriedades</strong> desse objeto podem ser alteradas
        livremente.
      </p>
      <p>
        Pense assim: <code>const</code> fixa o endereço, não o conteúdo.
      </p>

      ${_h.block('objetos.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span>, <span class="syn-property">idade</span>: <span class="syn-number">25</span> }

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">user</span>.<span class="syn-property">nome</span>, <span class="syn-id">user</span>.<span class="syn-property">idade</span>)

<span class="syn-comment">// ✓ propriedades podem mudar</span>
<span class="syn-id">user</span>.<span class="syn-property">nome</span>  <span class="syn-operator">=</span> <span class="syn-string">"Carlos"</span>
<span class="syn-id">user</span>.<span class="syn-property">idade</span> <span class="syn-operator">=</span> <span class="syn-number">30</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">user</span>.<span class="syn-property">nome</span>, <span class="syn-id">user</span>.<span class="syn-property">idade</span>)

<span class="syn-comment">// ✖ reatribuir o objeto inteiro — TypeError</span>
<span class="syn-id">user</span> <span class="syn-operator">=</span> { <span class="syn-property">nome</span>: <span class="syn-string">"outro"</span> }`, [
    {
      label: 'Console — antes das alterações', linhas: [
        { expr: 'user.nome', key: 'obj.antes_nome' },
        { expr: 'user.idade', key: 'obj.antes_idade' },
      ]
    },
    {
      label: 'Console — depois das alterações', linhas: [
        { expr: 'user.nome', key: 'obj.depois_nome' },
        { expr: 'user.idade', key: 'obj.depois_idade' },
      ]
    },
    {
      label: 'Console — reatribuição', linhas: [
        { expr: 'user = { nome: "outro" }', key: 'obj.reatrib_erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 8. Arrays ───────────────────────────────────────────────────────────────
  arrays: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">const com arrays</h2>
      <p>
        O mesmo princípio dos objetos se aplica a arrays. A referência é
        constante — o conteúdo não. Você pode usar <code>push</code>,
        <code>pop</code>, <code>splice</code> e alterar índices livremente.
        Só não pode apontar a variável para outro array.
      </p>

      ${_h.block('arrays.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">nums</span> <span class="syn-operator">=</span> [<span class="syn-number">1</span>, <span class="syn-number">2</span>, <span class="syn-number">3</span>]
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nums</span>)

<span class="syn-comment">// ✓ conteúdo pode mudar</span>
<span class="syn-id">nums</span>.<span class="syn-fn">push</span>(<span class="syn-number">4</span>)
<span class="syn-id">nums</span>[<span class="syn-number">0</span>] <span class="syn-operator">=</span> <span class="syn-number">99</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">nums</span>)

<span class="syn-comment">// ✖ reatribuição — TypeError</span>
<span class="syn-id">nums</span> <span class="syn-operator">=</span> [<span class="syn-number">7</span>, <span class="syn-number">8</span>, <span class="syn-number">9</span>]`, [
    {
      label: 'Console', linhas: [
        { expr: 'nums <span class="syn-comment">// antes</span>', key: 'arr.antes' },
        { expr: 'nums <span class="syn-comment">// depois</span>', key: 'arr.depois' },
        { expr: 'nums = [7,8,9]', key: 'arr.reatrib_erro', cls: 'code-console__line--error' },
      ]
    },
  ])}
    </section>`,

  // ── 9. Object.freeze ────────────────────────────────────────────────────────
  freeze: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Object.freeze() — imutabilidade real</h2>
      <p>
        Se você precisa que as propriedades também não mudem, use
        <code>Object.freeze()</code>. Fora do strict mode, tentativas de alterar
        propriedades congeladas são ignoradas silenciosamente. Em strict mode,
        lançam <code>TypeError</code>.
      </p>
      <p>
        Atenção: <code>freeze</code> é <strong>superficial</strong>. Objetos
        aninhados dentro do objeto congelado não são congelados automaticamente
        — é necessário congelar cada nível manualmente ou usar uma função de
        deep freeze.
      </p>

      ${_h.block('freeze.js — freeze superficial', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">ponto</span> <span class="syn-operator">=</span> <span class="syn-fn">Object</span>.<span class="syn-fn">freeze</span>({ <span class="syn-property">x</span>: <span class="syn-number">10</span>, <span class="syn-property">y</span>: <span class="syn-number">20</span> })

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">ponto</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 10</span>

<span class="syn-id">ponto</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">999</span>          <span class="syn-comment">// silencioso fora de strict mode</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">ponto</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// ainda 10 — freeze funcionou</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'ponto.x <span class="syn-comment">// antes</span>', key: 'freeze.antes_x' },
        { expr: 'ponto.x <span class="syn-comment">// depois</span>', key: 'freeze.depois_x' },
      ]
    },
  ])}

      ${_h.block('freeze.js — strict mode', /* html */ `
<span class="syn-string">"use strict"</span>

<span class="syn-keyword">const</span> <span class="syn-id">ponto</span> <span class="syn-operator">=</span> <span class="syn-fn">Object</span>.<span class="syn-fn">freeze</span>({ <span class="syn-property">x</span>: <span class="syn-number">10</span> })
<span class="syn-id">ponto</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">999</span>   <span class="syn-comment">// ✖ TypeError em strict mode</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'ponto.x = 999', key: 'freeze.strict_err', cls: 'code-console__line--error' },
      ]
    },
  ])}

      ${_h.block('freeze.js — freeze é raso', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">config</span> <span class="syn-operator">=</span> <span class="syn-fn">Object</span>.<span class="syn-fn">freeze</span>({
  <span class="syn-property">db</span>: { <span class="syn-property">debug</span>: <span class="syn-boolean">false</span> }   <span class="syn-comment">// objeto aninhado — não congelado</span>
})

<span class="syn-id">config</span>.<span class="syn-property">db</span>.<span class="syn-property">debug</span> <span class="syn-operator">=</span> <span class="syn-boolean">true</span>    <span class="syn-comment">// ✓ funciona — freeze não alcança aninhados</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">config</span>.<span class="syn-property">db</span>.<span class="syn-property">debug</span>)`, [
    {
      label: 'Console', linhas: [
        { expr: 'config.db.debug', key: 'freeze.deep_debug' },
      ]
    },
  ])}
    </section>`,

  // ── 10. O que vem a seguir ─────────────────────────────────────────────────
  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Você agora conhece <code>const</code> em profundidade — o que ela
        garante, onde ela não garante nada, e como usar <code>Object.freeze()</code>
        quando precisar de imutabilidade real. Na próxima aula vamos colocar
        <code>var</code>, <code>let</code> e <code>const</code> lado a lado —
        comparando cada comportamento de forma direta para consolidar tudo que
        você viu nas três aulas.
      </p>
    </section>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT — compõe todas as seções em ordem
// ═══════════════════════════════════════════════════════════════════════════════

export function content() {
  return Object.values(_secoes).map(s => s()).join('\n')
}


// ═══════════════════════════════════════════════════════════════════════════════
// INIT — resolução automática de data-out via _dados
//
// Convenção:
//   data-out="secao.chave"  →  _dados.secao.chave
//   valor string pura       →  { text: valor, cls: '' }
//   valor { text, cls }     →  aplica text e cls diretamente
// ═══════════════════════════════════════════════════════════════════════════════

export function initConst() {
  // Resolve caminho "a.b.c" em _dados
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return

    if (typeof val === 'string') {
      el.textContent = val
    } else {
      el.textContent = val.text
      if (val.cls) el.className = val.cls
    }
  })
}