// src/content/variaveis-tipos/08-coercao.js

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
  const nil = (v) => ({ text: String(v), cls: 'syn-output-null' })

  // ── 1. Coerção implícita com + (string) ──────────────────────────────────
  const soma_str_num = "5" + 3          // "53"  — número virou string
  const soma_num_str = 3 + "5"          // "35"
  const soma_num_num = 3 + 3            // 6     — ambos números, soma normal
  const soma_bool_num = true + 1         // 2     — true vira 1
  const soma_false_num = false + 1        // 1     — false vira 0
  const soma_null_num = null + 1         // 1     — null vira 0
  const soma_undef_num = undefined + 1    // NaN   — undefined vira NaN

  // ── 2. Coerção implícita com -, *, / (número) ────────────────────────────
  const sub_str_num = "10" - 3          // 7     — "10" virou 10
  const mult_str_num = "4" * 2          // 8
  const div_str_num = "10" / "2"        // 5     — ambas strings viram números
  const sub_str_letra = "abc" - 1         // NaN   — não é número
  const mult_bool = true * 5          // 5
  const div_null = null / 2          // 0     — null vira 0

  // ── 3. Comparação com == (loose equality) ────────────────────────────────
  const loose_0_false = 0 == false      // true  — coerção: false → 0
  const loose_1_true = 1 == true       // true  — coerção: true  → 1
  const loose_str_num = "5" == 5          // true  — coerção: "5"   → 5
  const loose_null_undef = null == undefined  // true  — regra especial
  const loose_null_0 = null == 0         // false — null só == undefined/null
  const loose_str_bool = "" == false      // true  — "" → 0, false → 0

  // ── 4. Comparação com === (strict equality) ──────────────────────────────
  const strict_0_false = 0 === false     // false — tipos diferentes
  const strict_str_num = "5" === 5         // false
  const strict_null_undef = null === undefined // false — tipos distintos

  // ── 5. Conversão explícita para número ───────────────────────────────────
  const num_str_ok = Number("42")      // 42
  const num_str_float = Number("3.14")    // 3.14
  const num_str_vazia = Number("")        // 0    — string vazia vira 0
  const num_bool_true = Number(true)      // 1
  const num_bool_false = Number(false)     // 0
  const num_null = Number(null)      // 0
  const num_undefined = Number(undefined) // NaN
  const num_str_letra = Number("abc")     // NaN
  const parseint_float = parseInt("3.9")   // 3    — trunca decimal
  const parsefloat_str = parseFloat("3.14px") // 3.14 — lê até onde pode

  // ── 6. Conversão explícita para string ───────────────────────────────────
  const str_num = String(42)        // "42"
  const str_bool = String(true)      // "true"
  const str_null = String(null)      // "null"
  const str_undefined = String(undefined) // "undefined"
  const str_array = String([1, 2, 3]) // "1,2,3"
  const tostr_num = (255).toString(16) // "ff" — hex

  // ── 7. Conversão explícita para boolean ──────────────────────────────────
  const bool_0 = Boolean(0)         // false
  const bool_str_vazia = Boolean("")        // false
  const bool_null = Boolean(null)      // false
  const bool_undefined = Boolean(undefined) // false
  const bool_nan = Boolean(NaN)       // false
  const bool_str_zero = Boolean("0")       // true  — string não-vazia é truthy!
  const bool_str_false = Boolean("false")   // true  — string não-vazia é truthy!
  const bool_arr_vazio = Boolean([])        // true  — objeto vazio é truthy!
  const bool_obj_vazio = Boolean({})        // true

  // ── 8. Falsy values ──────────────────────────────────────────────────────
  const falsy_0 = !0           // true
  const falsy_str_vazia = !""          // true
  const falsy_null = !null        // true
  const falsy_undef = !undefined   // true
  const falsy_nan = !NaN         // true
  const falsy_str_zero = !"0"         // false — "0" é truthy!

  return {
    soma: {
      str_num: str(soma_str_num),
      num_str: str(soma_num_str),
      num_num: num(soma_num_num),
      bool_num: num(soma_bool_num),
      false_num: num(soma_false_num),
      null_num: num(soma_null_num),
      undef_num: nil(soma_undef_num),
    },
    arit: {
      sub_str_num: num(sub_str_num),
      mult_str_num: num(mult_str_num),
      div_str_num: num(div_str_num),
      sub_str_letra: nil(sub_str_letra),
      mult_bool: num(mult_bool),
      div_null: num(div_null),
    },
    loose: {
      _0_false: bool(loose_0_false),
      _1_true: bool(loose_1_true),
      str_num: bool(loose_str_num),
      null_undef: bool(loose_null_undef),
      null_0: bool(loose_null_0),
      str_bool: bool(loose_str_bool),
    },
    strict: {
      _0_false: bool(strict_0_false),
      str_num: bool(strict_str_num),
      null_undef: bool(strict_null_undef),
    },
    tonum: {
      str_ok: num(num_str_ok),
      str_float: num(num_str_float),
      str_vazia: num(num_str_vazia),
      bool_true: num(num_bool_true),
      bool_false: num(num_bool_false),
      null: num(num_null),
      undefined: nil(num_undefined),
      str_letra: nil(num_str_letra),
      parseint: num(parseint_float),
      parsefloat: num(parsefloat_str),
    },
    tostr: {
      num: str(str_num),
      bool: str(str_bool),
      null: str(str_null),
      undefined: str(str_undefined),
      array: str(str_array),
      hex: str(tostr_num),
    },
    tobool: {
      _0: bool(bool_0),
      str_vazia: bool(bool_str_vazia),
      null: bool(bool_null),
      undefined: bool(bool_undefined),
      nan: bool(bool_nan),
      str_zero: bool(bool_str_zero),
      str_false: bool(bool_str_false),
      arr_vazio: bool(bool_arr_vazio),
      obj_vazio: bool(bool_obj_vazio),
    },
    falsy: {
      _0: bool(falsy_0),
      str_vazia: bool(falsy_str_vazia),
      null: bool(falsy_null),
      undef: bool(falsy_undef),
      nan: bool(falsy_nan),
      str_zero: bool(falsy_str_zero),
    },
  }
})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {

  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Coerção de tipos</h2>
      <p>
        Coerção é a conversão automática de um valor de um tipo para outro.
        O JavaScript faz isso o tempo todo nos bastidores — é uma das
        características mais poderosas e ao mesmo tempo mais traiçoeiras da
        linguagem.
      </p>
      <p>
        Existem dois tipos: <strong>coerção implícita</strong>, feita automaticamente
        pelo motor do JS em operações e comparações, e <strong>coerção explícita</strong>,
        feita intencionalmente pelo programador com funções como
        <code>Number()</code>, <code>String()</code> e <code>Boolean()</code>.
      </p>
      <p>
        Entender as regras evita uma classe inteira de bugs sutis — resultados
        inesperados em somas, comparações que "deveriam ser falsas" mas não são,
        condicionais que não se comportam como esperado.
      </p>
    </section>`,

  coercao_com_soma: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Coerção implícita com <code>+</code></h2>
      <p>
        O operador <code>+</code> tem dupla personalidade: soma números e
        concatena strings. Quando um dos operandos é string, o outro é
        convertido para string — a concatenação tem precedência.
        Para os outros tipos, a regra é diferente.
      </p>

      ${_h.block('coercao-soma.js', /* html */ `
<span class="syn-string">"5"</span> <span class="syn-operator">+</span> <span class="syn-number">3</span>          <span class="syn-comment">// "53"  — 3 virou string</span>
<span class="syn-number">3</span> <span class="syn-operator">+</span> <span class="syn-string">"5"</span>          <span class="syn-comment">// "35"  — ordem não importa</span>
<span class="syn-number">3</span> <span class="syn-operator">+</span> <span class="syn-number">3</span>            <span class="syn-comment">// 6     — ambos números, soma normal</span>
<span class="syn-keyword">true</span> <span class="syn-operator">+</span> <span class="syn-number">1</span>         <span class="syn-comment">// 2     — true vira 1</span>
<span class="syn-keyword">false</span> <span class="syn-operator">+</span> <span class="syn-number">1</span>        <span class="syn-comment">// 1     — false vira 0</span>
<span class="syn-keyword">null</span> <span class="syn-operator">+</span> <span class="syn-number">1</span>         <span class="syn-comment">// 1     — null vira 0</span>
<span class="syn-keyword">undefined</span> <span class="syn-operator">+</span> <span class="syn-number">1</span>    <span class="syn-comment">// NaN   — undefined não tem conversão numérica</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '<span class="syn-string">"5"</span> + <span class="syn-number">3</span>', key: 'soma.str_num', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-number">3</span> + <span class="syn-string">"5"</span>', key: 'soma.num_str', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-number">3</span> + <span class="syn-number">3</span>', key: 'soma.num_num' },
        { expr: '<span class="syn-keyword">true</span> + <span class="syn-number">1</span>', key: 'soma.bool_num' },
        { expr: '<span class="syn-keyword">false</span> + <span class="syn-number">1</span>', key: 'soma.false_num' },
        { expr: '<span class="syn-keyword">null</span> + <span class="syn-number">1</span>', key: 'soma.null_num' },
        { expr: '<span class="syn-keyword">undefined</span> + <span class="syn-number">1</span>', key: 'soma.undef_num', cls: 'code-console__line--warn' },
      ]
    },
  ])}

      <p>
        A armadilha clássica: ler um valor de input HTML e tentar somar.
        <code>input.value</code> é sempre string — <code>"5" + 3</code> vira <code>"53"</code>.
        Converta primeiro: <code>Number(input.value) + 3</code>.
      </p>
    </section>`,

  coercao_aritmetica: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Coerção implícita com <code>-</code> <code>*</code> <code>/</code></h2>
      <p>
        Diferente do <code>+</code>, os operadores <code>-</code>, <code>*</code>
        e <code>/</code> só fazem sentido com números. Por isso, o JavaScript
        sempre tenta converter os operandos para número — não para string.
        Se a conversão falhar, o resultado é <code>NaN</code>.
      </p>

      ${_h.block('coercao-aritmetica.js', /* html */ `
