// src/content/fundamentos/04-erros-e-console.exercicios.js
//
// 50 questões geradas a partir da leitura cirúrgica do conteúdo de
// src/pages/content/fundamentos/04-erros-e-console.js — nenhum fato
// aqui foi trazido de fora do que a aula ensina.
//
// Distribuição:
//   Bloco 1 — Erros são informação, não falha (3)
//   Bloco 2 — Quatro tipos de erro comuns (8)
//   Bloco 3 — SyntaxError (7)
//   Bloco 4 — ReferenceError (8)
//   Bloco 5 — TypeError (8)
//   Bloco 6 — Lendo o stack trace (8)
//   Bloco 7 — O console como ferramenta (6)
//   Bloco 8 — Gancho pra próxima aula (2)
//   Total: 50

export const exerciciosAula04 = [
  {
    grupo: "1. Erros são informação, não falha",
    questoes: [
      {
        id: "l04-01",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, o que um erro bem lido geralmente indica, além do que aconteceu?",
        dica: "Pense em três tipos de pista mencionados na primeira seção.",
        respostaGabarito:
          "Um erro bem lido geralmente indica o que aconteceu e fornece pistas sobre o arquivo, a linha e a sequência de chamadas envolvidas.",
      },
      {
        id: "l04-02",
        tipo: "multipla_escolha",
        pergunta:
          "De acordo com o texto, o que o motor está fazendo ao exibir um erro?",
        opcoes: [
          { id: "a", texto: "Travando a execução por segurança" },
          { id: "b", texto: "Te ajudando a depurar" },
          { id: "c", texto: "Ignorando o restante do código" },
          { id: "d", texto: "Registrando um bug no navegador" },
        ],
        respostaCorreta: "b",
        explicacao: "O texto afirma: 'É o motor te ajudando a depurar'.",
      },
      {
        id: "l04-03",
        tipo: "dissertativa",
        pergunta:
          "Quais três coisas a aula promete ensinar sobre erros e console, segundo a introdução?",
        dica: "Tem 'dissecar', 'ler' e 'usar'.",
        respostaGabarito:
          "Dissecar os tipos de erro mais comuns, aprender a ler o stack trace, e usar o console do browser como ferramenta real de trabalho.",
      },
    ],
  },

  {
    grupo: "2. Quatro tipos de erro comuns",
    questoes: [
      {
        id: "l04-04",
        tipo: "multipla_escolha",
        pergunta:
          "Quais são os quatro tipos de erro estudados nesta aula, segundo o texto?",
        opcoes: [
          {
            id: "a",
            texto: "SyntaxError, ReferenceError, TypeError e RangeError",
          },
          {
            id: "b",
            texto: "SyntaxError, LogicError, NullError e RangeError",
          },
          {
            id: "c",
            texto: "ReferenceError, TypeError, RangeError e NetworkError",
          },
          {
            id: "d",
            texto: "SyntaxError, TypeError, RangeError e TimeoutError",
          },
        ],
        respostaCorreta: "a",
        explicacao:
          "O texto lista exatamente: 'SyntaxError, ReferenceError, TypeError e RangeError'.",
      },
      {
        id: "l04-05",
        tipo: "dissertativa",
        pergunta:
          "Segundo o card do texto, o que é um SyntaxError e quando o motor detecta esse tipo de erro?",
        dica: "Pense em 'código escrito de forma...' e em qual fase isso é detectado.",
        respostaGabarito:
          "É quando o código está escrito de forma inválida. O motor detecta isso durante o parsing: a análise não é concluída, e nenhuma instrução daquele script chega a ser executada.",
      },
      {
        id: "l04-06",
        tipo: "multipla_escolha",
        pergunta: "Segundo o card do texto, quando um ReferenceError acontece?",
        opcoes: [
          { id: "a", texto: "Durante o parsing, antes de qualquer execução" },
          {
            id: "b",
            texto:
              "Em tempo de execução, ao acessar um identificador que não existe no escopo atual ou que está na TDZ",
          },
          { id: "c", texto: "Só quando há erro de digitação em strings" },
          { id: "d", texto: "Apenas em código assíncrono" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O card afirma que acontece 'em tempo de execução', ao acessar identificador inexistente no escopo ou ainda na TDZ.",
      },
      {
        id: "l04-07",
        tipo: "dissertativa",
        pergunta:
          "Dê dois exemplos, segundo o card do texto, do que pode causar um TypeError.",
        dica: "Um envolve chamar algo, o outro envolve acessar uma propriedade.",
        respostaGabarito:
          "Chamar algo que não é função, ou acessar propriedade de null (o card também cita 'operação que o tipo do valor não suporta' de forma geral).",
      },
      {
        id: "l04-08",
        tipo: "multipla_escolha",
        pergunta:
          "Segundo o card do texto, qual das opções abaixo é um exemplo de RangeError?",
        opcoes: [
          { id: "a", texto: "Chamar undefined como função" },
          { id: "b", texto: "Usar uma variável antes de declará-la com let" },
          {
            id: "c",
            texto:
              "Criar um array com tamanho negativo, ou uma recursão que ultrapassa a capacidade da Call Stack",
          },
          { id: "d", texto: "Esquecer uma vírgula entre propriedades" },
        ],
        respostaCorreta: "c",
        explicacao:
          "O card cita exatamente esses dois exemplos: array com tamanho negativo e recursão que ultrapassa a Call Stack.",
      },
      {
        id: "l04-09",
        tipo: "dissertativa",
        pergunta:
          "O card de RangeError menciona a Call Stack. Com base no que você já sabe sobre ela, por que uma recursão sem parada geraria esse tipo de erro?",
        dica: "Pense em quantos contextos de função podem ser empilhados de uma vez.",
        respostaGabarito:
          "Porque cada chamada recursiva empilha um novo contexto de função na Call Stack; se a recursão nunca para, a pilha cresce indefinidamente até ultrapassar a capacidade da Call Stack, o que o motor reporta como RangeError.",
      },
      {
        id: "l04-10",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, por que entender a diferença entre os quatro tipos de erro é importante?",
        dica: "É a última frase da seção 2.",
        respostaGabarito:
          "Porque entender a diferença entre eles acelera muito o processo de depuração.",
      },
      {
        id: "l04-11",
        tipo: "multipla_escolha",
        pergunta:
          "Qual desses tipos de erro é detectado ANTES de qualquer instrução do script rodar, segundo os cards do texto?",
        opcoes: [
          { id: "a", texto: "ReferenceError" },
          { id: "b", texto: "TypeError" },
          { id: "c", texto: "RangeError" },
          { id: "d", texto: "SyntaxError" },
        ],
        respostaCorreta: "d",
        explicacao:
          "Só o SyntaxError é detectado no parsing, antes de qualquer execução — os outros três são erros de tempo de execução.",
      },
    ],
  },

  {
    grupo: "3. SyntaxError — código inválido",
    questoes: [
      {
        id: "l04-12",
        tipo: "dissertativa",
        pergunta:
          "O texto usa uma analogia para explicar o SyntaxError. Qual é essa analogia?",
        dica: "Envolve um texto e um leitor.",
        respostaGabarito:
          "É como entregar um texto com erros de gramática tão graves que o leitor não consegue nem processar a frase.",
      },
      {
        id: "l04-13",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo syntax-error.js, por que a primeira declaração (com vírgula final) NÃO gera erro?",
        opcoes: [
          { id: "a", texto: "Porque vírgula final é sempre ignorada" },
          {
            id: "b",
            texto:
              "Porque vírgula final (trailing comma) é válida em JavaScript moderno",
          },
          { id: "c", texto: "Porque o objeto só tem uma propriedade" },
          { id: "d", texto: "Porque está dentro de um comentário" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O próprio comentário do código explica: 'Vírgula final (trailing comma) — válida em JavaScript moderno'.",
      },
      {
        id: "l04-14",
        tipo: "dissertativa",
        pergunta:
          "No exemplo syntax-error.js, o que exatamente está errado na segunda declaração (const ok)?",
        dica: "Compare com a primeira declaração, que está correta.",
        respostaGabarito:
          "Falta uma vírgula entre as propriedades nome e idade dentro do objeto.",
      },
      {
        id: "l04-15",
        tipo: "multipla_escolha",
        pergunta:
          "Qual mensagem de erro o exemplo do texto mostra para a falta de vírgula entre propriedades?",
        opcoes: [
          { id: "a", texto: "SyntaxError: Unexpected end of input" },
          { id: "b", texto: "SyntaxError: Unexpected identifier 'idade'" },
          { id: "c", texto: "ReferenceError: idade is not defined" },
          { id: "d", texto: "TypeError: Cannot read properties of undefined" },
        ],
        respostaCorreta: "b",
        explicacao:
          "É exatamente a mensagem mostrada no console do exemplo syntax-error.js.",
      },
      {
        id: "l04-16",
        tipo: "dissertativa",
        pergunta:
          "O texto diz que o motor aponta a linha onde 'percebeu' o problema, e não necessariamente onde ele foi cometido. Explique essa ideia com o exemplo dado no texto.",
        dica: "Pense em um parêntese não fechado.",
        respostaGabarito:
          "Um parêntese não fechado na linha 10, por exemplo, pode gerar um erro apontando para a linha 15 — porque o motor só percebe que algo está errado quando chega numa linha posterior tentando fechar a estrutura. Por isso é preciso olhar sempre para as linhas anteriores ao erro.",
      },
      {
        id: "l04-17",
        tipo: "dissertativa",
        pergunta:
          "O texto faz uma ressalva sobre a mensagem exata de um SyntaxError. Qual é essa ressalva?",
        dica: "Está entre parênteses, logo após a dica sobre olhar linhas anteriores.",
        respostaGabarito:
          "A mensagem exata do erro pode variar entre engines e browsers diferentes.",
      },
      {
        id: "l04-18",
        tipo: "codigo",
        pergunta:
          "Escreva um objeto literal chamado pessoa com duas propriedades, nome e idade, SEM erro de sintaxe (com vírgula separando as propriedades). Depois, faça console.log(pessoa.nome).",
        dica: "Lembre-se da vírgula entre as propriedades, ao contrário do exemplo com erro do texto.",
        codigoInicial: "",
        saidaEsperada: "depende do valor escolhido para nome",
      },
    ],
  },

  {
    grupo: "4. ReferenceError — variável inexistente",
    questoes: [
      {
        id: "l04-19",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, quais são as três causas mais comuns de um ReferenceError?",
        dica: "Uma é sobre digitação, outra sobre escopo, outra sobre ordem de declaração.",
        respostaGabarito:
          "Typo no nome, variável fora do escopo, ou uso antes da declaração com let/const (TDZ).",
      },
      {
        id: "l04-20",
        tipo: "multipla_escolha",
        pergunta:
          "No caso de uso antes da declaração com let/const, o texto explica que a variável 'já existe como binding'. O que impede o acesso a ela, então?",
        opcoes: [
          { id: "a", texto: "Ela ainda vale undefined" },
          { id: "b", texto: "Ela está na Temporal Dead Zone (TDZ)" },
          { id: "c", texto: "Ela foi apagada pelo garbage collector" },
          { id: "d", texto: "Ela pertence a outro arquivo" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto diz: 'a variável já existe como binding, mas está na Temporal Dead Zone (TDZ) e ainda não pode ser acessada'.",
      },
      {
        id: "l04-21",
        tipo: "dissertativa",
        pergunta:
          "No exemplo reference-error.js, qual é exatamente o erro de digitação que causa o primeiro ReferenceError?",
        dica: "Compare 'usuario' com o que foi digitado no console.log.",
        respostaGabarito:
          "A variável foi declarada como 'usuario', mas o console.log tenta acessar 'usario' — faltou a letra 'u'.",
      },
      {
        id: "l04-22",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo reference-error.js, por que console.log(resultado) fora da função calcular() lança ReferenceError?",
        opcoes: [
          {
            id: "a",
            texto: "Porque resultado nunca foi declarado em lugar nenhum",
          },
          {
            id: "b",
            texto:
              "Porque resultado só existe dentro do escopo da função calcular()",
          },
          { id: "c", texto: "Porque calcular() nunca foi chamada" },
          { id: "d", texto: "Porque resultado é uma palavra reservada" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do próprio código explica: 'resultado só existe dentro de calcular()'.",
      },
      {
        id: "l04-23",
        tipo: "dissertativa",
        pergunta:
          "Quais são as duas mensagens de erro mostradas no console do exemplo reference-error.js?",
        dica: "Uma para cada variável inacessível.",
        respostaGabarito:
          "'ReferenceError: usario is not defined' e 'ReferenceError: resultado is not defined'.",
      },
      {
        id: "l04-24",
        tipo: "codigo",
        pergunta:
          "Escreva uma função obterIdade() que declara const idade = 25 dentro dela e não retorna nada. Depois, dentro de um bloco try, tente fazer console.log(idade) FORA da função, e no catch imprima apenas 'Erro capturado'.",
        dica: "idade só existe dentro do escopo de obterIdade(), então tentar acessá-la fora vai lançar ReferenceError.",
        codigoInicial: "",
        saidaEsperada: "Erro capturado",
      },
      {
        id: "l04-25",
        tipo: "multipla_escolha",
        pergunta:
          "Qual das situações abaixo NÃO é citada pelo texto como causa comum de ReferenceError?",
        opcoes: [
          { id: "a", texto: "Typo no nome da variável" },
          { id: "b", texto: "Variável fora do escopo" },
          { id: "c", texto: "Uso antes da declaração com let/const" },
          { id: "d", texto: "Dividir um número por zero" },
        ],
        respostaCorreta: "d",
        explicacao:
          "Dividir por zero não é mencionado no texto como causa de ReferenceError — em JavaScript isso nem lança um erro (retorna Infinity), o texto lista apenas as três outras causas.",
      },
      {
        id: "l04-26",
        tipo: "dissertativa",
        pergunta:
          "Compare, com base no texto, a causa 'typo no nome' com a causa 'uso antes da declaração com let/const'. No que elas diferem quanto à existência da variável?",
        dica: "Em uma delas a variável nunca existiu com aquele nome; na outra ela já existe, só não pode ser acessada ainda.",
        respostaGabarito:
          "No typo, a variável com aquele nome exato nunca existiu no escopo. Já no caso de let/const acessada antes da declaração, a variável existe como binding desde o início do escopo, mas está na TDZ — ela só não pode ser acessada até a linha de inicialização ser executada.",
      },
    ],
  },

  {
    grupo: "5. TypeError — operação inválida para o valor",
    questoes: [
      {
        id: "l04-27",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, por que o TypeError é descrito como 'o mais comum no dia a dia'?",
        dica: "A frase em si não dá o motivo — descreva o que ele engloba, segundo o texto.",
        respostaGabarito:
          "O texto não detalha o motivo da frequência, mas explica que ele acontece quando você tenta fazer algo que o tipo do valor não suporta — como chamar undefined como função, acessar propriedade de null, ou iterar sobre algo que não é iterável — situações comuns no dia a dia de quem programa.",
      },
      {
        id: "l04-28",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo type-error.js, por que user.saudar() lança TypeError?",
        opcoes: [
          { id: "a", texto: "Porque user não foi declarado" },
          {
            id: "b",
            texto: "Porque saudar não existe em user — é undefined",
          },
          { id: "c", texto: "Porque saudar está na TDZ" },
          { id: "d", texto: "Porque user é null" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do código explica: 'saudar não existe em user — é undefined'.",
      },
      {
        id: "l04-29",
        tipo: "dissertativa",
        pergunta:
          "No exemplo type-error.js, o que document.getElementById('nao-existe') retorna quando o elemento não é encontrado, e por que isso causa erro na linha seguinte?",
        dica: "Pense no comentário ao lado da linha que causa o erro.",
        respostaGabarito:
          "Retorna null. A linha seguinte tenta acessar elemento.textContent, mas como elemento é null, isso lança TypeError, porque null não tem a propriedade textContent.",
      },
      {
        id: "l04-30",
        tipo: "multipla_escolha",
        pergunta:
          "Qual mensagem completa aparece no console do exemplo type-error.js para o acesso a elemento.textContent?",
        opcoes: [
          { id: "a", texto: "TypeError: Cannot read properties of null" },
          {
            id: "b",
            texto:
              "TypeError: Cannot read properties of null (reading 'textContent')",
          },
          { id: "c", texto: "ReferenceError: elemento is not defined" },
          { id: "d", texto: "TypeError: elemento is not a function" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O console do exemplo mostra a mensagem completa, incluindo qual propriedade estava sendo lida.",
      },
      {
        id: "l04-31",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, em código de DOM, o que geralmente significa um TypeError do tipo 'Cannot read properties of null'?",
        dica: "Está na última frase da seção de TypeError.",
        respostaGabarito:
          "Quase sempre significa que um getElementById ou querySelector não encontrou o elemento esperado e retornou null.",
      },
      {
        id: "l04-32",
        tipo: "codigo",
        pergunta:
          "Escreva um objeto carro com a propriedade modelo. Dentro de um bloco try, chame carro.ligar() (que não existe no objeto) e, no catch, imprima apenas 'Erro capturado'.",
        dica: "ligar não é uma função definida em carro, então chamá-la deve lançar TypeError, capturado pelo catch.",
        codigoInicial: "",
        saidaEsperada: "Erro capturado",
      },
      {
        id: "l04-33",
        tipo: "multipla_escolha",
        pergunta:
          "Quais das situações abaixo o texto cita como causas de TypeError?",
        opcoes: [
          {
            id: "a",
            texto:
              "Chamar undefined como função, acessar propriedade de null, ou iterar sobre algo não iterável",
          },
          { id: "b", texto: "Usar uma variável antes de declará-la com let" },
          { id: "c", texto: "Esquecer uma vírgula em um objeto" },
          { id: "d", texto: "Criar um array com tamanho negativo" },
        ],
        respostaCorreta: "a",
        explicacao:
          "O texto lista exatamente essas três situações como causas de TypeError.",
      },
      {
        id: "l04-34",
        tipo: "dissertativa",
        pergunta:
          "Compare o exemplo user.saudar() com o exemplo elemento.textContent no texto: qual é a diferença na causa raiz de cada TypeError?",
        dica: "Uma é sobre chamar algo que não é função; a outra é sobre acessar propriedade de um valor null.",
        respostaGabarito:
          "user.saudar() falha porque saudar não existe em user — é undefined, e tentar chamar undefined como função gera TypeError. Já elemento.textContent falha porque elemento é null (retornado por getElementById), e tentar ler uma propriedade de null também gera TypeError — são duas causas diferentes do mesmo tipo de erro.",
      },
    ],
  },

  {
    grupo: "6. Lendo o stack trace",
    questoes: [
      {
        id: "l04-35",
        tipo: "dissertativa",
        pergunta: "O que é o stack trace, segundo o texto?",
        dica: "Relacione com o que você já sabe sobre a Call Stack.",
        respostaGabarito:
          "É a pilha de chamadas que levou até o erro, exibida pelo browser quando um erro acontece.",
      },
      {
        id: "l04-36",
        tipo: "multipla_escolha",
        pergunta:
          "Segundo o texto, por onde o stack trace normalmente começa, e por onde deve-se começar a leitura?",
        opcoes: [
          {
            id: "a",
            texto:
              "Começa pelo ponto onde o erro aconteceu; comece a leitura pela primeira entrada",
          },
          {
            id: "b",
            texto:
              "Começa pela chamada inicial do programa; leia de baixo para cima",
          },
          { id: "c", texto: "É sempre exibido em ordem alfabética" },
          { id: "d", texto: "Começa pelo arquivo mais recente modificado" },
        ],
        respostaCorreta: "a",
        explicacao:
          "O texto diz: 'Ele normalmente começa pelo ponto onde o erro aconteceu (...) Comece pela primeira entrada para localizar onde o erro ocorreu'.",
      },
      {
        id: "l04-37",
        tipo: "dissertativa",
        pergunta:
          "No exemplo stack-trace.js, qual linha realmente causa o erro, e por quê?",
        dica: "Veja o comentário ao lado da linha dentro de renderizarPerfil.",
        respostaGabarito:
          "A linha dentro de renderizarPerfil que faz user.nome.toUpperCase() — porque nome é null (definido assim em carregarUser), e chamar toUpperCase() em null lança TypeError.",
      },
      {
        id: "l04-38",
        tipo: "multipla_escolha",
        pergunta:
          "No stack trace simplificado do exemplo, qual é a ordem das três entradas mostradas, da primeira para a última?",
        opcoes: [
          {
            id: "a",
            texto:
              "at renderizarPerfil (app.js:2) → at carregarUser (app.js:7) → at app.js:10",
          },
          {
            id: "b",
            texto:
              "at app.js:10 → at carregarUser (app.js:7) → at renderizarPerfil (app.js:2)",
          },
          {
            id: "c",
            texto:
              "at carregarUser (app.js:7) → at renderizarPerfil (app.js:2) → at app.js:10",
          },
          { id: "d", texto: "As três entradas aparecem em ordem aleatória" },
        ],
        respostaCorreta: "a",
        explicacao:
          "O exemplo mostra exatamente essa ordem: primeiro onde quebrou, depois quem chamou, depois o código global.",
      },
      {
        id: "l04-39",
        tipo: "dissertativa",
        pergunta:
          "No exemplo, o que a entrada 'at carregarUser (app.js:7)' representa, segundo as anotações do texto?",
        dica: "Veja a seta e o texto ao lado dessa linha no console simulado.",
        respostaGabarito:
          "Representa quem chamou a função onde o erro ocorreu — ou seja, carregarUser foi a função que chamou renderizarPerfil, que foi onde o erro de fato aconteceu.",
      },
      {
        id: "l04-40",
        tipo: "multipla_escolha",
        pergunta:
          "Segundo o texto, o que o stack trace do exemplo revela sobre a cadeia de chamadas, do erro até o código global?",
        opcoes: [
          {
            id: "a",
            texto:
              "O erro aconteceu em renderizarPerfil, chamado por carregarUser, chamado pelo código global",
          },
          {
            id: "b",
            texto:
              "O erro aconteceu direto no código global, sem nenhuma função envolvida",
          },
          {
            id: "c",
            texto:
              "carregarUser chamou o código global, que chamou renderizarPerfil",
          },
          { id: "d", texto: "As três funções rodaram em paralelo" },
        ],
        respostaCorreta: "a",
        explicacao:
          "O texto resume: 'o erro aconteceu em renderizarPerfil na linha 2, que foi chamado por carregarUser na linha 7, que por sua vez foi chamado pelo código global na linha 10'.",
      },
      {
        id: "l04-41",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, qual é o benefício prático de saber ler um stack trace dessa forma?",
        dica: "Está na última frase da seção.",
        respostaGabarito:
          "Com essa informação você vai direto ao ponto do problema — sem precisar adivinhar onde o erro pode ter ocorrido.",
      },
      {
        id: "l04-42",
        tipo: "dissertativa",
        pergunta:
          "O texto avisa que a formatação exata do stack trace varia entre browsers. Por que essa ressalva é importante para quem está aprendendo a ler stack traces?",
        dica: "Pense no que pode confundir alguém vendo um stack trace pela primeira vez em um navegador diferente do exemplo.",
        respostaGabarito:
          "Porque o formato exato (indentação, palavras como 'at', ordem visual) pode variar de um browser para outro — quem está aprendendo não deve esperar que todo stack trace apareça formatado exatamente como no exemplo, mas sim reconhecer a lógica geral: onde quebrou, quem chamou, e assim por diante.",
      },
    ],
  },

  {
    grupo: "7. O console como ferramenta real",
    questoes: [
      {
        id: "l04-43",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, para que serve o console.table em relação ao console.log comum?",
        dica: "Pense em 'coleções de objetos' e 'colunas'.",
        respostaGabarito:
          "console.table é melhor para visualizar coleções de objetos como colunas, enquanto console.log simples apenas imprime o objeto.",
      },
      {
        id: "l04-44",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo console-avancado.js, por que o objeto pedido é colocado dentro de um array antes de ser passado para console.table?",
        opcoes: [
          {
            id: "a",
            texto:
              "Porque console.table só aceita arrays, nunca objetos soltos",
          },
          {
            id: "b",
            texto: "Para que suas propriedades virem colunas na tabela exibida",
          },
          { id: "c", texto: "Porque arrays são mais rápidos de processar" },
          { id: "d", texto: "Não há motivo, é só estilo de código" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do próprio código explica: 'colocamos pedido dentro de um array para que suas propriedades virem colunas'.",
      },
      {
        id: "l04-45",
        tipo: "dissertativa",
        pergunta:
          "Segundo o texto, o que console.group e console.groupEnd fazem juntos?",
        dica: "Pense em 'logs relacionados'.",
        respostaGabarito:
          "console.group agrupa logs relacionados, criando uma seção com um título; console.groupEnd fecha esse agrupamento.",
      },
      {
        id: "l04-46",
        tipo: "multipla_escolha",
        pergunta:
          "No exemplo console-avancado.js, o que console.time('processamento') e console.timeEnd('processamento') fazem juntos?",
        opcoes: [
          { id: "a", texto: "Agrupam logs relacionados sob um título" },
          {
            id: "b",
            texto:
              "Medem quanto tempo o trecho de código entre eles leva para rodar",
          },
          { id: "c", texto: "Exibem uma tabela com colunas" },
          { id: "d", texto: "Pausam a execução do script" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O comentário do código explica: 'time — mede quanto tempo um trecho leva'.",
      },
      {
        id: "l04-47",
        tipo: "dissertativa",
        pergunta:
          "O texto faz uma ressalva sobre o valor de tempo mostrado por console.time/console.timeEnd. Qual é essa ressalva?",
        dica: "Aparece tanto no comentário do código quanto no console simulado.",
        respostaGabarito:
          "O valor de tempo varia conforme a máquina (e o código sendo medido) — não é um número fixo e universal.",
      },
      {
        id: "l04-48",
        tipo: "codigo",
        pergunta:
          "Crie um objeto produto com as propriedades nome e preco. Use console.group com o título 'Produto' para agrupar dois console.log: um mostrando o nome e outro mostrando o preço. Feche o grupo com console.groupEnd.",
        dica: "Siga o padrão do exemplo console-avancado.js com console.group/console.log/console.log/console.groupEnd.",
        codigoInicial: "",
        saidaEsperada: "depende dos valores escolhidos para nome e preco",
      },
    ],
  },

  {
    grupo: "8. O que vem a seguir",
    questoes: [
      {
        id: "l04-49",
        tipo: "dissertativa",
        pergunta:
          "Segundo a conclusão do texto, quais três habilidades você deveria ter desenvolvido ao final desta aula?",
        dica: "Ler, interpretar e usar.",
        respostaGabarito:
          "Ler erros, interpretar o stack trace e usar o console como ferramenta de depuração.",
      },
      {
        id: "l04-50",
        tipo: "multipla_escolha",
        pergunta:
          "Qual é o tema anunciado para a PRÓXIMA aula, segundo o texto?",
        opcoes: [
          { id: "a", texto: "Funções e closures" },
          {
            id: "b",
            texto:
              "Comentários — quando usá-los, quando evitá-los, e o que diferencia um comentário útil de ruído no código",
          },
          { id: "c", texto: "Programação assíncrona" },
          { id: "d", texto: "Módulos ES6" },
        ],
        respostaCorreta: "b",
        explicacao:
          "O texto encerra dizendo: 'Na próxima aula vamos falar sobre comentários — quando usá-los, quando evitá-los, e o que diferencia um comentário útil de ruído no código'.",
      },
    ],
  },
]
