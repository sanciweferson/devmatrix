// src/core/scrollTop.js
// ─────────────────────────────────────────────────────────────────────────────
// Botão flutuante de volta ao topo com indicador visual de progresso de scroll.
//
// Estrutura visual:
//   - Anel SVG animado (stroke-dashoffset) mostra o progresso de leitura
//   - Número no centro exibe a porcentagem atual de scroll
//   - Seta para cima aparece quando está no topo (0%)
//   - O botão inteiro só aparece após 10% de scroll
//
// Padrão usado: Portal
//   O botão é criado diretamente no <body>, fora do <main>.
//   Isso garante que ele flutue acima de qualquer conteúdo,
//   independente do layout da página atual.
//
// Ciclo de vida por rota:
//   initScrollTop() → cria o botão → registra listeners → retorna cleanup
//   cleanup()       → remove listeners → remove botão do DOM
//   Isso acontece a cada navegação via updatePage() em render.js.
//
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────


// ID fixo do botão no DOM.
// Usado para verificar se o botão já existe antes de criar outro.
// Evita duplicação caso initScrollTop() seja chamado duas vezes seguidas.
const BTN_ID = "js-scroll-top";


// ─────────────────────────────────────────────────────────────────────────────
// createBtn()
//
// Cria o elemento do botão e o insere no <body>.
// Retorna o elemento criado, ou undefined se o botão já existia.
//
// Por que checar se já existe?
//   initScrollTop() é chamado em toda navegação.
//   Sem essa verificação, cada rota criaria um novo botão empilhado no <body>.
// ─────────────────────────────────────────────────────────────────────────────
function createBtn() {

  // Guard: botão já existe no DOM — não cria outro.
  if (document.getElementById(BTN_ID)) return;

  // Configurações do anel SVG.
  //
  // O círculo tem raio 18 — circunferência = 2π × r
  // toFixed(2) arredonda para 2 casas decimais: 113.10
  // O `+` na frente converte a string do toFixed para número.
  const RADIUS = 18;
  const CIRCUM = +(2 * Math.PI * RADIUS).toFixed(2); // 113.1

  // Cria o elemento <button> programaticamente.
  // Por que createElement e não innerHTML no <body>?
  //   createElement nos dá uma referência direta ao elemento.
  //   Podemos configurá-lo antes de inserir no DOM — um único reflow.
  const btn = document.createElement("button");
  btn.id = BTN_ID;
  btn.className = "scroll-top";
  btn.setAttribute("aria-label", "Voltar ao topo");
  btn.setAttribute("type", "button");

  // innerHTML do botão: dois círculos SVG + texto de porcentagem + seta.
  //
  // Dois círculos SVG:
  //   scroll-top__track → trilha de fundo (círculo estático)
  //   scroll-top__arc   → arco de progresso (animado via stroke-dashoffset)
  //
  // Como o arco animado funciona:
  //   stroke-dasharray="${CIRCUM}"   → o traço ocupa exatamente a circunferência
  //   stroke-dashoffset="${CIRCUM}"  → começa "escondido" (offset = comprimento total)
  //   Conforme o scroll avança: offset diminui → mais do arco fica visível
  //   offset = CIRCUM - (percent / 100) * CIRCUM
  //
  // transform="rotate(-90 22 22)":
  //   Por padrão, SVG começa o traço às 3h (lado direito).
  //   Rotacionar -90° move o início para as 12h (topo) — mais natural visualmente.
  btn.innerHTML = /* html */ `
    <svg class="scroll-top__ring" viewBox="0 0 44 44" aria-hidden="true">

      <!-- Trilha de fundo — círculo estático -->
      <circle
        class="scroll-top__track"
        cx="22" cy="22" r="${RADIUS}"
        fill="none"
        stroke-width="2.5"
      />

      <!-- Arco de progresso — animado via stroke-dashoffset -->
      <circle
        class="scroll-top__arc"
        cx="22" cy="22" r="${RADIUS}"
        fill="none"
        stroke-width="2.5"
        stroke-dasharray="${CIRCUM}"
        stroke-dashoffset="${CIRCUM}"
        stroke-linecap="round"
        transform="rotate(-90 22 22)"
      />
    </svg>

    <!-- Porcentagem no centro — escondida quando percent <= 2 -->
    <span class="scroll-top__pct" aria-hidden="true">0%</span>

    <!-- Seta para cima — visível quando está no topo (percent <= 2) -->
    <span class="scroll-top__arrow" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24"
           fill="none" stroke="currentColor"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </span>
  `;

  // Insere no <body> — portal: fora do fluxo do conteúdo da página.
  document.body.appendChild(btn);

  return btn;
}


