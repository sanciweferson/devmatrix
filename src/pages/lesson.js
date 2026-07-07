// src/pages/lesson.js

import { menuItems } from "@components/data/data";
import { deletePage } from "../core/cache";

const STORAGE_KEY = "jsplatform:progress";
const LAST_LESSON_KEY = "jsplatform:last-lesson";

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function toggleLesson(href) {
  const progress = getProgress();

  if (progress[href]) {
    delete progress[href];
  } else {
    progress[href] = true;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return !!progress[href];
}

const Icons = {
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,

  arrowL: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,

  arrowR: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,

  grid: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,

  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,

  copied: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
};

import { content as fundamentos01 } from "@content/fundamentos/01-introducao";
import { content as fundamentos02 } from "@content/fundamentos/02-primeiro-codigo";
import { content as fundamentos03 } from "@content/fundamentos/03-como-browser-le-js";
import { content as fundamentos04 } from "@content/fundamentos/04-erros-e-console.js";
import { content as fundamentos05 } from "@content/fundamentos/05-comentarios.js";
import { content as fundamentos06 } from "@content/fundamentos/06-strict-mode.js";
import { content as fundamentos07 } from "@content/fundamentos/07-execution-context.js";
import { content as fundamentos08 } from "@content/fundamentos/08-lexical-environment.js";
import { content as fundamentos09 } from "@content/fundamentos/09-variable-environment.js";
import { content as fundamentos10 } from "@content/fundamentos/10-modulos-externos.js";
import { content as fundamentos11 } from "@content/fundamentos/11-ecossistema.js";

import { content as varTipos01, initVar } from "@content/variaveis-tipos/01-var";
import { content as letTipos02, initLet } from "@content/variaveis-tipos/02-let";
import { content as constTipos03, initConst } from "@content/variaveis-tipos/03-const";
import { content as varLetConstTipos04, initVarLetConst } from "@content/variaveis-tipos/04-var-let-const";
import { content as tiposDeDadosTipos05, initTiposDeDados } from "@content/variaveis-tipos/05-tipos-de-dados";
import { content as primitivosTipos06, initPrimitivos } from "@content/variaveis-tipos/06-primitivos";
import { content as referenciaTipos07, initReferencia } from "@content/variaveis-tipos/07-referencia";
import { content as coercaoTipos08, initCoercao } from "@content/variaveis-tipos/08-coercao";

const CONTENT_MAP = {
  "fundamentos/01-introducao": fundamentos01,
  "fundamentos/02-primeiro-codigo": fundamentos02,
  "fundamentos/03-como-browser-le-js": fundamentos03,
  "fundamentos/04-erros-e-console": fundamentos04,
  "fundamentos/05-comentarios": fundamentos05,
  "fundamentos/06-strict-mode": fundamentos06,
  "fundamentos/07-execution-context": fundamentos07,
  "fundamentos/08-lexical-environment": fundamentos08,
  "fundamentos/09-variable-environment": fundamentos09,
  "fundamentos/10-modulos-externos": fundamentos10,
  "fundamentos/11-ecossistema": fundamentos11,

  "variaveis-tipos/01-var": varTipos01,
  "variaveis-tipos/02-let": letTipos02,
  "variaveis-tipos/03-const": constTipos03,
  "variaveis-tipos/04-var-let-const": varLetConstTipos04,
  "variaveis-tipos/05-tipos-de-dados": tiposDeDadosTipos05,
  "variaveis-tipos/06-primitivos": primitivosTipos06,
  "variaveis-tipos/07-referencia": referenciaTipos07,
  "variaveis-tipos/08-coercao": coercaoTipos08,
};

const INIT_MAP = {
  "variaveis-tipos/01-var": initVar,
  "variaveis-tipos/02-let": initLet,
  "variaveis-tipos/03-const": initConst,
  "variaveis-tipos/04-var-let-const": initVarLetConst,
  "variaveis-tipos/05-tipos-de-dados": initTiposDeDados,
  "variaveis-tipos/06-primitivos": initPrimitivos,
  "variaveis-tipos/07-referencia": initReferencia,
  "variaveis-tipos/08-coercao": initCoercao,
};

function getLessonContext(modulo, slug) {
  const moduleData = menuItems.find(m => m.id === modulo);
  if (!moduleData?.sub) return null;

  const href = `/${modulo}/${slug}`;
  const currentIdx = moduleData.sub.findIndex(l => l.href === href);

  if (currentIdx === -1) return null;

  return {
    moduleData,
    lesson: moduleData.sub[currentIdx],
    prev: moduleData.sub[currentIdx - 1] ?? null,
    next: moduleData.sub[currentIdx + 1] ?? null,
    position: currentIdx + 1,
    total: moduleData.sub.length,
  };
}

export function Lesson({ modulo, slug }) {
  const progress = getProgress();
  const ctx = getLessonContext(modulo, slug);

  if (!ctx) {
    return /* html */ `
      <div class="lesson lesson--not-found">
        <p>Aula <strong>${modulo}/${slug}</strong> não encontrada.</p>
        <a href="/${modulo}" data-link>← Voltar ao módulo</a>
      </div>`;
  }

  const { moduleData, lesson, prev, next, position, total } = ctx;
  const isDone = !!progress[lesson.href];

  localStorage.setItem(LAST_LESSON_KEY, lesson.href);
  deletePage("/");

  const contentFn = CONTENT_MAP[`${modulo}/${slug}`];

  return /* html */ `
    <div class="lesson">
      <div class="lesson__topbar lesson__anim-item">
        <nav class="lesson__breadcrumb" aria-label="Breadcrumb">
          <a href="/" data-link>Início</a>
          <span class="lesson__breadcrumb-sep">/</span>
          <a href="/${modulo}" data-link>${moduleData.label}</a>
          <span class="lesson__breadcrumb-sep">/</span>
          <span>${position < 10 ? "0" + position : position}</span>
        </nav>

        <span class="lesson__position">${position} de ${total}</span>
      </div>

      <header class="lesson__header lesson__anim-item">
        <h1 class="lesson__title">
          ${lesson.label.replace(/^\d+ — /, "")}
          
        </h1>

        <button
          id="js-lesson-toggle"
          class="lesson__btn-done ${isDone ? "lesson__btn-done--active" : ""}"
          type="button"
          data-href="${lesson.href}"
          aria-pressed="${isDone}">
          <span class="lesson__btn-done-icon">${Icons.check}</span>
          <span class="lesson__btn-done-label">
            ${isDone ? "Concluída" : "Marcar concluída"}
          </span>
        </button>
      </header>

      <article class="lesson__content lesson__anim-item">
        ${contentFn
      ? contentFn()
      : /* html */ `<p class="lesson__no-content">Conteúdo em breve.</p>`
    }
      </article>

      <nav class="lesson__nav lesson__anim-item" aria-label="Navegação entre aulas">
        <div class="lesson__nav-prev">
          ${prev ? /* html */ `
            <a href="${prev.href}" data-link class="lesson__nav-link lesson__nav-link--prev">
              ${Icons.arrowL}
              <span>
                <small>Anterior</small>
            
                ${prev.label.replace(/^\d+ — /, "")}
              </span>
            </a>` : ""}
        </div>

        <a href="/${modulo}" data-link class="lesson__nav-module"
           aria-label="Ver todas as aulas">
          ${Icons.grid}
        </a>

        <div class="lesson__nav-next">
          ${next ? /* html */ `
            <a href="${next.href}" data-link class="lesson__nav-link lesson__nav-link--next">
              <span>
                <small>Próxima</small>
                ${next.label.replace(/^\d+ — /, "")}
              </span>
              ${Icons.arrowR}
            </a>` : ""}
        </div>
      </nav>
    </div>
  `;
}

export function initLesson() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".lesson__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.08}s`;
      el.classList.add("lesson__anim-run");
    });
  });

  const pathname = window.location.pathname;
  const chave = pathname.replace(/^\//, "");
  const initFn = INIT_MAP[chave];

  if (initFn) {
    requestAnimationFrame(() => {
      initFn();
    });
  }

  const btn = document.getElementById("js-lesson-toggle");

  if (btn) {
    btn.addEventListener("click", () => {
      const href = btn.dataset.href;
      const isDone = toggleLesson(href);
      const label = btn.querySelector(".lesson__btn-done-label");

      btn.classList.toggle("lesson__btn-done--active", isDone);
      btn.setAttribute("aria-pressed", String(isDone));

      if (label) {
        label.textContent = isDone ? "Concluída" : "Marcar como concluída";
      }

      const modulePath = "/" + href.split("/").filter(Boolean)[0];

      deletePage(modulePath);
      deletePage("/");
    });
  }

  const aplicarFeedback = (copyBtn) => {
    const label = copyBtn.querySelector(".code-block__copy-label");

    copyBtn.classList.add("code-block__copy--copied");

    if (label) {
      label.textContent = "Copiado!";
    }

    setTimeout(() => {
      copyBtn.classList.remove("code-block__copy--copied");

      if (label) {
        label.textContent = copyBtn.classList.contains("code-block__copy--console")
          ? "Copiar tudo"
          : "Copiar";
      }
    }, 2000);
  };

  const copiar = async (texto, copyBtn) => {
    try {
      await navigator.clipboard.writeText(texto);
      aplicarFeedback(copyBtn);
    } catch (err) {
      console.error("[initLesson] Falha ao copiar:", err);

      const label = copyBtn.querySelector(".code-block__copy-label");
      if (label) label.textContent = "Erro!";
    }
  };

  document.querySelectorAll(
    ".lesson__content .code-block__copy:not(.code-block__copy--console)"
  ).forEach((copyBtn) => {
    copyBtn.addEventListener("click", async () => {
      const block = copyBtn.closest(".code-block");
      if (!block) return;

      const codeEl = block.querySelector(".code-block__code");
      const texto = codeEl ? codeEl.textContent : "";

      await copiar(texto, copyBtn);
    });
  });

  document.querySelectorAll(
    ".lesson__content .code-block__copy--console"
  ).forEach((copyBtn) => {
    copyBtn.addEventListener("click", async () => {
      const block = copyBtn.closest(".code-block");
      if (!block) return;

      const codeEl = block.querySelector(".code-block__code");
      const codigoTexto = codeEl ? codeEl.textContent.trim() : "";

      const linhas = Array.from(
        block.querySelectorAll(".code-console__line")
      ).map((linha) => {
        const prompt = linha.querySelector(".code-console__prompt")?.textContent.trim() ?? "›";
        const expr = linha.querySelector(".code-console__expr")?.textContent.trim() ?? "";
        const output = linha.querySelector("[class*='syn-output']")?.textContent.trim() ?? "";

        if (!expr && !output) return null;

        return `${prompt} ${expr} → ${output}`;
      }).filter(Boolean);

      const consoleTexto = linhas.length
        ? `\n\n// Console:\n${linhas.join("\n")}`
        : "";

      await copiar(codigoTexto + consoleTexto, copyBtn);
    });
  });

  document.querySelectorAll(".lesson__content pre").forEach((pre) => {
    if (pre.closest(".code-block")) return;

    pre.style.position = "relative";

    const copyBtn = document.createElement("button");
    copyBtn.className = "lesson__copy-btn";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", "Copiar código");

    const renderBtnLegado = (icon, label) => {
      copyBtn.innerHTML = /* html */ `
        <span class="lesson__copy-icon">${icon}</span>
        <span class="lesson__copy-label">${label}</span>
      `;
    };

    renderBtnLegado(Icons.copy, "Copiar");

    copyBtn.addEventListener("click", async () => {
      const code = pre.querySelector("code");
      const texto = code ? code.textContent : pre.textContent;

      try {
        await navigator.clipboard.writeText(texto);

        copyBtn.classList.add("lesson__copy-btn--copied");
        renderBtnLegado(Icons.copied, "Copiado!");

        setTimeout(() => {
          copyBtn.classList.remove("lesson__copy-btn--copied");
          renderBtnLegado(Icons.copy, "Copiar");
        }, 2000);
      } catch (err) {
        console.error("[initLesson] Falha ao copiar (legado):", err);
        copyBtn.querySelector(".lesson__copy-label").textContent = "Erro!";
      }
    });

    pre.appendChild(copyBtn);
  });
}
