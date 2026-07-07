# DevMatrix

> Uma plataforma de estudos para aprender JavaScript do jeito certo —
> do motor à aplicação, sem atalhos, sem mágica, com contexto real.


---

## Sobre o projeto

js-documentation-platform é uma SPA (Single Page Application) construída do zero com
**Vite + Vanilla JS** — sem frameworks, sem bibliotecas de UI.

O objetivo é duplo: ser uma plataforma de estudo de JavaScript profundo,
e ser ela mesma um exercício de arquitetura frontend avançada.

Cada decisão técnica foi tomada com intenção. O código é comentado,
documentado e construído para ser estudado.

---

## Conteúdo

**94 aulas distribuídas em 11 módulos:**

| # | Módulo | Aulas |
|---|--------|-------|
| 1 | Fundamentos | 11 |
| 2 | Variáveis & Tipos | 7 |
| 3 | Funções | 10 |
| 4 | Objetos | 8 |
| 5 | Arrays & Iteração | 10 |
| 6 | Escopo & Closures | 7 |
| 7 | this & Contexto | 7 |
| 8 | Protótipos & Classes | 9 |
| 9 | Async | 9 |
| 10 | DOM & Eventos | 10 |
| 11 | Módulos ES6 | 5 |

---

## Funcionalidades

**Navegação**
- SPA com History API — URLs limpas sem `#`
- Router com suporte a rotas dinâmicas (`/:modulo/:slug`)
- Pipeline de guards (Chain of Responsibility) antes de cada navegação
- Botões Voltar/Avançar do browser funcionando corretamente

**Performance**
- Cache LRU + TTL em memória — HTML gerado é reutilizado nas visitas subsequentes
- Dropdowns desktop reposicionados com `requestAnimationFrame` (throttle)
- Listeners de scroll com `passive: true`

**Menu e Navegação**
- Dropdowns desktop via Portal Pattern (criados no `<body>` para escapar de `overflow: hidden`)
- Drawer mobile com submenus expansíveis
- Suporte completo a teclado: `ArrowDown/Up`, `Home`, `End`, `Escape`
- Suporte a touch: toggle por toque em dispositivos móveis
- Detecção de input via `matchMedia("(hover: none)")` — funciona com tablets com teclado externo

**Acessibilidade**
- `aria-expanded`, `aria-controls`, `aria-haspopup="menu"`, `aria-pressed`
- `inert` no drawer mobile quando fechado
- `role="menu"` e `role="menuitem"` nos dropdowns
- Foco devolvido ao elemento correto ao fechar modais e menus
- Navegação por teclado completa em todos os componentes interativos

**Progresso**
- Progresso salvo no `localStorage` por aula
- Dashboard com estatísticas gerais e por módulo
- Barras de progresso acessíveis com `role="progressbar"`
- Reset com modal de confirmação

**UX**
- Relógio ao vivo com data e hora na home
- Headlines rotativas com fade in/out a cada 4 segundos
- Botão flutuante de volta ao topo com anel SVG de progresso de scroll
- Botões de copiar código em todos os blocos `<pre>`
- Tema claro/escuro persistido no `localStorage`
- Animações de entrada escalonadas por página

---

## Arquitetura

```
src/
├── main.js                      → ponto de entrada
├── core/
│   ├── app.js                   → orquestrador
│   ├── router.js                → navigate() + router()
│   ├── render.js                → matchRoute + renderPage + updatePage
│   ├── cache.js                 → LRU + TTL
│   ├── pipeline.js              → Chain of Responsibility
│   ├── guards.js                → logGuard + authGuard
│   ├── buildPortalDropdowns.js  → dropdowns desktop + submenus mobile
│   ├── scrollTop.js             → botão flutuante
│   ├── menuEvents.js            → hamburger + drawer
│   └── theme.init.js            → tema claro/escuro
├── layout/
│   ├── index.js                 → Layout({ children })
│   ├── Header.js                → HTML do cabeçalho
│   └── footer.js                → HTML do rodapé
├── pages/
│   ├── home.js                  → Home() + initHome()
│   ├── modulo.js                → ModulePage() + initModulePage()
│   └── lesson.js                → Lesson() + initLesson()
├── content/
│   ├── fundamentos/             → 11 arquivos de conteúdo
│   └── variaveis-tipos/         → em construção
├── routes.js                    → tabela de rotas
└── styles/
    └── main.css
```

**Padrões de projeto aplicados:**
- Chain of Responsibility — pipeline de guards de navegação
- Portal Pattern — dropdowns, modal e scrollTop no `<body>`
- Factory Functions — geração de HTML modular e composível
- LRU Cache — reutilização de HTML gerado por rota
- Event Delegation — um listener para N elementos filhos
- Cleanup Pattern — cada página retorna função de limpeza de recursos

---

## Stack

| Tecnologia | Uso |
|---|---|
| Vite | Bundler e dev server |
| Vanilla JS (ES Modules) | Toda a lógica da aplicação |
| HTML como string | Renderização de componentes |
| CSS custom properties | Design tokens e temas |
| localStorage | Persistência de progresso e tema |
| Vercel | Deploy |

---

## Rodando localmente

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

---

## Estrutura de uma aula

Cada aula é um arquivo em `src/content/modulo/slug.js` que exporta
uma função `content()` retornando HTML como string:

```js
// src/content/fundamentos/01-introducao.js
export function content() {
  return /* html */ `
    <section class="lesson__section">
      <h2 class="lesson__section-title">Título</h2>
      <p>Conteúdo da aula...</p>
      <pre><code>// exemplo de código</code></pre>
    </section>
  `;
}
```

Para adicionar uma nova aula:
1. Crie o arquivo em `src/content/modulo/slug.js`
2. Importe em `src/pages/lesson.js`
3. Adicione a entrada no `CONTENT_MAP` em `lesson.js`
4. Adicione o item no `menuItems` em `src/data/data.js`

---

## Licença

Projeto pessoal de estudos. Todos os direitos reservados.