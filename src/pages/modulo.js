// src/pages/modulo.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. ModulePage({ modulo }) → gera o HTML da página de visão geral do módulo
//   2. initModulePage()       → anima a entrada dos elementos após o DOM pronto
//
// Esta página é genérica — funciona para todos os 11 módulos sem alteração.
// O parâmetro `modulo` (ex: "fundamentos") é extraído da URL pelo router
// e passado pelo componente em routes.js:
//   { path: "/fundamentos", component: () => ModulePage({ modulo: "fundamentos" }) }
//
// Estrutura da página:
//   - Cabeçalho: breadcrumb + título + descrição + card de progresso do módulo
//   - Botão continuar: link para a próxima aula não concluída
//   - Lista de aulas: cada aula com status (concluída / pendente)
//
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────
import { menuItems } from "@components/data/data";

// Chave do localStorage — mesma usada em home.js e lesson.js.
// Centralizar em uma constante evita typos que causariam bugs silenciosos
// (progresso salvo com uma chave, lido com outra — sempre 0%).
const STORAGE_KEY = "jsplatform:progress";

// Lê o progresso do localStorage com proteção contra JSON corrompido.
function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}


// ─── ÍCONES ───────────────────────────────────────────────────────────────────
//
// SVGs inline — zero requisições extras, herdam cor via currentColor.
// Cada ícone tem um propósito específico na lista de aulas:
//   check  → aula concluída
//   circle → aula não concluída (pendente)
//   play   → aula em andamento (reservado para uso futuro)
//   arrow  → seta do botão "Continuar" / "Começar módulo"
const Icons = {
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  circle: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  arrow: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
};


// ─── DESCRIÇÕES DOS MÓDULOS ───────────────────────────────────────────────────
//
// Textos exibidos no cabeçalho da página de cada módulo.
// Chave = id do módulo em menuItems.
//
// Por que não colocar isso no menuItems/data.js?
//   As descrições são específicas desta página — não são usadas em nenhum
//   outro lugar. Mantê-las aqui evita que data.js acumule responsabilidades
//   de apresentação que não pertencem a ele.
const MODULE_DESCRIPTIONS = {
  "fundamentos": "Base do ambiente, motor e contexto de execução. O que acontece antes do seu código rodar.",
  "variaveis-tipos": "Como o JS armazena e interpreta dados. O que é um valor e como a linguagem o vê.",
  "funcoes": "Funções são cidadãs de primeira classe. O que exatamente uma função é e como ela se comporta.",
  "objetos": "A estrutura fundamental de dados em JS. Como a linguagem organiza informações relacionadas.",
  "arrays-iteracao": "Coleções ordenadas e o modelo funcional de iteração. Como o JS processa listas de dados.",
  "escopo-closures": "Como o JS resolve nomes de variáveis e preserva memória. Por que funções lembram de onde foram criadas.",
  "this-contexto": "O mecanismo mais confuso do JS, explicado do zero. A quem `this` se refere em cada contexto.",
  "prototipos-classes": "A herança real do JS antes e depois do açúcar sintático. Como objetos herdam comportamento.",
  "async": "O modelo de concorrência do JS de callbacks até async/await. Como lidar com operações assíncronas.",
  "dom-eventos": "A ponte entre JS e o que o usuário vê. Como manipular a página e reagir a interações.",
  "modulos-es6": "O sistema oficial de módulos da linguagem. Como JS organiza código em múltiplos arquivos.",
};


// ─── RENDERIZAÇÃO ─────────────────────────────────────────────────────────────

// Cria o HTML de um item da lista de aulas.
//
// `index` → posição no array (0-based), convertida para número formatado (01, 02...).
// `done`  → boolean: se o href da aula existe no objeto de progresso.
//
// String.padStart(2, "0"):
//   Garante que o número tenha sempre 2 dígitos.
//   1 → "01", 10 → "10"
//   Mantém o alinhamento visual da lista.
const createLessonItem = (lesson, index, progress) => {
  const done = !!progress[lesson.href];
  const number = String(index + 1).padStart(2, "0");

  return /* html */ `
    <li class="modulo__lesson-item ${done ? "modulo__lesson-item--done" : ""}">
      <a href="${lesson.href}" data-link class="modulo__lesson-link">

        <!-- Ícone de status: check se concluída, círculo se pendente -->
        <span class="modulo__lesson-icon ${done ? "modulo__lesson-icon--done" : ""}">
          ${done ? Icons.check : Icons.circle}
        </span>

        <!-- Número formatado: 01, 02, 03... -->
        <span class="modulo__lesson-number">${number}</span>

        <!-- Label sem o prefixo numérico "01 — " -->
        <!-- replace remove "01 — " do início se existir -->
        <span class="modulo__lesson-label">
          ${lesson.label.replace(/^\d+ — /, "")}
        </span>

      </a>
    </li>`;
};


