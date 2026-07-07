// src/pages/home.js

import { clearCache } from "@core/cache";
import { menuItems } from "@components/data/data";

const STORAGE_KEY = "jsplatform:progress";
const LAST_LESSON_KEY = "jsplatform:last-lesson";
const USER_NAME_KEY = "jsplatform:user-name";

const modules = menuItems.filter(item => item.sub && item.sub.length);

const TOTAL_LESSONS = modules.reduce((acc, m) => acc + m.sub.length, 0);

const MESSAGES = [
  "Você não está aprendendo JS. Você está aprendendo a pensar como o motor pensa.",
  "Entender o porquê vale mais que memorizar o como.",
  "Cada conceito que você domina de verdade é um que nunca mais te trava.",
  "Quebrar código de propósito é uma das formas mais honestas de aprender.",
  "Lento e sólido chega mais longe que rápido e frágil.",
  "O dev que sabe depurar vale mais que o que nunca erra.",
  "Uma aula por dia parece pouco. Em um ano, parece outro nível.",
  "Consistência não é motivação — é decisão.",
  "O código de ontem te explica o erro de hoje.",
  "Confusão não é sinal de fraqueza. É sinal de que você está chegando perto.",
  "Todo sênior já ficou travado exatamente onde você está agora.",
  "Não existe atalho para entendimento real. Só existe o caminho.",
  "Scriptorium: onde o código vira conhecimento.",
  "Você não usa JavaScript. Você pensa em JavaScript.",
  "Fundamentos sólidos não envelhecem.",
];

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LAST_LESSON_KEY);
}

function countCompleted(module, progress) {
  return module.sub.filter(lesson => progress[lesson.href]).length;
}

function getCompletedTotal(progress) {
  return modules.reduce((acc, m) => acc + countCompleted(m, progress), 0);
}

function getProgressPercent(progress) {
  if (!TOTAL_LESSONS) return 0;
  return Math.round((getCompletedTotal(progress) / TOTAL_LESSONS) * 100);
}

function getLastLessonHref() {
  return localStorage.getItem(LAST_LESSON_KEY);
}

function getUserName() {
  return localStorage.getItem(USER_NAME_KEY) || "dev";
}

function findLessonByHref(href) {
  for (const module of modules) {
    const index = module.sub.findIndex(lesson => lesson.href === href);

    if (index !== -1) {
      return {
        lesson: module.sub[index],
        module,
        index,
      };
    }
  }

  return null;
}

function getFirstIncompleteLesson(progress) {
  for (const module of modules) {
    const lesson = module.sub.find(lesson => !progress[lesson.href]);

    if (lesson) {
      return {
        ...lesson,
        moduleLabel: module.label,
        eyebrow: "Próxima aula",
      };
    }
  }

  return null;
}

function getContinueLesson(progress) {
  const lastHref = getLastLessonHref();
  const last = lastHref ? findLessonByHref(lastHref) : null;

  if (last) {
    const { lesson, module, index } = last;

    if (!progress[lesson.href]) {
      return {
        ...lesson,
        moduleLabel: module.label,
        eyebrow: "Continuar de onde parou",
      };
    }

    const nextInModule = module.sub
      .slice(index + 1)
      .find(nextLesson => !progress[nextLesson.href]);

    if (nextInModule) {
      return {
        ...nextInModule,
        moduleLabel: module.label,
        eyebrow: "Próxima aula",
      };
    }
  }

  return getFirstIncompleteLesson(progress);
}

function getProgressMessage(percent) {
  if (percent === 0) return "O começo parece pequeno, mas é onde tudo encaixa.";
  if (percent < 25) return "Você já saiu do zero. Agora é manter o ritmo.";
  if (percent < 50) return "Boa. A base já está tomando forma.";
  if (percent < 75) return "Você passou da metade. Agora começa a ficar interessante.";
  if (percent < 100) return "Reta final. Falta pouco para fechar o ciclo.";
  return "Tudo concluído. Fundamento bem estudado vira ferramenta na mão.";
}

