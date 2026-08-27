cat > /home/workdir/artifacts/exercise-block.js << 'ENDOFFILE'
// src/pages/content/_shared/exercise-block.js

import { escapeHtml } from "@/utils/helpers.js"

// Componente compartilhado de exercícios.
// Mesmo padrão do code-block.js: gera HTML puro e expõe um init()
// para ligar a interatividade.
//
// Suporta 3 tipos de questão (campo `tipo` na questão; ausência de
// `tipo` é tratada como "dissertativa", para manter compatibilidade
// com arquivos de exercícios antigos que não tinham esse campo):
//
//   - "dissertativa"     → textarea + dica opcional + gabarito opcional
//                           (comportamento idêntico ao já existente)
//   - "multipla_escolha" → opções clicáveis (a/b/c/d), 1 correta,
//                           feedback imediato + explicação
//   - "codigo"           → editor de código (textarea) + botões
//                           "Executar"/"Limpar" + validação de saída
//
// Uso na aula (inalterado):
//
//   ${_ex.block({
//     storageKey: "jsplatform:exercises:/fundamentos/01-introducao",
//     titulo: "Exercícios — Aula 01",
//     grupos: [...],
//   })}
//
//   _ex.init({ storageKey: "jsplatform:exercises:/fundamentos/01-introducao" })
//
// ── Normalização de shape ────────────────────────────────────────────────
//
// Arquivos de exercícios antigos usam { titulo, questoes: [{ texto, dica,
// gabarito }] }. Arquivos novos (com múltipla escolha / código) usam
// { grupo, questoes: [{ tipo, pergunta, dica, respostaGabarito, ... }] }.
// normalizeGrupo()/normalizeQuestao() abaixo aceitam os dois formatos, para
// que nenhum arquivo de exercícios já existente precise ser reescrito.
//
// ── Persistência ─────────────────────────────────────────────────────────
//
// Cada resposta é salva (debounce 500ms para texto/código) em localStorage,
// na chave storageKey, como { [questionId]: valor }. Para múltipla escolha,
// `valor` é o id da opção escolhida; para dissertativa/código, é o texto
// digitado.
//
// ── Gabarito e dica (dissertativa) ──────────────────────────────────────
//
// - `dica` é opcional e sempre acessível — serve só para destravar o
//   raciocínio, sem entregar a resposta.
// - `gabarito` é exclusivo do tipo dissertativa. Quando presente, o botão
//   "Ver gabarito" nasce desabilitado e só libera quando a resposta digitada
//   passa por uma checagem heurística de consistência mínima (ver
//   `isRespostaConsistente` abaixo). Essa checagem NÃO avalia se a resposta
//   está correta — só filtra respostas vazias, curtas demais ou "lixo"
//   digitado só para destravar o gabarito.
//
// ── Múltipla escolha ──────────────────────────────────────────────────────
//
// Ao clicar em uma opção, a questão trava (não dá pra trocar de resposta):
// a opção escolhida ganha destaque de certo/errado, a opção correta é
// sempre revelada (mesmo quando o usuário erra) e a explicação aparece.
// A escolha é persistida, então recarregar a página mantém o estado.
//
// ── Código (interativo) ───────────────────────────────────────────────────
//
// O botão "Executar" roda o código digitado dentro de uma função isolada,
// com um `console.log` próprio que captura a saída em vez de imprimir no
// console real. A saída capturada (uma linha por chamada de console.log,
// valores concatenados com espaço) é comparada — após trim() — com
// `saidaEsperada`. Erros de sintaxe ou de execução são capturados e
// mostrados como tal, sem travar a página.
//
// Importante: essa execução roda no mesmo contexto JS da página (via
// `new Function`), sem sandbox de verdade — é adequada para um exercício
// que o próprio usuário escreve e executa localmente, mas não deve ser
// usada para rodar código de terceiros.
//
// O editor usa a técnica de "syntax highlighting falso": um <pre> colorido
// e um <textarea> transparente ficam sobrepostos na mesma célula de um
// grid (ver exercise-block.css). Pra essa sobreposição funcionar sem o
// cursor desalinhar do texto colorido, três coisas precisam bater entre
// as duas camadas: (1) mesmo box model (padding/border/box-sizing), (2)
// mesma altura, e (3) mesma posição de rolagem — por isso o listener de
// "scroll" abaixo, que copia o scrollTop/scrollLeft do textarea pro pre
// toda vez que o navegador rola o campo internamente pra manter o cursor
// visível.
//
// A instrução "Digite seu código abaixo:" NÃO fica dentro do value do
// textarea — é renderizada como label estático acima do editor, para o
// aluno não conseguir posicionar o cursor nem apagar essa linha.
//
// ── Colar (paste) ────────────────────────────────────────────────────────
//
// Os campos de resposta de texto (dissertativa e código) bloqueiam os
// eventos `paste`, `drop` e as inserções de texto em bloco vindas de
// `beforeinput` (colagem, sugestão de clipboard do teclado, arrastar-e-
// soltar) para desincentivar colar a resposta pronta.
//
// É importante registrar por que os três são necessários: bloquear só
// `paste` não impede a prévia de clipboard sugerida por teclados como
// o Gboard (Android) — quando o usuário toca nessa sugestão, o navegador
// não dispara `paste`; ele dispara `beforeinput` com
// `inputType: "insertReplacementText"` (ou, em alguns teclados,
// `"insertFromPaste"`). Sem interceptar esse evento, o texto entra no
// campo mesmo com `paste` bloqueado.
//
// Como rede de segurança adicional, o evento `input` monitora saltos
// abruptos de tamanho do texto (ex.: +6 caracteres de uma vez). Se a
// diferença for maior que o limite, o valor é revertido para o estado
// anterior, o mesmo aviso de colagem é exibido e o fluxo é interrompido
// com stopImmediatePropagation() para o autosave e a trava de gabarito
// NÃO rodarem com o valor temporário (isso evita o bug de teclado móvel
// que liberava o gabarito ao tocar na sugestão de colar).
//
// Ainda assim, é fricção, não uma trava de segurança real.

