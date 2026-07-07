// src/content/variaveis-tipos/06-primitivos.js

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
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

  block: (filename, code, consoles = []) => /* html */ `
    <div class="code-block">
      ${_h.header(filename)}
      <pre class="code-block__pre"><code class="code-block__code">${code}</code></pre>
      ${consoles.map(c => _h.console(c.label, c.linhas)).join('')}
    </div>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// DADOS
// ═══════════════════════════════════════════════════════════════════════════════

const _dados = (() => {
  const str = (v) => ({ text: `"${v}"`, cls: 'syn-output-str' })
  const num = (v) => ({ text: String(v), cls: 'syn-output-num' })
  const bool = (v) => ({ text: String(v), cls: 'syn-output-bool' })
  const nil = () => ({ text: 'undefined', cls: 'syn-output-null' })
  const err = (v) => ({ text: v, cls: 'syn-output-error' })

  // ── String ────────────────────────────────────────────────────────────────
  const s_tipo = typeof "oi"                    // "string"
  const s_len = "JavaScript".length            // 10
  const s_upper = "javascript".toUpperCase()     // "JAVASCRIPT"
  const s_includes = "JavaScript".includes("Script") // true
  const s_index = "JavaScript".indexOf("S")      // 4
  const s_slice = "JavaScript".slice(0, 4)        // "Java"
  const s_imut_antes = "texto"
  // strings são imutáveis — s_imut_antes[0] = "X" não funciona
  const s_imut_depois = "texto"                         // continua "texto"

  // ── Number ────────────────────────────────────────────────────────────────
  const n_tipo = typeof 42                      // "number"
  const n_float = 0.1 + 0.2                      // 0.30000000000000004 — IEEE 754
  const n_nan = NaN                             // NaN
  const n_nan_tipo = typeof NaN                      // "number" — NaN é número!
  const n_nan_isnan = isNaN(NaN)                      // true
  const n_nan_self = NaN === NaN                     // false — NaN não é igual a si mesmo
  const n_inf_pos = Infinity                        // Infinity
  const n_inf_neg = -Infinity                       // -Infinity
  const n_inf_tipo = typeof Infinity                 // "number"
  const n_zero_neg = -0                              // -0
  const n_zero_eq = (-0 === 0)                      // true — == trata como iguais
  const n_max = Number.MAX_SAFE_INTEGER         // 9007199254740991
  const n_to_fixed = (3.14159).toFixed(2)            // "3.14"
  const n_parse_int = parseInt("42px")                // 42
  const n_parse_float = parseFloat("3.14abc")           // 3.14

  // ── Boolean ───────────────────────────────────────────────────────────────
  const b_tipo = typeof true                          // "boolean"
  const b_not = !true                                // false
  const b_and = true && false                        // false
  const b_or = false || true                        // true

  // ── undefined ─────────────────────────────────────────────────────────────
  let _u
  const u_tipo = typeof _u                            // "undefined"
  const u_val = _u                                   // undefined
  function _fn_sem_return() { }
  const u_fn_ret = _fn_sem_return()                     // undefined — sem return

  // ── null ──────────────────────────────────────────────────────────────────
  const null_tipo = typeof null                       // "object" — bug
  const null_strict = null === null                     // true

  // ── BigInt ────────────────────────────────────────────────────────────────
  const bi_tipo = typeof 9007199254740991n            // "bigint"
  const bi_max_js = Number.MAX_SAFE_INTEGER             // 9007199254740991
  const bi_safe = Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2  // true — perda de precisão!
  const bi_bigint = 9007199254740993n === 9007199254740994n  // false — BigInt mantém precisão

  // ── Symbol ────────────────────────────────────────────────────────────────
  const sym_tipo = typeof Symbol("id")             // "symbol"
  const sym_unico = Symbol("id") === Symbol("id")   // false — cada Symbol é único
  const sym_descricao = Symbol("meu-id").description    // "meu-id"

  return {
    string: {
      tipo: str(s_tipo),
      len: num(s_len),
      upper: str(s_upper),
      includes: bool(s_includes),
      index: num(s_index),
      slice: str(s_slice),
      imut_antes: str(s_imut_antes),
      imut_depois: str(s_imut_depois),
    },
    number: {
      tipo: str(n_tipo),
      float: num(n_float),
      nan: num(n_nan),
      nan_tipo: str(n_nan_tipo),
      nan_isnan: bool(n_nan_isnan),
      nan_self: bool(n_nan_self),
      inf_pos: num(n_inf_pos),
      inf_neg: num(n_inf_neg),
      inf_tipo: str(n_inf_tipo),
      zero_neg: num(n_zero_neg),
      zero_eq: bool(n_zero_eq),
      max: num(n_max),
      to_fixed: str(n_to_fixed),
      parse_int: num(n_parse_int),
      parse_float: num(n_parse_float),
    },
    boolean: {
      tipo: str(b_tipo),
      not: bool(b_not),
      and: bool(b_and),
      or: bool(b_or),
    },
    undef: {
      tipo: str(u_tipo),
      val: nil(),
      fn_ret: nil(),
    },
    null: {
      tipo: str(null_tipo),
      strict: bool(null_strict),
    },
    bigint: {
      tipo: str(bi_tipo),
      max_js: num(bi_max_js),
      safe: bool(bi_safe),
      bigint: bool(bi_bigint),
    },
    symbol: {
      tipo: str(sym_tipo),
      unico: bool(sym_unico),
      descricao: str(sym_descricao),
    },
  }
})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {

  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Os 7 tipos primitivos em detalhe</h2>
      <p>
        Primitivos são os blocos de construção mais básicos da linguagem.
        Eles têm três características em comum:
      </p>
      <ul class="lesson__list">
        <li><strong>Imutáveis</strong> — o valor em si não pode ser modificado</li>
        <li><strong>Passados por valor</strong> — uma cópia independente é criada em cada atribuição</li>
        <li><strong>Comparados por valor</strong> — dois primitivos iguais são idênticos</li>
      </ul>
      <p>
        Vamos ver cada um deles, seus comportamentos especiais e as armadilhas
        que surgem com mais frequência.
      </p>
    </section>`,

  string: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">string</h2>
      <p>
        Strings representam texto. São <strong>imutáveis</strong> — você não pode
        alterar um caractere individualmente. Métodos como <code>toUpperCase()</code>
        e <code>slice()</code> não modificam a string original — retornam
        uma string nova.
      </p>
      <p>
        Strings têm propriedades e métodos porque o motor cria um objeto
        <code>String</code> temporário ao acessá-los — o chamado <em>boxing</em>.
        Esse objeto existe só durante o acesso e é descartado imediatamente.
      </p>

      ${_h.block('string.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">texto</span> <span class="syn-operator">=</span> <span class="syn-string">"JavaScript"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">texto</span>)           <span class="syn-comment">// "string"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">texto</span>.<span class="syn-property">length</span>)            <span class="syn-comment">// 10</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">texto</span>.<span class="syn-fn">toUpperCase</span>())    <span class="syn-comment">// "JAVASCRIPT"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">texto</span>.<span class="syn-fn">includes</span>(<span class="syn-string">"Script"</span>)) <span class="syn-comment">// true</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">texto</span>.<span class="syn-fn">indexOf</span>(<span class="syn-string">"S"</span>))      <span class="syn-comment">// 4</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">texto</span>.<span class="syn-fn">slice</span>(<span class="syn-number">0</span>, <span class="syn-number">4</span>))       <span class="syn-comment">// "Java"</span>

<span class="syn-comment">// imutabilidade — atribuição em índice não funciona (modo silencioso)</span>
<span class="syn-keyword">let</span> <span class="syn-id">s</span> <span class="syn-operator">=</span> <span class="syn-string">"texto"</span>
<span class="syn-id">s</span>[<span class="syn-number">0</span>] <span class="syn-operator">=</span> <span class="syn-string">"X"</span>             <span class="syn-comment">// ignorado silenciosamente</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">s</span>)            <span class="syn-comment">// "texto" — não mudou</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof texto', key: 'string.tipo' },
        { expr: 'texto.length', key: 'string.len' },
        { expr: 'texto.toUpperCase()', key: 'string.upper' },
        { expr: 'texto.includes("Script")', key: 'string.includes' },
        { expr: 'texto.indexOf("S")', key: 'string.index' },
        { expr: 'texto.slice(0, 4)', key: 'string.slice' },
        { expr: 's <span class="syn-comment">// após s[0] = "X"</span>', key: 'string.imut_depois' },
      ]
    },
  ])}
    </section>`,

  number: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">number</h2>
      <p>
        JavaScript usa um único tipo numérico: <strong>number</strong>, baseado no
        padrão IEEE 754 de ponto flutuante de 64 bits. Isso vale tanto para inteiros
        quanto para decimais — não há distinção.
      </p>
      <p>
        Essa escolha tem uma consequência famosa: operações com decimais podem
        ter imprecisão. E o tipo <code>number</code> inclui três valores especiais:
        <code>NaN</code>, <code>Infinity</code> e <code>-0</code>.
      </p>

      ${_h.block('number.js', /* html */ `
