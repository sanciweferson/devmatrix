// src/pages/content/_shared/code-block.js
//
// Helper compartilhado para blocos de código das aulas.
//
// Responsabilidades:
//   - gerar o cabeçalho do bloco;
//   - exibir o nome do arquivo;
//   - gerar o botão Copiar;
//   - renderizar código com syntax highlighting;
//   - renderizar um ou mais consoles;
//   - criar os pontos de saída através de data-out.
//
// Uso:
//
//   _h.block(
//     "exemplo.js",
//     `...HTML do código...`,
//     [
//       {
//         label: "Console",
//         linhas: [
//           {
//             expr: "console.log(valor)",
//             key: "valor",
//           },
//           {
//             expr: "algumaCoisa",
//             key: "erro",
//             cls: "code-console__line--error",
//           },
//         ],
//       },
//     ],
//   )
//
// O botão de copiar utiliza [data-copy].
// O sistema global de cópia deve localizar o .code-block mais próximo
// e copiar o textContent de .code-block__code.
//
// Os outputs utilizam:
//   <span class="syn-output" data-out="chave"></span>
//
// A página pode então preencher esses elementos através do init().

const COPY_ICON = /* html */ `
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
    focusable="false"
  >
    <rect
      width="14"
      height="14"
      x="8"
      y="8"
      rx="2"
    />

    <path
      d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2-2-2h10c1.1 0 2 .9 2 2"
    />
  </svg>
`

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function linhaConsole({ expr, key, cls = "" }) {
  const classAttr = cls
    ? ` class="code-console__line ${escapeAttr(cls)}"`
    : ` class="code-console__line"`

  const outAttr = key ? ` data-out="${escapeAttr(key)}"` : ""

  return /* html */ `
    <div${classAttr}>

      <span class="code-console__prompt">›</span>

      <span class="code-console__expr">
        ${escapeHtml(expr)}
      </span>

      ${
        key
          ? `
            <span class="code-console__arrow">→</span>
            <span
              class="syn-output"
              ${outAttr}
            ></span>
          `
          : ""
      }

    </div>
  `
}

function consoleBlock({ label, linhas = [] }) {
  return /* html */ `
    <div class="code-console">

      <div class="code-console__header">
        <span class="code-console__label">
          ${escapeHtml(label)}
        </span>
      </div>

      <div class="code-console__body">
        ${linhas.map(linhaConsole).join("")}
      </div>

    </div>
  `
}

/**
 * Gera um bloco completo de código.
 *
 * @param {string} filename
 * @param {string} codeHtml
 * @param {Array} [consoles]
 * @returns {string}
 */
function block(filename, codeHtml, consoles = []) {
  const consolesHtml = consoles.map(consoleBlock).join("")

  return /* html */ `
    <div class="code-block">

      <div class="code-block__header">

        <span class="code-block__filename">
          ${escapeHtml(filename)}
        </span>

        <button
          class="code-block__copy"
          type="button"
          data-copy
          aria-label="Copiar código de ${escapeAttr(filename)}"
        >

          <span class="code-block__copy-icon">
            ${COPY_ICON}
          </span>

          <span class="code-block__copy-label">
            Copiar
          </span>

        </button>

      </div>

      <pre class="code-block__pre"><code class="code-block__code">${codeHtml}</code></pre>

      ${consolesHtml}

    </div>
  `
}

/**
 * Versão simplificada para blocos que possuem apenas código.
 *
 * @param {string} filename
 * @param {string} codeHtml
 * @returns {string}
 */
function codeOnly(filename, codeHtml) {
  return block(filename, codeHtml)
}

export const _h = {
  block,
  codeOnly,
}
