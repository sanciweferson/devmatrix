// src/layout/footer.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidade deste módulo:
//   Gerar o HTML estático do rodapé da aplicação como string.
//   Não tem comportamentos JS — só markup e dados.
//
// Estrutura do footer:
//   1. Brand  → Logo + descrição da plataforma + redes sociais
//   2. Nav    → Duas colunas de links agrupados por módulo
//   3. Bottom → Copyright dinâmico + links legais
//
// Os módulos exibidos no footer vêm do mesmo menuItems usado pelo Header.
// Isso garante que footer e header estão sempre sincronizados — se um módulo
// for adicionado em data.js, aparece automaticamente nos dois.
//
// Os ícones de redes sociais vêm do mesmo getIcon() usado pelo Header —
// nenhum SVG é duplicado entre os dois arquivos. Valores dinâmicos
// (href/label) passam por escapeHtml, mesma disciplina do Header.
// ─────────────────────────────────────────────────────────────────────────────
import { Copy } from "@utils/copy";
import { createLogo } from "@components/logo"
import { escapeHtml } from "@utils/helpers"
import { menuItems } from "@components/data/data"
import { getIcon } from "@components/data/icons"


// ─── DADOS DO FOOTER ──────────────────────────────────────────────────────────

const modules = menuItems.filter(item => item.id !== "home");

const halfway = Math.ceil(modules.length / 2);
const colA = modules.slice(0, halfway);
const colB = modules.slice(halfway);

// precisa de "id" pra bater com getIcon()
const legalLinks = [
  { id: "privacidade", href: "/privacidade", label: "Privacidade" },
  { id: "termos", href: "/termos", label: "Termos de uso" },
  { id: "cookies", href: "/cookies", label: "Cookies" },
];
// "id" bate com uma chave em icons.js (getIcon) — sem SVG duplicado.
const socialLinks = [
  { href: "https://github.com", label: "GitHub", id: "github" },
  { href: "https://twitter.com", label: "Twitter", id: "twitter" },
  { href: "https://youtube.com", label: "YouTube", id: "youtube" },
  { href: "/rss.xml", label: "RSS", id: "rss" },
  { href: "https://instagram.com/sanciweferson", label: "Instagram", id: "instagram" },
];


// ─── FUNÇÕES DE RENDERIZAÇÃO ──────────────────────────────────────────────────

const createNavColumn = (items) => /* html */ `
  <ul class="footer__nav-list">
    ${items.map(item => /* html */ `
      <li>
        <a href="${escapeHtml(item.href)}" data-link class="footer__nav-link">
         <span class="footer__nav-icon">${getIcon(item.id)}</span>
          ${escapeHtml(item.label)}
        </a>
      </li>
    `).join("")}
  </ul>`;

const createSocialLinks = () => /* html */ `
  <div class="footer__social">
    ${socialLinks.map(s => /* html */ `
      <a href="${escapeHtml(s.href)}"
         class="footer__social-link"
         aria-label="${escapeHtml(s.label)}"
         target="_blank"
         rel="noopener noreferrer">
        ${getIcon(s.id)}
      </a>
    `).join("")}
  </div>`;

const createBottomBar = () => {
  return /* html */ `
    <div class="footer__bottom">
      <p class="footer__copyright">
        ${Copy()}
      </p>

      <!-- Links legais: Privacidade, Termos, Cookies -->
      <!-- aria-label diferencia este <nav> do nav principal do header -->
      <nav class="footer__legal" aria-label="Links legais">
        ${legalLinks.map(l => /* html */ `
          <a href="${escapeHtml(l.href)}" data-link class="footer__legal-link">
          <span class="footer__legal-icon">${getIcon(l.id)}</span>
            ${escapeHtml(l.label)}
          </a>
        `).join("")}
      </nav>
    </div>`;
};


// ─────────────────────────────────────────────────────────────────────────────
// Footer()
// Função principal — retorna o HTML completo do rodapé como string.
// ─────────────────────────────────────────────────────────────────────────────
export function Footer() {
  return /* html */ `
    <footer class="footer">
      <div class="footer__inner">

        <!-- ── Brand: logo + tagline + redes sociais ── -->
        <div class="footer__brand">
          ${createLogo({ href: "/", svgVariant: "logo__svg--sm" })}

          <p class="footer__tagline">
            Uma plataforma para aprender JavaScript do jeito certo —
            do motor à aplicação, sem atalhos.
          </p>

          ${createSocialLinks()}
        </div>

        <!-- ── Navegação por módulos em duas colunas ── -->
        <nav class="footer__nav" aria-label="Módulos do curso">

          <div class="footer__nav-group">
            <h3 class="footer__nav-heading">Módulos</h3>
            ${createNavColumn(colA)}
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__nav-heading" aria-hidden="true">&nbsp;</h3>
            ${createNavColumn(colB)}
          </div>

        </nav>

      </div>

      <!-- ── Barra inferior: copyright + links legais ── -->
      ${createBottomBar()}

    </footer>
  `;
}