// src/core/cache.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. Guardar o HTML gerado por cada rota para evitar reprocessamento
//   2. Expirar entradas após um tempo definido (TTL)
//   3. Limitar o número de entradas em memória (LRU)
//
// Por que cachear HTML de rotas?
//   Cada vez que o usuário navega para uma rota, o componente dela é chamado,
//   processa dados e gera uma string HTML. Se o usuário volta para uma rota
//   que já visitou, não faz sentido regenerar o mesmo HTML — especialmente
//   em rotas de conteúdo que não mudam (aulas, módulos).
//   O cache evita esse trabalho repetido.
//
// Estratégia combinada: LRU + TTL
//   LRU (Least Recently Used): quando o cache está cheio, remove a entrada
//   mais antiga para dar lugar à nova. As mais recentes ficam.
//
//   TTL (Time To Live): cada entrada tem um prazo de validade. Após expirar,
//   é descartada na próxima vez que for consultada (lazy expiration).
// ─────────────────────────────────────────────────────────────────────────────


// ─── CONFIGURAÇÕES ────────────────────────────────────────────────────────────

const MAX_PAGES = 40;

// 5 minutos × 60 segundos × 1000 milissegundos = 300.000ms
const TTL_MS = 5 * 60 * 1000;


// ─── ESTRUTURA DE DADOS ───────────────────────────────────────────────────────

// Map é escolhido em vez de objeto `{}` por dois motivos concretos:
//
//   1. ORDEM GARANTIDA:
//      Map.keys() retorna chaves na ordem de inserção — garantido pela spec.
//      Isso é necessário para o LRU funcionar: a primeira chave do Map
//      é sempre a entrada mais antiga, pronta para ser removida.
//
//   2. API NATIVA LIMPA:
//      Map tem .size, .clear(), .has(), .delete() nativos.
//
// Estrutura de cada entrada:
//   pageCache.set("/fundamentos/closures", {
//     content:   "<...html...>",      ← HTML gerado pelo componente da rota
//     createdAt: 1710000000000        ← timestamp em ms (Date.now())
//   })
const pageCache = new Map();


// ─────────────────────────────────────────────────────────────────────────────
// hasPage(path)
//
// Pergunta: "posso usar o cache para este path?"
// Resposta: true só se a entrada EXISTS e ainda está DENTRO DO TTL.
// ─────────────────────────────────────────────────────────────────────────────
export function hasPage(path) {
  const entry = pageCache.get(path);

  if (!entry) return false;

  const isExpired = Date.now() - entry.createdAt > TTL_MS;

  if (isExpired) {
    pageCache.delete(path);
    return false;
  }

  return true;
}


// ─────────────────────────────────────────────────────────────────────────────
// savePage(path, content)
//
// Salva uma entrada no cache aplicando LRU em sequência:
//
//   A) Path JÁ existe → deleta e reinsere (move para o fim da fila LRU)
//   B) Cache LOTOU   → remove a entrada mais antiga antes de inserir
// ─────────────────────────────────────────────────────────────────────────────
export function savePage(path, content) {
  if (pageCache.has(path)) {
    pageCache.delete(path);
  } else if (pageCache.size >= MAX_PAGES) {
    const oldestKey = pageCache.keys().next().value;
    pageCache.delete(oldestKey);
  }

  pageCache.set(path, {
    content,
    createdAt: Date.now(),
  });
}


// ─────────────────────────────────────────────────────────────────────────────
// getPage(path)
//
// Recupera apenas o HTML de uma entrada.
// ─────────────────────────────────────────────────────────────────────────────
export function getPage(path) {
  const entry = pageCache.get(path);
  return entry ? entry.content : undefined;
}


// ─────────────────────────────────────────────────────────────────────────────
// deletePage(path)
//
// Remove uma entrada específica do cache.
//
// Por que existe?
//   clearCache() apaga tudo — útil em logout ou testes.
//   deletePage() apaga só uma rota — útil quando um dado externo muda
//   e só aquela página precisa ser regenerada na próxima visita.
//
// Exemplo de uso:
//   Ao marcar uma aula como concluída em lesson.js,
//   deletamos o cache do módulo pai para forçar o re-render
//   com o progresso atualizado:
//
//   deletePage("/fundamentos")
//     → próxima visita a /fundamentos chama ModulePage() de novo
//     → ModulePage() lê o localStorage atualizado
//     → progresso exibido corretamente, sem reload
// ─────────────────────────────────────────────────────────────────────────────
export function deletePage(path) {
  pageCache.delete(path);
}


// ─────────────────────────────────────────────────────────────────────────────
// clearCache()
//
// Esvazia todo o cache de uma vez.
// Útil em: logout, hot-reload durante dev, testes automatizados.
// ─────────────────────────────────────────────────────────────────────────────
export function clearCache() {
  pageCache.clear();
}


// ─────────────────────────────────────────────────────────────────────────────
// getCacheStats()
//
// Retorna um snapshot do estado atual do cache para inspeção no console.
// Exclusiva para desenvolvimento — não é chamada por nenhum outro módulo.
//
// Uso no console do DevTools:
//   import { getCacheStats } from "./cache.js"
//   console.log(getCacheStats())
//   // → { size: 3, pages: ["/", "/fundamentos", "/fundamentos/01-introducao"] }
// ─────────────────────────────────