<span class="syn-string">"10"</span> <span class="syn-operator">-</span> <span class="syn-number">3</span>     <span class="syn-comment">// 7   — "10" virou 10</span>
<span class="syn-string">"4"</span>  <span class="syn-operator">*</span> <span class="syn-number">2</span>     <span class="syn-comment">// 8</span>
<span class="syn-string">"10"</span> <span class="syn-operator">/</span> <span class="syn-string">"2"</span>  <span class="syn-comment">// 5   — ambas convertidas para número</span>
<span class="syn-string">"abc"</span> <span class="syn-operator">-</span> <span class="syn-number">1</span>   <span class="syn-comment">// NaN — "abc" não é número</span>
<span class="syn-keyword">true</span> <span class="syn-operator">*</span> <span class="syn-number">5</span>      <span class="syn-comment">// 5   — true vira 1</span>
<span class="syn-keyword">null</span> <span class="syn-operator">/</span> <span class="syn-number">2</span>      <span class="syn-comment">// 0   — null vira 0</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '<span class="syn-string">"10"</span> - <span class="syn-number">3</span>', key: 'arit.sub_str_num' },
        { expr: '<span class="syn-string">"4"</span> * <span class="syn-number">2</span>', key: 'arit.mult_str_num' },
        { expr: '<span class="syn-string">"10"</span> / <span class="syn-string">"2"</span>', key: 'arit.div_str_num' },
        { expr: '<span class="syn-string">"abc"</span> - <span class="syn-number">1</span>', key: 'arit.sub_str_letra', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-keyword">true</span> * <span class="syn-number">5</span>', key: 'arit.mult_bool' },
        { expr: '<span class="syn-keyword">null</span> / <span class="syn-number">2</span>', key: 'arit.div_null' },
      ]
    },
  ])}
    </section>`,

  loose_equality: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comparação frouxa — <code>==</code></h2>
      <p>
        O operador <code>==</code> aplica coerção antes de comparar — converte
        os operandos para um tipo comum. O resultado pode ser bem
        contra-intuitivo. Por isso, a recomendação quase universal é evitar
        <code>==</code> e preferir <code>===</code>.
      </p>

      ${_h.block('loose-equality.js', /* html */ `