<span class="syn-comment">// ── IEEE 754 — imprecisão em decimais ─────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-number">0.1</span> <span class="syn-operator">+</span> <span class="syn-number">0.2</span>)              <span class="syn-comment">// 0.30000000000000004</span>

<span class="syn-comment">// ── NaN — "Not a Number", mas tipo number ─────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">NaN</span>)             <span class="syn-comment">// "number"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">isNaN</span>(<span class="syn-id">NaN</span>))             <span class="syn-comment">// true</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">NaN</span> <span class="syn-operator">===</span> <span class="syn-id">NaN</span>)           <span class="syn-comment">// false — NaN nunca é igual a si mesmo!</span>

<span class="syn-comment">// ── Infinity ──────────────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-number">1</span> <span class="syn-operator">/</span> <span class="syn-number">0</span>)                  <span class="syn-comment">// Infinity</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-operator">-</span><span class="syn-number">1</span> <span class="syn-operator">/</span> <span class="syn-number">0</span>)                 <span class="syn-comment">// -Infinity</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">Infinity</span>)        <span class="syn-comment">// "number"</span>

<span class="syn-comment">// ── -0 — zero negativo ────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-operator">-</span><span class="syn-number">0</span> <span class="syn-operator">===</span> <span class="syn-number">0</span>)              <span class="syn-comment">// true</span>