// ─────────────────────────────────────────────────────────────────────────────
// initScrollTop()
//
// Inicializa o botão de volta ao topo para a rota atual.
//
// Retorna:
//   função cleanup() — deve ser chamada ao sair da rota.
//   Remove os listeners e o botão do DOM para evitar acúmulo.
//
// Chamada por:
//   App()        → na carga inicial (em requestAnimationFrame)
//   updatePage() → em cada navegação subsequente (em requestAnimationFrame)
// ─────────────────────────────────────────────────────────────────────────────
export function initScrollTop() {
  const RADIUS = 18;
  const CIRCUM = +(2 * Math.PI * RADIUS).toFixed(2);

  const btn = createBtn();

  // Se o botão já existia (createBtn retornou undefined),
  // retorna um cleanup vazio para não quebrar o contrato de retorno.
  if (!btn) return () => { };

  // Referências aos elementos internos do botão.
  // Obtidas uma vez aqui — mais eficiente que querySelector em cada scroll.
  const arc = btn.querySelector(".scroll-top__arc");
  const pct = btn.querySelector(".scroll-top__pct");
  const arrow = btn.querySelector(".scroll-top__arrow");


  // ── Handler de scroll ────────────────────────────────────────────────────────
  //
  // Roda a cada evento de scroll (registrado com passive: true — não bloqueia scroll).
  // Calcula a porcentagem e atualiza o arco SVG e o texto.
  const onScroll = () => {

    // scrollY → quanto a página já rolou (em px)
    // scrollHeight - innerHeight → máximo rolável (altura total - altura visível)
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;

    // Proteção contra divisão por zero em páginas sem scroll.
    const percent = total > 0 ? Math.round((scrolled / total) * 100) : 0;

    // Atualiza o arco SVG.
    // offset = 0       → arco completo (100% do scroll)
    // offset = CIRCUM  → arco invisível (0% do scroll)
    const offset = CIRCUM - (percent / 100) * CIRCUM;
    arc.style.strokeDashoffset = offset;

    // Alterna entre porcentagem e seta dependendo da posição.
    // <= 2% é tratado como "topo" para evitar flicker em pequenos scrolls.
    if (percent <= 2) {
      pct.style.display = "none";
      arrow.style.display = "flex";
    } else {
      pct.textContent = percent + "%";
      pct.style.display = "block";
      arrow.style.display = "none";
    }

    // Mostra o botão só depois de 10% de scroll.
    // classList.toggle(classe, condição):
    //   condição true  → adiciona a classe
    //   condição false → remove a classe
    btn.classList.toggle("scroll-top--visible", percent > 10);
  };


  // ── Handler de clique ────────────────────────────────────────────────────────
  //
  // behavior: "smooth" → scroll animado nativo do browser.
  // Não precisa de biblioteca externa — o browser já faz isso.
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // Registra os listeners.
  // passive: true no scroll → promessa ao browser de que não chamaremos
  // preventDefault(), permitindo que o scroll seja processado sem delay.
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", onClick);

  // Roda uma vez imediatamente para garantir o estado inicial correto.
  // Sem isso, o botão apareceria errado se a página carregar já scrollada
  // (ex: usuário deu Ctrl+Shift+T para reabrir uma aba que estava no meio).
  onScroll();


  // ── Cleanup ──────────────────────────────────────────────────────────────────
  //
  // Retornamos uma função em vez de chamar direto porque o cleanup
  // só deve acontecer quando o usuário SAIR desta rota —
  // não quando initScrollTop() é chamado.
  //
  // render.js armazena esse retorno em `cleanupScrollTop` e o chama
  // no início do próximo updatePage().
  return function cleanup() {

    // Remove os listeners registrados acima.
    // Sem isso, os handlers continuariam rodando em rotas subsequentes —
    // referenciando um botão que não existe mais no DOM.
    window.removeEventListener("scroll", onScroll);
    btn.removeEventListener("click", onClick);

    // Remove o botão do DOM ao sair da rota.
    // parentNode → o <body> que appendChild inseriu.
    // removeChild → remove sem precisar de referência ao pai pelo seletor.
    if (btn.parentNode) btn.parentNode.removeChild(btn);
  };
}