<span class="syn-number">0</span>    <span class="syn-operator">==</span> <span class="syn-keyword">false</span>      <span class="syn-comment">// true  — false vira 0</span>
<span class="syn-number">1</span>    <span class="syn-operator">==</span> <span class="syn-keyword">true</span>       <span class="syn-comment">// true  — true  vira 1</span>
<span class="syn-string">"5"</span>  <span class="syn-operator">==</span> <span class="syn-number">5</span>          <span class="syn-comment">// true  — "5" vira 5</span>
<span class="syn-keyword">null</span> <span class="syn-operator">==</span> <span class="syn-keyword">undefined</span>  <span class="syn-comment">// true  — regra especial: são "iguais" entre si</span>
<span class="syn-keyword">null</span> <span class="syn-operator">==</span> <span class="syn-number">0</span>         <span class="syn-comment">// false — null só é == null ou undefined</span>
<span class="syn-string">""</span>   <span class="syn-operator">==</span> <span class="syn-keyword">false</span>      <span class="syn-comment">// true  — "" → 0, false → 0</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '<span class="syn-number">0</span> == <span class="syn-keyword">false</span>', key: 'loose._0_false', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-number">1</span> == <span class="syn-keyword">true</span>', key: 'loose._1_true', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-string">"5"</span> == <span class="syn-number">5</span>', key: 'loose.str_num', cls: 'code-console__line--warn' },
        { expr: '<span class="syn-keyword">null</span> == <span class="syn-keyword">undefined</span>', key: 'loose.null_undef' },
        { expr: '<span class="syn-keyword">null</span> == <span class="syn-number">0</span>', key: 'loose.null_0' },
        { expr: '<span class="syn-string">""</span> == <span class="syn-keyword">false</span>', key: 'loose.str_bool', cls: 'code-console__line--warn' },
      ]
    },
  ])}

      <p>
        A única exceção aceita: <code>valor == null</code> como atalho para
        verificar <code>null</code> ou <code>undefined</code> de uma vez —
        equivale a <code>valor === null || valor === undefined</code>.
      </p>
    </section>`,

  strict_equality: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comparação estrita — <code>===</code></h2>
      <p>
        O operador <code>===</code> não aplica coerção. Compara valor
        <em>e</em> tipo. Se os tipos forem diferentes, o resultado é
        imediatamente <code>false</code> — sem conversão, sem surpresa.
        Prefira sempre <code>===</code>.
      </p>

      ${_h.block('strict-equality.js', /* html */ `
