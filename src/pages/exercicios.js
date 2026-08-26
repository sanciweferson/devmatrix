// src/pages/exercicios.js

// ─────────────────────────────────────────────────────────────────────────────
// Página dedicada de exercícios de uma aula.
// Rota: /:modulo/:slug/exercicios
// ─────────────────────────────────────────────────────────────────────────────

import { menuItems } from "@components/data/data"
import { EXERCICIOS_MAP } from "@content/exercicios-map.js"
import { _ex } from "@pages/content/_shared/exercise-block.js"
import "@pages/content/_shared/exercicios-page.css"

const Icons = {
  arrowL: `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  `,
}

// ─────────────────────────────────────────────────────────────────────────────
// Encontra os dados da aula atual
// ─────────────────────────────────────────────────────────────────────────────

function getLessonMeta(modulo, slug) {
  const moduleData = menuItems.find((m) => m.id === modulo)

  if (!moduleData?.sub) return null

  const href = `/${modulo}/${slug}`

  const lesson = moduleData.sub.find((l) => l.href === href)

  if (!lesson) return null

  return {
    moduleData,
    lesson,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────────

export function ExerciciosPage({ modulo, slug }) {
  const key = `${modulo}/${slug}`

  const meta = getLessonMeta(modulo, slug)

  const data = EXERCICIOS_MAP[key]

  if (!meta || !data) {
    return /* html */ `
      <div class="exercicios-page exercicios-page--not-found">

        <p>
          Exercícios de
          <strong>${modulo}/${slug}</strong>
          não encontrados.
        </p>

        <a href="/${modulo}/${slug}" data-link>
          ← Voltar para a aula
        </a>

      </div>
    `
  }

  const { moduleData, lesson } = meta

  return /* html */ `
    <div class="exercicios-page">

      <!-- ── Cabeçalho ── -->

      <header class="exercicios-page__header">

        <h1>
          Aula ${lesson.label}
        </h1>

        <h2>
          Questões Dissertativas
        </h2>

    <div class="exercicios-page__info">

  <label>
    <strong>Nome:</strong>

    <input
      type="text"
      name="nome"
      placeholder="Digite seu nome"
      autocomplete="name"
    />
  </label>

  <label>
    <strong>Data:</strong>

    <input
      type="date"
      name="data"
      readonly
      tabindex="-1"
    />
  </label>

  <label>
    <strong>Hora:</strong>

    <input
      type="text"
      name="hora"
      readonly
      tabindex="-1"
    />
  </label>

</div>

      </header>


      <!-- ── Breadcrumb ── -->

      <nav
        class="exercicios-page__breadcrumb lesson__anim-item"
        aria-label="Breadcrumb"
      >

        <a href="/" data-link>
          Início
        </a>

        <span class="exercicios-page__breadcrumb-sep">
          /
        </span>

        <a href="/${modulo}" data-link>
          ${moduleData.label}
        </a>

        <span class="exercicios-page__breadcrumb-sep">
          /
        </span>

        <a href="/${modulo}/${slug}" data-link>
          ${lesson.label.replace(/^\d+ — /, "")}
        </a>

        <span class="exercicios-page__breadcrumb-sep">
          /
        </span>

        <span>
          Exercícios
        </span>

      </nav>


      <!-- ── Voltar ── -->

      <a
        href="/${modulo}/${slug}"
        data-link
        class="exercicios-page__back lesson__anim-item"
      >

        ${Icons.arrowL}

        <span>
          Voltar para a aula
        </span>

      </a>


      <!-- ── Exercícios ── -->

      <div class="exercicios-page__block lesson__anim-item">

        ${_ex.block({
          storageKey: `jsplatform:exercises:/${modulo}/${slug}`,
          titulo: data.titulo,
          grupos: data.grupos,
          startOpen: true,
        })}

      </div>

    </div>
  `
}

// ─────────────────────────────────────────────────────────────────────────────
// Inicialização
// ─────────────────────────────────────────────────────────────────────────────
export function initExerciciosPage() {
  // ─────────────────────────────────────────────────────────────────────────
  // IDENTIFICA A AULA ATUAL
  // ─────────────────────────────────────────────────────────────────────────

  const segments = window.location.pathname.split("/").filter(Boolean)
  const [modulo, slug] = segments

  const key = `${modulo}/${slug}`
  const data = EXERCICIOS_MAP[key]

  // Chave exclusiva desta aula.
  // Exemplo:
  // jsplatform:exercicios:dados:fundamentos/01-introducao
  //
  // Assim, cada aula possui seus próprios dados.
  const storageKey = `jsplatform:exercicios:dados:${key}`

  // ─────────────────────────────────────────────────────────────────────────
  // ANIMAÇÕES
  // ─────────────────────────────────────────────────────────────────────────

  requestAnimationFrame(() => {
    document
      .querySelectorAll(".exercicios-page .lesson__anim-item")
      .forEach((el, i) => {
        el.style.animationDelay = `${i * 0.08}s`
        el.classList.add("lesson__anim-run")
      })
  })

  // ─────────────────────────────────────────────────────────────────────────
  // EXERCÍCIOS
  // ─────────────────────────────────────────────────────────────────────────

  if (data) {
    _ex.init({
      storageKey: `jsplatform:exercises:/${modulo}/${slug}`,
    })
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CAMPOS
  // ─────────────────────────────────────────────────────────────────────────

  const nomeInput = document.querySelector('input[name="nome"]')
  const dataInput = document.querySelector('input[name="data"]')
  const horaInput = document.querySelector('input[name="hora"]')

  if (!nomeInput || !dataInput || !horaInput) {
    return function cleanup() {}
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CARREGAR DADOS DO NOME
  // ─────────────────────────────────────────────────────────────────────────

  let dadosSalvos = {}

  try {
    dadosSalvos = JSON.parse(localStorage.getItem(storageKey)) ?? {}
  } catch {
    dadosSalvos = {}
  }

  // Nome é o único campo que o usuário pode alterar.
  nomeInput.value = dadosSalvos.nome ?? ""

  // ─────────────────────────────────────────────────────────────────────────
  // SALVAR NOME
  // ─────────────────────────────────────────────────────────────────────────

  const salvarNome = () => {
    const dados = {
      ...dadosSalvos,
      nome: nomeInput.value,
    }

    localStorage.setItem(storageKey, JSON.stringify(dados))
    dadosSalvos = dados
  }

  nomeInput.addEventListener("input", salvarNome)

  // ─────────────────────────────────────────────────────────────────────────
  // DATA + HORA ATUAIS
  // ─────────────────────────────────────────────────────────────────────────

  function atualizarDataHora() {
    const agora = new Date()

    // ── DATA ────────────────────────────────────────────────────────────────

    const ano = agora.getFullYear()

    const mes = String(agora.getMonth() + 1).padStart(2, "0")

    const dia = String(agora.getDate()).padStart(2, "0")

    const dataAtual = `${ano}-${mes}-${dia}`

    // ── HORA ───────────────────────────────────────────────────────────────

    const horas = String(agora.getHours()).padStart(2, "0")

    const minutos = String(agora.getMinutes()).padStart(2, "0")

    const segundos = String(agora.getSeconds()).padStart(2, "0")

    const horaAtual = `${horas}:${minutos}:${segundos}`

    // Coloca os valores nos campos.
    dataInput.value = dataAtual
    horaInput.value = horaAtual
  }

  // Atualiza imediatamente.
  atualizarDataHora()

  // Atualiza a hora a cada segundo.
  const clockInterval = setInterval(atualizarDataHora, 1000)

  // ─────────────────────────────────────────────────────────────────────────
  // CLEANUP
  // ─────────────────────────────────────────────────────────────────────────

  return function cleanup() {
    clearInterval(clockInterval)

    nomeInput.removeEventListener("input", salvarNome)
  }
}