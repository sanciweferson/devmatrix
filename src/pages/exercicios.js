// src/pages/exercicios.js
//
// Página dedicada de exercícios de uma aula.
// Rota: /:modulo/:slug/exercicios (ver routes.js)
//
// Existe separada da aula por dois motivos:
//   1. Performance: manter as questões fora do DOM da aula deixa a
//      página de conteúdo mais leve (relevante principalmente no celular).
//   2. UX: URL própria pros exercícios — dá pra voltar direto a eles sem
//      rolar a aula inteira de novo.
//
// Reaproveita o mesmo componente _ex (exercise-block.js) que antes era
// montado inline dentro da aula — só muda onde ele é renderizado, e
// nasce aberto (startOpen: true) porque aqui a página inteira já é o
// exercício, não faz sentido nascer recolhido atrás de um toggle.

import { menuItems } from "@components/data/data"
import { EXERCICIOS_MAP } from "@content/exercicios-map.js"
import { _ex } from "@pages/content/_shared/exercise-block.js"
import "@pages/content/_shared/exercicios-page.css"

const Icons = {
  arrowL: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
}

function getLessonMeta(modulo, slug) {
  const moduleData = menuItems.find((m) => m.id === modulo)
  if (!moduleData?.sub) return null

  const href = `/${modulo}/${slug}`
  const lesson = moduleData.sub.find((l) => l.href === href)
  if (!lesson) return null

  return { moduleData, lesson }
}

export function ExerciciosPage({ modulo, slug }) {
  const key = `${modulo}/${slug}`
  const meta = getLessonMeta(modulo, slug)
  const data = EXERCICIOS_MAP[key]

  if (!meta || !data) {
    return /* html */ `
      <div class="exercicios-page exercicios-page--not-found">
        <p>Exercícios de <strong>${modulo}/${slug}</strong> não encontrados.</p>
        <a href="/${modulo}/${slug}" data-link>← Voltar para a aula</a>
      </div>`
  }

  const { moduleData, lesson } = meta

  return /* html */ `
    <div class="exercicios-page">

      <nav class="exercicios-page__breadcrumb lesson__anim-item" aria-label="Breadcrumb">
        <a href="/" data-link>Início</a>
        <span class="exercicios-page__breadcrumb-sep">/</span>
        <a href="/${modulo}" data-link>${moduleData.label}</a>
        <span class="exercicios-page__breadcrumb-sep">/</span>
        <a href="/${modulo}/${slug}" data-link>${lesson.label.replace(/^\d+ — /, "")}</a>
        <span class="exercicios-page__breadcrumb-sep">/</span>
        <span>Exercícios</span>
      </nav>

      <a href="/${modulo}/${slug}" data-link class="exercicios-page__back lesson__anim-item">
        ${Icons.arrowL}
        <span>Voltar para a aula</span>
      </a>

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

export function initExerciciosPage() {
  // Mesmo padrão de initLesson(): deriva modulo/slug do pathname em vez
  // de receber como parâmetro, porque initPage() em render.js chama os
  // init*() sem argumentos.
  const segments = window.location.pathname.split("/").filter(Boolean)
  const [modulo, slug] = segments
  const key = `${modulo}/${slug}`
  const data = EXERCICIOS_MAP[key]

  requestAnimationFrame(() => {
    document
      .querySelectorAll(".exercicios-page .lesson__anim-item")
      .forEach((el, i) => {
        el.style.animationDelay = `${i * 0.08}s`
        el.classList.add("lesson__anim-run")
      })
  })

  if (data) {
    _ex.init({ storageKey: `jsplatform:exercises:/${modulo}/${slug}` })
  }

  // Cleanup vazio — mesmo contrato de initModulePage()/initLesson():
  // render.js sempre chama currentCleanup?.() na troca de página.
  return function cleanup() {}
}