<span class="syn-number">0</span>    <span class="syn-operator">===</span> <span class="syn-keyword">false</span>     <span class="syn-comment">// false — number vs boolean</span>
<span class="syn-string">"5"</span>  <span class="syn-operator">===</span> <span class="syn-number">5</span>         <span class="syn-comment">// false — string vs number</span>
<span class="syn-keyword">null</span> <span class="syn-operator">===</span> <span class="syn-keyword">undefined</span> <span class="syn-comment">// false — tipos distintos</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '<span class="syn-number">0</span> === <span class="syn-keyword">false</span>', key: 'strict._0_false' },
        { expr: '<span class="syn-string">"5"</span> === <span class="syn-number">5</span>', key: 'strict.str_num' },
        { expr: '<span class="syn-keyword">null</span> === <span class="syn-keyword">undefined</span>', key: 'strict.null_undef' },
      ]
    },
  ])}
    </section>`,

  conversao_para_numero: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Conversão explícita para número</h2>
      <p>
        Quando precisar converter para número de forma intencional, use
        <code>Number()</code>. Para strings que podem conter unidades
        (<code>"3.14px"</code>), <code>parseInt()</code> e
        <code>parseFloat()</code> lêem o que conseguem e param no primeiro
        caractere inválido.
      </p>

      ${_h.block('para-numero.js', /* html */ `