<span class="syn-comment">// ── Limite seguro de inteiros ─────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">Number</span>.<span class="syn-property">MAX_SAFE_INTEGER</span>) <span class="syn-comment">// 9007199254740991</span>

<span class="syn-comment">// ── Métodos úteis ─────────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>((<span class="syn-number">3.14159</span>).<span class="syn-fn">toFixed</span>(<span class="syn-number">2</span>))  <span class="syn-comment">// "3.14"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">parseInt</span>(<span class="syn-string">"42px"</span>))      <span class="syn-comment">// 42</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">parseFloat</span>(<span class="syn-string">"3.14abc"</span>)) <span class="syn-comment">// 3.14</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '0.1 + 0.2', key: 'number.float' },
        { expr: 'typeof NaN', key: 'number.nan_tipo' },
        { expr: 'isNaN(NaN)', key: 'number.nan_isnan' },
        { expr: 'NaN === NaN', key: 'number.nan_self' },
        { expr: '1 / 0', key: 'number.inf_pos' },
        { expr: '-1 / 0', key: 'number.inf_neg' },
        { expr: 'typeof Infinity', key: 'number.inf_tipo' },
        { expr: '-0 === 0', key: 'number.zero_eq' },
        { expr: 'Number.MAX_SAFE_INTEGER', key: 'number.max' },
        { expr: '(3.14159).toFixed(2)', key: 'number.to_fixed' },
        { expr: 'parseInt("42px")', key: 'number.parse_int' },
        { expr: 'parseFloat("3.14abc")', key: 'number.parse_float' },
      ]
    },
  ])}

      <p>
        <strong>NaN</strong> é o único valor em JavaScript que não é igual a si mesmo.
        Por isso, a única forma confiável de verificar se algo é <code>NaN</code> é
        usando <code>Number.isNaN()</code> (mais preciso que <code>isNaN()</code>)
        ou <code>Object.is(valor, NaN)</code>.
      </p>
    </section>`,

  boolean: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">boolean</h2>
      <p>
        Booleanos representam verdadeiro ou falso. São a base de toda lógica
        condicional. Vamos ver <em>truthy</em> e <em>falsy</em> com detalhes
        na aula de coerção — por enquanto, o essencial.
      </p>

      ${_h.block('boolean.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-boolean">true</span>)      <span class="syn-comment">// "boolean"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-operator">!</span><span class="syn-boolean">true</span>)           <span class="syn-comment">// false</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-boolean">true</span> <span class="syn-operator">&&</span> <span class="syn-boolean">false</span>)  <span class="syn-comment">// false</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-boolean">false</span> <span class="syn-operator">||</span> <span class="syn-boolean">true</span>)  <span class="syn-comment">// true</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof true', key: 'boolean.tipo' },
        { expr: '!true', key: 'boolean.not' },
        { expr: 'true && false', key: 'boolean.and' },
        { expr: 'false || true', key: 'boolean.or' },
      ]
    },
  ])}
    </section>`,

  undefined_tipo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">undefined</h2>
      <p>
        <code>undefined</code> é o valor padrão de qualquer variável não inicializada,
        parâmetro não passado ou propriedade inexistente. O motor coloca esse valor
        — você normalmente não deveria atribuí-lo manualmente (use <code>null</code>
        para indicar ausência intencional).
      </p>

      ${_h.block('undefined.js', /* html */ `
<span class="syn-keyword">let</span> <span class="syn-id">a</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">a</span>)   <span class="syn-comment">// "undefined"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span>)          <span class="syn-comment">// undefined</span>

<span class="syn-keyword">function</span> <span class="syn-fn">semReturn</span>() {}
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">semReturn</span>())  <span class="syn-comment">// undefined — função sem return</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof a', key: 'undef.tipo' },
        { expr: 'a', key: 'undef.val' },
        { expr: 'semReturn()', key: 'undef.fn_ret' },
      ]
    },
  ])}
    </section>`,

  null_tipo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">null</h2>
      <p>
        <code>null</code> representa ausência intencional de valor. Diferente de
        <code>undefined</code> — que o motor atribui automaticamente — <code>null</code>
        é sempre colocado explicitamente pelo programador: "este valor existe mas
        está vazio de propósito".
      </p>

      ${_h.block('null.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-keyword">null</span>)        <span class="syn-comment">// "object" — bug histórico, não confie</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">null</span> <span class="syn-operator">===</span> <span class="syn-keyword">null</span>)   <span class="syn-comment">// true — forma correta de verificar`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof null', key: 'null.tipo' },
        { expr: 'null === null', key: 'null.strict' },
      ]
    },
  ])}
    </section>`,

  bigint: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">bigint</h2>
      <p>
        O tipo <code>number</code> representa inteiros com segurança até
        <code>2^53 - 1</code> (9.007 trilhões). Acima disso, há perda de precisão.
        <code>bigint</code> foi criado no ES2020 para inteiros arbitrariamente grandes —
        sem limite. Basta adicionar <code>n</code> no final do literal.
      </p>

      ${_h.block('bigint.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-number">9007199254740991n</span>)   <span class="syn-comment">// "bigint"</span>

<span class="syn-comment">// ── number perde precisão acima do limite ─────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">Number</span>.<span class="syn-property">MAX_SAFE_INTEGER</span>)        <span class="syn-comment">// 9007199254740991</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(
  <span class="syn-id">Number</span>.<span class="syn-property">MAX_SAFE_INTEGER</span> <span class="syn-operator">+</span> <span class="syn-number">1</span> <span class="syn-operator">===</span>
  <span class="syn-id">Number</span>.<span class="syn-property">MAX_SAFE_INTEGER</span> <span class="syn-operator">+</span> <span class="syn-number">2</span>
)   <span class="syn-comment">// true — perda de precisão!</span>

<span class="syn-comment">// ── bigint mantém precisão ────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(
  <span class="syn-number">9007199254740993n</span> <span class="syn-operator">===</span> <span class="syn-number">9007199254740994n</span>
)   <span class="syn-comment">// false — correto!</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof 9007199254740991n', key: 'bigint.tipo' },
        { expr: 'Number.MAX_SAFE_INTEGER', key: 'bigint.max_js' },
        { expr: 'MAX + 1 === MAX + 2 <span class="syn-comment">// number</span>', key: 'bigint.safe', cls: 'code-console__line--warn' },
        { expr: '...993n === ...994n <span class="syn-comment">// bigint</span>', key: 'bigint.bigint' },
      ]
    },
  ])}
    </section>`,

  symbol: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">symbol</h2>
      <p>
        <code>symbol</code> cria identificadores <strong>únicos e imutáveis</strong>.
        Cada chamada de <code>Symbol()</code> retorna um valor diferente de todos os
        outros — mesmo que a descrição seja igual. São usados principalmente como
        chaves de propriedades de objetos para evitar colisões de nomes.
      </p>

      ${_h.block('symbol.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-fn">Symbol</span>(<span class="syn-string">"id"</span>))             <span class="syn-comment">// "symbol"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">Symbol</span>(<span class="syn-string">"id"</span>) <span class="syn-operator">===</span> <span class="syn-fn">Symbol</span>(<span class="syn-string">"id"</span>))  <span class="syn-comment">// false — cada Symbol é único</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-fn">Symbol</span>(<span class="syn-string">"meu-id"</span>).<span class="syn-property">description</span>)   <span class="syn-comment">// "meu-id"</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof Symbol("id")', key: 'symbol.tipo' },
        { expr: 'Symbol("id") === Symbol("id")', key: 'symbol.unico' },
        { expr: 'Symbol("meu-id").description', key: 'symbol.descricao' },
      ]
    },
  ])}
    </section>`,

  imutabilidade: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Por que primitivos são imutáveis?</h2>
      <p>
        Imutável não significa que a variável não pode mudar de valor —
        significa que o valor em si, na memória, não pode ser alterado.
        Quando você faz <code>let s = "texto"; s = "outro"</code>, você não
        modificou a string <code>"texto"</code> — criou uma nova string
        <code>"outro"</code> e fez a variável <code>s</code> apontar para ela.
      </p>
      <p>
        A string original <code>"texto"</code> continua existindo na memória
        intacta — o garbage collector vai removê-la quando não houver mais
        nenhuma referência a ela. Isso é diferente de objetos, onde o conteúdo
        pode ser alterado in-place sem criar um novo objeto.
      </p>
    </section>`,

  resumo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Resumo dos 7 tipos primitivos</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">📝</div>
          <h3>string</h3>
          <p>Texto imutável. Tem propriedades e métodos via boxing automático. Nunca modifica o original.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔢</div>
          <h3>number</h3>
          <p>Inteiros e decimais no mesmo tipo. Cuidado com IEEE 754, NaN (não é igual a si mesmo) e Infinity.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">✅</div>
          <h3>boolean</h3>
          <p>Apenas <code>true</code> ou <code>false</code>. Base de toda lógica condicional.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">❓</div>
          <h3>undefined</h3>
          <p>Ausência automática — motor atribui quando algo não foi inicializado.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">∅</div>
          <h3>null</h3>
          <p>Ausência intencional — você atribui para dizer "sem valor de propósito".</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔭</div>
          <h3>bigint</h3>
          <p>Inteiros sem limite de tamanho. Use quando ultrapassar <code>Number.MAX_SAFE_INTEGER</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔑</div>
          <h3>symbol</h3>
          <p>Identificador único e imutável. Dois Symbols com a mesma descrição nunca são iguais.</p>
        </div>
      </div>
    </section>`,

  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Com os primitivos consolidados, a próxima aula foca no
        <strong>tipo de referência</strong>: objetos, arrays e funções.
        Vamos entender como funciona a passagem por referência, comparação
        de objetos e a diferença entre cópia rasa e cópia profunda.
      </p>
    </section>`,
}


// ═══════════════════════════════════════════════════════════════════════════════
// CONTENT
// ═══════════════════════════════════════════════════════════════════════════════

export function content() {
  return Object.values(_secoes).map(s => s()).join('\n')
}


// ═══════════════════════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════════════════════

export function initPrimitivos() {
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return
    el.textContent = val.text
    if (val.cls) el.className = val.cls
  })
}