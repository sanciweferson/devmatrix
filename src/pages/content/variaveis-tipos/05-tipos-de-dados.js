// src/content/variaveis-tipos/05-tipos-de-dados.js

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
  const nil = (v) => ({ text: v ?? 'undefined', cls: 'syn-output-null' })
  const err = (v) => ({ text: v, cls: 'syn-output-error' })

  // ── 1. typeof nos 8 tipos ─────────────────────────────────────────────────
  const t_undefined = typeof undefined        // "undefined"
  const t_null = typeof null             // "object" — o bug famoso
  const t_boolean = typeof true             // "boolean"
  const t_number = typeof 42               // "number"
  const t_string = typeof "texto"          // "string"
  const t_bigint = typeof 9007199254740991n // "bigint"
  const t_symbol = typeof Symbol("id")     // "symbol"
  const t_object = typeof {}               // "object"
  const t_function = typeof function () { }     // "function"
  const t_array = typeof []               // "object" — array é objeto

  // ── 2. typeof null — o bug histórico ─────────────────────────────────────
  const null_typeof = typeof null            // "object"
  const null_is_null = null === null          // true — forma correta de testar

  // ── 3. Tipagem dinâmica — mesma variável, tipos diferentes ───────────────
  let _din = 42
  const din_num = typeof _din               // "number"
  _din = "agora sou string"
  const din_str = typeof _din               // "string"
  _din = true
  const din_bool = typeof _din               // "boolean"

  // ── 4. Primitivo vs referência ────────────────────────────────────────────
  // Primitivos passados por valor — cópia independente
  let _pa = 10; let _pb = _pa; _pb = 99
  const prim_a = _pa   // 10 — não foi afetado
  const prim_b = _pb   // 99

  // Referências — apontam para o mesmo objeto
  const _ra = { x: 10 }; const _rb = _ra; _rb.x = 99
  const ref_a_x = _ra.x   // 99 — foi afetado
  const ref_b_x = _rb.x   // 99

  // ── 5. undefined vs null ─────────────────────────────────────────────────
  let _undef
  const undef_val = typeof _undef         // "undefined"
  const null_val = typeof null           // "object"
  const undef_eq = (undefined == null)   // true  — igualdade fraca
  const undef_strict = (undefined === null)  // false — igualdade estrita

  return {
    typeof: {
      undefined: str(t_undefined),
      null: str(t_null),
      boolean: str(t_boolean),
      number: str(t_number),
      string: str(t_string),
      bigint: str(t_bigint),
      symbol: str(t_symbol),
      object: str(t_object),
      function: str(t_function),
      array: str(t_array),
    },
    null_bug: {
      typeof: str(null_typeof),
      is_null: bool(null_is_null),
    },
    dinamico: {
      num: str(din_num),
      str: str(din_str),
      bool: str(din_bool),
    },
    primitivo: {
      a: num(prim_a),
      b: num(prim_b),
    },
    referencia: {
      a_x: num(ref_a_x),
      b_x: num(ref_b_x),
    },
    undef_null: {
      undef_type: str(undef_val),
      null_type: str(null_val),
      eq_fraca: bool(undef_eq),
      eq_estrita: bool(undef_strict),
    },
  }
})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {

  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que é um tipo de dado?</h2>
      <p>
        Todo valor em JavaScript tem um tipo. O tipo determina o que você pode
        fazer com aquele valor — quais operações são válidas, como ele se comporta
        em comparações e como o motor o armazena na memória.
      </p>
      <p>
        JavaScript é uma linguagem de <strong>tipagem dinâmica</strong>: você não
        declara o tipo de uma variável — o motor infere o tipo pelo valor que ela
        contém em cada momento. A mesma variável pode ser um número agora e uma
        string depois.
      </p>
      <p>
        A especificação ECMAScript define <strong>8 tipos</strong>. Sete são
        <em>primitivos</em> — valores simples e imutáveis. Um é de
        <em>referência</em> — o tipo <code>object</code>, que engloba objetos,
        arrays e funções.
      </p>
    </section>`,

  os_oito_tipos: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Os 8 tipos do JavaScript</h2>
      <p>
        O operador <code>typeof</code> retorna o tipo de um valor como string.
        Ele é a ferramenta básica de inspeção de tipos em runtime.
      </p>

      ${_h.block('typeof.js', /* html */ `
<span class="syn-comment">// ── 7 tipos primitivos ─────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">undefined</span>)         <span class="syn-comment">// "undefined"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-boolean">true</span>)              <span class="syn-comment">// "boolean"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-number">42</span>)                <span class="syn-comment">// "number"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-string">"texto"</span>)           <span class="syn-comment">// "string"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-number">9007199254740991n</span>) <span class="syn-comment">// "bigint"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-fn">Symbol</span>(<span class="syn-string">"id"</span>))      <span class="syn-comment">// "symbol"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-keyword">null</span>)             <span class="syn-comment">// "object" ← bug histórico!</span>

<span class="syn-comment">// ── 1 tipo de referência ────────────────────────────────────────</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> {})               <span class="syn-comment">// "object"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> [])               <span class="syn-comment">// "object" — array é objeto</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-keyword">function</span>(){})     <span class="syn-comment">// "function" — exceção especial</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof undefined', key: 'typeof.undefined' },
        { expr: 'typeof true', key: 'typeof.boolean' },
        { expr: 'typeof 42', key: 'typeof.number' },
        { expr: 'typeof "texto"', key: 'typeof.string' },
        { expr: 'typeof 9007199254740991n', key: 'typeof.bigint' },
        { expr: 'typeof Symbol("id")', key: 'typeof.symbol' },
        { expr: 'typeof null', key: 'typeof.null' },
        { expr: 'typeof {}', key: 'typeof.object' },
        { expr: 'typeof []', key: 'typeof.array' },
        { expr: 'typeof function(){}', key: 'typeof.function' },
      ]
    },
  ])}

      <p>
        Repare nos dois resultados inesperados: <code>typeof null</code> retorna
        <code>"object"</code> — isso é um bug da linguagem que nunca foi corrigido
        por compatibilidade. E <code>typeof []</code> também retorna
        <code>"object"</code> — arrays são objetos em JavaScript.
      </p>
    </section>`,

  null_bug: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O bug do typeof null</h2>
      <p>
        <code>typeof null === "object"</code> é um erro da implementação original
        de 1995. Na representação interna do motor, <code>null</code> usava o mesmo
        marcador de tipo que objetos — e o <code>typeof</code> lia esse marcador
        sem verificar o caso especial.
      </p>
      <p>
        Corrigir isso quebraria milhões de páginas — então foi mantido. A forma
        correta de verificar se algo é <code>null</code> é a comparação estrita
        <code>=== null</code>.
      </p>

      ${_h.block('null-bug.js', /* html */ `