// escapeAttr fica local (não está em helpers.js): propositalmente não
// escapa aspas simples, porque é usado só em atributos entre aspas
// duplas — diferente de escapeHtml, que precisa cobrir os dois casos
// por ser usado em texto/conteúdo mais genérico.
function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

// ── Normalização de shape ────────────────────────────────────────────────

function normalizeQuestao(questao) {
  return {
    id: questao.id,
    tipo: questao.tipo || "dissertativa",
    texto: questao.texto ?? questao.pergunta ?? "",
    dica: questao.dica,
    gabarito: questao.gabarito ?? questao.respostaGabarito,

    // multipla_escolha
    codigoExemplo: questao.codigoExemplo,
    opcoes: questao.opcoes,
    respostaCorreta: questao.respostaCorreta,
    explicacao: questao.explicacao,

    // codigo
    codigoInicial: questao.codigoInicial ?? "",
    saidaEsperada: questao.saidaEsperada ?? "",
  }
}

function normalizeGrupo(grupo) {
  return {
    titulo: grupo.titulo ?? grupo.grupo ?? "",
    questoes: (grupo.questoes ?? []).map(normalizeQuestao),
  }
}

// ── Syntax highlighting leve ───────────────────────────────────────────────
//
// Tokenizer simples via regex — não é um parser completo de JS, mas cobre
// bem o que aparece nos exercícios: comentários, strings (aspas simples,
// duplas e template literals), números, palavras-chave e
// true/false/null/undefined. Usado tanto no bloco estático de exemplo
// (múltipla escolha) quanto no editor de código interativo.

const JS_KEYWORDS = new Set([
  "var",
  "let",
  "const",
  "function",
  "return",
  "if",
  "else",
  "for",
  "while",
  "typeof",
  "new",
  "class",
  "import",
  "export",
  "from",
  "of",
  "in",
  "try",
  "catch",
  "finally",
  "throw",
  "switch",
  "case",
  "break",
  "continue",
  "default",
  "do",
  "delete",
  "void",
  "yield",
  "async",
  "await",
  "this",
  "extends",
  "super",
  "static",
  "get",
  "set",
  "instanceof",
])

const JS_LITERALS_NULLISH = new Set(["null", "undefined"])
const JS_LITERALS_BOOLEAN = new Set(["true", "false"])

const TOKEN_REGEX =
  /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|('(?:\\.|[^'\\])*')|(`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)/g

