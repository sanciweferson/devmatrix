// src/pages/contato.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. ContatoPage()      → gera o HTML da página de contato
//   2. initContatoPage()  → anima entrada + envia o formulário via Formspree
//
// ⚠️ CONFIGURAÇÃO NECESSÁRIA ANTES DE USAR:
//   1. Crie uma conta grátis em https://formspree.io
//   2. Crie um novo formulário lá dentro — o Formspree te dá uma URL tipo:
//        https://formspree.io/f/xxxxxxxx
//   3. Troque o valor de FORMSPREE_ENDPOINT abaixo por essa URL.
//   Sem isso, o formulário não vai enviar nada (vai dar erro no envio).
//
// Rota esperada em routes.js:
//   { path: "/contato", component: () => ContatoPage() },
// ─────────────────────────────────────────────────────────────────────────────

// Troque pela URL real gerada no seu painel do Formspree.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/SEU_ID_AQUI";

const Icons = {
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.2.67.8.56A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z"/></svg>`,
  send: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4 20-7z"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  alert: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

// ─── CANAIS EXTERNOS ─────────────────────────────────────────────────────────
// Ajuste os links reais aqui.
const CHANNELS = [
  { id: "mail", label: "sanciweferson@email.com", href: "mailto:sanciweferson@email.com", icon: Icons.mail },
  { id: "github", label: "github.com/sanciweferson", href: "https://github.com/sanciweferson", icon: Icons.github },
];


// ─────────────────────────────────────────────────────────────────────────────
// ContatoPage()
// ─────────────────────────────────────────────────────────────────────────────
export function ContatoPage() {
  return /* html */ `
    <div class="contato">

      <div class="contato__topbar contato__anim-item">
        <nav class="contato__breadcrumb" aria-label="Breadcrumb">
          <a href="/" data-link>Início</a>
          <span class="contato__breadcrumb-sep">/</span>
          <span>Contato</span>
        </nav>
      </div>

      <header class="contato__header contato__anim-item">
        <h1 class="contato__title">Contato</h1>
        <p class="contato__subtitle">
          Dúvidas, sugestões ou bugs encontrados na plataforma — pode mandar
          por aqui. Respondo o mais rápido que conseguir.
        </p>
      </header>

      <div class="contato__grid contato__anim-item">

        <form
          id="js-contato-form"
          class="contato__form"
          action="${FORMSPREE_ENDPOINT}"
          method="POST"
        >
          <!-- honeypot anti-spam — invisível pra humanos, bots costumam preencher -->
          <input type="text" name="_gotcha" class="contato__honeypot" tabindex="-1" autocomplete="off">

          <div class="contato__field">
            <label class="contato__label" for="contato-nome">Nome</label>
            <input
              class="contato__input"
              type="text"
              id="contato-nome"
              name="name"
              placeholder="Seu nome"
              required
            >
          </div>

          <div class="contato__field">
            <label class="contato__label" for="contato-email">E-mail</label>
            <input
              class="contato__input"
              type="email"
              id="contato-email"
              name="email"
              placeholder="seu@email.com"
              required
            >
          </div>

          <div class="contato__field">
            <label class="contato__label" for="contato-assunto">Assunto</label>
            <input
              class="contato__input"
              type="text"
              id="contato-assunto"
              name="_subject"
              placeholder="Ex: Bug na página de módulo"
            >
          </div>

          <div class="contato__field">
            <label class="contato__label" for="contato-mensagem">Mensagem</label>
            <textarea
              class="contato__textarea"
              id="contato-mensagem"
              name="message"
              rows="6"
              placeholder="Escreva sua mensagem..."
              required
            ></textarea>
          </div>

          <button type="submit" class="contato__submit">
            <span class="contato__submit-label">Enviar mensagem</span>
            <span class="contato__submit-icon">${Icons.send}</span>
          </button>

          <div id="js-contato-status" class="contato__status" role="status" aria-live="polite"></div>
        </form>

        <aside class="contato__channels">
          <h2 class="contato__channels-title">Outros canais</h2>
          <ul class="contato__channels-list">
            ${CHANNELS.map(ch => /* html */ `
              <li>
                <a href="${ch.href}" class="contato__channel-link" target="_blank" rel="noopener noreferrer">
                  <span class="contato__channel-icon">${ch.icon}</span>
                  <span class="contato__channel-label">${ch.label}</span>
                </a>
              </li>
            `).join("")}
          </ul>
        </aside>

      </div>

    </div>
  `;
}


// ─────────────────────────────────────────────────────────────────────────────
// initContatoPage()
// ─────────────────────────────────────────────────────────────────────────────
export function initContatoPage() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".contato__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.08}s`;
      el.classList.add("contato__anim-run");
    });
  });

  const form = document.getElementById("js-contato-form");
  const status = document.getElementById("js-contato-status");

  if (!form || !status) return function cleanup() { };

  const setStatus = (type, message, icon) => {
    status.className = `contato__status contato__status--${type}`;
    status.innerHTML = /* html */ `
      <span class="contato__status-icon">${icon}</span>
      <span>${message}</span>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (FORMSPREE_ENDPOINT.includes("SEU_ID_AQUI")) {
      setStatus(
        "error",
        "Formulário ainda não configurado — falta trocar o FORMSPREE_ENDPOINT em contato.js.",
        Icons.alert
      );
      return;
    }

    const submitBtn = form.querySelector(".contato__submit");
    const originalLabel = submitBtn.querySelector(".contato__submit-label").textContent;

    submitBtn.disabled = true;
    submitBtn.querySelector(".contato__submit-label").textContent = "Enviando...";
    status.className = "contato__status";
    status.innerHTML = "";

    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      if (response.ok) {
        setStatus("success", "Mensagem enviada! Vou responder em breve.", Icons.check);
        form.reset();
      } else {
        throw new Error("Falha no envio");
      }
    } catch (err) {
      console.error("[initContatoPage] Erro ao enviar:", err);
      setStatus(
        "error",
        "Não foi possível enviar agora. Tente novamente ou use o e-mail direto ao lado.",
        Icons.alert
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.querySelector(".contato__submit-label").textContent = originalLabel;
    }
  };

  form.addEventListener("submit", handleSubmit);

  return function cleanup() {
    form.removeEventListener("submit", handleSubmit);
  };
}