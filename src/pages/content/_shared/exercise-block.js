// src/pages/content/_shared/exercise-block.js

import { escapeHtml } from "@/utils/helpers.js"

// Componente compartilhado de exercícios dissertativos.
// Mesmo padrão do code-block.js: gera HTML puro e expõe um init()
// para ligar a interatividade (toggle, autosave, progresso, dica,
// gabarito e bloqueio de colagem).
//
// Uso na aula:
//
//   ${_ex.block({
//     storageKey: "jsplatform:exercises:/fundamentos/01-introducao",
//     titulo: "Exercícios — Aula 01",
//     grupos: [
//       {
//         titulo: "Bloco 1 — ...",
//         questoes: [
//           {
//             id: "q1",
//             texto: "...",
//             dica: "...",       // opcional — se ausente, o botão não aparece
//             gabarito: "...",   // opcional — se ausente, o botão não aparece
//           },
//         ],
//       },
//     ],
//   })}
//
// E no init() da aula:
//
//   _ex.init({ storageKey: "jsplatform:exercises:/fundamentos/01-introducao" })
//
// Persistência: cada resposta é salva (debounce 500ms) em localStorage,
// na chave storageKey, como { [questionId]: texto }.
//
// ── Gabarito e dica ─────────────────────────────────────────────────────
//
// - `dica` é opcional e sempre acessível — serve só para destravar o
//   raciocínio, sem entregar a resposta.
// - `gabarito` é opcional. Quando presente, o botão "Ver gabarito" nasce
//   desabilitado e só libera quando a resposta digitada passa por uma
//   checagem heurística de consistência mínima (ver `isRespostaConsistente`
//   abaixo). Essa checagem NÃO avalia se a resposta está correta — só
//   filtra respostas vazias, curtas demais ou "lixo" digitado só para
//   destravar o gabarito.
// - A checagem roda em tempo real a cada `input`, e NÃO depende de
//   localStorage/cache: mesmo em aba anônima ou com o cache limpo, o
//   botão libera/trava dinamicamente a partir do valor atual do
//   textarea. Se o campo de resposta for esvaziado, o botão volta a
//   travar. O conteúdo já revelado não é escondido de novo (não faria
//   sentido esconder algo que o usuário já viu).
//
// ── Colar (paste) ────────────────────────────────────────────────────────
//
// O textarea bloqueia os eventos `paste`, `drop` e as inserções de texto
// em bloco vindas de `beforeinput` (colagem, sugestão de clipboard do
// teclado, arrastar-e-soltar) para desincentivar colar a resposta pronta.
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
// com stopImmediatePropagation() para o autosave não rodar nem mostrar
// "Salvo" indevidamente.
//
// Ainda assim, é fricção, não uma trava de segurança real — dá para
// contornar digitando em outro lugar, usando ditado por voz ou
// inspecionando o DOM. Também pode atrapalhar quem depende de colar por
// necessidade de acessibilidade. Ative com essa consciência.

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

