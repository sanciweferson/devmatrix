// src/core/guards.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidade deste módulo:
//   Exportar funções de guard para serem usadas pela pipeline de navegação.
//
// O que é um guard?
//   Uma função que senta entre o clique do usuário e a renderização da página.
//   Ela pode deixar a navegação passar, bloquear ou redirecionar.
//
// Contrato de assinatura de todo guard:
//   (from: string, to: string, next: Function) => void
//
//   from → pathname atual  (ex: "/")
//   to   → pathname destino (ex: "/admin")
//   next → função da pipeline. O guard DEVE chamá-la para continuar,
//          ou ignorá-la para bloquear silenciosamente,
//          ou passá-la com um path para redirecionar: next("/login")
//
// Princípio importante:
//   Guards são funções puras de decisão.
//   Eles não navegam, não renderizam, não sabem quantos outros guards existem.
//   Só decidem e delegam. Quem executa a consequência é a pipeline.
//
// ⚠️ IMPORTANTE — natureza dessa proteção:
//   O DevMatrix não tem backend. Este guard roda 100% no navegador, DEPOIS
//   que o site inteiro (HTML/JS/conteúdo das aulas) já foi baixado. Ou seja:
//   isso é um funil de experiência (mostra a Home, convida a criar conta,
//   só então libera o conteúdo) — NÃO é proteção de dados real. Alguém com
//   DevTools, "Ver código-fonte" ou JS desabilitado ainda acessa o conteúdo.
//   Pra proteção de verdade, seria necessário um backend controlando o que
//   é de fato entregue ao navegador.
// ─────────────────────────────────────────────────────────────────────────────

import { menuItems } from "@components/data/data";


// ─────────────────────────────────────────────────────────────────────────────
// logGuard
//
// Guard de observabilidade: registra cada tentativa de navegação no console.
// Nunca bloqueia, nunca redireciona.
// ─────────────────────────────────────────────────────────────────────────────
export function logGuard(from, to, next) {
  console.log(`[router] navegando: ${from || "entrada"} → ${to}`);
  next();
}


// ─────────────────────────────────────────────────────────────────────────────
// authGuard
//
// Guard de autenticação: protege rotas privadas contra acesso não autorizado.
//
// Três ramos de decisão:
//   1. Rota não está na lista de protegidas → deixa passar (next())
//   2. Rota protegida + usuário autenticado  → deixa passar (next())
//   3. Rota protegida + não autenticado      → redireciona (next("/login?redirect=..."))
// ─────────────────────────────────────────────────────────────────────────────
export function authGuard(from, to, next) {

  // Lista de pathnames que exigem autenticação.
  //
  // Gerada dinamicamente a partir de menuItems (data.js) — cobre a Home
  // ("/") e todos os 11 módulos automaticamente. Criar um módulo novo em
  // data.js já nasce protegido, sem precisar lembrar de atualizar essa
  // lista aqui também.
  //
  // Páginas institucionais (Termos, Privacidade, Cookies, Contato, FAQ)
  // ficam de fora de propósito — continuam acessíveis sem login.
  //
  // ── PRA REABRIR O SITE INTEIRO (sem exigir login em lugar nenhum) ──
  // Comente a linha de baixo com o array cheio e descomente a linha
  // `const rotasProtegidas = [];` logo em seguida.
  const rotasProtegidas = [
    "/admin",
    "/perfil",
    "/configuracoes",
    ...menuItems.map((item) => item.href),
  ];
  // const rotasProtegidas = []; // ← descomente esta linha pra reabrir tudo

  // Verifica se a rota de destino está protegida.
  //
  // Duas formas de bater:
  //   1. Match exato: to === rota (ex: "/fundamentos" === "/fundamentos")
  //   2. Match de prefixo: to começa com "rota/" (ex: "/fundamentos/01-x"
  //      começa com "/fundamentos/") — isso é o que garante que as AULAS
  //      dentro de um módulo protegido também fiquem protegidas, mesmo
  //      sem estarem listadas uma por uma (seriam 94 entradas!).
  //
  // "/" recebe tratamento especial: só bate em match EXATO. Sem essa
  // exceção, "/".startsWith the prefix check faria literalmente toda
  // rota do site bater como "protegida" (tudo começa com "/").
  const isProtected = rotasProtegidas.some((rota) => {
    if (rota === "/") return to === "/";
    return to === rota || to.startsWith(`${rota}/`);
  });

  if (!isProtected) {
    next();
    return;
  }

  // Rota protegida — verifica se o usuário tem token.
  const estaAutenticado = !!localStorage.getItem("user_token");

  if (estaAutenticado) {
    next();
  } else {
    // Sem token: redireciona para login com o destino original como
    // parâmetro, pra login.js poder mandar de volta pra onde a pessoa
    // tentou ir originalmente.
    next(`/login?redirect=${to}`);
  }
}