function highlightJs(source) {
  const codigo = String(source ?? "")
  let html = ""
  let lastIndex = 0
  let match

  TOKEN_REGEX.lastIndex = 0

  while ((match = TOKEN_REGEX.exec(codigo))) {
    const [
      full,
      comentarioLinha,
      comentarioBloco,
      strDupla,
      strSimples,
      template,
      numero,
      palavra,
    ] = match

    html += escapeHtml(codigo.slice(lastIndex, match.index))

    if (comentarioLinha || comentarioBloco) {
      html += `<span class="syn-comment">${escapeHtml(full)}</span>`
    } else if (strDupla || strSimples || template) {
      html += `<span class="syn-string">${escapeHtml(full)}</span>`
    } else if (numero) {
      html += `<span class="syn-number">${escapeHtml(full)}</span>`
    } else if (palavra) {
      if (JS_KEYWORDS.has(palavra)) {
        html += `<span class="syn-keyword">${escapeHtml(full)}</span>`
      } else if (JS_LITERALS_NULLISH.has(palavra)) {
        html += `<span class="syn-nullish">${escapeHtml(full)}</span>`
      } else if (JS_LITERALS_BOOLEAN.has(palavra)) {
        html += `<span class="syn-boolean">${escapeHtml(full)}</span>`
      } else {
        html += escapeHtml(full)
      }
    }

    lastIndex = TOKEN_REGEX.lastIndex
  }

  html += escapeHtml(codigo.slice(lastIndex))
  return html
}

// Remove a instrução padrão do valor inicial do editor, para ela não
// ficar editável nem receber o cursor.
const INSTRUCAO_CODIGO_REGEX = /^\/\/\s*Digite seu código abaixo:\s*\n?/i

function limparCodigoInicial(codigo) {
  return String(codigo ?? "").replace(INSTRUCAO_CODIGO_REGEX, "")
}

// ── Renderização por tipo de questão ──────────────────────────────────────

function renderDissertativa(questao) {
  const temDica = Boolean(questao.dica)
  const temGabarito = Boolean(questao.gabarito)

  return /* html */ `
    <textarea
      class="exercise-block__textarea"
      data-question-id="${escapeAttr(questao.id)}"
      data-block-paste
      placeholder="Digite sua resposta..."
      rows="3"
    ></textarea>

    ${
      temDica || temGabarito
        ? /* html */ `
    <div class="exercise-block__actions">
      ${
        temDica
          ? /* html */ `
      <button class="exercise-block__hint-toggle" type="button" data-hint-toggle aria-expanded="false">
        💡 Ver dica
      </button>`
          : ""
      }
      ${
        temGabarito
          ? /* html */ `
      <button class="exercise-block__answer-toggle" type="button" data-answer-toggle aria-expanded="false" disabled>
        📖 Ver gabarito
      </button>`
          : ""
      }
    </div>`
        : ""
    }

    ${
      temDica
        ? /* html */ `
    <div class="exercise-block__hint" data-hint hidden>
      <span class="exercise-block__hint-label">Dica</span>
      <p>${escapeHtml(questao.dica)}</p>
    </div>`
        : ""
    }

    ${
      temGabarito
        ? /* html */ `
    <div class="exercise-block__answer" data-answer hidden>
      <span class="exercise-block__answer-label">Resposta esperada</span>
      <p>${escapeHtml(questao.gabarito)}</p>
    </div>`
        : ""
    }
  `
}

function renderMultiplaEscolha(questao) {
  const temDica = Boolean(questao.dica)
  const opcoes = questao.opcoes ?? []

  return /* html */ `
    ${
      questao.codigoExemplo
        ? /* html */ `
    <pre class="exercise-block__code-sample"><code>${highlightJs(questao.codigoExemplo)}</code></pre>`
        : ""
    }

    ${
      temDica
        ? /* html */ `
    <div class="exercise-block__actions">
      <button class="exercise-block__hint-toggle" type="button" data-hint-toggle aria-expanded="false">
        💡 Ver dica
      </button>
    </div>
    <div class="exercise-block__hint" data-hint hidden>
      <span class="exercise-block__hint-label">Dica</span>
      <p>${escapeHtml(questao.dica)}</p>
    </div>`
        : ""
    }

    <div
      class="exercise-block__choices"
      data-choices
      data-question-id="${escapeAttr(questao.id)}"
      data-correct="${escapeAttr(questao.respostaCorreta ?? "")}"
    >
      ${opcoes
        .map(
          (op) => /* html */ `
      <button
        class="exercise-block__choice"
        type="button"
        data-choice-id="${escapeAttr(op.id)}"
      >
        <span class="exercise-block__choice-letter">${escapeHtml(op.id)}</span>
        <span class="exercise-block__choice-text">${escapeHtml(op.texto)}</span>
      </button>`,
        )
        .join("")}
    </div>

    <div class="exercise-block__explanation" data-explanation hidden>
      <span class="exercise-block__explanation-label">Explicação</span>
      <p>${escapeHtml(questao.explicacao ?? "")}</p>
    </div>
  `
}

