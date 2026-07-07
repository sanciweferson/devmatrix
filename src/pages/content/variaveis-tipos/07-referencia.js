// src/content/variaveis-tipos/07-referencia.js

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════



console.log("Desbloqueado após 5 segundos")
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

  // ── 1. Passagem por referência ────────────────────────────────────────────
  const _a = { x: 10 }
  const _b = _a
  _b.x = 99
  const ref_a_x = _a.x   // 99 — a foi afetado
  const ref_b_x = _b.x   // 99

  // ── 2. Mesma referência vs objetos diferentes ─────────────────────────────
  const _o1 = { x: 1 }
  const _o2 = { x: 1 }
  const _o3 = _o1
  const eq_o1_o2 = _o1 === _o2   // false — objetos diferentes na memória
  const eq_o1_o3 = _o1 === _o3   // true  — mesma referência

  // ── 3. Array é objeto ────────────────────────────────────────────────────
  const arr_tipo = typeof []           // "object"
  const arr_is_arr = Array.isArray([])   // true  — forma correta de verificar
  const arr_is_arr2 = Array.isArray({})   // false

  // ── 4. Função é objeto ────────────────────────────────────────────────────
  function _fn() { }
  const fn_tipo = typeof _fn            // "function"
  const fn_is_obj = _fn instanceof Object // true — função é objeto
  const fn_has_name = _fn.name            // "fn"
  const fn_has_len = _fn.length          // 0 — número de parâmetros declarados

  // ── 5. Cópia rasa (shallow) ───────────────────────────────────────────────
  const _orig = { nome: "Ana", endereco: { cidade: "SP" } }
  const _raso = { ..._orig }    // spread — cópia rasa
  _raso.nome = "Bob"             // primitivo — não afeta original
  _raso.endereco.cidade = "RJ"  // objeto aninhado — afeta original!
  const shallow_orig_nome = _orig.nome             // "Ana" — não afetado
  const shallow_orig_cidade = _orig.endereco.cidade  // "RJ"  — afetado!
  const shallow_copia_nome = _raso.nome             // "Bob"
  const shallow_copia_cidade = _raso.endereco.cidade // "RJ"

  // ── 6. Cópia profunda (deep) ──────────────────────────────────────────────
  const _orig2 = { nome: "Ana", endereco: { cidade: "SP" } }
  const _deep = JSON.parse(JSON.stringify(_orig2))  // deep clone via JSON
  _deep.endereco.cidade = "RJ"
  const deep_orig_cidade = _orig2.endereco.cidade   // "SP" — não afetado
  const deep_clone_cidade = _deep.endereco.cidade    // "RJ"

  // ── 7. Passagem de objeto para função ────────────────────────────────────
  function _dobrar(obj) { obj.x *= 2 }
  const _objFn = { x: 5 }
  _dobrar(_objFn)
  const fn_obj_x = _objFn.x   // 10 — objeto foi mutado dentro da função

  return {
    ref: {
      a_x: num(ref_a_x),
      b_x: num(ref_b_x),
    },
    eq: {
      o1_o2: bool(eq_o1_o2),
      o1_o3: bool(eq_o1_o3),
    },
    array: {
      tipo: str(arr_tipo),
      is_arr: bool(arr_is_arr),
      is_arr2: bool(arr_is_arr2),
    },
    funcao: {
      tipo: str(fn_tipo),
      is_obj: bool(fn_is_obj),
      name: str(fn_has_name),
      length: num(fn_has_len),
    },
    shallow: {
      orig_nome: str(shallow_orig_nome),
      orig_cidade: str(shallow_orig_cidade),
      copia_nome: str(shallow_copia_nome),
      copia_cidade: str(shallow_copia_cidade),
    },
    deep: {
      orig_cidade: str(deep_orig_cidade),
      clone_cidade: str(deep_clone_cidade),
    },
    fn_obj: {
      x: num(fn_obj_x),
    },
  }
})()


// ═══════════════════════════════════════════════════════════════════════════════
// SEÇÕES
// ═══════════════════════════════════════════════════════════════════════════════

