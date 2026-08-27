// src/content/variaveis-tipos/01-var.exercicios.js
//
// Exercícios da Aula — var.js (variaveis-tipos/01-var)
//
// 50 questões inéditas, divididas em 3 tipos:
//   - dissertativa      → resposta explicativa em texto livre
//   - multipla_escolha  → 4 opções (a, b, c, d), 1 correta
//   - codigo            → escrita de código, com saída esperada para validação
//
// Organizadas em 6 grupos temáticos, cobrindo:
//   01. Declaração, Hoisting e Valor Inicial
//   02. Escopo de Função
//   03. Ausência de Escopo de Bloco (if/for/while/try)
//   04. Redeclaração e Reatribuição
//   05. Vazamento Global e window
//   06. Loop, Closures e Comparação var vs let/const

export const exerciciosAulaVar = [
  {
    grupo: "01. Declaração, Hoisting e Valor Inicial",
    questoes: [
      {
        id: "var-01",
        tipo: "dissertativa",
        pergunta:
          "O que significa dizer que 'var' sofre hoisting? Explique o que acontece com o valor da variável antes da linha de atribuição.",
        dica: "Separe mentalmente a declaração da atribuição.",
        respostaGabarito:
          "Hoisting é a elevação da declaração ao topo do escopo. Porém, apenas a declaração é elevada — não a atribuição. Por isso, o binding já existe e vale 'undefined' até que a linha de atribuição seja executada.",
      },
      {
        id: "var-02",
        tipo: "multipla_escolha",
        pergunta: "Qual será o resultado do código abaixo?",
        codigoExemplo: "console.log(typeof x);\nvar x = 5;",
        opcoes: [
          { id: "a", texto: '"number"' },
          { id: "b", texto: '"undefined"' },
          { id: "c", texto: "Lança ReferenceError: x is not defined" },
          { id: "d", texto: '"null"' },
        ],
        respostaCorreta: "b",
        explicacao:
          "Por causa do hoisting, o binding de 'x' já existe no momento do console.log, mas ainda não foi atribuído — por isso typeof retorna a string \"undefined\".",
      },
      {
        id: "var-03",
        tipo: "codigo",
        pergunta:
          "Escreva um código que demonstre o hoisting de var: imprima o valor de 'valor' antes de declará-la com var e atribuir \"JS\", e imprima novamente depois da atribuição.",
        codigoInicial: "",
        saidaEsperada: "undefined\nJS",
        dica: 'Exemplo: console.log(valor); var valor = "JS"; console.log(valor);',
      },
      {
        id: "var-04",
        tipo: "dissertativa",
        pergunta:
          "Explique por que 'var idade;' sem valor atribuído não gera erro ao ser acessada, diferente de uma variável nunca declarada.",
        respostaGabarito:
          "'var idade;' já cria um binding no ambiente, inicializado com undefined, por causa do hoisting. Uma variável nunca declarada não possui binding algum, então tentar acessá-la diretamente gera ReferenceError.",
      },
      {
        id: "var-05",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das afirmações abaixo é verdadeira sobre o hoisting de var?",
        opcoes: [
          {
            id: "a",
            texto: "O valor atribuído também é movido para o topo do escopo",
          },
          {
            id: "b",
            texto:
              "Apenas a declaração é movida para o topo; a atribuição continua na posição original",
          },
          {
            id: "c",
            texto: "var não sofre hoisting, apenas let e const sofrem",
          },
          {
            id: "d",
            texto: "O hoisting só ocorre dentro de funções assíncronas",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "O hoisting eleva apenas a declaração (var x). A atribuição de valor continua acontecendo exatamente onde foi escrita no código.",
      },
      {
        id: "var-06",
        tipo: "codigo",
        pergunta:
          "Crie uma função que declare uma variável 'total' com var sem inicializá-la, imprima seu valor (deve ser undefined), depois atribua 10 a ela e imprima novamente.",
        codigoInicial: "function exemplo() {\n  \n}\n\nexemplo();",
        saidaEsperada: "undefined\n10",
      },
      {
        id: "var-07",
        tipo: "dissertativa",
        pergunta:
          "O que é o 'modelo didático' de hoisting (separar mentalmente declaração e atribuição)? Por que esse modelo ajuda a entender o comportamento de var?",
        respostaGabarito:
          "É reescrever mentalmente o código movendo a declaração (var x) para o topo do escopo, deixando a atribuição na posição original. Isso ajuda a prever corretamente o valor undefined antes da atribuição real, sem precisar decorar regras abstratas.",
      },
      {
        id: "var-08",
        tipo: "multipla_escolha",
        pergunta: "Qual será a saída do código abaixo?",
        codigoExemplo:
          'function teste() {\n  console.log(mensagem);\n  var mensagem = "Oi";\n}\nteste();',
        opcoes: [
          { id: "a", texto: '"Oi"' },
          { id: "b", texto: "undefined (o valor undefined, não a string)" },
          { id: "c", texto: "Lança ReferenceError" },
          { id: "d", texto: "Lança SyntaxError" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Dentro da função, 'mensagem' sofre hoisting e já existe com valor undefined no momento do console.log, antes da atribuição de \"Oi\".",
      },
      {
        id: "var-09",
        tipo: "dissertativa",
        pergunta:
          "Existe alguma diferença no mecanismo de hoisting entre uma var declarada no escopo global e uma declarada dentro de uma função?",
        respostaGabarito:
          "Não há diferença no mecanismo — em ambos os casos apenas a declaração é hoisted e inicializada com undefined. A diferença está apenas em qual escopo o binding é criado (global ou da função), não no comportamento do hoisting em si.",
      },
    ],
  },

  {
    grupo: "02. Escopo de Função",
    questoes: [
      {
        id: "var-10",
        tipo: "dissertativa",
        pergunta: "O que significa dizer que 'var' possui 'escopo de função'?",
        respostaGabarito:
          "Significa que o binding criado por var pertence ao ambiente da função mais próxima que o contém, ficando acessível em toda a função — independentemente de blocos internos — e inacessível fora dela.",
      },
      {
        id: "var-11",
        tipo: "multipla_escolha",
        pergunta: "Qual o resultado do código abaixo?",
        codigoExemplo:
          'function exemplo() {\n  var interno = "valor";\n}\nconsole.log(interno);',
        opcoes: [
          { id: "a", texto: '"valor"' },
          { id: "b", texto: "undefined" },
          { id: "c", texto: "Lança ReferenceError: interno is not defined" },
          { id: "d", texto: "null" },
        ],
        respostaCorreta: "c",
        explicacao:
          "'interno' pertence apenas ao escopo da função 'exemplo'. Fora dela, esse binding não existe, então o acesso gera ReferenceError.",
      },
      {
        id: "var-12",
        tipo: "codigo",
        pergunta:
          "Escreva uma função chamada 'calcular' que declare 'resultado' com var, some 2 + 2 armazenando em 'resultado', e imprima 'resultado'. Depois chame a função.",
        codigoInicial: "function calcular() {\n  \n}\n\ncalcular();",
        saidaEsperada: "4",
      },
      {
        id: "var-13",
        tipo: "dissertativa",
        pergunta:
          "Por que tentar acessar, a partir de fora, uma variável var declarada dentro de uma função gera erro?",
        respostaGabarito:
          "Porque o binding pertence exclusivamente ao ambiente léxico da função. Fora dela, esse ambiente não é acessível, então a resolução do identificador falha e produz ReferenceError.",
      },
      {
        id: "var-14",
        tipo: "multipla_escolha",
        pergunta: "Qual afirmação está correta sobre var e funções aninhadas?",
        opcoes: [
          {
            id: "a",
            texto:
              "Uma função interna nunca pode acessar var da função externa",
          },
          {
            id: "b",
            texto:
              "Uma função interna pode acessar var declarada na função externa, via scope chain",
          },
          {
            id: "c",
            texto: "var só é acessível na mesma linha em que foi declarada",
          },
          {
            id: "d",
            texto:
              "var vira global automaticamente dentro de funções aninhadas",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "A função interna, ao não encontrar o identificador em seu próprio ambiente, busca nos ambientes externos através da scope chain — e encontra a var da função que a envolve.",
      },
      {
        id: "var-15",
        tipo: "codigo",
        pergunta:
          "Crie uma função externa 'externa' que declare 'var valor = 100' e, dentro dela, uma função interna 'interna' que apenas faça console.log(valor). Chame interna() dentro de externa().",
        codigoInicial: "function externa() {\n  \n}\n\nexterna();",
        saidaEsperada: "100",
      },
      {
        id: "var-16",
        tipo: "dissertativa",
        pergunta:
          "O que é a 'scope chain' e como ela se relaciona à resolução de identificadores var em funções aninhadas?",
        respostaGabarito:
          "É a sequência de ambientes léxicos que o motor percorre, do ambiente atual até os externos, para resolver um identificador. Quando uma função interna referencia um var que não existe no seu próprio ambiente, a busca continua pelos ambientes externos até encontrar (ou lançar ReferenceError).",
      },
      {
        id: "var-17",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das opções abaixo é verdadeira sobre o escopo de var dentro de funções?",
        opcoes: [
          {
            id: "a",
            texto: "var dentro de função sempre vira propriedade de window",
          },
          {
            id: "b",
            texto:
              "var dentro de função tem escopo restrito à função, não vazando para o global",
          },
          {
            id: "c",
            texto: "var dentro de função só existe durante o hoisting",
          },
          {
            id: "d",
            texto:
              "não há diferença entre var de função e var declarada globalmente",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "Diferente de blocos como if/for, uma função realmente delimita o escopo de var — o binding não vaza para fora da função.",
      },
    ],
  },

  {
    grupo: "03. Ausência de Escopo de Bloco",
    questoes: [
      {
        id: "var-18",
        tipo: "dissertativa",
        pergunta:
          "Por que uma variável var declarada dentro de um bloco 'if' continua acessível depois do bloco?",
        respostaGabarito:
          "Porque var não possui escopo de bloco. Seu binding pertence ao escopo da função (ou global) que envolve o bloco, e estruturas como if não criam um novo escopo para var.",
      },
      {
        id: "var-19",
        tipo: "multipla_escolha",
        pergunta: "Qual o resultado do código abaixo?",
        codigoExemplo: 'if (true) {\n  var cor = "azul";\n}\nconsole.log(cor);',
        opcoes: [
          { id: "a", texto: '"azul"' },
          { id: "b", texto: "undefined" },
          { id: "c", texto: "Lança ReferenceError" },
          { id: "d", texto: "Lança SyntaxError" },
        ],
        respostaCorreta: "a",
        explicacao:
          "var não respeita o escopo de bloco do if — o binding de 'cor' pertence ao escopo externo, por isso continua acessível depois do bloco.",
      },
      {
        id: "var-20",
        tipo: "codigo",
        pergunta:
          "Escreva um loop for usando var i de 0 até 2 (i < 3), com corpo vazio, e depois imprima i fora do loop.",
        codigoInicial: "",
        saidaEsperada: "3",
      },
      {
        id: "var-21",
        tipo: "dissertativa",
        pergunta:
          "Cite pelo menos três estruturas de bloco que NÃO limitam o escopo de uma variável var.",
        respostaGabarito:
          "if, for, while e try/catch/finally, entre outras — nenhuma dessas estruturas cria escopo de bloco para var; seus bindings vazam para o escopo da função ou global.",
      },
      {
        id: "var-22",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das opções é verdadeira sobre uma var declarada dentro de um bloco try?",
        opcoes: [
          { id: "a", texto: "var fica restrita ao bloco try" },
          {
            id: "b",
            texto:
              "var vaza para o escopo da função/global, assim como em if e for",
          },
          { id: "c", texto: "var só vaza se houver um bloco catch" },
          { id: "d", texto: "var não pode ser declarada dentro de try" },
        ],
        respostaCorreta: "b",
        explicacao:
          "try/catch/finally são blocos como qualquer outro para efeitos de escopo de var — o binding vaza para fora normalmente.",
      },
      {
        id: "var-23",
        tipo: "codigo",
        pergunta:
          "Escreva um código com while que declare 'var contador = 0' antes do loop, incremente contador dentro de um bloco while enquanto contador < 3, e imprima contador fora do while.",
        codigoInicial: "",
        saidaEsperada: "3",
      },
      {
        id: "var-24",
        tipo: "dissertativa",
        pergunta:
          "Compare o comportamento de var e let quanto a escopo de bloco em uma estrutura if. Por que essa diferença é relevante na prática?",
        respostaGabarito:
          "var ignora o escopo de bloco do if, vazando para fora; let respeita o escopo de bloco, ficando inacessível fora do if. Essa diferença é relevante porque var pode causar vazamentos acidentais de variáveis e sobrescritas indesejadas, algo que let evita.",
      },
      {
        id: "var-25",
        tipo: "multipla_escolha",
        pergunta: "Qual será o valor impresso pelo código abaixo?",
        codigoExemplo:
          "for (var i = 0; i < 2; i++) {\n  var dobro = i * 2;\n}\nconsole.log(dobro);",
        opcoes: [
          { id: "a", texto: "0" },
          { id: "b", texto: "2" },
          { id: "c", texto: "Lança ReferenceError" },
          { id: "d", texto: "undefined" },
        ],
        respostaCorreta: "b",
        explicacao:
          "'dobro' vaza do bloco for. Na última iteração executada (i = 1), dobro recebe 2, valor que permanece após o loop terminar.",
      },
      {
        id: "var-26",
        tipo: "codigo",
        pergunta:
          "Dentro de um bloco try, declare 'var status = \"ok\"'. No catch, apenas capture o erro (sem usar status). Fora do try/catch, imprima status.",
        codigoInicial: "try {\n  \n} catch (e) {\n\n}\n\n",
        saidaEsperada: "ok",
      },
    ],
  },

  {
    grupo: "04. Redeclaração e Reatribuição",
    questoes: [
      {
        id: "var-27",
        tipo: "dissertativa",
        pergunta:
          "O que acontece ao declarar a mesma variável duas vezes com var no mesmo escopo? Isso gera algum erro?",
        respostaGabarito:
          "Não gera erro de sintaxe. A redeclaração é permitida e apenas atua sobre o mesmo binding, geralmente sobrescrevendo o valor caso haja uma nova atribuição.",
      },
      {
        id: "var-28",
        tipo: "multipla_escolha",
        pergunta: "Qual o resultado do código abaixo?",
        codigoExemplo:
          'var linguagem = "JS";\nvar linguagem = "TypeScript";\nconsole.log(linguagem);',
        opcoes: [
          { id: "a", texto: '"JS"' },
          { id: "b", texto: '"TypeScript"' },
          {
            id: "c",
            texto:
              "Lança SyntaxError: Identifier 'linguagem' has already been declared",
          },
          { id: "d", texto: "undefined" },
        ],
        respostaCorreta: "b",
        explicacao:
          "var permite redeclaração silenciosa no mesmo escopo. A segunda atribuição simplesmente sobrescreve o valor do mesmo binding.",
      },
      {
        id: "var-29",
        tipo: "codigo",
        pergunta:
          "Declare 'var pontos = 10', reatribua 'pontos = pontos + 5' e imprima pontos.",
        codigoInicial: "",
        saidaEsperada: "15",
      },
      {
        id: "var-30",
        tipo: "dissertativa",
        pergunta:
          "Por que a possibilidade de redeclarar var silenciosamente é considerada um risco em projetos grandes?",
        respostaGabarito:
          "Porque permite sobrescrever acidentalmente uma variável já existente sem qualquer aviso do interpretador, o que pode causar bugs difíceis de rastrear, especialmente em arquivos longos ou quando nomes genéricos são reutilizados.",
      },
      {
        id: "var-31",
        tipo: "multipla_escolha",
        pergunta:
          "Qual seria o comportamento se a mesma redeclaração do código abaixo fosse feita com let em vez de var?",
        codigoExemplo: 'let linguagem = "JS";\nlet linguagem = "TypeScript";',
        opcoes: [
          { id: "a", texto: "Mesmo comportamento silencioso de var" },
          {
            id: "b",
            texto:
              "Lança SyntaxError: Identifier 'linguagem' has already been declared",
          },
          { id: "c", texto: "O valor final seria undefined" },
          {
            id: "d",
            texto: "Apenas um warning no console, sem interromper a execução",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "Diferente de var, let não permite redeclaração no mesmo escopo — o motor lança um SyntaxError antes mesmo da execução.",
      },
      {
        id: "var-32",
        tipo: "codigo",
        pergunta:
          "Declare 'var a = 1'. Em seguida, redeclare 'var a;' (sem atribuir novo valor). Imprima a.",
        codigoInicial: "",
        saidaEsperada: "1",
        dica: "Redeclarar sem atribuir um novo valor não apaga o valor já existente no binding.",
      },
      {
        id: "var-33",
        tipo: "dissertativa",
        pergunta:
          "Explique a diferença entre 'redeclarar' e 'reatribuir' uma variável var. Ambas produzem sempre o mesmo resultado?",
        respostaGabarito:
          "Redeclarar é usar var novamente para o mesmo identificador; reatribuir é apenas trocar o valor com '=', sem a palavra-chave var. Ambas atuam sobre o mesmo binding e podem produzir o mesmo valor final, mas redeclarar sem atribuir um novo valor não apaga o valor já existente.",
      },
      {
        id: "var-34",
        tipo: "multipla_escolha",
        pergunta: "Qual é o resultado do código abaixo?",
        codigoExemplo:
          "var total = 5;\nfunction atualizar() {\n  var total = total + 1;\n  console.log(total);\n}\natualizar();",
        opcoes: [
          { id: "a", texto: "6" },
          { id: "b", texto: "NaN" },
          { id: "c", texto: "Lança ReferenceError" },
          { id: "d", texto: "undefined" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Dentro de atualizar(), 'var total' sofre hoisting e cria um binding local que 'esconde' (shadowing) o total externo. No momento de 'total + 1', o total local ainda vale undefined, e undefined + 1 resulta em NaN.",
      },
    ],
  },

  {
    grupo: "05. Vazamento Global e window",
    questoes: [
      {
        id: "var-35",
        tipo: "dissertativa",
        pergunta:
          "O que acontece quando uma variável var é declarada no nível mais externo de um script clássico (não-módulo) executado no navegador?",
        respostaGabarito:
          "Ela se torna uma propriedade do objeto global window, podendo ser acessada tanto pelo nome direto quanto por window.nomeDaVariavel.",
      },
      {
        id: "var-36",
        tipo: "multipla_escolha",
        pergunta:
          "Em um script clássico (não-módulo) executado no navegador, qual o resultado do código abaixo?",
        codigoExemplo: 'var app = "MeuApp";\nconsole.log(window.app);',
        opcoes: [
          { id: "a", texto: "undefined" },
          { id: "b", texto: '"MeuApp"' },
          { id: "c", texto: "Lança ReferenceError" },
          { id: "d", texto: "null" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Em um script clássico, uma var declarada no topo do arquivo vira propriedade do objeto global window.",
      },
      {
        id: "var-37",
        tipo: "codigo",
        pergunta:
          "(Script clássico) Declare 'var contador = 1' e imprima o resultado de 'window.contador === contador'.",
        codigoInicial: "",
        saidaEsperada: "true",
      },
      {
        id: "var-38",
        tipo: "dissertativa",
        pergunta:
          "Por que uma variável var declarada dentro de um ES Module NÃO cria automaticamente uma propriedade em window?",
        respostaGabarito:
          "Porque módulos possuem seu próprio escopo de módulo, isolado do escopo global do script clássico. Declarações no nível superior de um módulo não são adicionadas ao objeto global.",
      },
      {
        id: "var-39",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das opções é verdadeira sobre a diferença entre script clássico e ES Module quanto a var?",
        opcoes: [
          { id: "a", texto: "Não há diferença nenhuma entre os dois casos" },
          {
            id: "b",
            texto:
              "Em ES Module, var no topo do arquivo não vira propriedade de window; em script clássico, vira",
          },
          {
            id: "c",
            texto: "var nunca vira propriedade de window em nenhum caso",
          },
          {
            id: "d",
            texto: "Apenas let e const podem virar propriedades de window",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comportamento de var virar propriedade global é específico de scripts clássicos; ES Modules têm escopo próprio e isolado.",
      },
      {
        id: "var-40",
        tipo: "codigo",
        pergunta:
          '(ES Module) Declare \'var app = "app-modulo"\' e imprima o resultado de: typeof window !== "undefined" ? window.app : "sem window".',
        codigoInicial: "",
        saidaEsperada: "undefined",
        dica: 'Em um ES Module, "app" existe apenas no escopo do módulo — window.app permanece undefined.',
      },
      {
        id: "var-41",
        tipo: "dissertativa",
        pergunta:
          "Quais riscos práticos surgem quando muitas variáveis var no escopo global viram propriedades de window em um script clássico grande?",
        respostaGabarito:
          "Aumenta a chance de colisão de nomes entre diferentes scripts carregados na mesma página, sobrescrita acidental de variáveis e maior dificuldade de rastrear a origem de bugs, já que qualquer script pode ler ou modificar essas propriedades globais.",
      },
      {
        id: "var-42",
        tipo: "multipla_escolha",
        pergunta: "Qual o resultado do código abaixo?",
        codigoExemplo:
          "var x = 1;\nfunction alterar() {\n  x = 2;\n}\nalterar();\nconsole.log(x);",
        opcoes: [
          { id: "a", texto: "1" },
          { id: "b", texto: "2" },
          { id: "c", texto: "undefined" },
          { id: "d", texto: "Lança ReferenceError" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Dentro de alterar(), 'x = 2' não usa var, então a atribuição não cria um novo binding local — ela modifica diretamente o 'x' externo, via scope chain.",
      },
    ],
  },

  {
    grupo: "06. Loop, Closures e Comparação var vs let/const",
    questoes: [
      {
        id: "var-43",
        tipo: "dissertativa",
        pergunta:
          "Explique o 'bug clássico' de usar var em um loop com setTimeout dentro. Por que o resultado costuma ser inesperado?",
        respostaGabarito:
          "Como var não cria um binding novo a cada iteração, todos os callbacks criados dentro do loop compartilham o mesmo binding da variável de controle. Quando os callbacks são executados de forma assíncrona — depois que o loop já terminou — o valor observado é o valor final da variável, não o valor de cada iteração.",
      },
      {
        id: "var-44",
        tipo: "multipla_escolha",
        pergunta: "Qual será a saída do código abaixo?",
        codigoExemplo:
          "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}",
        opcoes: [
          { id: "a", texto: "0, 1, 2" },
          { id: "b", texto: "3, 3, 3" },
          { id: "c", texto: "0, 0, 0" },
          { id: "d", texto: "undefined, undefined, undefined" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Os três callbacks compartilham o mesmo binding de 'i'. Quando executam (após o loop terminar), 'i' já vale 3.",
      },
      {
        id: "var-45",
        tipo: "codigo",
        pergunta:
          "Reescreva o loop abaixo trocando var por let, mantendo o console.log(i) dentro do setTimeout, e adicione um comentário explicando por que a saída muda.",
        codigoInicial:
          "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0);\n}\n\n",
        saidaEsperada: "0\n1\n2",
        dica: "let cria um novo binding a cada iteração do loop — cada callback 'enxerga' seu próprio i.",
      },
      {
        id: "var-46",
        tipo: "dissertativa",
        pergunta:
          "Como uma IIFE (Immediately Invoked Function Expression) era usada, antes do ES6, para contornar o problema de var em loops com closures?",
        respostaGabarito:
          "A IIFE criava um novo escopo de função a cada iteração, recebendo o valor atual da variável de controle como argumento e 'capturando' esse valor em um parâmetro próprio, isolado do binding compartilhado do loop.",
      },
      {
        id: "var-47",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das alternativas abaixo resolveria corretamente o bug do var no loop com setTimeout, SEM trocar var por let?",
        opcoes: [
          {
            id: "a",
            texto: "Usar uma IIFE para capturar o valor de i a cada iteração",
          },
          { id: "b", texto: "Usar var novamente dentro do setTimeout" },
          { id: "c", texto: "Aumentar o tempo do setTimeout" },
          { id: "d", texto: "Usar console.warn em vez de console.log" },
        ],
        respostaCorreta: "a",
        explicacao:
          "A IIFE cria um escopo de função próprio por iteração, isolando o valor de i naquele momento — o mesmo efeito que let produz nativamente.",
      },
      {
        id: "var-48",
        tipo: "dissertativa",
        pergunta:
          "Compare, de forma geral, var, let e const quanto a escopo, hoisting e redeclaração.",
        respostaGabarito:
          "var tem escopo de função, sofre hoisting com valor undefined e permite redeclaração. let tem escopo de bloco, sofre hoisting mas fica em 'zona morta temporal' até a declaração, e não permite redeclaração no mesmo escopo. const tem as mesmas regras de escopo e TDZ de let, mas exige inicialização imediata e não permite reatribuição do binding.",
      },
      {
        id: "var-49",
        tipo: "codigo",
        pergunta:
          "Escreva uma função 'contadorClosure' que simule (incorretamente) um contador usando var dentro de um loop com setTimeout, e adicione um comentário explicando o problema.",
        codigoInicial:
          "function contadorClosure() {\n  \n}\n\ncontadorClosure();",
        saidaEsperada: "3\n3\n3",
        dica: "Todos os callbacks compartilham o mesmo binding de var criado pelo loop.",
      },
      {
        id: "var-50",
        tipo: "multipla_escolha",
        pergunta:
          "Por que, na prática, projetos modernos recomendam evitar var em favor de let e const?",
        opcoes: [
          { id: "a", texto: "Porque var é mais lento para o motor executar" },
          {
            id: "b",
            texto:
              "Porque var não possui escopo de bloco e permite redeclaração silenciosa, o que aumenta o risco de bugs relacionados a escopo e sobrescrita",
          },
          { id: "c", texto: "Porque var não funciona em Node.js" },
          {
            id: "d",
            texto:
              "Porque var foi removido das versões mais recentes do ECMAScript",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "O problema de var não é performance nem suporte — é o comportamento de escopo mais permissivo e imprevisível, que let e const restringem de forma mais segura.",
      },
    ],
  },
]
