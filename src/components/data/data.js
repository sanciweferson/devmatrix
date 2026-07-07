// src/data/data.js
// ─────────────────────────────────────────────────────────────────────────────
// Fonte única de verdade da aplicação.
//
// Todos os módulos, aulas e suas URLs são definidos aqui.
// Header, Footer, ModulePage, Lesson e Home consomem este array.
// Mudar um label ou href aqui reflete automaticamente em toda a aplicação.
//
// Estrutura de cada item:
//   id         → identificador único, usado pelo router e pelo sistema de conteúdo
//   href       → URL da página do módulo
//   label      → texto exibido na navegação
//   sub        → array de aulas (opcional)
//   hideOn     → array com "desktop" e/ou "mobile": esconde o item inteiro nessa(s) família(s)
//   hideIconOn → array com "desktop" e/ou "mobile": esconde só o ícone, mantém o item
//
// Estrutura de cada aula (sub):
//   href  → URL da aula — padrão /:modulo/:slug
//   label → texto exibido na lista de aulas (com prefixo numérico "01 — ")
// ─────────────────────────────────────────────────────────────────────────────

export const menuItems = [
  {
    id: "home",
    href: "/",
    label: "Home",
    // hideOn: ["desktop","mobile"],     // não aparece na nav desktop
    //  hideIconOn: ["mobile","desktop"],  // aparece no mobile, mas sem ícone
  },

  // ─── 1. Fundamentos ──────────────────────────────────────────────────────
  {
    id: "fundamentos",
    href: "/fundamentos",
    label: "Fundamentos",
    sub: [
      { href: "/fundamentos/01-introducao", label: "01 — Introdução ao JavaScript" },
      { href: "/fundamentos/02-primeiro-codigo", label: "02 — Seu primeiro código" },
      { href: "/fundamentos/03-como-browser-le-js", label: "03 — Como o browser interpreta JS" },
      { href: "/fundamentos/04-erros-e-console", label: "04 — Erros e o Console DevTools" },
      { href: "/fundamentos/05-comentarios", label: "05 — Comentários e boas práticas" },
      { href: "/fundamentos/06-strict-mode", label: "06 — Strict Mode" },
      { href: "/fundamentos/07-execution-context", label: "07 — Execution Context" },
      { href: "/fundamentos/08-lexical-environment", label: "08 — Lexical Environment" },
      { href: "/fundamentos/09-variable-environment", label: "09 — Variable Environment" },
      { href: "/fundamentos/10-modulos-externos", label: "10 — Scripts externos e módulos" },
      { href: "/fundamentos/11-ecossistema", label: "11 — Ecossistema JavaScript" },
    ],
  },

  // ─── 2. Variáveis & Tipos ────────────────────────────────────────────────
  {
    id: "variaveis-tipos",
    href: "/variaveis-tipos",
    label: "Variáveis & Tipos",
    sub: [
      { href: "/variaveis-tipos/01-var", label: "01 — var" },
      { href: "/variaveis-tipos/02-let", label: "02 — let" },
      { href: "/variaveis-tipos/03-const", label: "03 — const" },
      { href: "/variaveis-tipos/04-var-let-const", label: "04 — var vs let vs const" },
      { href: "/variaveis-tipos/05-tipos-de-dados", label: "05 — Tipos de dados" },
      { href: "/variaveis-tipos/06-primitivos", label: "06 — Tipos primitivos" },
      { href: "/variaveis-tipos/07-referencia", label: "07 — Tipos de referência" },
      { href: "/variaveis-tipos/08-coercao", label: "08 — Coerção de tipos" },
    ],
  },

  // ─── 3. Funções ──────────────────────────────────────────────────────────
  {
    id: "funcoes",
    href: "/funcoes",
    label: "Funções",
    sub: [
      { href: "/funcoes/01-declaracao-vs-expressao", label: "01 — Declaração vs. expressão" },
      { href: "/funcoes/02-parametros-e-argumentos", label: "02 — Parâmetros e argumentos" },
      { href: "/funcoes/03-return-e-side-effects", label: "03 — Return e side effects" },
      { href: "/funcoes/04-arrow-functions", label: "04 — Arrow functions" },
      { href: "/funcoes/05-primeira-classe", label: "05 — Funções de primeira classe" },
      { href: "/funcoes/06-higher-order-functions", label: "06 — Higher-order functions" },
      { href: "/funcoes/07-iife", label: "07 — IIFE" },
      { href: "/funcoes/08-recursao", label: "08 — Recursão" },
      { href: "/funcoes/09-default-e-rest", label: "09 — Default parameters & rest" },
      { href: "/funcoes/10-spread-em-funcoes", label: "10 — Spread operator em funções" },
    ],
  },

  // ─── 4. Objetos ──────────────────────────────────────────────────────────
  {
    id: "objetos",
    href: "/objetos",
    label: "Objetos",
    sub: [
      { href: "/objetos/01-criando-objetos", label: "01 — Criando objetos" },
      { href: "/objetos/02-propriedades-e-metodos", label: "02 — Propriedades e métodos" },
      { href: "/objetos/03-acesso-e-modificacao", label: "03 — Acessando e modificando" },
      { href: "/objetos/04-desestruturacao", label: "04 — Desestruturação de objetos" },
      { href: "/objetos/05-spread-e-rest", label: "05 — Spread e rest em objetos" },
      { href: "/objetos/06-objetos-aninhados", label: "06 — Objetos aninhados" },
      { href: "/objetos/07-metodos-estaticos", label: "07 — Object.keys, values e entries" },
      { href: "/objetos/08-imutabilidade", label: "08 — Imutabilidade e Object.freeze" },
    ],
  },

  // ─── 5. Arrays & Iteração ────────────────────────────────────────────────
  {
    id: "arrays-iteracao",
    href: "/arrays-iteracao",
    label: "Arrays & Iteração",
    sub: [
      { href: "/arrays-iteracao/01-criando-e-acessando", label: "01 — Criando e acessando arrays" },
      { href: "/arrays-iteracao/02-metodos-mutaveis", label: "02 — Métodos que mutam o array" },
      { href: "/arrays-iteracao/03-map", label: "03 — map" },
      { href: "/arrays-iteracao/04-filter", label: "04 — filter" },
      { href: "/arrays-iteracao/05-reduce", label: "05 — reduce" },
      { href: "/arrays-iteracao/06-foreach-e-for-of", label: "06 — forEach vs. for...of" },
      { href: "/arrays-iteracao/07-find-some-every", label: "07 — find, some e every" },
      { href: "/arrays-iteracao/08-flat-e-flatmap", label: "08 — flat e flatMap" },
      { href: "/arrays-iteracao/09-desestruturacao", label: "09 — Desestruturação de arrays" },
      { href: "/arrays-iteracao/10-spread", label: "10 — Spread em arrays" },
    ],
  },

  // ─── 6. Escopo & Closures ────────────────────────────────────────────────
  {
    id: "escopo-closures",
    href: "/escopo-closures",
    label: "Escopo & Closures",
    sub: [
      { href: "/escopo-closures/01-escopo-global-vs-local", label: "01 — Escopo global vs. local" },
      { href: "/escopo-closures/02-escopo-de-bloco", label: "02 — Escopo de bloco" },
      { href: "/escopo-closures/03-hoisting-revisitado", label: "03 — Hoisting revisitado" },
      { href: "/escopo-closures/04-o-que-e-closure", label: "04 — O que é uma closure" },
      { href: "/escopo-closures/05-closure-na-pratica", label: "05 — Closure na prática" },
      { href: "/escopo-closures/06-module-pattern", label: "06 — Module pattern com closures" },
      { href: "/escopo-closures/07-memoria-e-gc", label: "07 — Memória e garbage collection" },
    ],
  },

  // ─── 7. this & Contexto ──────────────────────────────────────────────────
  {
    id: "this-contexto",
    href: "/this-contexto",
    label: "this & Contexto",
    sub: [
      { href: "/this-contexto/01-o-que-e-this", label: "01 — O que é this" },
      { href: "/this-contexto/02-this-global", label: "02 — this no contexto global" },
      { href: "/this-contexto/03-this-em-metodos", label: "03 — this em métodos de objeto" },
      { href: "/this-contexto/04-this-em-arrow-functions", label: "04 — this em arrow functions" },
      { href: "/this-contexto/05-call-apply-bind", label: "05 — call, apply e bind" },
      { href: "/this-contexto/06-this-em-classes", label: "06 — this em classes" },
      { href: "/this-contexto/07-perda-de-contexto", label: "07 — Perda de contexto e soluções" },
    ],
  },

  // ─── 8. Protótipos & Classes ─────────────────────────────────────────────
  {
    id: "prototipos-classes",
    href: "/prototipos-classes",
    label: "Protótipos & Classes",
    sub: [
      { href: "/prototipos-classes/01-prototype-chain", label: "01 — Prototype chain" },
      { href: "/prototipos-classes/02-proto-e-prototype", label: "02 — __proto__ e .prototype" },
      { href: "/prototipos-classes/03-object-create", label: "03 — Object.create" },
      { href: "/prototipos-classes/04-heranca-prototipica", label: "04 — Herança prototípica" },
      { href: "/prototipos-classes/05-class-syntax", label: "05 — Sintaxe class" },
      { href: "/prototipos-classes/06-constructor-e-super", label: "06 — constructor e super" },
      { href: "/prototipos-classes/07-metodos-e-instancia", label: "07 — Métodos estáticos e de instância" },
      { href: "/prototipos-classes/08-extends", label: "08 — Herança com extends" },
      { href: "/prototipos-classes/09-getters-e-setters", label: "09 — Getters e setters" },
    ],
  },

  // ─── 9. Async ────────────────────────────────────────────────────────────
  {
    id: "async",
    href: "/async",
    label: "Async",
    sub: [
      { href: "/async/01-sincrono-vs-assincrono", label: "01 — Síncrono vs. assíncrono" },
      { href: "/async/02-callbacks", label: "02 — Callbacks" },
      { href: "/async/03-callback-hell", label: "03 — Callback hell" },
      { href: "/async/04-promises", label: "04 — Promises" },
      { href: "/async/05-then-e-catch", label: "05 — .then e .catch" },
      { href: "/async/06-promise-combinators", label: "06 — Promise.all, race e allSettled" },
      { href: "/async/07-async-await", label: "07 — async/await" },
      { href: "/async/08-try-catch-async", label: "08 — Tratamento de erros assíncronos" },
      { href: "/async/09-event-loop-revisitado", label: "09 — Event loop revisitado" },
    ],
  },

  // ─── 10. DOM & Eventos ───────────────────────────────────────────────────
  {
    id: "dom-eventos",
    href: "/dom-eventos",
    label: "DOM & Eventos",
    sub: [
      { href: "/dom-eventos/01-o-que-e-o-dom", label: "01 — O que é o DOM" },
      { href: "/dom-eventos/02-selecionando-elementos", label: "02 — Selecionando elementos" },
      { href: "/dom-eventos/03-manipulando-conteudo", label: "03 — Manipulando conteúdo" },
      { href: "/dom-eventos/04-estilos-e-classes", label: "04 — Estilos e classes CSS via JS" },
      { href: "/dom-eventos/05-criando-e-removendo", label: "05 — Criando e removendo elementos" },
      { href: "/dom-eventos/06-event-listeners", label: "06 — Event listeners" },
      { href: "/dom-eventos/07-bubbling-e-capturing", label: "07 — Bubbling e capturing" },
      { href: "/dom-eventos/08-event-delegation", label: "08 — Event delegation" },
      { href: "/dom-eventos/09-formularios", label: "09 — Formulários e inputs" },
      { href: "/dom-eventos/10-mutationobserver", label: "10 — MutationObserver" },
    ],
  },

  // ─── 11. Módulos ES6 ─────────────────────────────────────────────────────
  {
    id: "modulos-es6",
    href: "/modulos-es6",
    label: "Módulos ES6",
    sub: [
      { href: "/modulos-es6/01-por-que-modulos", label: "01 — Por que módulos existem" },
      { href: "/modulos-es6/02-export-e-import", label: "02 — export e import" },
      { href: "/modulos-es6/03-named-vs-default", label: "03 — Named vs. default exports" },
      { href: "/modulos-es6/04-import-dinamico", label: "04 — import() dinâmico" },
      { href: "/modulos-es6/05-module-bundlers", label: "05 — Module bundlers (visão geral)" },
    ],
  },
];