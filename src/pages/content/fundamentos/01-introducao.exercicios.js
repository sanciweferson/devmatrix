// src/content/fundamentos/01-introducao.exercicios.js
//
// Dados dos exercícios dissertativos da Aula 01 — JavaScript.
// Separado de 01-introducao.js para manter o arquivo de conteúdo mais
// enxuto e facilitar a manutenção/adição de novas questões.
//
// 50 questões, organizadas em 10 blocos de 5.
//
// Cada questão aceita dois campos opcionais:
//   - dica: pista curta para destravar o raciocínio, sempre acessível.
//   - gabarito: resposta-modelo, revelada só depois que a resposta do
//     usuário passa pela checagem heurística de consistência mínima
//     (ver isRespostaConsistente em exercise-block.js).
export const exerciciosAula01 = [
  {
    titulo: "Bloco 1 — Origem e criação do JavaScript",
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
    ],
  },
  {
    titulo: "Bloco 2 — Nome JavaScript, marketing e Mozilla",
    questoes: [
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
    titulo: "Bloco 3 — Como o JavaScript é executado",
    questoes: [
      {
        id: "q11",
        texto: "É correto dizer que JavaScript nunca é compilado? Explique.",
        dica: "Separe o que o programador faz manualmente do que a engine faz por dentro.",
        gabarito:
          "Não. Engines modernas usam interpretação, compilação e otimizações durante a execução. Uma delas é a compilação JIT (Just-In-Time). O que se costuma dizer é que o programador normalmente não precisa de uma etapa manual separada de compilação antes de rodar o código — não que a linguagem nunca seja compilada.",
      },
      {
        id: "q12",
        texto:
          'O que significa, na prática, dizer que "JavaScript não exige uma etapa manual de compilação"?',
        gabarito:
          "Significa que o programador normalmente não precisa executar manualmente uma etapa separada de compilação da linguagem antes de rodar o arquivo: o ambiente recebe o código e a engine processa e executa.",
      },
      {
        id: "q13",
        texto:
          "O que é compilação JIT (Just-In-Time) e qual sua função dentro de uma engine?",
        gabarito:
          "É uma técnica em que a engine compila partes do código durante a execução, aplicando otimizações com base no comportamento observado em tempo de execução.",
      },
      {
        id: "q14",
        texto:
          "Qual a diferença entre o que uma ferramenta como Vite ou Babel faz e o que a engine faz internamente?",
        dica: "Uma atua no fluxo de desenvolvimento; a outra, na execução.",
        gabarito:
          "Ferramentas como Vite ou Babel transformam, agrupam ou compilam o código no fluxo de desenvolvimento, antes de ele chegar à engine. A engine, por sua vez, analisa, interpreta, compila e otimiza o JavaScript internamente na execução. São etapas diferentes e não se confundem.",
      },
      {
        id: "q15",
        texto:
          "O TypeScript, ao ser usado em um projeto, muda o fato de que a execução final acontece em uma engine JavaScript? Explique.",
        gabarito:
          "Não. O TypeScript pode transformar ou compilar o código no fluxo de desenvolvimento, mas a execução final continua acontecendo em uma engine JavaScript. A etapa de build não altera esse fato.",
      },
    ],
  },
  {
    titulo: "Bloco 4 — Linguagem, ECMAScript, engine e runtime",
    questoes: [
      {
        id: "q16",
        texto: "O que é a especificação ECMAScript?",
        gabarito:
          "É a especificação que define regras, sintaxe, tipos, objetos, funções e outros recursos fundamentais da linguagem JavaScript.",
      },
      {
        id: "q17",
        texto:
          "Quem padroniza a especificação ECMAScript e quem é responsável por sua evolução?",
        gabarito:
          "É padronizada pela Ecma International e desenvolvida pelo TC39, o comitê técnico responsável pela evolução da linguagem.",
      },
      {
        id: "q18",
        texto: "O que é uma engine JavaScript? Cite três exemplos.",
        gabarito:
          "É o software responsável por implementar e executar JavaScript. Exemplos: V8, SpiderMonkey e JavaScriptCore.",
      },
      {
        id: "q19",
        texto: "O que é um runtime (ambiente de execução)?",
        gabarito:
          "É o ambiente de execução que reúne uma engine e outros recursos e APIs necessários para executar aplicações em determinado ambiente. Em muitos contextos da indústria também é chamado informalmente de host environment.",
      },
      {
        id: "q20",
        texto:
          "Explique com suas palavras a diferença entre linguagem, especificação, engine e runtime.",
        dica: "Pense na sequência: nome da linguagem → regras → quem implementa → onde roda com APIs extras.",
        gabarito:
          "JavaScript é o nome da linguagem. ECMAScript é a especificação que define suas regras. A engine implementa e executa a linguagem. O runtime fornece a engine junto com outros recursos necessários para rodar aplicações em um ambiente específico.",
      },
    ],
  },
  {
    titulo: "Bloco 5 — Host environment e o que a especificação define",
    questoes: [
      {
        id: "q21",
        texto:
          'Por que "runtime" e "host environment" não devem ser tratados como sinônimos rigorosos?',
        gabarito:
          "Porque, na especificação ECMAScript, host environment é um termo técnico com significado específico (quem fornece objetos e comportamentos que a especificação delega ao ambiente). Runtime é um termo mais amplo, usado de formas variadas pela indústria. Eles se sobrepõem em vários contextos, mas não são sinônimos rigorosos.",
      },
      {
        id: "q22",
        texto:
          'O que é o "host environment" no contexto da especificação ECMAScript?',
        gabarito:
          "É quem fornece objetos e comportamentos que a própria especificação ECMAScript delega ao ambiente — um termo técnico da especificação, não um sinônimo livre de runtime.",
      },
      {
        id: "q23",
        texto: "Dê um exemplo de algo definido pela especificação ECMAScript.",
        gabarito:
          "Exemplos: a sintaxe da linguagem; tipos e valores fundamentais; objetos e funções nativos (Array, Object, Promise); operadores e estruturas de controle; o sistema de módulos (import/export); Execution Context e o modelo de Jobs/microtasks.",
      },
      {
        id: "q24",
        texto:
          "Dê um exemplo de algo que NÃO faz parte da especificação ECMAScript, mas sim do ambiente hospedeiro.",
        gabarito:
          "Exemplos: DOM, window, document, fetch e Web Workers — vêm de especificações da plataforma Web e só existem em ambientes que os implementam, como o navegador.",
      },
      {
        id: "q25",
        texto:
          'O que significa dizer que "JavaScript não é uma única implementação"?',
        gabarito:
          "Significa que JavaScript é a linguagem especificada pelo ECMAScript e existem diferentes engines que a implementam (V8, SpiderMonkey, JavaScriptCore etc.). Não há uma única implementação oficial.",
      },
    ],
  },
  {
    titulo: "Bloco 6 — Engines, comportamento observável e ambientes",
    questoes: [
      {
        id: "q26",
        texto:
          "Por que engines diferentes (V8, SpiderMonkey, JavaScriptCore) podem ter arquiteturas internas distintas mesmo executando a mesma linguagem?",
        dica: "A especificação exige o comportamento observável, não o desenho interno.",
        gabarito:
          "Porque cada engine é livre para organizar sua arquitetura interna (parsing, bytecode, otimizações JIT etc.), desde que respeite o comportamento observável exigido pela especificação ECMAScript.",
      },
      {
        id: "q27",
        texto:
          'O que é o "comportamento observável exigido pela especificação" e por que ele deve ser respeitado por todas as engines?',
        gabarito:
          "É o conjunto de comportamentos que a especificação ECMAScript exige que o código produza de forma consistente. Todas as engines devem respeitá-lo para que o mesmo código tenha o mesmo resultado observável, independentemente de como cada engine implementa isso por dentro.",
      },
      {
        id: "q28",
        texto:
          "Cite pelo menos quatro ambientes diferentes onde o JavaScript pode ser executado.",
        gabarito:
          "Navegador (browser), Node.js, mobile (ex.: React Native) e outros runtimes como Bun e Deno; também aplicações desktop e ambientes especializados.",
      },
      {
        id: "q29",
        texto: 'Por que se diz que "JavaScript não é o navegador"?',
        gabarito:
          "Porque a linguagem JavaScript tem suas próprias regras e recursos; o navegador apenas fornece recursos adicionais por meio de APIs do ambiente. A linguagem não se confunde com o host que a executa.",
      },
      {
        id: "q30",
        texto:
          "Quais recursos o navegador fornece que não fazem parte da linguagem JavaScript em si?",
        gabarito:
          "Web APIs como window, document, DOM, eventos, timers e fetch — fornecidos pelo ambiente do navegador, não pela linguagem em si.",
      },
    ],
  },
  {
    titulo: "Bloco 7 — Onde o JavaScript roda e diferenças de ambiente",
    questoes: [
      {
        id: "q31",
        texto: "O que o Node.js fornece que o navegador não fornece?",
        gabarito:
          "APIs próprias para arquivos, rede, processos e outros recursos do sistema operacional — coisas típicas de ambiente de servidor/sistema, não de página web.",
      },
      {
        id: "q32",
        texto:
          "Cite dois exemplos de runtimes JavaScript além do navegador e do Node.js.",
        gabarito:
          "Bun e Deno (também aplicações desktop e ambientes especializados).",
      },
      {
        id: "q33",
        texto:
          'Por que a linguagem JavaScript "não precisa saber o que é um arquivo do computador" para existir?',
        dica: "Separe a linguagem do que o runtime oferece.",
        gabarito:
          "Porque trabalhar com arquivos é responsabilidade do runtime (ex.: Node.js), não da linguagem. A linguagem existe com suas regras e recursos fundamentais; APIs de arquivo são fornecidas pelo ambiente de execução.",
      },
      {
        id: "q34",
        texto:
          "Qual é o resultado esperado de `typeof window` em um navegador comum? E no Node.js?",
        gabarito: 'No navegador comum: "object". No Node.js: "undefined".',
      },
      {
        id: "q35",
        texto:
          "Qual é o resultado esperado de `typeof process` em um navegador comum? E no Node.js?",
        gabarito: 'No navegador comum: "undefined". No Node.js: "object".',
      },
    ],
  },
  {
    titulo: "Bloco 8 — Browser × Node.js e polyfills",
    questoes: [
      {
        id: "q36",
        texto:
          "Por que `document` existe no navegador mas normalmente não existe no Node.js?",
        gabarito:
          "Porque document faz parte do ambiente de páginas web (DOM). O Node.js não é um ambiente de página web e, por padrão, não fornece esse objeto global.",
      },
      {
        id: "q37",
        texto:
          "O que pode fazer com que o comportamento de `typeof window` ou `typeof process` varie do esperado em um projeto?",
        gabarito:
          "Ferramentas de desenvolvimento, polyfills ou outras formas de compatibilidade que alteram o ambiente de execução e passam a fornecer APIs que normalmente não existiriam naquele runtime.",
      },
      {
        id: "q38",
        texto:
          "O que é um polyfill e como ele pode alterar o ambiente de execução?",
        gabarito:
          "É código que reproduz, em ambientes que não o possuem nativamente, um recurso definido pela especificação ECMAScript ou por uma Web API. Ao injetar esse código, o ambiente passa a expor objetos ou APIs que de outro modo não existiriam ali, o que pode mudar o resultado de consultas como typeof process.",
      },
      {
        id: "q39",
        texto: "O que significam as siglas ES6 e ES2015?",
        gabarito:
          "São nomes da mesma edição da especificação ECMAScript: ES6 (sexta edição) e ES2015 (ano de publicação). Referem-se a uma atualização importante da linguagem.",
      },
      {
        id: "q40",
        texto: "Cite três recursos importantes introduzidos pelo ES2015.",
        gabarito:
          "Exemplos: let, const, arrow functions, classes e módulos (import/export).",
      },
    ],
  },
  {
    titulo: "Bloco 9 — ECMAScript em profundidade e main thread",
    questoes: [
      {
        id: "q41",
        texto:
          "Liste pelo menos cinco categorias de coisas que a especificação ECMAScript define.",
        gabarito:
          "Sintaxe; tipos e valores fundamentais; objetos e funções nativos (Array, Object, Promise); operadores e estruturas de controle; semântica de execução; sistema de módulos (import/export); gerenciamento de execução (Execution Context, Jobs/microtasks).",
      },
      {
        id: "q42",
        texto:
          "Por que o DOM, `window`, `document` e `fetch` não são definidos pela especificação ECMAScript?",
        gabarito:
          "Porque vêm de especificações da plataforma Web (ambiente hospedeiro). Só existem em ambientes que os implementam, como o navegador — não fazem parte das regras fundamentais da linguagem ECMAScript.",
      },
      {
        id: "q43",
        texto:
          "Explique com um exemplo prático a diferença entre um recurso da linguagem (ECMAScript) e um recurso da plataforma Web.",
        dica: "Compare algo como Array ou Promise com algo como document ou fetch.",
        gabarito:
          "Array, Promise ou const são recursos da linguagem (ECMAScript) e existem em qualquer engine conforme a especificação. Já document ou fetch são recursos da plataforma Web: só existem no navegador (ou em ambientes que os implementem). O mesmo código que usa Promise roda em Node e no browser; o que usa document depende do host web.",
      },
      {
        id: "q44",
        texto: "O que é a main thread no navegador?",
        gabarito:
          "É a thread principal do navegador, na qual o código JavaScript principal de uma página normalmente é executado. Também participa de tarefas de interação e atualização da interface.",
      },
      {
        id: "q45",
        texto:
          "O que acontece com outras tarefas da página enquanto um código síncrono pesado está sendo executado na main thread?",
        gabarito:
          "Outras tarefas que dependem da main thread precisam esperar: a thread está ocupada com aquele trecho síncrono e não processa outras responsabilidades ao mesmo tempo.",
      },
    ],
  },
  {
    titulo: "Bloco 10 — Concorrência, event loop e fechamento",
    questoes: [
      {
        id: "q46",
        texto:
          "Por que um loop bloqueante pode prejudicar a responsividade da interface?",
        gabarito:
          "Porque a main thread também cuida de interação e atualização da página. Enquanto um loop síncrono pesado a ocupa, a interface pode ficar travada ou pouco responsiva até o loop terminar.",
      },
      {
        id: "q47",
        texto: "O que são Web Workers e para que servem?",
        gabarito:
          "São um recurso do navegador que permite executar JavaScript em threads separadas da main thread, para não bloquear a interface com trabalho pesado.",
      },
      {
        id: "q48",
        texto:
          "O JavaScript é, por natureza, incapaz de rodar em múltiplas threads? Justifique.",
        dica: "Lembre dos Web Workers mencionados na aula.",
        gabarito:
          "Não. No navegador, Web Workers permitem executar JavaScript em threads separadas da main thread. O código principal costuma rodar na main thread, mas a linguagem não é, por natureza, incapaz de usar outras threads.",
      },
      {
        id: "q49",
        texto: "O que é o event loop e qual sua função no navegador?",
        gabarito:
          "É o mecanismo que coordena a execução de tarefas JavaScript com mecanismos assíncronos fornecidos pelo ambiente. O detalhamento (filas, Promises etc.) fica para o módulo de Async; nesta aula basta saber que ele organiza essa concorrência no navegador.",
      },
      {
        id: "q50",
        texto:
          'Segundo a aula, qual é a diferença entre "saber usar" o código e "entender por que ele funciona"? Por que essa diferença importa para quem quer se aprofundar em JavaScript?',
        dica: "Pense no que acontece quando algo inesperado aparece e você só conhece o 'como'.",
        gabarito:
          "Saber usar é conseguir repetir soluções prontas; entender o porquê é compreender as regras e os mecanismos por trás do comportamento. Essa diferença importa porque conhecimento só de uso dificulta a depuração quando algo inesperado acontece. O objetivo do material é construir o entendimento progressivamente: observar o comportamento, depois as regras e, por fim, os mecanismos que explicam a execução.",
      },
    ],
  },
]
