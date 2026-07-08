// src/core/auth.js
// ─────────────────────────────────────────────────────────────────────────────
// Fonte única de verdade pra autenticação e dados de perfil, ambos em
// localStorage — é um mock completo, sem backend. Centraliza aqui pra
// não espalhar chaves de localStorage digitadas à mão em login.js,
// perfil.js e guards.js (um typo de chave um dia geraria um bug
// silencioso onde tudo "funciona" mas nada se reconhece).
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN_KEY = "user_token";
const PROFILE_KEY = "devmatrix:profile";

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY);
  // Perfil NÃO é apagado aqui de propósito — logout encerra a sessão,
  // não deleta os dados. Fazendo login de novo, nome/foto continuam lá.
}

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem(PROFILE_KEY)) ?? null;
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    // Mais provável: quota do localStorage estourada por uma foto grande
    // em base64. Não quebra a página, só avisa no console.
    console.warn("[auth] Não foi possível salvar o perfil (localStorage cheio?):", err);
  }
}