<span class="syn-comment">// ⚠️ typeof null é um bug — não confie nele para testar null</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-keyword">null</span>)        <span class="syn-comment">// "object" — BUG histórico</span>

<span class="syn-comment">// ✓ forma correta de verificar null</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">null</span> <span class="syn-operator">===</span> <span class="syn-keyword">null</span>)   <span class="syn-comment">// true</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof null', key: 'null_bug.typeof' },
        { expr: 'null === null', key: 'null_bug.is_null' },
      ]
    },
  ])}
    </section>`,

  tipagem_dinamica: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Tipagem dinâmica</h2>
      <p>
        Em JavaScript, o tipo pertence ao <em>valor</em>, não à variável.
        A mesma variável pode conter valores de tipos diferentes ao longo do tempo.
        Isso é chamado de tipagem dinâmica.
      </p>
      <p>
        Em linguagens de tipagem estática como TypeScript ou Java, uma variável
        declarada como <code>number</code> só pode conter números — para sempre.
        Em JavaScript, não existe essa garantia em runtime.
      </p>

      ${_h.block('tipagem-dinamica.js', /* html */ `
<span class="syn-keyword">let</span> <span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-number">42</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">valor</span>)   <span class="syn-comment">// "number"</span>

<span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-string">"agora sou string"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">valor</span>)   <span class="syn-comment">// "string"</span>

<span class="syn-id">valor</span> <span class="syn-operator">=</span> <span class="syn-boolean">true</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">valor</span>)   <span class="syn-comment">// "boolean"</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof valor <span class="syn-comment">// 42</span>', key: 'dinamico.num' },
        { expr: 'typeof valor <span class="syn-comment">// "agora sou string"</span>', key: 'dinamico.str' },
        { expr: 'typeof valor <span class="syn-comment">// true</span>', key: 'dinamico.bool' },
      ]
    },
  ])}
    </section>`,

  primitivo_vs_referencia: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Primitivo vs referência — a diferença fundamental</h2>
      <p>
        Os 7 tipos primitivos (<code>undefined</code>, <code>null</code>,
        <code>boolean</code>, <code>number</code>, <code>string</code>,
        <code>bigint</code>, <code>symbol</code>) são passados <strong>por valor</strong>:
        quando você atribui a outra variável, cria uma cópia independente.
      </p>
      <p>
        O tipo <code>object</code> é passado <strong>por referência</strong>:
        a variável não guarda o objeto em si — guarda o <em>endereço</em> de onde
        ele está na memória. Atribuir a outra variável não cria uma cópia —
        cria outro apontador para o mesmo objeto.
      </p>

      ${_h.block('primitivo-vs-referencia.js', /* html */ `
<span class="syn-comment">// ── primitivo — cópia independente ────────────────────────────</span>
<span class="syn-keyword">let</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> <span class="syn-number">10</span>
<span class="syn-keyword">let</span> <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-id">a</span>     <span class="syn-comment">// b recebe uma CÓPIA do valor 10</span>
<span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-number">99</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span>)   <span class="syn-comment">// 10 — a não foi afetado</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">b</span>)   <span class="syn-comment">// 99</span>