function renderCodigo(questao) {
  const temDica = Boolean(questao.dica)
  // Instrução sai do value do textarea e vira label estático acima
  const codigoInicial = limparCodigoInicial(questao.codigoInicial ?? "")

  return /* html */ `
    <div class="exercise-block__code-label">Digite seu código abaixo:</div>

    <div class="exercise-block__code-wrap">
      <pre class="exercise-block__code-highlight" data-code-highlight aria-hidden="true"><code>${highlightJs(codigoInicial)}</code></pre>

      <textarea
        class="exercise-block__code-editor"
        data-code-editor
        data-question-id="${escapeAttr(questao.id)}"
        data-initial-code="${escapeAttr(codigoInicial)}"
        data-saida-esperada="${escapeAttr(questao.saidaEsperada ?? "")}"
        data-block-paste
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
        autocorrect="off"
      >${codigoInicial}</textarea>
    </div>

    <div class="exercise-block__code-actions">
      <button class="exercise-block__code-run" type="button" data-run-code>
        ▶ Executar
      </button>
      <button class="exercise-block__code-clear" type="button" data-clear-code>
        🗑 Limpar
      </button>

      ${
        temDica
          ? /* html */ `
      <button class="exercise-block__hint-toggle" type="button" data-hint-toggle aria-expanded="false">
        💡 Ver dica
      </button>`
          : ""
      }
    </div>

    <div class="exercise-block__code-output" data-code-output hidden></div>

    ${
      temDica
        ? /* html */ `
    <div class="exercise-block__hint" data-hint hidden>
      <span class="exercise-block__hint-label">Dica</span>
      <p>${escapeHtml(questao.dica)}</p>
    </div>`
        : ""
    }
  `
}

function questionBody(questao) {
  if (questao.tipo === "multipla_escolha") return renderMultiplaEscolha(questao)
  if (questao.tipo === "codigo") return renderCodigo(questao)
  return renderDissertativa(questao)
}

function questionItem(questao, numero) {
  const numeroFormatado = String(numero).padStart(2, "0")

  return /* html */ `
    <div class="exercise-block__question" data-question-wrap data-question-type="${escapeAttr(questao.tipo)}">

      <div class="exercise-block__question-head">
        <span class="exercise-block__question-number">${numeroFormatado}</span>
        <p class="exercise-block__question-text">${escapeHtml(questao.texto)}</p>
      </div>

      ${questionBody(questao)}

    </div>
  `
}

function groupBlock(grupo, offset) {
  const questoesHtml = grupo.questoes
    .map((q, i) => questionItem(q, offset + i + 1))
    .join("")

  return /* html */ `
    <div class="exercise-block__group">
      <h3 class="exercise-block__group-title">${escapeHtml(grupo.titulo)}</h3>
      ${questoesHtml}
    </div>
  `
}

/**
 * Gera o HTML completo do bloco de exercícios (fechado por padrão).
 *
 * @param {Object} config
 * @param {string} config.storageKey
 * @param {string} [config.titulo]
 * @param {Array<Object>} config.grupos - aceita o shape antigo ({ titulo,
 *   questoes: [{ texto, dica, gabarito }] }) e o novo ({ grupo, questoes:
 *   [{ tipo, pergunta, ... }] }) — ver normalizeGrupo().
 */