<span class="syn-id">Number</span>(<span class="syn-string">"42"</span>)        <span class="syn-comment">// 42</span>
<span class="syn-id">Number</span>(<span class="syn-string">"3.14"</span>)      <span class="syn-comment">// 3.14</span>
<span class="syn-id">Number</span>(<span class="syn-string">""</span>)          <span class="syn-comment">// 0    — string vazia vira 0</span>
<span class="syn-id">Number</span>(<span class="syn-keyword">true</span>)        <span class="syn-comment">// 1</span>
<span class="syn-id">Number</span>(<span class="syn-keyword">false</span>)       <span class="syn-comment">// 0</span>
<span class="syn-id">Number</span>(<span class="syn-keyword">null</span>)        <span class="syn-comment">// 0</span>
<span class="syn-id">Number</span>(<span class="syn-keyword">undefined</span>)   <span class="syn-comment">// NaN</span>
<span class="syn-id">Number</span>(<span class="syn-string">"abc"</span>)       <span class="syn-comment">// NaN</span>

<span class="syn-fn">parseInt</span>(<span class="syn-string">"3.9"</span>)     <span class="syn-comment">// 3    — trunca decimal</span>
<span class="syn-fn">parseFloat</span>(<span class="syn-string">"3.14px"</span>) <span class="syn-comment">// 3.14 — lê até onde pode</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'Number(<span class="syn-string">"42"</span>)', key: 'tonum.str_ok' },
        { expr: 'Number(<span class="syn-string">"3.14"</span>)', key: 'tonum.str_float' },
        { expr: 'Number(<span class="syn-string">""</span>)', key: 'tonum.str_vazia', cls: 'code-console__line--warn' },
        { expr: 'Number(<span class="syn-keyword">true</span>)', key: 'tonum.bool_true' },
        { expr: 'Number(<span class="syn-keyword">false</span>)', key: 'tonum.bool_false' },
        { expr: 'Number(<span class="syn-keyword">null</span>)', key: 'tonum.null' },
        { expr: 'Number(<span class="syn-keyword">undefined</span>)', key: 'tonum.undefined', cls: 'code-console__line--warn' },
        { expr: 'Number(<span class="syn-string">"abc"</span>)', key: 'tonum.str_letra', cls: 'code-console__line--warn' },
        { expr: 'parseInt(<span class="syn-string">"3.9"</span>)', key: 'tonum.parseint' },
        { expr: 'parseFloat(<span class="syn-string">"3.14px"</span>)', key: 'tonum.parsefloat' },
      ]
    },
  ])}
    </section>`,

  conversao_para_string: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Conversão explícita para string</h2>
      <p>
        <code>String()</code> converte qualquer valor para sua representação
        textual — incluindo <code>null</code> e <code>undefined</code>, o que
        o operador <code>+""</code> também faz, porém de forma menos legível.
        O método <code>.toString()</code> aceita uma base numérica como argumento.
      </p>

      ${_h.block('para-string.js', /* html */ `
<span class="syn-id">String</span>(<span class="syn-number">42</span>)         <span class="syn-comment">// "42"</span>
<span class="syn-id">String</span>(<span class="syn-keyword">true</span>)       <span class="syn-comment">// "true"</span>
<span class="syn-id">String</span>(<span class="syn-keyword">null</span>)       <span class="syn-comment">// "null"</span>
<span class="syn-id">String</span>(<span class="syn-keyword">undefined</span>)   <span class="syn-comment">// "undefined"</span>
<span class="syn-id">String</span>([<span class="syn-number">1</span>, <span class="syn-number">2</span>, <span class="syn-number">3</span>])  <span class="syn-comment">// "1,2,3" — array.toString()</span>

