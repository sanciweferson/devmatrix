// src/pages/content/_shared/code-block.js

/**
 * Helpers de markup para blocos de código das aulas.
 * Uso:
 *   _h.block(filename, codeHtml, consoles?)
 *
 * consoles = [
 *   {
 *     label: 'Console — var',
 *     linhas: [
 *       { expr: 'comVar', key: 'hoist.var_antes' },
 *       { expr: 'comLet', key: 'hoist.let_err', cls: 'code-console__line--error' }
 *     ]
 *   }
 * ]
 */

const COPY_ICON = /* html */ `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
`

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
}

function linhaConsole({ expr, key, cls = "" }) {
  const classAttr = cls
    ? ` class="code-console__line ${cls}"`
    : ` class="code-console__line"`
  const outAttr = key ? ` data-out="${escapeAttr(key)}"` : ""

  return /* html */ `
    <div${classAttr}>
      <span class="code-console__prompt">›</span>
      <span class="code-console__expr">${expr}</span>
      <span class="code-console__arrow">→</span>
      <span class="syn-output"${outAttr}></span>
    </div>`
}

function consoleBlock({ label, linhas }) {
  return /* html */ `
    <div class="code-console">
      <div class="code-console__header">
        <span class="code-console__label">${label}</span>
      </div>
      <div class="code-console__body">
        ${linhas.map(linhaConsole).join("")}
      </div>
    </div>`
}

/**
 * Gera o bloco completo de código.
 * @param {string} filename
 * @param {string} codeHtml  - HTML já com spans de syntax
 * @param {Array}  [consoles] - lista de consoles (opcional)
 */
function block(filename, codeHtml, consoles = []) {
  const consolesHtml = consoles.map(consoleBlock).join("")

  return /* html */ `
    <div class="code-block">
      <div class="code-block__header">
        <span class="code-block__filename">${filename}</span>
        <button class="code-block__copy" type="button" data-copy>
          <span class="code-block__copy-icon">${COPY_ICON}</span>
          <span class="code-block__copy-label">Copiar</span>
        </button>
      </div>
      <pre class="code-block__pre"><code class="code-block__code">${codeHtml}</code></pre>
      ${consolesHtml}
    </div>`
}

/**
 * Versão simplificada só com código (sem console)
 */
function codeOnly(filename, codeHtml) {
  return block(filename, codeHtml, [])
}

export const _h = {
  block,
  codeOnly,
}
