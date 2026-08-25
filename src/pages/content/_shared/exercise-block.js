// src/pages/content/_shared/exercise-block.js
//
// Componente compartilhado de exercícios dissertativos.
// Mesmo padrão do code-block.js: gera HTML puro e expõe um init()
// para ligar a interatividade (toggle, autosave, progresso).
//
// Uso na aula:
//
//   ${_ex.block({
//     storageKey: "jsplatform:exercises:/fundamentos/01-introducao",
//     titulo: "Exercícios — Aula 01",
//     grupos: [
//       { titulo: "Bloco 1 — ...", questoes: [{ id: "q1", texto: "..." }] },
//     ],
//   })}
//
// E no init() da aula:
//
//   _ex.init({ storageKey: "jsplatform:exercises:/fundamentos/01-introducao" })
//
// Persistência: cada resposta é salva (debounce 500ms) em localStorage,
// na chave storageKey, como { [questionId]: texto }.

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function questionItem(questao, numero) {
  const numeroFormatado = String(numero).padStart(2, "0")

  return /* html */ `
    <div class="exercise-block__question">

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
 * @param {Array<{ titulo: string, questoes: Array<{ id: string, texto: string }> }>} config.grupos
 */
function block({ storageKey, titulo = "Exercícios", grupos = [] }) {
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
        aria-expanded="false"
      >
        <span class="exercise-block__toggle-icon">📝</span>
        <span class="exercise-block__toggle-label">Fazer exercícios</span>
        <span class="exercise-block__toggle-count">${total} questões</span>
      </button>

      <div class="exercise-block__body" data-exercise-body hidden>

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

// ── Inicialização ────────────────────────────────────────────────────────

/**
 * Liga toggle, autosave e progresso. Chamar dentro do init() da aula.
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
