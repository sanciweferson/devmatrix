export function getIcon(id, variant = "default") {
  if (variant === "noIcon") return ""

  const icons = {

    // ── Home ──────────────────────────────────────────────────────────────────
    // Casa simples com telhado triangular e porta central.
    "home": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10.5z"/>
    <path d="M9 22V12h6v10"/>
  </svg>`},

    // ── Fundamentos ──────────────────────────────────────────────────────────
    // Terminal/prompt — representa o ambiente de execução, o motor do JS.
    // O ">" é o símbolo clássico de REPL e CLI.
    "fundamentos": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="20" height="18" rx="2"/>
    <path d="M7 9l4 3.5L7 16"/>
    <path d="M13 16h4"/>
  </svg>`},

    // ── Variáveis & Tipos ─────────────────────────────────────────────────────
    // Símbolo de atribuição "x =" com um tipo embaixo.
    // Evoca declaração de variável, o núcleo do tópico.
    "variaveis-tipos": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 7h4M4 12h7M4 17h4"/>
    <circle cx="17" cy="10" r="4"/>
    <path d="M17 6v1M17 13v1M13 10h1M20 10h1"/>
  </svg>`},

    // ── Funções ───────────────────────────────────────────────────────────────
    // "ƒ" com parênteses — símbolo matemático de função, universal em JS.
    "funcoes": {
      default:/* html */`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 3C6.5 3 5 4.2 5 6v3H3v2.5h2V21"/>
    <path d="M16 3c1.5 0 3 1.2 3 3v3h2v2.5h-2V21"/>
    <path d="M10 12.5h4"/>
  </svg>`},

    // ── Objetos ───────────────────────────────────────────────────────────────
    // Chaves {} com um par chave-valor dentro — estrutura de objeto literal.
    objetos: {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4C5.5 4 4 5 4 6.5v2c0 1-.5 1.5-1.5 1.5C3.5 10 4 10.5 4 11.5v2C4 15 5.5 16 7 16"/>
    <path d="M17 4c1.5 0 3 1 3 2.5v2c0 1 .5 1.5 1.5 1.5-.5 0-1.5.5-1.5 1.5v2C20 15 18.5 16 17 16"/>
    <path d="M9 10h1.5M13.5 10H15M9 13h6"/>
  </svg>`},

    // ── Arrays & Iteração ─────────────────────────────────────────────────────
    // Colchetes [] com três linhas empilhadas — lista de elementos.
    "arrays-iteracao": {
      default:/* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 4H5v16h2M17 4h2v16h-2"/>
    <path d="M9 8h6M9 12h6M9 16h6"/>
  </svg>`},

    // ── Escopo & Closures ─────────────────────────────────────────────────────
    // Quadrados aninhados — escopo dentro de escopo.
    // A seta para dentro evoca o "fechamento" da closure.
    "escopo-closures": {
      default:/* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="2"/>
    <rect x="7" y="7" width="10" height="10" rx="1"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
  </svg>`},

    // ── this & Contexto ───────────────────────────────────────────────────────
    // Alvo/target — "this" aponta para um contexto específico.
    // Círculos concêntricos com um ponto central.
    "this-contexto": {
      default:/* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="4.5"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21"/>
  </svg>`},

    // ── Protótipos & Classes ──────────────────────────────────────────────────
    // Hierarquia de herança — nó pai conectado a dois filhos.
    "prototipos-classes": {
      default:/* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="9" y="2" width="6" height="5" rx="1"/>
    <rect x="2" y="17" width="6" height="5" rx="1"/>
    <rect x="16" y="17" width="6" height="5" rx="1"/>
    <path d="M12 7v4M12 11H5v6M12 11h7v6"/>
  </svg>`},

    // ── Async ─────────────────────────────────────────────────────────────────
    // Setas circulares com marcador de tempo — evoca assincronicidade e espera.
    "async": {
      default: /* html */`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-3.1-6.8"/>
    <path d="M21 3v5h-5"/>
    <path d="M12 7v5l3 2"/>
  </svg>`},

    // ── DOM & Eventos ─────────────────────────────────────────────────────────
    // Árvore DOM — nó raiz com filhos, raio de evento saindo.
    "dom-eventos": {
      default:/* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="5" r="2"/>
    <circle cx="5" cy="19" r="2"/>
    <circle cx="19" cy="19" r="2"/>
    <path d="M12 7v4M12 11l-5 6M12 11l7 6"/>
    <path d="M17 9l1.5-1.5M19.5 6.5l1-1" stroke-width="1" opacity="0.6"/>
  </svg>`},

    // ── Módulos ES6 ───────────────────────────────────────────────────────────
    // Caixas com seta de import/export entre elas — modularidade.
    "modulos-es6": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="8" height="8" rx="1"/>
    <rect x="14" y="3" width="8" height="8" rx="1"/>
    <rect x="8" y="14" width="8" height="7" rx="1"/>
    <path d="M10 7h4M14 5l2 2-2 2"/>
    <path d="M12 11v3"/>
  </svg>`},

    "chevron": {
      default: /* html */ `
    <svg width="12" height="12" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2.5"
         aria-hidden="true">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  `},

    "moon": {
      default: /* html */ `
    <svg class="icon-moon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
    </svg>
  `},


    sun: {
      default: /* html */ `
    <svg class="icon-sun" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
         width="24" height="24" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  `},

    hamburger: {
      default: /* html */ `
    <svg width="28" height="28" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  `},

    close: {
      default: /* html */ `
    <svg width="28" height="28" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>

    
  `}
    ,
    // ── Redes sociais (footer) ──────────────────────────────────────────────
    // Usados por Footer() em src/layout/footer.js. Mesma fonte de ícones
    // do Header — evita duplicar o mesmo SVG em dois arquivos diferentes.
    "github": {
      default: /* html */ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9 17.44 9 18v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>`},

    "twitter": {
      default: /* html */ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 4l11.733 16H20L8.267 4z"/>
    <path d="M4 20 15.33 8h.67"/>
    <path d="M20 4 8.67 16H8"/>
  </svg>`},

    "youtube": {
      default: /* html */ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <path d="m10 15 5-3-5-3z"/>
  </svg>`},

    "rss": {
      default: /* html */ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 11a9 9 0 0 1 9 9"/>
    <path d="M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>`},

    "instagram": {
      default: /* html */ `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>`},

    // ── Links legais (footer) ───────────────────────────────────────────────
    "privacidade": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>`},

    "termos": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
    <path d="M14 3v5h5"/>
    <path d="M9 13h6M9 17h6M9 9h2"/>
  </svg>`},

    "cookies": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 2a10 10 0 1 0 9.54 13.06 3 3 0 0 1-3.6-3.6A3 3 0 0 1 14.94 8a3 3 0 0 1-3-3 3 3 0 0 1 .06-.55A10 10 0 0 0 12 2z"/>
    <circle cx="8.5" cy="10.5" r="0.8" fill="currentColor"/>
    <circle cx="13" cy="14.5" r="0.8" fill="currentColor"/>
    <circle cx="9" cy="15.5" r="0.8" fill="currentColor"/>
  </svg>`},

    // ── Login (tela de autenticação) ────────────────────────────────────────
    "google": {
      default: /* html */ `<svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.86c2.26-2.08 3.59-5.15 3.59-8.87z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.86l-3.86-3.01c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.12-6.73-4.96H1.28v3.11C3.25 21.3 7.31 24 12 24z"/>
    <path fill="#FBBC05" d="M5.27 14.32c-.25-.72-.38-1.5-.38-2.32s.14-1.6.38-2.32V6.57H1.28A11.95 11.95 0 0 0 0 12c0 1.93.46 3.76 1.28 5.43z"/>
    <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.61 4.58 1.8l3.43-3.43C17.94 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.57l3.99 3.11C6.22 6.87 8.87 4.75 12 4.75z"/>
  </svg>`},

    "github": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55v-2.14c-3.17.69-3.84-1.36-3.84-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17a10.9 10.9 0 0 1 5.72 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.51-1.5 7.77-5.76 7.77-10.78C23.25 5.48 18.27.5 12 .5z"/>
  </svg>`},

    "mail": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m3 6 9 6 9-6"/>
  </svg>`},

    "whatsapp": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="6" y="2" width="12" height="20" rx="2"/>
    <path d="M11 18h2"/>
  </svg>`},

    "arrow-right": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>`},
    "user": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>
  </svg>`},
    "check": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5"/>
  </svg>`},

    "camera": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
    <circle cx="12" cy="13" r="3.5"/>
  </svg>`},
    "image": {
      default: /* html */ `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <path d="m21 15-5-5L5 21"/>
  </svg>`},
  };

  const icon = icons[id]
  if (!icon) {
    console.warn(`getIcon: ícone "${id}" não encontrado`)
    return ""
  }
  return icon[variant] ?? icon.default ?? ""
}