<span class="syn-comment">// ── referência — mesmo objeto na memória ──────────────────────</span>
<span class="syn-keyword">const</span> <span class="syn-id">obj1</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">10</span> }
<span class="syn-keyword">const</span> <span class="syn-id">obj2</span> <span class="syn-operator">=</span> <span class="syn-id">obj1</span>   <span class="syn-comment">// obj2 aponta para o MESMO objeto</span>
<span class="syn-id">obj2</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">99</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">obj1</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 99 — obj1 também foi afetado!</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">obj2</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 99</span>`, [
    {
      label: 'Console — primitivo (por valor)', linhas: [
        { expr: 'a <span class="syn-comment">// não foi afetado</span>', key: 'primitivo.a' },
        { expr: 'b', key: 'primitivo.b' },
      ]
    },
    {
      label: 'Console — referência (por referência)', linhas: [
        { expr: 'obj1.x <span class="syn-comment">// afetado via obj2!</span>', key: 'referencia.a_x' },
        { expr: 'obj2.x', key: 'referencia.b_x' },
      ]
    },
  ])}
    </section>`,

  undef_vs_null: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">undefined vs null — dois "vazios" diferentes</h2>
      <p>
        São dois tipos distintos que representam ausência de valor, mas com
        semânticas diferentes. <code>undefined</code> é o estado padrão — o motor
        coloca esse valor em variáveis não inicializadas, parâmetros não passados
        e propriedades inexistentes. <code>null</code> é uma ausência intencional,
        colocada pelo programador para indicar "sem valor de propósito".
      </p>

      ${_h.block('undef-null.js', /* html */ `
<span class="syn-keyword">let</span> <span class="syn-id">a</span>                          <span class="syn-comment">// undefined — motor inicializou</span>
<span class="syn-keyword">const</span> <span class="syn-id">b</span> <span class="syn-operator">=</span> <span class="syn-keyword">null</span>               <span class="syn-comment">// null — programador colocou</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">a</span>)          <span class="syn-comment">// "undefined"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">b</span>)          <span class="syn-comment">// "object" — bug do typeof null</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span> <span class="syn-operator">==</span>  <span class="syn-keyword">null</span>)       <span class="syn-comment">// true  — igualdade fraca: trata como iguais</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span> <span class="syn-operator">===</span> <span class="syn-keyword">null</span>)       <span class="syn-comment">// false — igualdade estrita: tipos diferentes</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof a', key: 'undef_null.undef_type' },
        { expr: 'typeof b', key: 'undef_null.null_type' },
        { expr: 'a == null', key: 'undef_null.eq_fraca' },
        { expr: 'a === null', key: 'undef_null.eq_estrita' },
      ]
    },
  ])}

      <p>
        A igualdade fraca <code>==</code> considera <code>undefined</code> e
        <code>null</code> iguais entre si — e diferentes de todo o resto.
        Isso é útil para verificar "ausência de qualquer tipo":
        <code>if (valor == null)</code> captura ambos.
      </p>
    </section>`,

  tabela: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Tabela — os 8 tipos de referência rápida</h2>

      <div class="lesson__table-wrapper">
        <table class="lesson__table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>typeof</th>
              <th>Primitivo?</th>
              <th>Exemplo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>undefined</code></td>
              <td><code>"undefined"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>let x</code></td>
            </tr>
            <tr>
              <td><code>null</code></td>
              <td><code>"object"</code> ⚠️</td>
              <td class="cell--good">Sim</td>
              <td><code>null</code></td>
            </tr>
            <tr>
              <td><code>boolean</code></td>
              <td><code>"boolean"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>true</code>, <code>false</code></td>
            </tr>
            <tr>
              <td><code>number</code></td>
              <td><code>"number"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>42</code>, <code>3.14</code>, <code>NaN</code></td>
            </tr>
            <tr>
              <td><code>string</code></td>
              <td><code>"string"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>"texto"</code></td>
            </tr>
            <tr>
              <td><code>bigint</code></td>
              <td><code>"bigint"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>9007199254740991n</code></td>
            </tr>
            <tr>
              <td><code>symbol</code></td>
              <td><code>"symbol"</code></td>
              <td class="cell--good">Sim</td>
              <td><code>Symbol("id")</code></td>
            </tr>
            <tr>
              <td><code>object</code></td>
              <td><code>"object"</code></td>
              <td class="cell--bad">Não</td>
              <td><code>{}</code>, <code>[]</code>, <code>null</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>`,

  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Agora que você tem o mapa dos 8 tipos, vamos aprofundar cada grupo.
        Na próxima aula exploramos os <strong>7 tipos primitivos</strong> em
        detalhe — imutabilidade, comportamentos especiais como <code>NaN</code>,
        <code>Infinity</code>, <code>-0</code>, e por que strings têm métodos
        mesmo sendo primitivas.
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

export function initTiposDeDados() {
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return
    el.textContent = val.text
    if (val.cls) el.className = val.cls
  })
}