function block({
  storageKey,
  titulo = "Exercícios",
  grupos = [],
  startOpen = false,
}) {
  const gruposNormalizados = grupos.map(normalizeGrupo)
  const total = gruposNormalizados.reduce(
    (acc, g) => acc + g.questoes.length,
    0,
  )

  let offset = 0
  const gruposHtml = gruposNormalizados
    .map((grupo) => {
      const html = groupBlock(grupo, offset)
      offset += grupo.questoes.length
      return html
    })
    .join("")

  return /* html */ `
    <section class="exercise-block" data-exercise-block data-storage-key="${escapeAttr(storageKey)}">

      <button
        class="exercise-block__toggle"
        type="button"
        data-exercise-toggle
        aria-expanded="${startOpen}"
      >
        <span class="exercise-block__toggle-icon">📝</span>
        <span class="exercise-block__toggle-label">Fazer exercícios</span>
        <span class="exercise-block__toggle-count">${total} questões</span>
      </button>

      <div class="exercise-block__body" data-exercise-body ${startOpen ? "" : "hidden"}>

        <div class="exercise-block__intro">
          <h2 class="exercise-block__title">${escapeHtml(titulo)}</h2>

          <div class="exercise-block__progress">
            <div class="exercise-block__progress-track">
              <div class="exercise-block__progress-fill" data-exercise-progress-fill style="width: 0%"></div>
            </div>
            <span class="exercise-block__progress-label" data-exercise-progress-label>0 / ${total} respondidas</span>
          </div>

          <span class="exercise-block__status" data-exercise-status></span>
        </div>

        ${gruposHtml}

      </div>

    </section>
  `
}

// ── Persistência ─────────────────────────────────────────────────────────

function loadAnswers(storageKey) {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) ?? {}
  } catch {
    return {}
  }
}

function saveAnswers(storageKey, answers) {
  localStorage.setItem(storageKey, JSON.stringify(answers))
}

// ── Validação heurística de consistência mínima (dissertativa) ────────────
//
// Não avalia se a resposta está CORRETA — só filtra respostas vazias,
// curtas demais ou "lixo" digitadas só para destravar o gabarito.

const MIN_CARACTERES = 20
const MIN_PALAVRAS_VALIDAS = 4
const TAMANHO_MIN_PALAVRA_VALIDA = 3
const RAZAO_MIN_PALAVRAS_UNICAS = 0.5
const RAZAO_MIN_LETRAS = 0.6

const CONECTORES_PT = new Set([
  "que",
  "para",
  "com",
  "não",
  "isso",
  "essa",
  "esse",
  "essas",
  "esses",
  "quando",
  "porque",
  "então",
  "mas",
  "foi",
  "são",
  "uma",
  "um",
  "uns",
  "umas",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "na",
  "no",
  "nas",
  "nos",
  "em",
  "se",
  "por",
  "como",
  "mais",
  "muito",
  "ele",
  "ela",
  "eles",
  "elas",
  "cada",
  "todo",
  "toda",
  "todos",
  "todas",
  "ainda",
  "também",
  "já",
  "sem",
  "sobre",
  "entre",
  "até",
  "pode",
  "podem",
  "deve",
  "devem",
  "pois",
  "assim",
  "dessa",
  "desse",
  "nessa",
  "nesse",
  "ser",
  "estar",
  "tem",
  "têm",
  "isto",
  "aquilo",
  "onde",
  "qual",
  "quais",
  "seu",
  "sua",
  "seus",
  "suas",
  "seria",
  "seriam",
  "porém",
  "seja",
])

function isRespostaConsistente(valor) {
  const texto = String(valor).trim()

  if (texto.length < MIN_CARACTERES) return false

  const palavrasBrutas = texto.toLowerCase().split(/\s+/).filter(Boolean)

  const palavrasValidas = palavrasBrutas.filter(
    (p) => p.replace(/[^a-zà-öø-ÿ]/gi, "").length >= TAMANHO_MIN_PALAVRA_VALIDA,
  )
  if (palavrasValidas.length < MIN_PALAVRAS_VALIDAS) return false

  const unicas = new Set(palavrasValidas)
  if (unicas.size / palavrasValidas.length < RAZAO_MIN_PALAVRAS_UNICAS)
    return false

  const letras = texto.replace(/[^a-zà-öø-ÿ]/gi, "")
  if (letras.length / texto.length < RAZAO_MIN_LETRAS) return false

  const temConector = palavrasBrutas.some((p) => CONECTORES_PT.has(p))
  if (!temConector) return false

  return true
}

// ── Execução de código (tipo "codigo") ─────────────────────────────────────
//
// Roda o código digitado numa função isolada, capturando as chamadas de
// console.log em vez de escrevê-las no console real. Erros de sintaxe
// (na hora de criar a função) e erros de execução são tratados
// separadamente, mas ambos aparecem como "erro" pro usuário.

function executarCodigo(codigoFonte) {
  const logs = []

  const consoleFalso = {
    log: (...args) => {
      logs.push(
        args.map((a) => (typeof a === "string" ? a : String(a))).join(" "),
      )
    },
  }

  try {
    const fn = new Function("console", codigoFonte)
    fn(consoleFalso)
    return { ok: true, saida: logs.join("\n") }
  } catch (err) {
    return { ok: false, erro: `${err.constructor.name}: ${err.message}` }
  }
}

