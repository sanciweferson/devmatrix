// src/pages/faq.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. FaqPage()      → gera o HTML da página de perguntas frequentes
//   2. initFaqPage()  → anima a entrada dos elementos após o DOM pronto
//
// O accordion usa <details>/<summary> nativos do HTML — abrir/fechar já
// funciona sem nenhum JS (comportamento built-in do browser, acessível
// por teclado e leitor de tela por padrão). O JS aqui só cuida da
// animação de entrada da página, igual às outras páginas estáticas.
//
// Rota esperada em routes.js:
//   { path: "/faq", component: () => FaqPage() },
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_GROUPS = [
  {
    title: "Sobre a plataforma",
    items: [
      {
        q: "O que é o DevMatrix?",
        a: "É uma plataforma de estudos de JavaScript, construída como projeto pessoal para ensinar a linguagem em profundidade — do motor de execução até a aplicação prática, sem pular os fundamentos.",
      },
      {
        q: "O DevMatrix é gratuito?",
        a: "Sim, totalmente gratuito. Não há planos pagos, assinatura ou conteúdo bloqueado atrás de paywall.",
      },
      {
        q: "Preciso criar uma conta para usar?",
        a: "Não. Todo o conteúdo é acessível sem cadastro. Seu progresso é salvo automaticamente no armazenamento local do seu navegador.",
      },
      {
        q: "Como meu progresso é salvo?",
        a: "Ao marcar uma aula como concluída, isso é salvo no localStorage do seu navegador — um espaço de armazenamento que fica só no seu dispositivo. Não é enviado a nenhum servidor.",
      },
      {
        q: "Se eu limpar os dados do navegador, perco meu progresso?",
        a: "Sim. Como o progresso fica salvo localmente, limpar os dados do site, trocar de navegador ou usar modo anônimo apaga esse histórico. Não existe backup em nuvem no momento.",
      },
      {
        q: "Funciona no celular?",
        a: "Sim, a plataforma é totalmente responsiva e funciona em celulares, tablets e desktops.",
      },
      {
        q: "Posso usar em mais de um dispositivo com o mesmo progresso?",
        a: "Ainda não — como o progresso é salvo localmente no navegador, cada dispositivo/navegador mantém seu próprio histórico separado, de forma independente.",
      },
      {
        q: "O código-fonte da plataforma é aberto?",
        a: "O conteúdo das aulas é de autoria própria e protegido pelos Termos de Uso. Consulte a página de Termos para mais detalhes sobre uso e reprodução do conteúdo.",
      },
    ],
  },
  {
    title: "Sobre o conteúdo e o estudo",
    items: [
      {
        q: "Preciso saber programação antes de começar?",
        a: "Não. O módulo de Fundamentos começa do absoluto zero, explicando o que é o ambiente de execução, o motor JavaScript e como o código roda antes mesmo de entrar em sintaxe.",
      },
      {
        q: "Existe uma ordem certa para seguir as aulas?",
        a: "Sim. Os módulos foram desenhados em ordem progressiva — Fundamentos, Variáveis & Tipos, Funções, e assim por diante — porque conceitos depois dependem dos anteriores. Seguir a ordem numérica é a forma recomendada.",
      },
      {
        q: "Quanto tempo leva cada aula?",
        a: "Varia bastante conforme o tópico, mas a maioria das aulas foi pensada para ser lida e compreendida em 10 a 20 minutos, incluindo os exemplos de código.",
      },
      {
        q: "Os exemplos de código funcionam em qualquer navegador?",
        a: "Sim, os exemplos usam JavaScript padrão (ES6+), compatível com todos os navegadores modernos (Chrome, Firefox, Edge, Safari).",
      },
      {
        q: "Vou aprender frameworks como React ou Vue aqui?",
        a: "Não é o foco. O DevMatrix é dedicado a JavaScript puro (Vanilla JS) em profundidade — a ideia é dominar a base antes de qualquer framework, já que frameworks são construídos sobre esses mesmos conceitos.",
      },
      {
        q: "Como copio o código dos exemplos?",
        a: "Todo bloco de código tem um botão \"Copiar\" no canto superior, que copia o exemplo (e, quando aplicável, a saída simulada do console) direto para sua área de transferência.",
      },
      {
        q: "O que fazer se eu encontrar um erro ou bug na plataforma?",
        a: "Manda um relato pela página de Contato — quanto mais detalhes (o que você estava fazendo, qual aula, qual navegador), mais rápido dá pra identificar e corrigir.",
      },
    ],
  },
];


// ─────────────────────────────────────────────────────────────────────────────
// FaqPage()
// ─────────────────────────────────────────────────────────────────────────────
export function FaqPage() {
  const groupsHtml = FAQ_GROUPS.map(group => /* html */ `
    <section class="faq__group faq__anim-item">
      <h2 class="faq__group-title">${group.title}</h2>
      <div class="faq__list">
        ${group.items.map(item => /* html */ `
          <details class="faq__item">
            <summary class="faq__question">
              <span>${item.q}</span>
              <span class="faq__chevron" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </span>
            </summary>
            <div class="faq__answer">
              <p>${item.a}</p>
            </div>
          </details>
        `).join("")}
      </div>
    </section>
  `).join("");

  return /* html */ `
    <div class="faq">

      <div class="faq__topbar faq__anim-item">
        <nav class="faq__breadcrumb" aria-label="Breadcrumb">
          <a href="/" data-link>Início</a>
          <span class="faq__breadcrumb-sep">/</span>
          <span>Perguntas frequentes</span>
        </nav>
      </div>

      <header class="faq__header faq__anim-item">
        <h1 class="faq__title">Perguntas frequentes</h1>
        <p class="faq__subtitle">
          Tudo que você precisa saber sobre a plataforma e sobre como estudar aqui.
          Não achou sua dúvida? Manda pela
          <a href="/contato" data-link>página de contato</a>.
        </p>
      </header>

      ${groupsHtml}

    </div>
  `;
}


// ─────────────────────────────────────────────────────────────────────────────
// initFaqPage()
// ─────────────────────────────────────────────────────────────────────────────
export function initFaqPage() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".faq__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.06}s`;
      el.classList.add("faq__anim-run");
    });
  });

  return function cleanup() { };
}