const _secoes = {

  introducao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O tipo de referência</h2>
      <p>
        Enquanto os 7 primitivos armazenam o valor diretamente na variável,
        o tipo de referência funciona diferente: a variável guarda um
        <strong>endereço de memória</strong> — uma referência para onde o objeto
        está armazenado no heap.
      </p>
      <p>
        Em JavaScript, tudo que não é primitivo é um objeto. Isso inclui objetos
        literais <code>{}</code>, arrays <code>[]</code>, funções, datas, expressões
        regulares e muito mais.
      </p>
      <p>
        Entender passagem por referência é essencial — é a fonte de alguns dos
        bugs mais difíceis de rastrear em JavaScript.
      </p>
    </section>`,

  passagem_por_ref: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Passagem por referência</h2>
      <p>
        Quando você atribui um objeto a outra variável, não cria uma cópia —
        cria um segundo apontador para o mesmo objeto na memória.
        Modificar o objeto por qualquer um dos apontadores afeta o mesmo objeto.
      </p>

      ${_h.block('por-referencia.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">obj1</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">10</span> }
<span class="syn-keyword">const</span> <span class="syn-id">obj2</span> <span class="syn-operator">=</span> <span class="syn-id">obj1</span>   <span class="syn-comment">// obj2 aponta para o MESMO objeto</span>

<span class="syn-id">obj2</span>.<span class="syn-property">x</span> <span class="syn-operator">=</span> <span class="syn-number">99</span>          <span class="syn-comment">// modifica o objeto compartilhado</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">obj1</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 99 — obj1 também foi afetado!</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">obj2</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 99</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'obj1.x <span class="syn-comment">// afetado via obj2</span>', key: 'ref.a_x', cls: 'code-console__line--warn' },
        { expr: 'obj2.x', key: 'ref.b_x' },
      ]
    },
  ])}
    </section>`,

  comparacao_objetos: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Comparação de objetos — por identidade</h2>
      <p>
        Primitivos são comparados por <em>valor</em>: <code>"texto" === "texto"</code>
        é <code>true</code>. Objetos são comparados por <em>identidade</em> —
        se são a mesma referência na memória. Dois objetos com conteúdo idêntico
        são diferentes se estão em endereços diferentes.
      </p>

      ${_h.block('comparacao.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">a</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">1</span> }
<span class="syn-keyword">const</span> <span class="syn-id">b</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">1</span> }   <span class="syn-comment">// mesmo conteúdo, objeto diferente na memória</span>
<span class="syn-keyword">const</span> <span class="syn-id">c</span> <span class="syn-operator">=</span> <span class="syn-id">a</span>          <span class="syn-comment">// mesma referência que a</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span> <span class="syn-operator">===</span> <span class="syn-id">b</span>)   <span class="syn-comment">// false — objetos diferentes</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">a</span> <span class="syn-operator">===</span> <span class="syn-id">c</span>)   <span class="syn-comment">// true  — mesma referência</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'a === b <span class="syn-comment">// conteúdo igual, ref diferente</span>', key: 'eq.o1_o2' },
        { expr: 'a === c <span class="syn-comment">// mesma referência</span>', key: 'eq.o1_o3' },
      ]
    },
  ])}

      <p>
        Para comparar o conteúdo de dois objetos, não existe operador nativo —
        você precisa percorrer as propriedades ou usar
        <code>JSON.stringify(a) === JSON.stringify(b)</code> (com limitações)
        ou uma biblioteca como Lodash (<code>_.isEqual</code>).
      </p>
    </section>`,

  array_e_objeto: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Array é um objeto</h2>
      <p>
        <code>typeof []</code> retorna <code>"object"</code>. Arrays são objetos
        especializados — com índices numéricos e a propriedade <code>length</code>
        gerenciada automaticamente. Para verificar se algo é um array, use
        <code>Array.isArray()</code>.
      </p>

      ${_h.block('array-objeto.js', /* html */ `
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> [])             <span class="syn-comment">// "object" — typeof não diferencia array</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">Array</span>.<span class="syn-fn">isArray</span>([]))   <span class="syn-comment">// true  — forma correta</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">Array</span>.<span class="syn-fn">isArray</span>({}))   <span class="syn-comment">// false</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof []', key: 'array.tipo' },
        { expr: 'Array.isArray([])', key: 'array.is_arr' },
        { expr: 'Array.isArray({})', key: 'array.is_arr2' },
      ]
    },
  ])}
    </section>`,

  funcao_e_objeto: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Função é um objeto</h2>
      <p>
        Funções em JavaScript são "cidadãs de primeira classe" porque são objetos.
        <code>typeof function(){}</code> retorna <code>"function"</code> por convenção,
        mas funções têm propriedades (<code>name</code>, <code>length</code>),
        herdam de <code>Object.prototype</code> e podem ter propriedades adicionadas.
      </p>

      ${_h.block('funcao-objeto.js', /* html */ `
