/**
 * escapeHtml — converte caracteres especiais em entidades HTML.
 *
 * Por que isso existe?
 * Se você inserir texto do usuário direto no innerHTML, ele pode
 * conter tags/scripts (<script>alert(1)</script>) que o browser
 * vai INTERPRETAR como HTML — isso é um ataque XSS.
 *
 * Escapando os caracteres especiais, o navegador mostra o texto
 * literal "<script>" na tela, em vez de executá-lo.
 *
 * Ordem importa: o & precisa ser o primeiro a ser trocado.
 * Se trocássemos < por &lt; primeiro, e só depois & por &amp;,
 * o "&" que acabamos de criar em "&lt;" seria escapado de novo,
 * virando "&amp;lt;" (errado).
 */
export const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");


/**
 * cx — combina nomes de classes CSS, ignorando valores falsy.
 *
 * cx("btn", false, "btn--primary", null, undefined, "btn--lg")
 *   → "btn btn--primary btn--lg"
 */
export const cx = (...classes) =>
  classes.flat().filter(Boolean).join(" ");


// ─── Validação e máscara de WhatsApp (Brasil) ──────────────────────────────
//
// DDDs válidos segundo a ANATEL — sem essa lista, "(00) 91234-5678" ou
// "(10) 91234-5678" passariam na validação só por terem 11 dígitos, mesmo
// esses DDDs não existindo no Brasil.
const DDDS_VALIDOS = new Set([
  11, 12, 13, 14, 15, 16, 17, 18, 19,
  21, 22, 24, 27, 28,
  31, 32, 33, 34, 35, 37, 38,
  41, 42, 43, 44, 45, 46, 47, 48, 49,
  51, 53, 54, 55,
  61, 62, 63, 64, 65, 66, 67, 68, 69,
  71, 73, 74, 75, 77, 79,
  81, 82, 83, 84, 85, 86, 87, 88, 89,
  91, 92, 93, 94, 95, 96, 97, 98, 99,
]);

/**
 * formatWhatsapp — aplica a máscara (XX) XXXXX-XXXX enquanto a pessoa digita.
 *
 * Estratégia: ignora qualquer caractere que já esteja na tela (parênteses,
 * espaço, traço) e reconstrói do zero a partir só dos dígitos — assim
 * funciona igual digitando, colando ou apagando.
 *
 * Limitação conhecida: o cursor sempre vai pro final depois de cada tecla,
 * porque reescrevemos o value inteiro. Editar um dígito no MEIO funciona,
 * mas o cursor pula pro fim logo em seguida — resolver isso direito exige
 * rastrear selectionStart/selectionEnd manualmente. Deixei simples de
 * propósito, dá pra refinar depois.
 */
export const formatWhatsapp = (value) => {
  const digits = String(value).replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

/**
 * isValidWhatsapp — valida um celular brasileiro completo.
 *
 * Três checagens, todas precisam passar:
 *   1. 11 dígitos no total (2 do DDD + 9 do número)
 *   2. DDD precisa existir de verdade (Set acima, baseado na ANATEL)
 *   3. 3º dígito precisa ser "9" — todo celular brasileiro tem esse
 *      prefixo desde a universalização do nono dígito em 2016
 *
 * Aceita valor formatado ("(11) 91234-5678") ou cru ("11912345678") —
 * o replace(/\D/g, "") normaliza os dois casos.
 */
export const isValidWhatsapp = (value) => {
  const digits = String(value).replace(/\D/g, "");
  if (digits.length !== 11) return false;

  const ddd = Number(digits.slice(0, 2));
  if (!DDDS_VALIDOS.has(ddd)) return false;

  return digits[2] === "9";
};


// ─── TESTES ───────────────────────────────────────────────────────────────────
//
// Esses console.log só existem para confirmar que as funções funcionam.
// Em produção, delete ou comente esse bloco inteiro.
// ─────────────────────────────────────────────────────────────────────────────

console.log(escapeHtml('<script>alert("oi")</script>'))
console.log(escapeHtml("O'Brien & Cia"))
console.log(escapeHtml("texto normal"))

console.log(cx("card", "active"))
console.log(cx("card", false, "active", null, undefined, ""))

const isLoggedIn = true
console.log(cx("card", isLoggedIn && "card--logged"))

const isLoggedOut = false
console.log(cx("card", isLoggedOut && "card--logged"))

console.log(cx("card", true && "card--logged"))
console.log(cx("card", false && "card--logged"))

console.log(cx("base", ["a", "b", false, "c"]))

console.log(formatWhatsapp("11912345678"))       // → "(11) 91234-5678"
console.log(isValidWhatsapp("(11) 91234-5678"))  // → true
console.log(isValidWhatsapp("(10) 91234-5678"))  // → false — DDD 10 não existe
console.log(isValidWhatsapp("(11) 81234-5678"))  // → false — falta o "9"