<span class="syn-comment">// toString com base numérica</span>
(<span class="syn-number">255</span>).<span class="syn-fn">toString</span>(<span class="syn-number">16</span>)  <span class="syn-comment">// "ff"  — hexadecimal</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'String(<span class="syn-number">42</span>)', key: 'tostr.num' },
        { expr: 'String(<span class="syn-keyword">true</span>)', key: 'tostr.bool' },
        { expr: 'String(<span class="syn-keyword">null</span>)', key: 'tostr.null' },
        { expr: 'String(<span class="syn-keyword">undefined</span>)', key: 'tostr.undefined' },
        { expr: 'String([<span class="syn-number">1</span>, <span class="syn-number">2</span>, <span class="syn-number">3</span>])', key: 'tostr.array' },
        { expr: '(<span class="syn-number">255</span>).toString(<span class="syn-number">16</span>)', key: 'tostr.hex' },
      ]
    },
  ])}
    </section>`,

  conversao_para_boolean: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Conversão explícita para boolean — falsy e truthy</h2>
      <p>
        Em JavaScript, todo valor tem uma "veracidade" intrínseca.
        Apenas <strong>6 valores são falsy</strong> — todos os demais são truthy.
        Use <code>Boolean()</code> ou <code>!!</code> para converter explicitamente.
      </p>
      <p>
        O erro mais comum: assumir que <code>"0"</code>, <code>"false"</code>
        ou <code>[]</code> são falsy — não são. Qualquer string não-vazia
        e qualquer objeto (incluindo arrays e objetos vazios) é truthy.
      </p>

      ${_h.block('para-boolean.js', /* html */ `
<span class="syn-comment">// ── os 6 valores falsy ───────────────────────────────────────</span>
<span class="syn-id">Boolean</span>(<span class="syn-number">0</span>)          <span class="syn-comment">// false</span>
<span class="syn-id">Boolean</span>(<span class="syn-string">""</span>)         <span class="syn-comment">// false</span>
<span class="syn-id">Boolean</span>(<span class="syn-keyword">null</span>)       <span class="syn-comment">// false</span>
<span class="syn-id">Boolean</span>(<span class="syn-keyword">undefined</span>)  <span class="syn-comment">// false</span>
<span class="syn-id">Boolean</span>(<span class="syn-id">NaN</span>)        <span class="syn-comment">// false</span>
<span class="syn-comment">// (o 6º falsy é false em si)</span>

<span class="syn-comment">// ── surpresas truthy ─────────────────────────────────────────</span>
<span class="syn-id">Boolean</span>(<span class="syn-string">"0"</span>)        <span class="syn-comment">// true  — string não-vazia!</span>
<span class="syn-id">Boolean</span>(<span class="syn-string">"false"</span>)    <span class="syn-comment">// true  — string não-vazia!</span>
<span class="syn-id">Boolean</span>([])         <span class="syn-comment">// true  — objeto (mesmo vazio)!</span>
<span class="syn-id">Boolean</span>({})         <span class="syn-comment">// true  — objeto (mesmo vazio)!</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'Boolean(<span class="syn-number">0</span>)', key: 'tobool._0' },
        { expr: 'Boolean(<span class="syn-string">""</span>)', key: 'tobool.str_vazia' },
        { expr: 'Boolean(<span class="syn-keyword">null</span>)', key: 'tobool.null' },
        { expr: 'Boolean(<span class="syn-keyword">undefined</span>)', key: 'tobool.undefined' },
        { expr: 'Boolean(<span class="syn-id">NaN</span>)', key: 'tobool.nan' },
        { expr: 'Boolean(<span class="syn-string">"0"</span>) <span class="syn-comment">// truthy!</span>', key: 'tobool.str_zero', cls: 'code-console__line--warn' },
        { expr: 'Boolean(<span class="syn-string">"false"</span>) <span class="syn-comment">// truthy!</span>', key: 'tobool.str_false', cls: 'code-console__line--warn' },
        { expr: 'Boolean([]) <span class="syn-comment">// truthy!</span>', key: 'tobool.arr_vazio', cls: 'code-console__line--warn' },
        { expr: 'Boolean({}) <span class="syn-comment">// truthy!</span>', key: 'tobool.obj_vazio', cls: 'code-console__line--warn' },
      ]
    },
  ])}

      <p>
        Na prática, é raro usar <code>Boolean()</code> diretamente.
        A coerção implícita acontece automaticamente em <code>if</code>,
        <code>while</code>, <code>? :</code> e operadores lógicos
        <code>&&</code> e <code>||</code>.
      </p>
    </section>`,

  operador_not: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Operador <code>!</code> e o atalho <code>!!</code></h2>
      <p>
        O operador <code>!</code> nega e converte implicitamente para boolean.
        O padrão <code>!!</code> (dupla negação) é um atalho idiomático para
        obter o boolean equivalente a qualquer valor — equivale a
        <code>Boolean(valor)</code>.
      </p>

      ${_h.block('operador-not.js', /* html */ `
