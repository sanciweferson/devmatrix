// src/content/exercicios-map.js
//
// Registro central de quais aulas têm exercícios e onde estão os dados.
//
// Usado por:
//   - src/pages/lesson.js      → decide se mostra o card "Fazer exercícios"
//                                 no fim da aula
//   - src/pages/exercicios.js  → renderiza a página dedicada de exercícios
//                                 (rota /:modulo/:slug/exercicios)
//
// Chave:  "modulo/slug" — mesmo padrão do CONTENT_MAP em lesson.js
// Valor:  { titulo, grupos } — mesmo shape que _ex.block() espera
//
// Pra adicionar exercícios a uma nova aula, basta importar o arquivo de
// questões dela e acrescentar uma entrada aqui. Nenhuma outra parte do
// app precisa mudar — lesson.js e exercicios.js leem esse mapa.

import { exerciciosAula01 } from "./fundamentos/01-introducao.exercicios.js"
import { exerciciosAula02 } from "./fundamentos/02-primeiro-codigo.exercicios.js"

export const EXERCICIOS_MAP = {
  "fundamentos/01-introducao": {
    titulo: "Exercícios — Aula 01",
    grupos: exerciciosAula01,
  },
  "fundamentos/02-primeiro-codigo": {
    titulo: "Exercícios — Aula 02",
    grupos: exerciciosAula02,
  },
}