// Monta o HTML do painel de resultado (obtido/esperado), separado em blocos
// rotulados em vez de um texto corrido — mais fácil de ler rapidamente.
function renderResultadoExecucao({ ok, sucesso, obtido, esperado, erro }) {
  if (!ok) {
    return /* html */ `
      <div class="exercise-block__code-output-title">✗ Erro ao executar</div>
      <div class="exercise-block__code-output-row">
        <span class="exercise-block__code-output-label">Erro</span>
        <pre class="exercise-block__code-output-value">${escapeHtml(erro)}</pre>
      </div>
    `
  }

  const titulo = sucesso ? "✓ Resultado correto" : "✗ Resultado incorreto"

  return /* html */ `
    <div class="exercise-block__code-output-title">${titulo}</div>

    <div class="exercise-block__code-output-row">
      <span class="exercise-block__code-output-label">Resultado obtido</span>
      <pre class="exercise-block__code-output-value">${escapeHtml(obtido || "(sem saída)")}</pre>
    </div>

    ${
      sucesso
        ? ""
        : /* html */ `
    <div class="exercise-block__code-output-row">
      <span class="exercise-block__code-output-label">Resultado esperado</span>
      <pre class="exercise-block__code-output-value">${escapeHtml(esperado || "(sem saída)")}</pre>
    </div>`
    }
  `
}

// ── Inicialização ────────────────────────────────────────────────────────

/**
 * Liga toggle, autosave, progresso, dica, gabarito, múltipla escolha,
 * execução de código e bloqueio de colar. Chamar dentro do init() da aula.
 * @param {Object} config
 * @param {string} config.storageKey - mesma chave usada no block()
 */