<span class="syn-operator">!</span><span class="syn-number">0</span>           <span class="syn-comment">// true  — 0 é falsy</span>
<span class="syn-operator">!</span><span class="syn-string">""</span>          <span class="syn-comment">// true  — "" é falsy</span>
<span class="syn-operator">!</span><span class="syn-keyword">null</span>        <span class="syn-comment">// true</span>
<span class="syn-operator">!</span><span class="syn-keyword">undefined</span>   <span class="syn-comment">// true</span>
<span class="syn-operator">!</span><span class="syn-id">NaN</span>         <span class="syn-comment">// true</span>
<span class="syn-operator">!</span><span class="syn-string">"0"</span>         <span class="syn-comment">// false — "0" é truthy (string não-vazia)</span>

<span class="syn-comment">// !! como conversão explícita para boolean</span>
<span class="syn-operator">!!</span><span class="syn-number">0</span>          <span class="syn-comment">// false — equivale a Boolean(0)</span>
<span class="syn-operator">!!</span><span class="syn-string">"texto"</span>    <span class="syn-comment">// true  — equivale a Boolean("texto")</span>`, [
    {
      label: 'Console', linhas: [
        { expr: '!<span class="syn-number">0</span>', key: 'falsy._0' },
        { expr: '!<span class="syn-string">""</span>', key: 'falsy.str_vazia' },
        { expr: '!<span class="syn-keyword">null</span>', key: 'falsy.null' },
        { expr: '!<span class="syn-keyword">undefined</span>', key: 'falsy.undef' },
        { expr: '!<span class="syn-id">NaN</span>', key: 'falsy.nan' },
        { expr: '!<span class="syn-string">"0"</span> <span class="syn-comment">// truthy!</span>', key: 'falsy.str_zero', cls: 'code-console__line--warn' },
      ]
    },
  ])}
    </section>`,

  resumo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Resumo — coerção de tipos</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">➕</div>
          <h3>+ concatena strings</h3>
          <p>Se qualquer operando for string, o outro é convertido para string. Os demais operadores aritméticos convertem para número.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚖️</div>
          <h3>Use === sempre</h3>
          <p>O operador <code>==</code> aplica coerção e produz resultados contra-intuitivos. Prefira <code>===</code>; a exceção aceita é <code>valor == null</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔢</div>
          <h3>Number() para conversão</h3>
          <p><code>Number()</code> para conversão explícita. <code>parseInt()</code> e <code>parseFloat()</code> para strings com unidades.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">💬</div>
          <h3>String() para texto</h3>
          <p><code>String()</code> funciona com qualquer valor, incluindo <code>null</code> e <code>undefined</code>. <code>.toString(base)</code> para outras bases numéricas.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">❌</div>
          <h3>Os 6 valores falsy</h3>
          <p><code>false</code>, <code>0</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, <code>NaN</code>. Tudo mais é truthy — inclusive <code>"0"</code>, <code>[]</code> e <code>{}</code>.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">‼️</div>
          <h3>!! como Boolean()</h3>
          <p>Dupla negação converte qualquer valor para seu boolean equivalente. Idiomático e conciso.</p>
        </div>
      </div>
    </section>`,

  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Com coerção dominada, a próxima aula aborda
        <strong>escopo e closures</strong> — onde as variáveis vivem, por quanto
        tempo existem, e como funções internas capturam variáveis do escopo
        externo mesmo após a execução da função pai ter encerrado.
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

export function initCoercao() {
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return
    el.textContent = val.text
    if (val.cls) el.className = val.cls
  })
}