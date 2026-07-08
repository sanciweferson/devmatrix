// src/routes.js
// ─────────────────────────────────────────────────────────────────────────────
// Tabela de rotas da aplicação.
// ─────────────────────────────────────────────────────────────────────────────

import { Home } from "./pages/home";
import { ModulePage } from "@pages/modulo.js";
import { Lesson } from "@pages/lesson.js";
import { LegalPage } from "./pages/legal";
import { LoginPage } from "./pages/login";
import { PerfilPage } from "./pages/perfil";
import { ContatoPage } from "@pages/contato";
import { FaqPage } from "@pages/faq";

export const routes = [

  // ── Home ──────────────────────────────────────────────────────────────────
  {
    path: "/",
    component: Home
  },

  { path: "/login", component: LoginPage },

  // Rota protegida pelo authGuard (src/core/guards.js) — sem token válido
  // em localStorage, cai em /login?redirect=/perfil antes de chegar aqui.
  { path: "/perfil", component: PerfilPage },

  { path: "/privacidade", component: () => LegalPage({ slug: "privacidade" }) },
  { path: "/termos", component: () => LegalPage({ slug: "termos" }) },
  { path: "/cookies", component: () => LegalPage({ slug: "cookies" }) },

  { path: "/contato", component: () => ContatoPage() },
  { path: "/faq", component: () => FaqPage() },
  // ── Páginas de módulo ─────────────────────────────────────────────────────
  {
    path: "/fundamentos",
    component: () => ModulePage({ modulo: "fundamentos" }),
  },
  {
    path: "/variaveis-tipos",
    component: () => ModulePage({ modulo: "variaveis-tipos" }),
  },
  {
    path: "/funcoes",
    component: () => ModulePage({ modulo: "funcoes" }),
  },
  {
    path: "/objetos",
    component: () => ModulePage({ modulo: "objetos" }),
  },
  {
    path: "/arrays-iteracao",
    component: () => ModulePage({ modulo: "arrays-iteracao" }),
  },
  {
    path: "/escopo-closures",
    component: () => ModulePage({ modulo: "escopo-closures" }),
  },
  {
    path: "/this-contexto",
    component: () => ModulePage({ modulo: "this-contexto" }),
  },
  {
    path: "/prototipos-classes",
    component: () => ModulePage({ modulo: "prototipos-classes" }),
  },
  {
    path: "/async",
    component: () => ModulePage({ modulo: "async" }),
  },
  {
    path: "/dom-eventos",
    component: () => ModulePage({ modulo: "dom-eventos" }),
  },
  {
    path: "/modulos-es6",
    component: () => ModulePage({ modulo: "modulos-es6" }),
  },

  // ── Aulas ─────────────────────────────────────────────────────────────────
  {
    path: "/:modulo/:slug",
    component: Lesson,
  },

  // ── 404 ───────────────────────────────────────────────────────────────────
  {
    path: "*",
    component: () => /*html*/`
      <section style="text-align: center; padding: 4rem 2rem;">
        <h1>404 — Página não encontrada</h1>
        <p>O endereço <strong>${window.location.pathname}</strong> não existe.</p>
        <a href="/" data-link>← Voltar para o início</a>
      </section>
    `,
  },

]