function init({ storageKey }) {
  const section = document.querySelector(
    `[data-exercise-block][data-storage-key="${storageKey}"]`,
  )

  if (!section) return

  const toggle = section.querySelector("[data-exercise-toggle]")
  const body = section.querySelector("[data-exercise-body]")
  const status = section.querySelector("[data-exercise-status]")
  const progressFill = section.querySelector("[data-exercise-progress-fill]")
  const progressLabel = section.querySelector("[data-exercise-progress-label]")

  const answers = loadAnswers(storageKey)

  const questionWraps = Array.from(
    section.querySelectorAll("[data-question-wrap]"),
  )
  const total = questionWraps.length

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true"

    toggle.setAttribute("aria-expanded", String(!expanded))
    body.hidden = expanded

    if (!expanded) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })

  // ── Aviso reutilizado de bloqueio de colagem ─────────────────────────────

  let colarTimeout = null
  const mostrarAvisoColagem = () => {
    if (!status) return
    status.textContent =
      "Colar está desativado neste exercício — digite sua resposta."
    clearTimeout(colarTimeout)
    colarTimeout = setTimeout(() => {
      status.textContent = ""
    }, 2500)
  }

  // Tipos de inserção de `beforeinput` que representam texto entrando
  // "em bloco" (colagem, sugestão de clipboard do teclado, drop).
  const TIPOS_COLAR_BLOQUEADOS = [
    "insertFromPaste",
    "insertFromPasteAsQuotation",
    "insertReplacementText",
    "insertFromDrop",
    "insertFromYank",
  ]

  const MAX_CHARS_POR_EVENTO = 5

  function protegerContraColagem(textarea) {
    let valorAnterior = textarea.value

    const bloquearColagem = (event) => {
      event.preventDefault()
      mostrarAvisoColagem()
    }

    const bloquearViaBeforeInput = (event) => {
      if (TIPOS_COLAR_BLOQUEADOS.includes(event.inputType)) {
        bloquearColagem(event)
      }
    }

    const detectarSaltoAbrupto = (event) => {
      const atual = textarea.value
      const delta = atual.length - valorAnterior.length

      if (delta > MAX_CHARS_POR_EVENTO) {
        textarea.value = valorAnterior
        mostrarAvisoColagem()
        // Impede que listeners posteriores (trava de gabarito, autosave)
        // vejam o valor temporário da sugestão do teclado e liberem o
        // gabarito ou salvem indevidamente.
        event.stopImmediatePropagation()
        return
      }

      valorAnterior = atual
    }

    textarea.addEventListener("paste", bloquearColagem)
    textarea.addEventListener("drop", bloquearColagem)
    textarea.addEventListener("beforeinput", bloquearViaBeforeInput)
    // Precisa rodar ANTES dos listeners de trava de gabarito e autosave
    // para poder interromper o evento com stopImmediatePropagation.
    textarea.addEventListener("input", detectarSaltoAbrupto)
  }

  // ── Progresso ─────────────────────────────────────────────────────────

  function isWrapRespondido(wrap) {
    const tipo = wrap.dataset.questionType

    if (tipo === "multipla_escolha") {
      const choices = wrap.querySelector("[data-choices]")
      return choices?.dataset.answered === "true"
    }

    if (tipo === "codigo") {
      const editor = wrap.querySelector("[data-code-editor]")
      if (!editor) return false
      const inicial = (editor.dataset.initialCode ?? "").trim()
      const atual = editor.value.trim()
      return atual.length > 0 && atual !== inicial
    }

    const textarea = wrap.querySelector("[data-question-id]")
    return Boolean(textarea && textarea.value.trim().length > 0)
  }

  function updateProgress() {
    const respondidas = questionWraps.filter(isWrapRespondido).length
    const percent = total ? Math.round((respondidas / total) * 100) : 0

    if (progressFill) progressFill.style.width = `${percent}%`
    if (progressLabel)
      progressLabel.textContent = `${respondidas} / ${total} respondidas`
  }

  // ── Por questão ────────────────────────────────────────────────────────

  questionWraps.forEach((wrap) => {
    const tipo = wrap.dataset.questionType

    const hintToggle = wrap.querySelector("[data-hint-toggle]")
    const hintBlock = wrap.querySelector("[data-hint]")

    if (hintToggle && hintBlock) {
      hintToggle.addEventListener("click", () => {
        const expanded = hintToggle.getAttribute("aria-expanded") === "true"
        hintToggle.setAttribute("aria-expanded", String(!expanded))
        hintBlock.hidden = expanded
      })
    }

    // ── Dissertativa ───────────────────────────────────────────────────

    if (tipo === "dissertativa") {
      const textarea = wrap.querySelector("[data-question-id]")
      const answerToggle = wrap.querySelector("[data-answer-toggle]")
      const answerBlock = wrap.querySelector("[data-answer]")

      if (!textarea) return

      const id = textarea.dataset.questionId
      if (answers[id]) textarea.value = answers[id]

      // Proteção contra colagem/sugestão de teclado DEVE ser registrada
      // ANTES de qualquer listener de input que leia o valor (trava de
      // gabarito e autosave). Assim o detectarSaltoAbrupto consegue
      // reverter e dar stopImmediatePropagation antes da trava rodar
      // com o valor temporário do autocomplete mobile.
      protegerContraColagem(textarea)

      if (answerToggle && answerBlock) {
        answerToggle.addEventListener("click", () => {
          if (answerToggle.disabled) return
          const expanded = answerToggle.getAttribute("aria-expanded") === "true"
          answerToggle.setAttribute("aria-expanded", String(!expanded))
          answerBlock.hidden = expanded
        })

        const atualizarTravaGabarito = () => {
          // Lê sempre o valor atual do textarea (estado da DOM), nunca
          // um e.target.value transitório de evento interceptado.
          answerToggle.disabled = !isRespostaConsistente(textarea.value)
        }

        atualizarTravaGabarito()
        // Listener de trava DEPOIS da proteção, para só ver valores já
        // filtrados (ou ser interrompido pelo stopImmediatePropagation).
        textarea.addEventListener("input", atualizarTravaGabarito)
      }

      textarea.addEventListener("input", () => {
        if (status) status.textContent = "Salvando..."

        clearTimeout(textarea._saveTimeout)
        textarea._saveTimeout = setTimeout(() => {
          const current = loadAnswers(storageKey)
          const value = textarea.value.trim()

          if (value) current[id] = value
          else delete current[id]

          saveAnswers(storageKey, current)
          updateProgress()

          if (status) status.textContent = "Salvo ✓"
        }, 500)
      })
    }

    // ── Múltipla escolha ────────────────────────────────────────────────

    if (tipo === "multipla_escolha") {
      const choicesEl = wrap.querySelector("[data-choices]")
      const explanationBlock = wrap.querySelector("[data-explanation]")
      if (!choicesEl) return

      const id = choicesEl.dataset.questionId
      const correta = choicesEl.dataset.correct
      const buttons = Array.from(choicesEl.querySelectorAll("[data-choice-id]"))

      const travarComResposta = (escolhaId) => {
        buttons.forEach((btn) => {
          btn.disabled = true

          if (btn.dataset.choiceId === correta) {
            btn.classList.add("exercise-block__choice--correct")
          } else if (btn.dataset.choiceId === escolhaId) {
            btn.classList.add("exercise-block__choice--incorrect")
          }
        })

        choicesEl.dataset.answered = "true"

        if (explanationBlock) explanationBlock.hidden = false
      }

      // Restaura estado salvo (recarregar a página mantém a resposta).
      const salvo = answers[id]
      if (salvo) {
        travarComResposta(salvo)
      }

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          if (choicesEl.dataset.answered === "true") return

          const escolhaId = btn.dataset.choiceId
          travarComResposta(escolhaId)

          const current = loadAnswers(storageKey)
          current[id] = escolhaId
          saveAnswers(storageKey, current)

          updateProgress()
        })
      })
    }

    // ── Código ──────────────────────────────────────────────────────────

    if (tipo === "codigo") {
      const editor = wrap.querySelector("[data-code-editor]")
      const runBtn = wrap.querySelector("[data-run-code]")
      const clearBtn = wrap.querySelector("[data-clear-code]")
      const output = wrap.querySelector("[data-code-output]")
      const highlightPre = wrap.querySelector("[data-code-highlight]")
      const highlightCode = wrap.querySelector("[data-code-highlight] code")
      if (!editor) return

      const id = editor.dataset.questionId
      const inicial = editor.dataset.initialCode ?? ""
      const saidaEsperada = (editor.dataset.saidaEsperada ?? "").trim()

      const sincronizarHighlight = () => {
        if (highlightCode) highlightCode.innerHTML = highlightJs(editor.value)
      }

      if (answers[id]) editor.value = answers[id]
      sincronizarHighlight()

      // Proteção registrada antes dos demais listeners de input.
      protegerContraColagem(editor)

      editor.addEventListener("input", sincronizarHighlight)

      // Sincroniza a rolagem entre o textarea (invisível, dono do cursor
      // nativo) e o <pre> (visível, mostra o texto colorido). Sem isso,
      // quando o navegador rola o textarea internamente pra manter o
      // cursor visível — o que acontece mesmo com overflow: hidden —,
      // o <pre> fica parado e o cursor visualmente desalinha do texto.
      editor.addEventListener("scroll", () => {
        if (highlightPre) {
          highlightPre.scrollTop = editor.scrollTop
          highlightPre.scrollLeft = editor.scrollLeft
        }
      })

      editor.addEventListener("input", () => {
        clearTimeout(editor._saveTimeout)
        editor._saveTimeout = setTimeout(() => {
          const current = loadAnswers(storageKey)
          const value = editor.value

          if (value.trim() && value.trim() !== inicial.trim())
            current[id] = value
          else delete current[id]

          saveAnswers(storageKey, current)
          updateProgress()
        }, 500)
      })

      if (runBtn && output) {
        runBtn.addEventListener("click", () => {
          // Validação de saída só ocorre no clique explícito de "Executar".
          // Nunca em onInput / onChange.
          const resultado = executarCodigo(editor.value)

          output.hidden = false
          output.classList.remove(
            "exercise-block__code-output--success",
            "exercise-block__code-output--error",
          )

          if (!resultado.ok) {
            output.classList.add("exercise-block__code-output--error")
            output.innerHTML = renderResultadoExecucao({
              ok: false,
              erro: resultado.erro,
            })
            return
          }

          const obtido = resultado.saida
          const sucesso = obtido.trim() === saidaEsperada

          output.classList.add(
            sucesso
              ? "exercise-block__code-output--success"
              : "exercise-block__code-output--error",
          )

          output.innerHTML = renderResultadoExecucao({
            ok: true,
            sucesso,
            obtido,
            esperado: saidaEsperada,
          })
        })
      }

      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          editor.value = inicial
          sincronizarHighlight()
          if (output) {
            output.hidden = true
            output.textContent = ""
          }

          const current = loadAnswers(storageKey)
          delete current[id]
          saveAnswers(storageKey, current)

          updateProgress()
        })
      }
    }
  })

  updateProgress()
}

export const _ex = {
  block,
  init,
}
ENDOFFILE