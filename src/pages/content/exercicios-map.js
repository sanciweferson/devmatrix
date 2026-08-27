// src/content/exercicios-map.js

import { exerciciosAula01 } from "./fundamentos/01-introducao.exercicios.js"
import { exerciciosAula02 } from "./fundamentos/02-primeiro-codigo.exercicios.js"
import { exerciciosAulaVar } from "./variaveis-tipos/01-var.exercicios.js"

export const EXERCICIOS_MAP = {
  "fundamentos/01-introducao": {
    titulo: "Exercícios — Aula 01",
    grupos: exerciciosAula01,
  },
  "fundamentos/02-primeiro-codigo": {
    titulo: "Exercícios — Aula 02",
    grupos: exerciciosAula02,
  },

  "variaveis-tipos/01-var": {
    titulo: "Exercícios — Aula 01 (var)",
    grupos: exerciciosAulaVar,
  },
}