function questionItem(questao, numero) {
  const numeroFormatado = String(numero).padStart(2, "0")
  const temDica = Boolean(questao.dica)
  const temGabarito = Boolean(questao.gabarito)

  return /* html */ `
    <div class="exercise-block__question" data-question-wrap>

      <div class="exercise-block__question-head">
        <span class="exercise-block__question-number">${numeroFormatado}</span>
        <p class="exercise-block__question-text">${escapeHtml(questao.texto)}</p>
      </div>

      <textarea
        class="exercise-block__textarea"
        data-question-id="${escapeAttr(questao.id)}"
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
        <button
          class="exercise-block__hint-toggle"
          type="button"
          data-hint-toggle
          aria-expanded="false"
        >
          💡 Ver dica
        </button>`
            : ""
        }
        ${
          temGabarito
            ? /* html */ `
        <button
          class="exercise-block__answer-toggle"
          type="button"
          data-answer-toggle
          aria-expanded="false"
          disabled
        >
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
 * @param {Array<{ titulo: string, questoes: Array<{ id: string, texto: string, dica?: string, gabarito?: string }> }>} config.grupos
 */
function block({
  storageKey,
  titulo = "Exercícios",
  grupos = [],
  startOpen = false,
}) {
  const total = grupos.reduce((acc, g) => acc + g.questoes.length, 0)

  let offset = 0
  const gruposHtml = grupos
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

// ── Validação heurística de consistência mínima ────────────────────────────
//
// Não avalia se a resposta está CORRETA — só filtra respostas vazias,
// curtas demais ou "lixo" (ex: "aaaaaaa", "...........", "kkkkkkkk",
// ou teclado-mash tipo "qualgtetdcd mvkfkofk c v v") digitadas só para
// destravar o gabarito.
//
// Camadas da checagem, na ordem em que são aplicadas:
//
//   1. Tamanho mínimo do texto inteiro.
//   2. Quantidade mínima de PALAVRAS VÁLIDAS — uma palavra só conta se
//      tiver 3+ letras. Isso evita que "c", "v", "a" (letras soltas)
//      infacionem artificialmente a contagem de palavras.
//   3. Razão de palavras únicas — evita repetição tipo "não não não".
//   4. Razão de caracteres que são letras — evita "........." ou
//      strings cheias de pontuação/números.
//   5. Presença de ao menos um CONECTOR comum do português (que, não,
//      para, com, foi...) — uma resposta real, mesmo malfeita, quase
//      sempre usa algum desses; teclado-mash aleatório não usa.
//
// Limite reconhecido: isso continua sendo heurística, não correção de
// conteúdo. Alguém disposto a "enganar" o filtro pode digitar um texto
// com conectores + enrolação e destravar mesmo assim. O objetivo aqui
// é só filtrar o caso comum de "digitar qualquer coisa para destravar".

const MIN_CARACTERES = 20
const MIN_PALAVRAS_VALIDAS = 4
const TAMANHO_MIN_PALAVRA_VALIDA = 3
const RAZAO_MIN_PALAVRAS_UNICAS = 0.5
const RAZAO_MIN_LETRAS = 0.6

// Conectores/palavras funcionais comuns do português. Uma resposta
// genuína — mesmo curta ou malfeita — quase sempre usa pelo menos um
// desses. Teclado-mash aleatório, não.
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
  "seu",
  "seus",
  "porém",
  "seja",
])

function isRespostaConsistente(valor) {
  const texto = String(valor).trim()

  // 1) Tamanho mínimo geral
  if (texto.length < MIN_CARACTERES) return false

  const palavrasBrutas = texto.toLowerCase().split(/\s+/).filter(Boolean)

  // 2) Só conta como "palavra válida" quem tem 3+ letras — impede que
  //    letras soltas ("c", "v") infacionem a contagem.
  const palavrasValidas = palavrasBrutas.filter(
    (p) => p.replace(/[^a-zà-öø-ÿ]/gi, "").length >= TAMANHO_MIN_PALAVRA_VALIDA,
  )
  if (palavrasValidas.length < MIN_PALAVRAS_VALIDAS) return false

  // 3) Razão de palavras únicas (evita repetição tipo "não não não")
  const unicas = new Set(palavrasValidas)
  if (unicas.size / palavrasValidas.length < RAZAO_MIN_PALAVRAS_UNICAS) {
    return false
  }

  // 4) Razão de caracteres que são letras (evita "..........", números soltos)
  const letras = texto.replace(/[^a-zà-öø-ÿ]/gi, "")
  if (letras.length / texto.length < RAZAO_MIN_LETRAS) return false

  // 5) Precisa conter ao menos um conector comum do português
  const temConector = palavrasBrutas.some((p) => CONECTORES_PT.has(p))
  if (!temConector) return false

  return true
}

// ── Inicialização ────────────────────────────────────────────────────────

/**
 * Liga toggle, autosave, progresso, dica, gabarito e bloqueio de colar.
 * Chamar dentro do init() da aula.
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
  const textareas = Array.from(section.querySelectorAll("[data-question-id]"))

  const total = textareas.length
  let saveTimeout = null

  const answers = loadAnswers(storageKey)

  textareas.forEach((textarea) => {
    const id = textarea.dataset.questionId
    if (answers[id]) textarea.value = answers[id]
  })

  updateProgress()

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true"

    toggle.setAttribute("aria-expanded", String(!expanded))
    body.hidden = expanded

    if (!expanded) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  })

  // ── Dica, gabarito e bloqueio de colar, por questão ──────────────────────

  // Tipos de inserção de `beforeinput` que representam texto entrando
  // "em bloco" em vez de ser digitado tecla a tecla. É essa lista que
  // pega a prévia de clipboard sugerida pelo teclado (Gboard etc.),
  // que dispara "insertReplacementText" em vez de "paste".
  const TIPOS_COLAR_BLOQUEADOS = [
    "insertFromPaste",
    "insertFromPasteAsQuotation",
    "insertReplacementText",
    "insertFromDrop",
    "insertFromYank",
  ]

  // Limite de caracteres inseridos de uma só vez no fallback de salto.
  // Valores baixos pegam colagem/sugestão de teclado; digitação normal
  // (tecla a tecla) quase nunca ultrapassa 1–2 caracteres por evento.
  const MAX_CHARS_POR_EVENTO = 5

  // Aviso único reutilizado por paste, drop, beforeinput e salto abrupto.
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

  section.querySelectorAll("[data-question-wrap]").forEach((wrap) => {
    const textarea = wrap.querySelector("[data-question-id]")
    const hintToggle = wrap.querySelector("[data-hint-toggle]")
    const hintBlock = wrap.querySelector("[data-hint]")
    const answerToggle = wrap.querySelector("[data-answer-toggle]")
    const answerBlock = wrap.querySelector("[data-answer]")

    if (hintToggle && hintBlock) {
      hintToggle.addEventListener("click", () => {
        const expanded = hintToggle.getAttribute("aria-expanded") === "true"
        hintToggle.setAttribute("aria-expanded", String(!expanded))
        hintBlock.hidden = expanded
      })
    }

    // Trava do gabarito — registrada depois do detector de salto para
    // que, em caso de colagem bloqueada, o stopImmediatePropagation
    // impeça também a liberação indevida do botão.
    let atualizarTravaGabarito = null
    if (answerToggle && answerBlock) {
      answerToggle.addEventListener("click", () => {
        if (answerToggle.disabled) return
        const expanded = answerToggle.getAttribute("aria-expanded") === "true"
        answerToggle.setAttribute("aria-expanded", String(!expanded))
        answerBlock.hidden = expanded
      })

      atualizarTravaGabarito = () => {
        answerToggle.disabled = !isRespostaConsistente(textarea.value)
      }

      atualizarTravaGabarito()
    }

    // Bloqueio de colar: paste, drop, beforeinput e fallback de salto.
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

    // Fallback: salto abrupto no input (prévia do teclado que não
    // disparou beforeinput com o inputType esperado).
    // Reverte o valor, mostra o MESMO aviso do paste e interrompe o
    // fluxo com stopImmediatePropagation para o autosave (e a trava
    // do gabarito) não rodarem neste evento.
    const detectarSaltoAbrupto = (event) => {
      const atual = textarea.value
      const delta = atual.length - valorAnterior.length

      if (delta > MAX_CHARS_POR_EVENTO) {
        textarea.value = valorAnterior
        mostrarAvisoColagem()
        event.stopImmediatePropagation()
        return
      }

      valorAnterior = atual
    }

    // Ordem importa: o detector de salto precisa rodar ANTES do
    // autosave e da trava do gabarito, para poder parar o evento.
    textarea.addEventListener("paste", bloquearColagem)
    textarea.addEventListener("drop", bloquearColagem)
    textarea.addEventListener("beforeinput", bloquearViaBeforeInput)
    textarea.addEventListener("input", detectarSaltoAbrupto)

    if (atualizarTravaGabarito) {
      textarea.addEventListener("input", atualizarTravaGabarito)
    }

    // Sincroniza após o load do localStorage.
    valorAnterior = textarea.value
  })

  // ── Autosave ──────────────────────────────────────────────────────────
  // Registrado por último de propósito: se o detector de salto chamar
  // stopImmediatePropagation, este listener não executa e não sobrescreve
  // o aviso de colagem com "Salvando..." / "Salvo ✓".

  textareas.forEach((textarea) => {
    textarea.addEventListener("input", () => {
      clearTimeout(saveTimeout)

      if (status) status.textContent = "Salvando..."

      saveTimeout = setTimeout(() => {
        const current = loadAnswers(storageKey)

        textareas.forEach((t) => {
          const id = t.dataset.questionId
          const value = t.value.trim()

          if (value) {
            current[id] = value
          } else {
            delete current[id]
          }
        })

        saveAnswers(storageKey, current)
        updateProgress()

        if (status) status.textContent = "Salvo ✓"
      }, 500)
    })
  })

  function updateProgress() {
    const respondidas = textareas.filter(
      (t) => t.value.trim().length > 0,
    ).length
    const percent = total ? Math.round((respondidas / total) * 100) : 0

    if (progressFill) progressFill.style.width = `${percent}%`
    if (progressLabel)
      progressLabel.textContent = `${respondidas} / ${total} respondidas`
  }
}

export const _ex = {
  block,
  init,
}