// ─────────────────────────────────────────────────────────────────────────────
// ModulePage({ modulo })
//
// Gera o HTML completo da página de visão geral de um módulo.
//
// Parâmetro:
//   modulo → id do módulo (ex: "fundamentos"), extraído da URL pelo router.
//
// Retorna:
//   String HTML completa, ou mensagem de erro se o módulo não for encontrado.
// ─────────────────────────────────────────────────────────────────────────────
export function ModulePage({ modulo }) {
  const progress = getProgress();

  // Encontra o módulo no menuItems pelo id.
  // menuItems.find() retorna o primeiro item onde m.id === modulo,
  // ou undefined se nenhum bater.
  const moduleData = menuItems.find(m => m.id === modulo);

  // Guard: módulo não encontrado — exibe mensagem de erro amigável.
  // Isso acontece se a URL for digitada manualmente com um id inválido.
  if (!moduleData || !moduleData.sub) {
    return /* html */ `
      <div class="modulo modulo--not-found">
        <p>Módulo <strong>${modulo}</strong> não encontrado.</p>
        <a href="/" data-link>← Voltar para o início</a>
      </div>`;
  }

  const total = moduleData.sub.length;
  const completed = moduleData.sub.filter(l => progress[l.href]).length;
  const percent = Math.round((completed / total) * 100);

  // Próxima aula não concluída — usada pelo botão "Continuar".
  // find() retorna a primeira aula cujo href NÃO está no progresso.
  // Se todas foram concluídas, retorna undefined → nextLesson é null/undefined.
  const nextLesson = moduleData.sub.find(l => !progress[l.href]);

  return /* html */ `
    <div class="modulo">

      <!-- ── Cabeçalho ── -->
      <header class="modulo__header modulo__anim-item">
        <div class="modulo__header-text">

          <!-- Breadcrumb: link de volta para a home -->
          <a href="/" data-link class="modulo__breadcrumb">← Início</a>

          <h1 class="modulo__title">${moduleData.label}</h1>

          <!-- Descrição específica do módulo, ou string vazia como fallback -->
          <!-- ?? "" → nullish coalescing: usa "" se a descrição não existir -->
          <p class="modulo__description">${MODULE_DESCRIPTIONS[modulo] ?? ""}</p>
        </div>

        <!-- Card de progresso: X/total + barra + porcentagem -->
        <div class="modulo__progress-card modulo__anim-item">
          <div class="modulo__progress-numbers">
            <span class="modulo__progress-value">
              ${completed}
              
              <span class="modulo__progress-total">/${total}</span>
            </span>
            <span class="modulo__progress-label">aulas concluídas</span>
          </div>

          <!-- Barra de progresso acessível -->
          <div class="modulo__progress-track"
               role="progressbar"
               aria-valuenow="${percent}"
               aria-valuemin="0"
               aria-valuemax="100">
            <div class="modulo__progress-fill" style="width: ${percent}%"></div>
          </div>

          <span class="modulo__progress-percent">${percent}%</span>
        </div>
      </header>

      <!-- ── Botão continuar ── -->
      <!--
        Três estados possíveis:
          1. Nenhuma aula concluída  → "Começar módulo"
          2. Algumas concluídas      → "Continuar de onde parei"
          3. Todas concluídas        → badge "Módulo concluído" (sem link)
      -->
      ${nextLesson
      ? /* html */ `
          <div class="modulo__continue modulo__anim-item">
            <a href="${nextLesson.href}" data-link class="modulo__btn-continue">
              ${completed === 0 ? "Começar módulo" : "Continuar de onde parei"}
              ${Icons.arrow}
            </a>
          </div>`
      : /* html */ `
          <div class="modulo__continue modulo__anim-item">
            <span class="modulo__badge-done">✓ Módulo concluído</span>
          </div>`
    }

      <!-- ── Lista de aulas ── -->
      <section class="modulo__lessons modulo__anim-item">
        <h2 class="modulo__lessons-title">Aulas</h2>
        <ul class="modulo__lesson-list">
          ${moduleData.sub.map((lesson, i) =>
      createLessonItem(lesson, i, progress)
    ).join("")}
        </ul>
      </section>

    </div>
  `;
}


// ─────────────────────────────────────────────────────────────────────────────
// initModulePage()
//
// Inicializa a lógica JS da página de módulo após o DOM estar pronto.
// Chamada por initPage() em render.js dentro de requestAnimationFrame.
//
// Responsabilidade única: animar a entrada dos elementos com delay escalonado.
// Não há timers nem listeners — por isso o cleanup retornado é vazio.
//
// Retorna:
//   função cleanup() vazia — mantém o contrato com render.js,
//   que sempre espera uma função de retorno de initPage().
// ─────────────────────────────────────────────────────────────────────────────
export function initModulePage() {

  // Animação de entrada escalonada — mesmo padrão da home e da lesson.
  // Cada .modulo__anim-item recebe um delay crescente de 0.08s.
  requestAnimationFrame(() => {
    document.querySelectorAll(".modulo__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.08}s`;
      el.classList.add("modulo__anim-run");
    });
  });

  // Cleanup vazio: esta página não tem timers nem listeners para remover.
  // O retorno existe para manter o contrato com render.js:
  //   currentCleanup = initPage(path)
  //   currentCleanup?.() → seria erro se retornássemos undefined
  return function cleanup() { };
}