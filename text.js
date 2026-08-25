// src/main.js
import "@/styles/main.css"
import { escapeHtml, sanitizeUrl } from "./utils/helpers.js"

const app = document.querySelector("#app")
app.textContent = ""

// ---------- Notificação estilizada (substitui o alert()) ----------
window.mostrarAlertaXSS = (origem) => {
  const toast = document.createElement("div")
  toast.className = "toast-xss"
  toast.innerHTML = `
    <strong>⚠ XSS executado!</strong>
    <span>Código disparado via: ${origem}</span>
  `
  document.body.appendChild(toast)

  setTimeout(() => {
    toast.classList.add("toast-xss--saindo")
    setTimeout(() => toast.remove(), 300)
  }, 4000)
}

// ---------- Cabeçalho + formulário (comentário) ----------

const titulo = document.createElement("h1")
titulo.textContent = "Teste: 4 formas de renderizar texto"
app.appendChild(titulo)

const form = document.createElement("form")

const textarea = document.createElement("textarea")
textarea.rows = 3
// campo começa vazio de verdade — nada de payload já preenchido,
// pra ficar claro que isso é o estado real de uso, não um teste
textarea.placeholder = "Escreva um comentário..."

const botaoEnviar = document.createElement("button")
botaoEnviar.type = "submit"
botaoEnviar.textContent = "Renderizar nos 4 campos"

form.appendChild(textarea)
form.appendChild(botaoEnviar)
app.appendChild(form)

// Botão separado, fora do form, só pra carregar um payload de teste
const botaoExemploComentario = document.createElement("button")
botaoExemploComentario.type = "button"
botaoExemploComentario.className = "botao-exemplo"
botaoExemploComentario.textContent = "⚠ Carregar exemplo malicioso"
app.appendChild(botaoExemploComentario)

botaoExemploComentario.addEventListener("click", () => {
  textarea.value = `Adorei o produto 😍 <b>PROMO10</b> <img src=x onerror="mostrarAlertaXSS('onerror de &lt;img&gt;')"> <a href="javascript:mostrarAlertaXSS('clique em link')">clique aqui</a>`
  textarea.focus()
})

// ---------- Os 4 campos de teste ----------

const camposContainer = document.createElement("div")
camposContainer.className = "campos"
app.appendChild(camposContainer)

const campos = [
  {
    label: "1. textContent",
    seguro: true,
    render: (el, texto) => {
      el.textContent = texto
    },
  },
  {
    label: "2. innerHTML + escapeHtml",
    seguro: true,
    render: (el, texto) => {
      el.innerHTML = escapeHtml(texto)
    },
  },
  {
    label: "3. innerHTML cru",
    seguro: false,
    render: (el, texto) => {
      el.innerHTML = texto
    },
  },
  {
    label: "4. insertAdjacentHTML cru",
    seguro: false,
    render: (el, texto) => {
      el.insertAdjacentHTML("beforeend", texto)
    },
  },
]

const saidas = []

campos.forEach((campo) => {
  const bloco = document.createElement("div")
  bloco.className = campo.seguro ? "campo campo--seguro" : "campo campo--perigo"

  const rotulo = document.createElement("h2")
  rotulo.textContent = campo.label
  bloco.appendChild(rotulo)

  const saida = document.createElement("p")
  saida.textContent = "— aguardando envio —"
  bloco.appendChild(saida)

  camposContainer.appendChild(bloco)
  saidas.push(saida)
})

form.addEventListener("submit", (evento) => {
  evento.preventDefault()

  const texto = textarea.value
  if (!texto.trim()) return

  campos.forEach((campo, i) => {
    const saida = saidas[i]
    saida.textContent = ""
    campo.render(saida, texto)
  })
})

// ---------- 5. Validação de protocolo em link (sanitizeUrl) ----------
// Esse caso é diferente dos 4 acima: aqui o "ataque" não está no texto
// visível, e sim escondido dentro do atributo href. escapeHtml() sozinho
// não protege isso, porque href="javascript:..." não tem nenhum dos
// caracteres que o escapeHtml troca (<, >, ", ', &).

const tituloLink = document.createElement("h2")
tituloLink.className = "titulo-secao"
tituloLink.textContent = "5. Link com validação de protocolo (seguro)"
app.appendChild(tituloLink)

const formLink = document.createElement("form")

const inputLink = document.createElement("input")
inputLink.type = "text"
// campo começa vazio de verdade — nada de exemplo já preenchido,
// pra ficar claro que isso é o estado real de uso, não um teste
inputLink.placeholder = "Cole um link aqui..."

const botaoLink = document.createElement("button")
botaoLink.type = "submit"
botaoLink.textContent = "Renderizar link"

formLink.appendChild(inputLink)
formLink.appendChild(botaoLink)
app.appendChild(formLink)

// Botão separado, fora do form, só pra carregar um payload de teste
const botaoExemplo = document.createElement("button")
botaoExemplo.type = "button" // type="button" evita que ele dispare o submit do form
botaoExemplo.className = "botao-exemplo"
botaoExemplo.textContent = "⚠ Carregar exemplo malicioso"
app.appendChild(botaoExemplo)

botaoExemplo.addEventListener("click", () => {
  inputLink.value = "javascript:mostrarAlertaXSS('href malicioso')"
  inputLink.focus()
})

const saidaLink = document.createElement("div")
saidaLink.className = "campo campo--seguro campo-link"
saidaLink.innerHTML = `
  <h2>Resultado</h2>
  <p>— aguardando envio —</p>
`
app.appendChild(saidaLink)

formLink.addEventListener("submit", (evento) => {
  evento.preventDefault()

  const urlDigitada = inputLink.value.trim()
  if (!urlDigitada) return

  // 1) sanitizeUrl troca o protocolo perigoso por "#" caso não seja
  //    http/https/mailto — o link deixa de executar qualquer coisa
  const urlSegura = sanitizeUrl(urlDigitada)

  // 2) mesmo já validado, ainda escapamos o texto exibido (defesa em
  //    camadas: nunca confie em só uma proteção)
  const paragrafo = saidaLink.querySelector("p")
  paragrafo.innerHTML = `
    <a href="${escapeHtml(urlSegura)}" target="_blank" rel="noopener noreferrer">
      Visitar link
    </a>
    <br>
    <small>Protocolo original: ${escapeHtml(urlDigitada)}</small>
    <br>
    <small>Protocolo após sanitizeUrl: ${escapeHtml(urlSegura)}</small>
  `
})