<span class="syn-keyword">function</span> <span class="syn-fn">fn</span>(<span class="syn-id">a</span>, <span class="syn-id">b</span>) {}

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-keyword">typeof</span> <span class="syn-id">fn</span>)              <span class="syn-comment">// "function"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">fn</span> <span class="syn-keyword">instanceof</span> <span class="syn-id">Object</span>)  <span class="syn-comment">// true — função é objeto</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">fn</span>.<span class="syn-property">name</span>)                <span class="syn-comment">// "fn" — propriedade do objeto função</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">fn</span>.<span class="syn-property">length</span>)              <span class="syn-comment">// 2 — nº de parâmetros declarados</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'typeof fn', key: 'funcao.tipo' },
        { expr: 'fn instanceof Object', key: 'funcao.is_obj' },
        { expr: 'fn.name', key: 'funcao.name' },
        { expr: 'fn.length', key: 'funcao.length' },
      ]
    },
  ])}
    </section>`,

  shallow_copy: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Cópia rasa — shallow copy</h2>
      <p>
        Uma cópia rasa cria um novo objeto mas copia apenas o primeiro nível.
        Propriedades primitivas são copiadas por valor — independentes.
        Propriedades que são objetos são copiadas por referência — ainda apontam
        para o mesmo objeto interno.
      </p>
      <p>
        <code>{ ...obj }</code> (spread) e <code>Object.assign({}, obj)</code>
        fazem cópia rasa.
      </p>

      ${_h.block('shallow-copy.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">original</span> <span class="syn-operator">=</span> {
  <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span>,
  <span class="syn-property">endereco</span>: { <span class="syn-property">cidade</span>: <span class="syn-string">"SP"</span> }   <span class="syn-comment">// objeto aninhado</span>
}

<span class="syn-keyword">const</span> <span class="syn-id">copia</span> <span class="syn-operator">=</span> { ...<span class="syn-id">original</span> }   <span class="syn-comment">// spread — cópia rasa</span>

<span class="syn-id">copia</span>.<span class="syn-property">nome</span> <span class="syn-operator">=</span> <span class="syn-string">"Bob"</span>                <span class="syn-comment">// primitivo — não afeta original</span>
<span class="syn-id">copia</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span> <span class="syn-operator">=</span> <span class="syn-string">"RJ"</span>    <span class="syn-comment">// objeto aninhado — afeta original!</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">original</span>.<span class="syn-property">nome</span>)             <span class="syn-comment">// "Ana" — não afetado</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">original</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span>)  <span class="syn-comment">// "RJ"  — afetado!</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">copia</span>.<span class="syn-property">nome</span>)               <span class="syn-comment">// "Bob"</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">copia</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span>)    <span class="syn-comment">// "RJ"</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'original.nome', key: 'shallow.orig_nome' },
        { expr: 'original.endereco.cidade', key: 'shallow.orig_cidade', cls: 'code-console__line--warn' },
        { expr: 'copia.nome', key: 'shallow.copia_nome' },
        { expr: 'copia.endereco.cidade', key: 'shallow.copia_cidade' },
      ]
    },
  ])}
    </section>`,

  deep_copy: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Cópia profunda — deep copy</h2>
      <p>
        Uma cópia profunda cria um novo objeto completamente independente —
        incluindo todos os objetos aninhados em qualquer nível.
        Modificar qualquer propriedade da cópia não afeta o original.
      </p>
      <p>
        A abordagem mais simples para objetos serializáveis é
        <code>JSON.parse(JSON.stringify(obj))</code>. Limitação: não preserva
        funções, <code>Date</code>, <code>undefined</code>, <code>Map</code>,
        <code>Set</code> etc. Para casos complexos, use <code>structuredClone()</code>
        (ES2022) ou uma biblioteca.
      </p>

      ${_h.block('deep-copy.js', /* html */ `
<span class="syn-keyword">const</span> <span class="syn-id">original</span> <span class="syn-operator">=</span> {
  <span class="syn-property">nome</span>: <span class="syn-string">"Ana"</span>,
  <span class="syn-property">endereco</span>: { <span class="syn-property">cidade</span>: <span class="syn-string">"SP"</span> }
}

<span class="syn-comment">// ── opção 1: JSON (simples, tem limitações) ───────────────────</span>
<span class="syn-keyword">const</span> <span class="syn-id">clone</span> <span class="syn-operator">=</span> <span class="syn-id">JSON</span>.<span class="syn-fn">parse</span>(<span class="syn-id">JSON</span>.<span class="syn-fn">stringify</span>(<span class="syn-id">original</span>))

<span class="syn-comment">// ── opção 2: structuredClone (ES2022, mais completo) ──────────</span>
<span class="syn-comment">// const clone = structuredClone(original)</span>

<span class="syn-id">clone</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span> <span class="syn-operator">=</span> <span class="syn-string">"RJ"</span>

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">original</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span>)  <span class="syn-comment">// "SP" — não afetado!</span>
<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">clone</span>.<span class="syn-property">endereco</span>.<span class="syn-property">cidade</span>)     <span class="syn-comment">// "RJ"</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'original.endereco.cidade', key: 'deep.orig_cidade' },
        { expr: 'clone.endereco.cidade', key: 'deep.clone_cidade' },
      ]
    },
  ])}
    </section>`,

  obj_em_funcao: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Objetos passados para funções</h2>
      <p>
        Quando você passa um objeto para uma função, a função recebe a referência —
        não uma cópia. Qualquer modificação dentro da função afeta o objeto original.
        É um dos comportamentos que mais surpreende quem vem de outras linguagens.
      </p>

      ${_h.block('obj-em-funcao.js', /* html */ `
<span class="syn-keyword">function</span> <span class="syn-fn">dobrar</span>(<span class="syn-id">obj</span>) {
  <span class="syn-id">obj</span>.<span class="syn-property">x</span> <span class="syn-operator">*=</span> <span class="syn-number">2</span>   <span class="syn-comment">// modifica o objeto original</span>
}

<span class="syn-keyword">const</span> <span class="syn-id">meuObj</span> <span class="syn-operator">=</span> { <span class="syn-property">x</span>: <span class="syn-number">5</span> }
<span class="syn-fn">dobrar</span>(<span class="syn-id">meuObj</span>)

<span class="syn-fn">console</span>.<span class="syn-fn">log</span>(<span class="syn-id">meuObj</span>.<span class="syn-property">x</span>)   <span class="syn-comment">// 10 — objeto foi mutado dentro da função!</span>`, [
    {
      label: 'Console', linhas: [
        { expr: 'meuObj.x <span class="syn-comment">// após dobrar()</span>', key: 'fn_obj.x', cls: 'code-console__line--warn' },
      ]
    },
  ])}

      <p>
        Para evitar mutações acidentais, passe uma cópia:
        <code>dobrar({ ...meuObj })</code>. A função recebe uma cópia rasa —
        modificações no primeiro nível não afetam o original.
      </p>
    </section>`,

  resumo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Resumo — tipo de referência</h2>

      <div class="lesson__cards">
        <div class="lesson__card">
          <div class="lesson__card-icon">📍</div>
          <h3>Variável guarda endereço</h3>
          <p>Não o objeto em si — um ponteiro para onde ele está no heap. Atribuir cria um segundo ponteiro, não uma cópia.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🔍</div>
          <h3>Comparação por identidade</h3>
          <p>Dois objetos com conteúdo idêntico são <code>false</code> em <code>===</code>. Só é <code>true</code> se apontam para o mesmo endereço.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📋</div>
          <h3>Shallow copy</h3>
          <p>Spread <code>{...obj}</code> copia só o primeiro nível. Objetos aninhados ainda são referências compartilhadas.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">🧬</div>
          <h3>Deep copy</h3>
          <p><code>structuredClone()</code> ou <code>JSON.parse(JSON.stringify())</code> para cópia totalmente independente.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">📦</div>
          <h3>Array é objeto</h3>
          <p><code>typeof []</code> retorna <code>"object"</code>. Use <code>Array.isArray()</code> para verificar arrays.</p>
        </div>
        <div class="lesson__card">
          <div class="lesson__card-icon">⚙️</div>
          <h3>Função é objeto</h3>
          <p>Funções têm propriedades, herdam de Object e podem ser passadas como valores — são cidadãs de primeira classe.</p>
        </div>
      </div>
    </section>`,

  proximo: () => /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">O que vem a seguir</h2>
      <p>
        Com primitivos e referências entendidos, a próxima aula aborda
        <strong>coerção de tipos</strong> — o que acontece quando o JavaScript
        converte valores automaticamente entre tipos, os casos onde isso causa
        bugs e como controlar isso com conversões explícitas.
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

export function initReferencia() {
  const resolver = (caminho) =>
    caminho.split('.').reduce((obj, k) => obj?.[k], _dados)

  document.querySelectorAll('[data-out]').forEach(el => {
    const val = resolver(el.dataset.out)
    if (val == null) return
    el.textContent = val.text
    if (val.cls) el.className = val.cls
  })
}