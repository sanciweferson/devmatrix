// src/content/exercicios-map.js

import { exerciciosAula01 } from "@content/fundamentos/01-introducao.exercicios.js"
import { exerciciosAula02 } from "@content/fundamentos/02-primeiro-codigo.exercicios.js"
import { exerciciosAula03 } from "@content/fundamentos/03-como-browser-le-js.exercicios.js"
import { exerciciosAula04 } from "@content/fundamentos/04-erros-e-console.exercicios.js"
import { exerciciosAulaVar } from "@content/variaveis-tipos/01-var.exercicios.js"

export const EXERCICIOS_MAP = {
  "fundamentos/01-introducao": {
    titulo: "Exercícios — Aula 01",
    grupos: exerciciosAula01,
  },
  "fundamentos/02-primeiro-codigo": {
    titulo: "Exercícios — Aula 02",
    grupos: exerciciosAula02,
  },
  "fundamentos/03-como-browser-le-js": {
    titulo: "Exercícios — Aula 03",
    grupos: exerciciosAula03,
  },
  "fundamentos/04-erros-e-console": {
    titulo: "Excercícios —  Aula 04",
    grupos: exerciciosAula04,
  },
  "variaveis-tipos/01-var": {
    titulo: "Exercícios — Aula 01 (var)",
    grupos: exerciciosAulaVar,
  },
}
