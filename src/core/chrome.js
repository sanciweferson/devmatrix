// src/core/chrome.js
// ─────────────────────────────────────────────────────────────────────────────
// Controla a visibilidade do header/footer ("chrome" do site) por rota.
//
// Por que isso precisa existir?
//   Header/Footer são montados UMA vez em App() e nunca são recriados —
//   updatePage() só troca o innerHTML do <main>. "Esconder" numa rota
//   específica não pode ser feito condicionando o retorno de Layout()
//   (ela só roda uma vez, no boot) — precisa alternar um atributo no
//   header/footer já existentes no DOM, toda vez que a rota muda.
//
// Por que [hidden] em vez de uma classe nova?
//   base.css já tem a regra global `.hidden, [hidden] { display: none !important; }`
//   — reaproveitando ela, não precisa CSS novo em lugar nenhum.
// ─────────────────────────────────────────────────────────────────────────────

// Rotas "limpas" — sem header/footer do site. Adicionar aqui cobre
// automaticamente qualquer rota futura do tipo /cadastro, /recuperar-senha.
const BARE_ROUTES = ["/login"];

export function applyChromeVisibility(path) {
  // IMPORTANTE: "footer" sozinho como seletor bateria errado — o drawer
  // mobile do header tem um <footer class="drawer__footer"> aninhado,
  // que vem ANTES do <footer class="footer"> real na ordem do DOM.
  // Por isso o seletor inclui a classe, não só a tag.
  const header = document.querySelector("header.header");
  const footer = document.querySelector("footer.footer");

  const isBare = BARE_ROUTES.includes(path);

  header?.toggleAttribute("hidden", isBare);
  footer?.toggleAttribute("hidden", isBare);
}