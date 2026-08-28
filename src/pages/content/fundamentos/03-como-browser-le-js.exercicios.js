// src/content/fundamentos/03-como-browser-le-js.exercicios.js
//
// 50 questões geradas a partir da leitura cirúrgica do conteúdo de
// src/pages/content/fundamentos/03-como-browser-le-js.js — nenhum fato
// aqui foi trazido de fora do que a aula ensina.
//
// Distribuição:
//   Bloco 1 — O que acontece antes do código rodar (4)
//   Bloco 2 — Parsing, AST, hoisting e TDZ (20)
//   Bloco 3 — Execução e Call Stack (9)
//   Bloco 4 — Erros de sintaxe vs. runtime (8)
//   Bloco 5 — Resumo / visão geral do processo / JIT (7)
//   Bloco 6 — Gancho pra próxima aula (2)
//   Total: 50

export const exerciciosAula03 = [
  {
    grupo: "1. O que acontece antes do seu código rodar",
    questoes: [
      {
        id: "l03-01",
        tipo: "dissertativa",
        pergunta:
          "O texto diz que o motor JavaScript 'analisa, prepara e otimiza' o código antes e durante a execução. Por que essa frase evita descrever o processo como só duas fases estanques?",
        dica: "Pense em quantas etapas internas foram mencionadas ao longo do texto.",
        respostaGabarito:
          "Porque o motor passa por várias etapas internas (parsing, preparação do ambiente, execução, e otimizações como o JIT que acontecem durante a execução) — não é só 'duas fases' separadas, é um processo contínuo com múltiplos momentos.",
      },
      {
        id: "l03-02",
        tipo: "multipla_escolha",
        pergunta:
          "De acordo com o texto, o que acontece quando o browser encontra um arquivo .js?",
        opcoes: [
          { id: "a", texto: "Executa linha por linha imediatamente" },
          {
            id: "b",
            texto:
              "Analisa, prepara e otimiza o código antes e durante a execução",
          },
          {
            id: "c",
            texto: "Ignora o arquivo até receber um evento de clique",
          },
          { id: "d", texto: "Compila para bytecode e descarta o código-fonte" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto afirma explicitamente que o motor 'não sai executando linha por linha imediatamente' — antes disso ele analisa, prepara e otimiza.",
      },
      {
        id: "l03-03",
        tipo: "dissertativa",
        pergunta:
          "Cite dois comportamentos que 'parecem mágica', mencionados no texto, que só fazem sentido quando você entende o que o motor faz antes do código rodar.",
        dica: "Um tem a ver com quando uma variável passa a existir, o outro com quando uma função pode ser chamada.",
        respostaGabarito:
          "Variáveis que existem antes de serem declaradas (como var, que existe com undefined antes da linha de declaração) e funções que podem ser chamadas antes de serem definidas no código (hoisting de function declarations).",
      },
      {
        id: "l03-04",
        tipo: "multipla_escolha",
        pergunta:
          "Segundo o texto, o processo de analisar/preparar/executar acontece:",
        opcoes: [
          { id: "a", texto: "Só antes da execução começar" },
          { id: "b", texto: "Só durante a execução" },
          { id: "c", texto: "Antes E durante a execução" },
          { id: "d", texto: "Só quando há erro de sintaxe" },
        ],
        respostaCorreta: "c",
        explicacao:
          "O texto diz: 'antes disso, e também durante a execução, o motor JavaScript analisa, prepara e otimiza o código'.",
      },
    ],
  },

  {
    grupo: "2. Parsing — análise e preparação do código",
    questoes: [
      {
        id: "l03-05",
        tipo: "dissertativa",
        pergunta: "O que é parsing, segundo o texto?",
        dica: "Pense em 'análise da estrutura' + o que é construído como resultado.",
        respostaGabarito:
          "É a etapa em que o motor analisa a estrutura do código e constrói representações internas, como a AST — uma estrutura que representa a organização do código e que o engine utiliza durante o processamento do programa. É assim que o motor 'entende a estrutura' do código antes de rodar qualquer coisa.",
      },
      {
        id: "l03-06",
        tipo: "multipla_escolha",
        pergunta: "O que significa a sigla AST mencionada no texto?",
        opcoes: [
          { id: "a", texto: "Array Structure Template" },
          { id: "b", texto: "Abstract Syntax Tree" },
          { id: "c", texto: "Automated Script Transpiler" },
          { id: "d", texto: "Applied Semantic Token" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto define: 'AST (Abstract Syntax Tree — Árvore Sintática Abstrata)'.",
      },
      {
        id: "l03-07",
        tipo: "dissertativa",
        pergunta:
          "O texto afirma que parsing e compilação 'não são exatamente a mesma coisa'. Explique essa diferença com suas palavras.",
        dica: "Um dos dois é descrito como 'mais amplo'.",
        respostaGabarito:
          "Compilação é um termo mais amplo que pode incluir várias etapas internas do engine, inclusive otimizações que acontecem depois, durante a execução (como o JIT) — parsing é só a etapa de análise da estrutura, uma parte desse processo maior.",
      },
      {
        id: "l03-08",
        tipo: "multipla_escolha",
        pergunta:
          "O que é preparado no ambiente de execução antes da execução do código, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Somente os valores finais das variáveis" },
          {
            id: "b",
            texto: "Os bindings das declarações de variáveis e funções",
          },
          { id: "c", texto: "O cache do navegador" },
          { id: "d", texto: "A árvore DOM da página" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto diz que 'o ambiente de execução é preparado com os bindings das declarações de variáveis e funções' antes da execução.",
      },
      {
        id: "l03-09",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, hoisting é uma etapa formal e separada do engine, ou é outra coisa? Explique.",
        dica: "Releia a frase logo depois da definição de hoisting.",
        respostaGabarito:
          "Não é uma etapa formal separada do engine — é uma forma didática/prática de descrever o comportamento que faz algumas declarações estarem disponíveis antes da posição em que aparecem no código.",
      },
      {
        id: "l03-10",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, o que faz algumas declarações 'estarem disponíveis antes da posição em que aparecem no código'?",
        dica: "É o resultado da preparação do ambiente de execução.",
        respostaGabarito:
          "O fato de o ambiente de execução ser preparado com os bindings de variáveis e funções antes de a execução do código começar — é esse comportamento que, de forma didática, chamamos de hoisting.",
      },
      {
        id: "l03-11",
        tipo: "codigo",
        pergunta:
          "No exemplo do texto, a função saudar() é chamada antes de ser declarada, e funciona. Escreva um código que declare uma função soma(a, b) retornando a + b, chame console.log(soma(2, 3)) ANTES da declaração da função, e comprove que funciona.",
        dica: "Copie o padrão do exemplo saudar(): chame a função primeiro, declare com 'function' depois.",
        codigoInicial: "",
        saidaEsperada: "5",
      },
      {
        id: "l03-12",
        tipo: "multipla_escolha",
        pergunta:
          'Segundo o texto, por que é possível chamar saudar("Ana") antes de sua declaração no código?',
        opcoes: [
          { id: "a", texto: "Porque JavaScript ignora a ordem das linhas" },
          {
            id: "b",
            texto:
              "Porque o ambiente de execução já registrou a função antes da execução começar",
          },
          { id: "c", texto: "Porque funções sempre rodam em paralelo" },
          { id: "d", texto: "Porque strings também são hoisted" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do próprio código-exemplo explica: 'o ambiente de execução já registrou a função antes da execução começar'.",
      },
      {
        id: "l03-13",
        tipo: "dissertativa",
        pergunta:
          "O texto afirma que chamar antes de declarar 'só funciona com function declarations'. O que isso quer dizer sobre arrow functions e expressões de função guardadas em variáveis?",
        dica: "Pense na diferença entre 'o binding existir' e 'a função estar disponível'.",
        respostaGabarito:
          "Arrow functions e expressões de função em variáveis têm um comportamento diferente: o binding da variável é criado antes da execução chegar até ali, mas ele só recebe a função como valor no momento em que a linha de atribuição é executada — chamar a variável antes disso não vai encontrar a função.",
      },
      {
        id: "l03-14",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo hoisting-var.js, o que aparece no console quando console.log(x) roda ANTES da linha var x = 10?",
        opcoes: [
          { id: "a", texto: "10" },
          { id: "b", texto: "undefined" },
          { id: "c", texto: "ReferenceError" },
          { id: "d", texto: "null" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do código diz: 'var tem seu binding criado e inicializado com undefined antes da execução das instruções' — por isso o console mostra undefined, não erro.",
      },
      {
        id: "l03-15",
        tipo: "dissertativa",
        pergunta:
          "Explique, com base no texto, por que console.log(x) antes de var x = 10 mostra undefined em vez de dar erro.",
        dica: "Pense em quando o BINDING é criado/inicializado vs. quando a ATRIBUIÇÃO do valor acontece.",
        respostaGabarito:
          "Porque var tem seu binding criado e inicializado com undefined antes da execução das instruções; a atribuição do valor 10 só acontece de fato quando aquela linha específica é executada — então antes dela, x já existe, mas ainda vale undefined.",
      },
      {
        id: "l03-16",
        tipo: "multipla_escolha",
        pergunta:
          "O que acontece, segundo o exemplo do texto, ao rodar console.log(y) antes de let y = 20?",
        opcoes: [
          { id: "a", texto: "Mostra undefined" },
          { id: "b", texto: "Mostra null" },
          {
            id: "c",
            texto:
              "Lança ReferenceError: Cannot access 'y' before initialization",
          },
          { id: "d", texto: "Mostra 20, porque let também é hoisted como var" },
        ],
        respostaCorreta: "c",
        explicacao:
          "O código-exemplo mostra exatamente esse erro sendo lançado nessa situação.",
      },
      {
        id: "l03-17",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, let e const 'não têm esse comportamento' (o de var). Que comportamento é esse, especificamente?",
        dica: "É sobre o que acontece quando você acessa a variável antes da declaração.",
        respostaGabarito:
          "O comportamento de existir com valor undefined antes da linha de declaração. let e const, ao serem acessadas antes de serem declaradas, lançam ReferenceError em vez de retornar undefined.",
      },
      {
        id: "l03-18",
        tipo: "multipla_escolha",
        pergunta: "O que é a Temporal Dead Zone (TDZ), segundo o texto?",
        opcoes: [
          { id: "a", texto: "O tempo que o motor leva para compilar o código" },
          {
            id: "b",
            texto:
              "O período entre a criação do binding de let/const (no início do escopo) e o momento em que ele é inicializado (na linha da declaração)",
          },
          { id: "c", texto: "Um erro que só acontece em código assíncrono" },
          { id: "d", texto: "O tempo de vida de uma variável var" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto define: 'o período entre a criação do binding de let ou const (no início do escopo) e o momento em que ele é inicializado (na linha da declaração) é chamado de Temporal Dead Zone (TDZ)'.",
      },
      {
        id: "l03-19",
        tipo: "multipla_escolha",
        pergunta:
          "O código-exemplo hoisting-var.js mostra qual valor para console.log(x) DEPOIS da linha var x = 10?",
        opcoes: [
          { id: "a", texto: "undefined" },
          { id: "b", texto: "10" },
          { id: "c", texto: "ReferenceError" },
          { id: "d", texto: "NaN" },
        ],
        respostaCorreta: "b",
        explicacao:
          "Depois da atribuição ser executada, x já vale 10, como mostrado no console do exemplo.",
      },
      {
        id: "l03-20",
        tipo: "dissertativa",
        pergunta:
          "O texto diz que, por enquanto, 'basta conhecer o nome' da TDZ. O que isso sugere sobre o nível de profundidade que essa aula pretende dar ao assunto?",
        dica: "Pense no que o texto promete para depois.",
        respostaGabarito:
          "Sugere que a TDZ será aprofundada em uma aula futura — por enquanto a aula só quer que o conceito e o nome sejam reconhecidos, não dominados em detalhes.",
      },
      {
        id: "l03-21",
        tipo: "codigo",
        pergunta:
          "Demonstre a TDZ: dentro de um bloco try, tente fazer console.log(idade) ANTES de declarar let idade = 10. Capture o erro com catch e, dentro dele, imprima apenas a mensagem 'Erro capturado'.",
        dica: "O ReferenceError da TDZ vai ser lançado antes mesmo da linha 'let idade = 10' ser alcançada.",
        codigoInicial: "",
        saidaEsperada: "Erro capturado",
      },
      {
        id: "l03-22",
        tipo: "multipla_escolha",
        pergunta:
          "Qual alternativa resume corretamente a diferença de comportamento entre var e let/const antes da linha de declaração?",
        opcoes: [
          { id: "a", texto: "Ambos retornam undefined" },
          { id: "b", texto: "Ambos lançam ReferenceError" },
          {
            id: "c",
            texto: "var retorna undefined; let/const lançam ReferenceError",
          },
          {
            id: "d",
            texto: "var lança ReferenceError; let/const retornam undefined",
          },
        ],
        respostaCorreta: "c",
        explicacao:
          "É exatamente o contraste mostrado nos dois blocos de código do texto.",
      },
      {
        id: "l03-23",
        tipo: "multipla_escolha",
        pergunta: "Segundo o texto, o que é mais amplo: parsing ou compilação?",
        opcoes: [
          { id: "a", texto: "Parsing" },
          { id: "b", texto: "Compilação" },
          { id: "c", texto: "São idênticos, não há diferença de amplitude" },
          {
            id: "d",
            texto: "Nenhum dos dois — são conceitos não relacionados",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto diz que 'compilação é um termo mais amplo, que pode incluir várias etapas internas do engine'.",
      },
      {
        id: "l03-24",
        tipo: "multipla_escolha",
        pergunta:
          "O que, segundo o texto, faz o motor 'entender a estrutura' do código antes de rodar qualquer coisa?",
        opcoes: [
          { id: "a", texto: "A execução do primeiro console.log" },
          {
            id: "b",
            texto:
              "A construção de representações internas como a AST, durante o parsing",
          },
          { id: "c", texto: "A leitura do arquivo package.json" },
          { id: "d", texto: "A criação da Call Stack" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto diz que é 'assim que o motor entende a estrutura do código antes de rodar qualquer coisa' — referindo-se à construção da AST durante o parsing.",
      },
    ],
  },

  {
    grupo: "3. Execução",
    questoes: [
      {
        id: "l03-25",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, o que acontece depois que o código foi analisado e o ambiente de execução preparado?",
        dica: "É a fase onde valores são atribuídos e funções chamadas.",
        respostaGabarito:
          "O motor começa a executar as instruções na ordem determinada pelo fluxo do programa — é nessa fase que os valores são atribuídos, as funções são chamadas e o programa realmente 'roda'.",
      },
      {
        id: "l03-26",
        tipo: "multipla_escolha",
        pergunta: "O texto afirma que a ordem de execução é:",
        opcoes: [
          {
            id: "a",
            texto: "Sempre de cima para baixo, linha por linha, sem exceções",
          },
          { id: "b", texto: "Determinada só pelo tamanho do arquivo" },
          {
            id: "c",
            texto:
              "Não simplesmente 'de cima para baixo' — funções, condicionais, loops e callbacks alteram o caminho",
          },
          { id: "d", texto: "Aleatória, decidida pelo motor a cada execução" },
        ],
        respostaCorreta: "c",
        explicacao:
          "O texto diz textualmente que a ordem 'não é simplesmente de cima para baixo, linha por linha'.",
      },
      {
        id: "l03-27",
        tipo: "dissertativa",
        pergunta:
          "Apesar de a ordem de execução não ser estritamente linear, o texto diz que 'o que se mantém' é uma coisa específica. O que é?",
        dica: "Está na frase logo depois da lista de estruturas que alteram o caminho.",
        respostaGabarito:
          "O que se mantém é a lógica do fluxo — o motor sempre segue a sequência que o próprio programa determina, mesmo que essa sequência não seja simplesmente de cima para baixo.",
      },
      {
        id: "l03-28",
        tipo: "multipla_escolha",
        pergunta: "O que é a Call Stack, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Uma lista de todos os arquivos .js carregados" },
          {
            id: "b",
            texto:
              "A estrutura que o motor mantém para controlar o que está sendo executado em cada momento",
          },
          { id: "c", texto: "O histórico de erros do console" },
          { id: "d", texto: "A árvore AST depois de otimizada" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto define: 'O motor mantém uma estrutura chamada Call Stack (pilha de chamadas) para controlar o que está sendo executado em cada momento'.",
      },
      {
        id: "l03-29",
        tipo: "dissertativa",
        pergunta:
          "Descreva, com base no texto, o que acontece na Call Stack quando uma função é chamada e quando ela termina.",
        dica: "Pense em 'empilhar' e 'remover'.",
        respostaGabarito:
          "Quando uma função é chamada, seu contexto é colocado no topo da Call Stack; quando a função termina, esse contexto é removido da Call Stack.",
      },
      {
        id: "l03-30",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo calcularTotal/multiplicar do texto, qual é a ordem correta de empilhamento na Call Stack?",
        opcoes: [
          { id: "a", texto: "multiplicar primeiro, depois calcularTotal" },
          { id: "b", texto: "global → calcularTotal → multiplicar" },
          {
            id: "c",
            texto:
              "Só multiplicar é empilhada; calcularTotal roda no contexto global",
          },
          { id: "d", texto: "As duas funções são empilhadas ao mesmo tempo" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O contexto global chama calcularTotal, que por sua vez chama multiplicar — nessa ordem, conforme a trace mostrada no exemplo.",
      },
      {
        id: "l03-31",
        tipo: "codigo",
        pergunta:
          "Escreva duas funções: dobro(n), que retorna n * 2, e quadruplo(n), que chama dobro(n) duas vezes (dobro do dobro). Depois, faça console.log(quadruplo(3)).",
        dica: "quadruplo(n) deve retornar dobro(dobro(n)).",
        codigoInicial: "",
        saidaEsperada: "12",
      },
      {
        id: "l03-32",
        tipo: "dissertativa",
        pergunta:
          "Onde roda, segundo o texto, o código que está fora de qualquer função?",
        dica: "É o primeiro contexto mencionado, antes de qualquer função ser chamada.",
        respostaGabarito:
          "O código executado fora de qualquer função roda no contexto global; quando uma função é chamada a partir dali, o contexto dela é colocado no topo da Call Stack.",
      },
      {
        id: "l03-33",
        tipo: "codigo",
        pergunta:
          "Escreva uma função dividir(a, b) que retorna a / b, e chame console.log(dividir(10, 2)) logo DEPOIS de declarar a função — praticando o fluxo normal de execução visto nesta seção.",
        dica: "Aqui não é sobre hoisting — é só declarar e depois chamar, na ordem normal.",
        codigoInicial: "",
        saidaEsperada: "5",
      },
    ],
  },

  {
    grupo: "4. Erros de sintaxe param tudo",
    questoes: [
      {
        id: "l03-34",
        tipo: "dissertativa",
        pergunta:
          "O que acontece se o motor encontrar um erro de sintaxe durante o parsing, segundo o texto?",
        dica: "Pense em 'concluir a análise' vs. 'executar instruções'.",
        respostaGabarito:
          "A análise desse script não é concluída, e nenhuma instrução dele chega a ser executada.",
      },
      {
        id: "l03-35",
        tipo: "multipla_escolha",
        pergunta:
          "Qual a diferença central entre um SyntaxError e um erro de runtime, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Não há diferença, são o mesmo tipo de erro" },
          {
            id: "b",
            texto:
              "SyntaxError impede a execução do script inteiro; erro de runtime interrompe o fluxo síncrono a partir do ponto em que ocorreu",
          },
          { id: "c", texto: "SyntaxError só acontece em Node.js" },
          {
            id: "d",
            texto: "Erro de runtime sempre trava o navegador, SyntaxError não",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "É exatamente essa a distinção que o texto traça entre os dois tipos de erro.",
      },
      {
        id: "l03-36",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, o que pode acontecer depois de um erro de runtime SE houver tratamento com try/catch?",
        dica: "'Pode continuar a partir de...'",
        respostaGabarito:
          "O programa pode continuar a partir do ponto de tratamento definido pelo try/catch — diferente do SyntaxError, que impede a execução do script inteiro, mesmo com tratamento.",
      },
      {
        id: "l03-37",
        tipo: "multipla_escolha",
        pergunta:
          'No exemplo sintaxe-errada.js, por que a primeira linha (console.log("isso nunca vai rodar")) realmente não roda, mesmo aparecendo ANTES do erro no código?',
        opcoes: [
          { id: "a", texto: "Porque console.log está bugado nesse exemplo" },
          {
            id: "b",
            texto:
              "Porque o motor não consegue concluir a análise do script, então nenhuma instrução chega a rodar — nem mesmo o código escrito antes do erro",
          },
          { id: "c", texto: "Porque a linha tem um erro de digitação" },
          {
            id: "d",
            texto: "Porque comentários no meio do código cancelam a execução",
          },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto afirma que um SyntaxError 'impede a execução do script inteiro: como o motor não consegue concluir a análise, nenhuma instrução — nem mesmo o código escrito antes do erro — chega a rodar'.",
      },
      {
        id: "l03-38",
        tipo: "dissertativa",
        pergunta:
          "Por que é importante saber que um SyntaxError pode impedir a execução de código que vem ANTES dele no arquivo? O que isso ensina sobre como o motor lida com o arquivo como um todo?",
        dica: "Pense em quando a checagem de sintaxe acontece em relação à execução.",
        respostaGabarito:
          "Porque mostra que o motor primeiro analisa o arquivo inteiro (parsing) antes de decidir executar qualquer parte dele — se a análise não é concluída por causa de um erro de sintaxe em qualquer lugar do arquivo, nada é executado, nem o código que tecnicamente vem antes do erro.",
      },
      {
        id: "l03-39",
        tipo: "multipla_escolha",
        pergunta:
          "Qual erro específico aparece no exemplo do texto para 'const x = {' sem fechar a chave?",
        opcoes: [
          { id: "a", texto: "ReferenceError: x is not defined" },
          { id: "b", texto: "TypeError: Cannot read property" },
          { id: "c", texto: "SyntaxError: Unexpected end of input" },
          { id: "d", texto: "RangeError: Maximum call stack exceeded" },
        ],
        respostaCorreta: "c",
        explicacao:
          "É exatamente o erro mostrado no console do exemplo sintaxe-errada.js (o texto observa que a mensagem exata pode variar entre engines e browsers).",
      },
      {
        id: "l03-40",
        tipo: "dissertativa",
        pergunta:
          "Compare, com suas palavras, o que acontece com o restante do código quando há um SyntaxError vs. quando há um erro de runtime sem try/catch.",
        dica: "Um afeta o arquivo inteiro; o outro afeta só a partir de onde ocorreu.",
        respostaGabarito:
          "Um SyntaxError afeta o arquivo inteiro — nada roda, nem antes nem depois do erro, porque a análise não é concluída. Já um erro de runtime sem tratamento interrompe apenas o fluxo síncrono a partir do ponto em que ocorreu, então código que já rodou antes permanece executado.",
      },
      {
        id: "l03-41",
        tipo: "multipla_escolha",
        pergunta:
          "O erro de sintaxe é detectado em qual etapa, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Execução" },
          { id: "b", texto: "Parsing" },
          { id: "c", texto: "Otimização JIT" },
          { id: "d", texto: "Coleta de lixo (garbage collection)" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto afirma que, se o motor encontrar um erro de sintaxe durante o parsing, a análise do script não é concluída e nenhuma instrução chega a ser executada.",
      },
    ],
  },

  {
    grupo: "5. Visão geral do processo (resumo)",
    questoes: [
      {
        id: "l03-42",
        tipo: "dissertativa",
        pergunta:
          "Segundo o card 'Obtenção do arquivo', como o browser normalmente obtém o arquivo .js, e quais outras fontes são mencionadas?",
        dica: "Tem a fonte mais comum e duas alternativas.",
        respostaGabarito:
          "Normalmente por uma requisição de rede, mas o arquivo também pode vir de cache ou de outras fontes.",
      },
      {
        id: "l03-43",
        tipo: "multipla_escolha",
        pergunta:
          "O que o card 'Obtenção do arquivo' diz sobre download e execução do script quando se usa o atributo defer?",
        opcoes: [
          {
            id: "a",
            texto: "O arquivo só é buscado depois que toda a página carrega",
          },
          {
            id: "b",
            texto:
              "O download pode acontecer em paralelo com o parsing do HTML, mas a execução do script só começa depois que esse parsing termina",
          },
          { id: "c", texto: "defer desativa o cache do navegador" },
          { id: "d", texto: "defer força o download síncrono do arquivo" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O card afirma que, com defer, o download pode acontecer em paralelo enquanto o HTML ainda está sendo analisado, mas a execução do script só começa depois que o parsing do HTML termina.",
      },
      {
        id: "l03-44",
        tipo: "dissertativa",
        pergunta:
          "O card 'Parsing' do resumo diz que o ambiente de execução também é preparado com os bindings das declarações, e que é esse comportamento que chamamos didaticamente de hoisting. Explique essa frase com base no que foi ensinado na aula.",
        dica: "Pense em quando os bindings de variáveis/funções são preparados, e por que isso não é tratado como uma etapa formal do parsing.",
        respostaGabarito:
          "Hoisting é a forma didática de descrever o fato de o ambiente de execução ser preparado com os bindings de variáveis e funções antes da execução começar. Não é uma etapa formal e separada do engine (nem um efeito específico do parsing) — é só o nome que damos a esse comportamento de preparação do ambiente.",
      },
      {
        id: "l03-45",
        tipo: "multipla_escolha",
        pergunta:
          "Segundo o card 'Execução (com otimização JIT)', a recompilação de trechos que executam com frequência:",
        opcoes: [
          {
            id: "a",
            texto: "É uma etapa fixa que acontece sempre antes da execução",
          },
          {
            id: "b",
            texto:
              "Faz parte das otimizações JIT e acontece durante a execução, não antes",
          },
          {
            id: "c",
            texto: "Só acontece se o desenvolvedor ativar um modo especial",
          },
          { id: "d", texto: "Substitui completamente o parsing inicial" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O card afirma explicitamente que esse processo 'não é uma etapa fixa que acontece antes da execução'.",
      },
      {
        id: "l03-46",
        tipo: "dissertativa",
        pergunta:
          "O que controla 'o que está ativo' durante a execução, segundo o card 3 do resumo?",
        dica: "Já foi definido em detalhe na seção anterior da aula.",
        respostaGabarito: "A Call Stack.",
      },
      {
        id: "l03-47",
        tipo: "dissertativa",
        pergunta:
          "Segundo o card 3, o que acontece quando há um erro de runtime não tratado?",
        dica: "'Interrompem o trecho...'",
        respostaGabarito:
          "Erros de runtime não tratados interrompem o trecho síncrono em que ocorreram.",
      },
      {
        id: "l03-48",
        tipo: "dissertativa",
        pergunta:
          "O texto menciona o motor V8 como exemplo. Em que contexto ele é citado, e o que ele faz nesse contexto?",
        dica: "Está no card 3 do resumo, ligado à otimização.",
        respostaGabarito:
          "V8 é citado como exemplo de motor que, durante a execução, pode compilar e recompilar trechos de código que executam com frequência, para melhorar o desempenho (otimização JIT).",
      },
    ],
  },

  {
    grupo: "6. O que vem a seguir",
    questoes: [
      {
        id: "l03-49",
        tipo: "dissertativa",
        pergunta:
          "Qual é a mensagem central que a aula deixa sobre o processo do motor JavaScript antes/durante a execução, segundo a conclusão do texto?",
        dica: "'Processo contínuo, não duas passagens...'",
        respostaGabarito:
          "Que antes e durante a execução, o motor precisa analisar, preparar e executar o código — um processo contínuo, não duas passagens rígidas e separadas.",
      },
      {
        id: "l03-50",
        tipo: "multipla_escolha",
        pergunta:
          "Qual é o tema anunciado para a PRÓXIMA aula, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Funções e closures" },
          {
            id: "b",
            texto:
              "Erros — como lê-los, o que cada tipo significa, e como o console ajuda a depurar",
          },
          { id: "c", texto: "Programação assíncrona" },
          { id: "d", texto: "Módulos ES6" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto encerra dizendo: 'Na próxima aula vamos focar em erros — como lê-los, o que cada tipo significa, e como o console do browser te ajuda a depurar'.",
      },
    ],
  },
]
