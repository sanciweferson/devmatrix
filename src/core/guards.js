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
// NENHUMA MUDANÇA em relação ao projeto antigo.
// O arquivo é idêntico — só os comentários foram expandidos.
// ─────────────────────────────────────────────────────────────────────────────


// ─────────────────────────────────────────────────────────────────────────────
// logGuard
//
// Guard de observabilidade: registra cada tentativa de navegação no console.
// Nunca bloqueia, nunca redireciona.
//
// Por que ter um guard só para log?
//   Separa responsabilidades: o authGuard não precisa saber sobre logs.
//   Se você quiser desabilitar logs em produção, remove logGuard do array
//   em router.js — sem tocar em nenhum outro arquivo.
//
// Útil para:
//   - Debugar o fluxo de navegação durante desenvolvimento
//   - Confirmar que a pipeline está sendo disparada corretamente
//   - Base para um futuro analyticsGuard
// ─────────────────────────────────────────────────────────────────────────────
export function logGuard(from, to, next) {

  // `from || "entrada"`:
  //   Operador OR lógico — se `from` for falsy (null, undefined, ""),
  //   usa "entrada" como fallback.
  //   Na primeira navegação da SPA, `from` pode ser string vazia.
  //   "entrada" torna o log legível: "[router] navegando: entrada → /"
  //   Em vez de:                     "[router] navegando:  → /"
  console.log(`[router] navegando: ${from || "entrada"} → ${to}`);

  // Sempre chama next() sem argumento: "aprovado, continue a pipeline".
  // logGuard é um guard de passagem — jamais deve bloquear.
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
  // Por que declarar dentro da função e não fora como constante do módulo?
  //   É uma decisão de escopo intencional — a lista é privada deste guard.
  //   Nenhum outro módulo precisa saber quais rotas são protegidas.
  //
  // Evolução futura: essa lista poderia vir de uma flag no array de routes:
  //   { path: "/admin", protected: true, component: Admin }
  //   authGuard leria routes.filter(r => r.protected).map(r => r.path)
  const rotasProtegidas = ["/admin", "/perfil", "/configuracoes"];

  // Verifica se a rota de DESTINO está na lista.
  // Array.prototype.includes() → comparação exata de string.
  // O `!` inverte: "se a rota NÃO é protegida, deixa passar".
  if (!rotasProtegidas.includes(to)) {
    next();

    // return explícito: garante que o código abaixo não execute
    // mesmo que next() retorne (o que normalmente não acontece,
    // mas o return torna a intenção explícita).
    return;
  }

  // Rota protegida — verifica se o usuário tem token.
  //
  // localStorage.getItem("user_token"):
  //   Retorna a string salva, ou null se a chave não existir.
  //
  // !! (double negation):
  //   Converte qualquer valor para boolean explicitamente.
  //   !!null           → false  (não autenticado)
  //   !!"eyJhbGci..." → true   (autenticado)
  //   !!""             → false  (token vazio = não autenticado)
  const estaAutenticado = !!localStorage.getItem("user_token");

  if (estaAutenticado) {
    // Token existe: aprovado para acessar a rota protegida.
    next();
  } else {

    // Sem token: redireciona para login com o destino original como parâmetro.
    //
    // `?redirect=${to}` permite que a página de login, após autenticação,
    // envie o usuário diretamente para onde ele tentou ir.
    // Ex: tentou "/perfil" → vai para "/login?redirect=/perfil"
    //     Após login → app lê ?redirect=/perfil → navega para "/perfil"
    //
    // next() com argumento = "redireciona e interrompe a pipeline".
    // Guards subsequentes não executam. onComplete não é chamado.
    next(`/login?redirect=${to}`);
  }
}