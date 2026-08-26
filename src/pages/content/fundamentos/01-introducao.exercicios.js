// src/content/fundamentos/01-introducao.exercicios.js
//
// Dados dos exercícios dissertativos da Aula 01 — JavaScript.
// Separado de 01-introducao.js para manter o arquivo de conteúdo mais
// enxuto e facilitar a manutenção/adição de novas questões.
//
// 50 questões, organizadas em 8 blocos.
//
// Cada questão aceita dois campos opcionais:
//   - dica: pista curta para destravar o raciocínio, sempre acessível.
//   - gabarito: resposta-modelo, revelada só depois que a resposta do
//     usuário passa pela checagem heurística de consistência mínima
//     (ver isRespostaConsistente em exercise-block.js).
//
// Status atual: Bloco 1 já tem dica/gabarito como exemplo do esquema.
// Blocos 2–8 ainda não têm — o botão de gabarito/dica simplesmente não
// aparece nessas questões até o conteúdo ser adicionado.

export const exerciciosAula01 = [
  {
    titulo: "Bloco 1 — Origem e história do JavaScript",
    questoes: [
      {
        id: "q1",
        texto: "Em que ano o JavaScript foi criado e quem o criou?",
        gabarito:
          "Foi criado em 1995 por Brendan Eich, enquanto ele trabalhava na Netscape.",
      },
      {
        id: "q2",
        texto: "Em qual empresa a linguagem foi originalmente desenvolvida?",
        gabarito:
          "Na Netscape, empresa responsável pelo navegador Netscape Navigator.",
      },
      {
        id: "q3",
        texto: "Qual era o objetivo original do JavaScript ao ser criado?",
        gabarito:
          "Adicionar comportamento e interatividade às páginas web, permitindo que elas respondessem a ações do usuário, como cliques e preenchimento de formulários, diretamente no navegador.",
      },
      {
        id: "q4",
        texto:
          "Qual foi o primeiro nome interno dado ao projeto antes de se chamar JavaScript?",
        gabarito:
          "O projeto foi chamado internamente de Mocha durante seu desenvolvimento em 1995.",
      },
      {
        id: "q5",
        texto:
          "Para qual nome o projeto foi renomeado pouco antes do lançamento beta do Netscape Navigator 2.0?",
        gabarito: "Foi renomeado para LiveScript, em setembro de 1995.",
      },
      {
        id: "q6",
        texto:
          'Em que contexto (parceria com qual empresa) o nome "JavaScript" foi definido?',
        gabarito:
          "O nome definitivo veio em dezembro de 1995, no contexto de uma parceria entre a Netscape e a Sun Microsystems (criadora do Java), em um momento em que o Java estava em alta no mercado.",
      },
      {
        id: "q7",
        texto:
          "Por que é um erro achar que JavaScript é uma variação ou derivação do Java?",
        dica: "Pense na diferença entre 'nome parecido' e 'parentesco técnico real'.",
        gabarito:
          "Porque, apesar da semelhança no nome e de uma sintaxe superficialmente parecida (ambas influenciadas pela família de linguagens estilo C), são linguagens com projetos, semânticas e modelos de execução bastante diferentes — uma não é versão nem derivação técnica da outra.",
      },
      {
        id: "q8",
        texto:
          'O que motivou a escolha de um nome parecido com "Java", já que as linguagens não são relacionadas tecnicamente?',
        dica: "Pense em marketing, não em engenharia.",
        gabarito:
          "A escolha teve motivação principalmente estratégica e comercial: aproveitar a popularidade que o Java, da Sun Microsystems, tinha na época — não um parentesco técnico entre as linguagens.",
      },
      {
        id: "q9",
        texto:
          "O que aconteceu com a Netscape em 1998 que deu origem ao projeto Mozilla?",
        gabarito:
          "A Netscape abriu o código-fonte do seu navegador, o que deu origem ao projeto Mozilla.",
      },
      {
        id: "q10",
        texto:
          "Qual foi a cadeia de evolução entre Netscape, Mozilla, Mozilla Application Suite e Firefox?",
        dica: "Houve uma etapa intermediária — uma suíte de aplicativos — entre o projeto Mozilla e o navegador Firefox propriamente dito.",
        gabarito:
          "Netscape → abertura do código-fonte → projeto Mozilla → Mozilla Application Suite (pacote de aplicativos com navegador, e-mail etc.) → extração de um navegador independente e mais enxuto, que evoluiu até se tornar o Firefox. Não foi uma transição direta de Netscape para Firefox.",
      },
    ],
  },
  {
    titulo: "Bloco 2 — Como o JavaScript é executado",
    questoes: [
      {
        id: "q11",
        texto: "É correto dizer que JavaScript nunca é compilado? Explique.",
      },
      {
        id: "q12",
        texto:
          'O que significa, na prática, dizer que "JavaScript não exige uma etapa manual de compilação"?',
      },
      {
        id: "q13",
        texto:
          "O que é compilação JIT (Just-In-Time) e qual sua função dentro de uma engine?",
      },
      {
        id: "q14",
        texto:
          "Qual a diferença entre o que uma ferramenta como Vite ou Babel faz e o que a engine faz internamente?",
      },
      {
        id: "q15",
        texto:
          "O TypeScript, ao ser usado em um projeto, muda o fato de que a execução final acontece em uma engine JavaScript? Explique.",
      },
    ],
  },
  {
    titulo: "Bloco 3 — Linguagem, ECMAScript, engine e runtime",
    questoes: [
      { id: "q16", texto: "O que é a especificação ECMAScript?" },
      {
        id: "q17",
        texto:
          "Quem padroniza a especificação ECMAScript e quem é responsável por sua evolução?",
      },
      {
        id: "q18",
        texto: "O que é uma engine JavaScript? Cite três exemplos.",
      },
      { id: "q19", texto: "O que é um runtime (ambiente de execução)?" },
      {
        id: "q20",
        texto:
          "Explique com suas palavras a diferença entre linguagem, especificação, engine e runtime.",
      },
      {
        id: "q21",
        texto:
          'Por que "runtime" e "host environment" não devem ser tratados como sinônimos rigorosos?',
      },
      {
        id: "q22",
        texto:
          'O que é o "host environment" no contexto da especificação ECMAScript?',
      },
      {
        id: "q23",
        texto: "Dê um exemplo de algo definido pela especificação ECMAScript.",
      },
      {
        id: "q24",
        texto:
          "Dê um exemplo de algo que NÃO faz parte da especificação ECMAScript, mas sim do ambiente hospedeiro.",
      },
      {
        id: "q25",
        texto:
          'O que significa dizer que "JavaScript não é uma única implementação"?',
      },
      {
        id: "q26",
        texto:
          "Por que engines diferentes (V8, SpiderMonkey, JavaScriptCore) podem ter arquiteturas internas distintas mesmo executando a mesma linguagem?",
      },
      {
        id: "q27",
        texto:
          'O que é o "comportamento observável exigido pela especificação" e por que ele deve ser respeitado por todas as engines?',
      },
    ],
  },
  {
    titulo: "Bloco 4 — Onde o JavaScript roda",
    questoes: [
      {
        id: "q28",
        texto:
          "Cite pelo menos quatro ambientes diferentes onde o JavaScript pode ser executado.",
      },
      {
        id: "q29",
        texto: 'Por que se diz que "JavaScript não é o navegador"?',
      },
      {
        id: "q30",
        texto:
          "Quais recursos o navegador fornece que não fazem parte da linguagem JavaScript em si?",
      },
      {
        id: "q31",
        texto: "O que o Node.js fornece que o navegador não fornece?",
      },
      {
        id: "q32",
        texto:
          "Cite dois exemplos de runtimes JavaScript além do navegador e do Node.js.",
      },
      {
        id: "q33",
        texto:
          'Por que a linguagem JavaScript "não precisa saber o que é um arquivo do computador" para existir?',
      },
    ],
  },
  {
    titulo: "Bloco 5 — Browser × Node.js",
    questoes: [
      {
        id: "q34",
        texto:
          "Qual é o resultado esperado de `typeof window` em um navegador comum? E no Node.js?",
      },
      {
        id: "q35",
        texto:
          "Qual é o resultado esperado de `typeof process` em um navegador comum? E no Node.js?",
      },
      {
        id: "q36",
        texto:
          "Por que `document` existe no navegador mas normalmente não existe no Node.js?",
      },
      {
        id: "q37",
        texto:
          "O que pode fazer com que o comportamento de `typeof window` ou `typeof process` varie do esperado em um projeto?",
      },
      {
        id: "q38",
        texto:
          "O que é um polyfill e como ele pode alterar o ambiente de execução?",
      },
    ],
  },
  {
    titulo: "Bloco 6 — ECMAScript em profundidade",
    questoes: [
      { id: "q39", texto: "O que significam as siglas ES6 e ES2015?" },
      {
        id: "q40",
        texto: "Cite três recursos importantes introduzidos pelo ES2015.",
      },
      {
        id: "q41",
        texto:
          "Liste pelo menos cinco categorias de coisas que a especificação ECMAScript define.",
      },
      {
        id: "q42",
        texto:
          "Por que o DOM, `window`, `document` e `fetch` não são definidos pela especificação ECMAScript?",
      },
      {
        id: "q43",
        texto:
          "Explique com um exemplo prático a diferença entre um recurso da linguagem (ECMAScript) e um recurso da plataforma Web.",
      },
    ],
  },
  {
    titulo: "Bloco 7 — Main thread e concorrência",
    questoes: [
      { id: "q44", texto: "O que é a main thread no navegador?" },
      {
        id: "q45",
        texto:
          "O que acontece com outras tarefas da página enquanto um código síncrono pesado está sendo executado na main thread?",
      },
      {
        id: "q46",
        texto:
          "Por que um loop bloqueante pode prejudicar a responsividade da interface?",
      },
      {
        id: "q47",
        texto: "O que são Web Workers e para que servem?",
      },
      {
        id: "q48",
        texto:
          "O JavaScript é, por natureza, incapaz de rodar em múltiplas threads? Justifique.",
      },
      {
        id: "q49",
        texto: "O que é o event loop e qual sua função no navegador?",
      },
    ],
  },
  {
    titulo: "Bloco 8 — Fechamento e próximos passos",
    questoes: [
      {
        id: "q50",
        texto:
          'Segundo a aula, qual é a diferença entre "saber usar" o código e "entender por que ele funciona"? Por que essa diferença importa para quem quer se aprofundar em JavaScript?',
      },
    ],
  },
]