function getContinueMessage(continueLesson) {
  if (continueLesson.eyebrow === "Continuar de onde parou") {
    return `Você estava em ${continueLesson.moduleLabel}. Retome daqui sem perder o fio.`;
  }

  if (continueLesson.eyebrow === "Próxima aula") {
    return `Próximo passo em ${continueLesson.moduleLabel}.`;
  }

  return "Escolha um módulo para continuar estudando.";
}

function formatDate(date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(date) {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getGreeting() {
  const h = new Date().getHours();
  const name = getUserName();

  if (h < 12) return `Bom dia, ${name}`;
  if (h < 18) return `Boa tarde, ${name}`;
  return `Boa noite, ${name}`;
}

const createProgressBar = (percent) => /* html */ `
  <div class="home__progress-track"
       role="progressbar"
       aria-valuenow="${percent}"
       aria-valuemin="0"
       aria-valuemax="100">
    <div class="home__progress-fill" style="width: ${percent}%"></div>
  </div>`;

const createContinueCard = (progress) => {
  const continueLesson = getContinueLesson(progress);

  if (!continueLesson) {
    return /* html */ `
      <section class="home__continue home__continue--done home__anim-item">
        <div class="home__continue-content">
          <span class="home__continue-eyebrow">Tudo concluído</span>
          <h2 class="home__continue-title">Você finalizou todas as aulas disponíveis.</h2>
          <p class="home__continue-text">
            ${getProgressMessage(100)}
          </p>
        </div>
      </section>`;
  }

  return /* html */ `
    <section class="home__continue home__anim-item">
      <div class="home__continue-content">
        <span class="home__continue-eyebrow">${continueLesson.eyebrow}</span>
        <h2 class="home__continue-title">
          ${continueLesson.label.replace(/^\d+ — /, "")}
        </h2>
        <p class="home__continue-text">
          ${getContinueMessage(continueLesson)}
        </p>
      </div>

      <a class="home__continue-link" href="${continueLesson.href}" data-link>
        Continuar estudando
      </a>
    </section>`;
};

const createModuleCard = (module, progress) => {
  const total = module.sub.length;
  const completed = countCompleted(module, progress);
  const percent = Math.round((completed / total) * 100);
  const done = completed === total;

  return /* html */ `
    <article class="home__module-card ${done ? "home__module-card--done" : ""}">
      <div class="home__module-card-header">
        <h3 class="home__module-title">
          <a href="${module.href}" data-link>${module.label}</a>
        </h3>
        <span class="home__module-count">${completed}/${total}</span>
      </div>
      ${createProgressBar(percent)}
    </article>`;
};

const createStats = (progress) => {
  const completed = getCompletedTotal(progress);
  const percent = getProgressPercent(progress);

  return /* html */ `
    <section class="home__stats">
      <div class="home__stat">
        <span class="home__stat-value">${TOTAL_LESSONS}</span>
        <span class="home__stat-label">aulas no total </span>
      </div>
      <div class="home__stat">
        <span class="home__stat-value">${completed}</span>
        <span class="home__stat-label">concluídas </span>
      </div>
      <div class="home__stat">
        <span class="home__stat-value">${TOTAL_LESSONS - completed}</span>
        <span class="home__stat-label">restantes</span>
      </div>
      <div class="home__stat home__stat--highlight">
        <span class="home__stat-value">${percent}%</span>
        <span class="home__stat-label">progresso geral</span>
      </div>
    </section>`;
};

const createModal = () => /* html */ `
  <div id="js-reset-modal"
       class="home-modal"
       role="dialog"
       aria-modal="true"
       aria-labelledby="js-modal-title">

    <div class="home-modal__overlay" id="js-modal-overlay"></div>

    <div class="home-modal__panel">
      <div class="home-modal__icon" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24"
             fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>

      <h2 class="home-modal__title" id="js-modal-title">Resetar progresso</h2>
      <p class="home-modal__body">
        Todo o progresso registrado será apagado permanentemente.
        Essa ação não pode ser desfeita.
      </p>

      <div class="home-modal__actions">
        <button id="js-modal-cancel"
                class="home-modal__btn home-modal__btn--cancel"
                type="button">
          Cancelar
        </button>
        <button id="js-modal-confirm"
                class="home-modal__btn home-modal__btn--confirm"
                type="button">
          Sim, resetar
        </button>
      </div>
    </div>
  </div>`;

export function Home() {
  const progress = getProgress();
  const now = new Date();

  return /* html */ `
    <div class="home">

      <section class="home__hero">
        <div class="home__hero-text">
          <p class="home__greeting home__anim-item">${getGreeting()} 👋</p>

          <h1 id="js-home-headline" class="home__headline home__anim-item">
            ${MESSAGES[0]}
            
          </h1>

          <p class="home__subline home__anim-item">
            ${TOTAL_LESSONS} aulas cobrindo do motor à aplicação —
            sem atalhos, sem mágica, com contexto real.
          </p>
        </div>

        <div class="home__clock home__anim-item"
             aria-live="polite"
             aria-atomic="true">
          <time id="js-home-time" class="home__clock-time">
            ${formatTime(now)}
          </time>
          <span id="js-home-date" class="home__clock-date">
            ${formatDate(now)}
          </span>
        </div>
      </section>

      ${createContinueCard(progress)}

      ${createStats(progress)}

      <section class="home__modules">
        <div class="home__section-header">
          <h2 class="home__section-title">Progresso por módulo</h2>
          <button id="js-home-reset" class="home__btn-reset" type="button">
            Resetar progresso
          </button>
        </div>
        <div class="home__module-grid">
          ${modules.map(m => createModuleCard(m, progress)).join("")}
        </div>
      </section>

    </div>
  `;
}

export function initHome() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".home__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.12}s`;
      el.classList.add("home__anim-run");
    });
  });

  const timeEl = document.getElementById("js-home-time");
  const dateEl = document.getElementById("js-home-date");

  const tick = () => {
    const now = new Date();
    if (timeEl) timeEl.textContent = formatTime(now);
    if (dateEl) dateEl.textContent = formatDate(now);
  };

  const clockInterval = setInterval(tick, 1000);

  const MESSAGES_INTERVAL = 4000;
  const FADE_DURATION = 420;
  const headlineEl = document.getElementById("js-home-headline");
  let messageIndex = 0;
  let fadeTimeout = null;

  const messageInterval = setInterval(() => {
    if (!headlineEl) return;

    headlineEl.classList.add("home__headline--fade");

    fadeTimeout = setTimeout(() => {
      messageIndex = (messageIndex + 1) % MESSAGES.length;
      headlineEl.textContent = MESSAGES[messageIndex];
      headlineEl.classList.remove("home__headline--fade");
    }, FADE_DURATION);
  }, MESSAGES_INTERVAL);

  const resetBtn = document.getElementById("js-home-reset");

  const modalWrapper = document.createElement("div");
  modalWrapper.innerHTML = createModal();
  document.body.appendChild(modalWrapper);

  const modal = document.getElementById("js-reset-modal");
  const overlay = document.getElementById("js-modal-overlay");
  const cancelBtn = document.getElementById("js-modal-cancel");
  const confirmBtn = document.getElementById("js-modal-confirm");

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("home-modal--open");
    setTimeout(() => cancelBtn?.focus(), 50);
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("home-modal--open");
    resetBtn?.focus();
  };

  resetBtn?.addEventListener("click", openModal);
  overlay?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  const onKeydown = (e) => {
    if (e.key === "Escape" && modal?.classList.contains("home-modal--open")) {
      closeModal();
    }
  };

  document.addEventListener("keydown", onKeydown);

  confirmBtn?.addEventListener("click", () => {
    resetProgress();
    closeModal();
    clearCache();
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

  return function cleanup() {
    clearInterval(clockInterval);
    clearInterval(messageInterval);

    if (fadeTimeout) clearTimeout(fadeTimeout);

    document.removeEventListener("keydown", onKeydown);

    if (modalWrapper.parentNode) {
      modalWrapper.parentNode.removeChild(modalWrapper);
    }
  };
}
