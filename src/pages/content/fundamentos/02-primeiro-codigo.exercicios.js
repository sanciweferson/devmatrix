
// src/content/fundamentos/02-primeiro-codigo.exercicios.js
//
// Dados dos exercícios dissertativos da Aula 02 — Primeiro código.
// Mesmo padrão de 01-introducao.exercicios.js.
//
// 50 questões, organizadas em 9 blocos, todas com gabarito.
// q1–q30 vieram de uma sessão com o GPT (com 2 ajustes de formatação);
// q31–q50 completam o conjunto. dica está presente só nas questões mais
// reflexivas/abertas — o resto conta só com o gabarito.

export const exerciciosAula02 = [
  {
    titulo: "Bloco 1 — Onde o JavaScript entra na página",
    questoes: [
      {
        id: "q1",
        texto:
          "Qual é a função da tag <script> em uma página HTML e qual é a relação dela com a execução do JavaScript?",
        gabarito:
          "A tag <script> é o ponto de entrada mais comum pelo qual o HTML carrega JavaScript numa página — é ela que diz ao navegador onde/como encontrar o código a ser executado (embora existam outros contextos, como módulos dinâmicos e Web Workers).",
      },
      {
        id: "q2",
        texto:
          "Quais são as duas formas apresentadas na aula para incluir JavaScript em uma página HTML?",
        gabarito:
          "Inline (código escrito diretamente dentro da tag <script>) e externo (a tag aponta, via src, para um arquivo .js separado).",
      },
      {
        id: "q3",
        texto:
          "Por que, em projetos reais, geralmente é preferível utilizar um arquivo JavaScript externo em vez de escrever todo o código diretamente dentro do HTML?",
        gabarito:
          "Porque manter o código separado do HTML deixa o projeto mais organizado e fácil de manter, e porque um arquivo externo pode ser cacheado pelo navegador entre visitas — o que não acontece com código inline.",
      },
      {
        id: "q4",
        texto:
          "O que acontece quando o navegador encontra uma tag <script> clássica, sem defer ou async, durante a leitura do HTML?",
        gabarito:
          "Ele pausa a leitura do HTML nesse ponto: baixa o arquivo (se for externo) e executa o código ali mesmo, só retomando a leitura do resto da página depois que o script termina.",
      },
      {
        id: "q5",
        texto:
          "Por que um document.getElementById() pode retornar null quando o JavaScript tenta acessar um elemento que ainda não foi criado no DOM?",
        gabarito:
          "Porque, se o elemento buscado ainda não foi lido/criado pelo navegador nesse momento, não existe nenhum nó correspondente no DOM — e getElementById retorna null nesse caso, em vez de lançar um erro.",
      },
    ],
  },
  {
    titulo: "Bloco 2 — Posição do script e o DOM",
    questoes: [
      {
        id: "q6",
        texto:
          "Qual é a diferença entre o navegador retornar null ao procurar um elemento e ocorrer um TypeError ao tentar utilizar esse valor?",
        gabarito:
          "null é apenas um valor — retorná-lo não quebra nada por si só. O TypeError só acontece depois, quando o código tenta usar esse null como se fosse um elemento de verdade (por exemplo, acessando .textContent nele).",
      },
      {
        id: "q7",
        texto:
          "Por que colocar um <script> no final do <body> pode fazer com que o código consiga encontrar os elementos HTML?",
        gabarito:
          "Porque, quando o script está no final do <body>, o navegador já leu e processou todo o HTML anterior antes de chegar e executar o script — os elementos já existem no DOM nesse ponto.",
      },
      {
        id: "q8",
        texto: "O que o atributo defer faz com um arquivo JavaScript externo?",
        gabarito:
          "Faz o navegador baixar o arquivo em paralelo, sem bloquear o parsing do HTML, e só executar o script depois que o documento inteiro foi interpretado (antes do DOMContentLoaded).",
      },
      {
        id: "q9",
        texto:
          "Qual é a principal diferença entre defer e async em relação ao momento em que o JavaScript é executado?",
        gabarito:
          "defer executa o script só depois que todo o HTML foi interpretado; async executa o script assim que o download termina, o que pode acontecer no meio do parsing do HTML, pausando-o nesse instante.",
      },
      {
        id: "q10",
        texto:
          "Por que um script que utiliza async não deve assumir que todo o DOM já está disponível quando ele for executado?",
        gabarito:
          "Porque, com async, o script pode executar antes de o navegador terminar de interpretar o restante do HTML — o download pode acabar no meio do parsing, então não há garantia de que todos os elementos já foram criados.",
      },
    ],
  },
  {
    titulo: "Bloco 3 — defer, async, módulos e o console",
    questoes: [
      {
        id: "q11",
        texto:
          "Por que a ordem de execução é importante quando existem vários scripts utilizando defer?",
        gabarito:
          "Porque a ordem entre scripts defer é preservada — diferente do async — então um script que depende de outro (como uma lib carregada antes do código que a usa) continua funcionando na ordem esperada.",
      },
      {
        id: "q12",
        texto:
          "Para que tipo de script o uso de async pode ser mais apropriado? Explique o motivo.",
        gabarito:
          "Para scripts independentes, que não dependem de outro código nem de uma ordem específica — o exemplo citado na aula é analytics. Como a ordem entre múltiplos scripts async não é garantida, ele só é seguro quando essa ordem não importa.",
      },
      {
        id: "q13",
        texto:
          'O que acontece quando utilizamos type="module" em uma tag <script>? Cite pelo menos duas características apresentadas na aula.',
        gabarito:
          "Ativa o sistema de ES Modules. Duas características citadas na aula: comporta-se como defer por padrão, e roda automaticamente em strict mode com escopo próprio — variáveis não vazam para o window.",
      },
      {
        id: "q14",
        texto:
          "O que é o console do navegador e para que ele pode ser utilizado durante o desenvolvimento JavaScript?",
        gabarito:
          "É a janela para dentro do JavaScript — usado para inspecionar valores, confirmar que o código chegou em determinado ponto e ler erros durante o desenvolvimento.",
      },
      {
        id: "q15",
        texto:
          "Qual é a diferença entre console.log(), console.warn() e console.error()?",
        gabarito:
          "console.log() imprime uma mensagem comum; console.warn() sinaliza um alerta (algo que pode estar errado); console.error() sinaliza que algo quebrou — cada um indica um nível de severidade diferente.",
      },
    ],
  },
  {
    titulo: "Bloco 4 — REPL vs modo script",
    questoes: [
      {
        id: "q16",
        texto:
          'Ao executar console.log("Olá") no console do navegador, por que pode aparecer "Olá" e logo depois undefined?',
        gabarito:
          "Porque toda função em JavaScript sempre retorna algum valor, mesmo sem return escrito — nesse caso o retorno padrão é undefined. O console, comportando-se como um REPL, exibe automaticamente esse retorno além do efeito colateral (a mensagem impressa).",
      },
      {
        id: "q17",
        texto:
          "O que significa a sigla REPL e como esse conceito explica o comportamento do console do navegador?",
        gabarito:
          "REPL significa Read-Eval-Print-Loop: o ambiente lê o que foi digitado, avalia (executa), mostra o resultado (Print) e volta a esperar a próxima linha. É esse 'Print' automático que explica o undefined aparecendo sozinho no console.",
      },
      {
        id: "q18",
        texto: "Qual é a diferença entre o que uma função faz e o valor que ela retorna?",
        dica: "Pensa em duas perguntas separadas: 'o que aconteceu na tela?' vs 'o que a chamada da função devolveu?'",
        gabarito:
          "O que a função faz é o efeito colateral (por exemplo, imprimir algo na tela); o que ela retorna é o valor de retorno — duas coisas independentes que acontecem juntas quando a função roda.",
      },
      {
        id: "q19",
        texto:
          "Por que uma função que não possui um return explícito retorna undefined?",
        gabarito:
          "Porque toda função em JavaScript sempre retorna algo, mesmo sem return escrito — e o retorno padrão, na ausência de um return explícito, é undefined.",
      },
      {
        id: "q20",
        texto:
          'Qual é a diferença entre executar console.log("san") no console do navegador e executar o mesmo código dentro de um arquivo com node app.js?',
        gabarito:
          "No console do navegador, que é um REPL, o retorno da expressão é exibido automaticamente. Com node app.js não existe REPL rodando — é execução em modo script, então só o que for passado explicitamente para console.log() aparece na tela.",
      },
    ],
  },
  {
    titulo: "Bloco 5 — Retorno, efeito colateral e revisão",
    questoes: [
      {
        id: "q21",
        texto:
          "Explique a diferença entre efeito colateral e valor de retorno, utilizando console.log() como exemplo.",
        dica: "console.log() sempre faz as duas coisas ao mesmo tempo: imprime (efeito) e devolve algo (retorno) — o quê ele devolve?",
        gabarito:
          'Efeito colateral é o que a função faz (console.log manda a string pra tela); valor de retorno é o que a função devolve. Em console.log("mensagem"), o efeito colateral é a mensagem impressa, e o retorno (undefined, já que console.log não tem return explícito) é uma coisa separada.',
      },
      {
        id: "q22",
        texto:
          'Considerando duas funções — semReturn(), que só faz console.log("oi") e não tem return, e comReturn(), que faz console.log("oi") e depois return "valor real" — qual é a diferença entre os valores retornados por elas?',
        gabarito:
          'semReturn() não tem return explícito, então seu valor de retorno é undefined. comReturn() tem return "valor real", então seu valor de retorno é a string "valor real". O efeito colateral ("oi" impresso) é idêntico nas duas — só o retorno muda.',
      },
      {
        id: "q23",
        texto:
          "Por que o valor undefined de uma função não aparece automaticamente na tela quando um arquivo JavaScript é executado no modo script?",
        gabarito:
          "Porque, em modo script, não existe um REPL exibindo automaticamente o retorno de cada expressão — o motor do JS ainda calcula o undefined por baixo dos panos, mas nada exibe esse valor a menos que seja passado explicitamente para console.log().",
      },
      {
        id: "q24",
        texto:
          'No exemplo final da aula, por que o defer permite que document.getElementById("titulo") encontre o elemento <h1>?',
        gabarito:
          "Porque defer garante que o script só execute depois que o HTML inteiro (incluindo o elemento #titulo) já foi interpretado pelo navegador — mesmo com o script no <head>, o DOM já está completo quando o código roda.",
      },
      {
        id: "q25",
        texto:
          "Explique, com suas próprias palavras, o ciclo apresentado na aula: HTML carrega → JavaScript roda → página muda.",
        dica: "Pensa nas três etapas como uma sequência: o que o navegador tem antes do script rodar, o que o script faz, e o que muda depois.",
        gabarito:
          "O navegador carrega o HTML, o script JavaScript é executado no momento apropriado (por exemplo, após o parsing, com defer) e então o código altera a página — modificando elementos, textos ou comportamento com base no que foi programado.",
      },
      {
        id: "q26",
        texto:
          'Imagine um <script src="app.js"> no <head>, sem defer, cujo app.js tenta fazer const titulo = document.getElementById("titulo") e depois titulo.textContent = "Olá" — sendo que o elemento #titulo está dentro do <body>. O que pode acontecer, e por quê?',
        gabarito:
          'Sem defer, o script executa assim que é encontrado no <head> — antes do <body> (e portanto de #titulo) ser lido pelo navegador. document.getElementById("titulo") retornaria null, e a tentativa seguinte de fazer titulo.textContent = "Olá" lançaria um TypeError, porque não dá pra acessar uma propriedade de null.',
      },
      {
        id: "q27",
        texto:
          "Explique por que defer é apresentado na aula como uma abordagem moderna para scripts externos que precisam acessar o DOM.",
        dica: "Compara com as duas soluções mais antigas citadas na aula (script sem atributo, e script no fim do body) — o que cada uma resolve e o que ainda falta?",
        gabarito:
          "Porque defer une as vantagens dos dois mundos: o script pode ficar no <head> (onde faz sentido semanticamente), não bloqueia o parsing do HTML, e ainda assim só executa depois que o DOM já está completo — sem precisar do truque legado de colocar o script no fim do <body>.",
      },
      {
        id: "q28",
        texto:
          "Imagine que dois arquivos JavaScript dependam um do outro. Por que utilizar async nos dois pode causar um problema?",
        gabarito:
          "Porque a ordem de execução entre scripts async não é garantida — cada um executa assim que termina de baixar, independentemente do outro. Se um depende do outro já ter rodado, ele pode executar antes e falhar por não encontrar o que precisa.",
      },
      {
        id: "q29",
        texto:
          "Qual é a relação entre o momento em que o navegador faz o parsing do HTML e o momento em que um script JavaScript é executado?",
        dica: "Pensa em três casos separados: sem atributo, com defer, com async — o parsing continua ou pausa em cada um?",
        gabarito:
          "Depende do tipo de script: um script clássico sem defer/async pausa o parsing do HTML pra executar imediatamente; defer espera o parsing terminar; async executa assim que termina de baixar, podendo interromper o parsing no meio.",
      },
      {
        id: "q30",
        texto:
          "Resuma, com suas próprias palavras, o que você aprendeu na Aula 02 sobre como o JavaScript entra em uma página, quando ele é executado e como podemos observar seus resultados.",
        dica: "Tenta amarrar as três perguntas: onde o JS entra, quando ele executa, e como você observa o resultado.",
        gabarito:
          "Uma boa resposta amarra: JavaScript entra na página via <script> (inline ou externo); quando ele executa depende de defer/async/posição no HTML; e os resultados podem ser observados via console — como REPL (retorno exibido automaticamente) ou em modo script (só o que for passado a console.log() aparece).",
      },
    ],
  },
  {
    titulo: "Bloco 6 — O console em detalhe",
    questoes: [
      {
        id: "q31",
        texto:
          "O console.log() aceita quantos argumentos por chamada? Dê um exemplo baseado na aula.",
        gabarito:
          "Aceita múltiplos argumentos numa única chamada — o exemplo da aula é console.log(42, true, [1, 2, 3]), que imprime os três valores juntos.",
      },
      {
        id: "q32",
        texto:
          "Qual a diferença entre usar console.warn() e console.error() em termos do que cada um sinaliza ao desenvolvedor?",
        gabarito:
          "console.warn() sinaliza um alerta — algo que pode estar errado, mas não necessariamente quebrou; console.error() sinaliza que algo de fato quebrou. São níveis de severidade diferentes.",
      },
      {
        id: "q33",
        texto: "Como abrir o console do navegador, segundo a aula?",
        gabarito:
          "Pressionando F12 ou Cmd/Ctrl + Shift + I em qualquer navegador, e depois clicando na aba Console.",
      },
      {
        id: "q34",
        texto:
          'Por que dizer que o console "é a sua janela para dentro do JavaScript" faz sentido, considerando os usos citados na aula (inspecionar valores, confirmar execução, ler erros)?',
        dica: "Pensa no que uma janela de verdade permite fazer: ver o que está do outro lado sem precisar abrir a parede.",
        gabarito:
          "Porque os três usos citados — inspecionar valores, confirmar que o código chegou em certo ponto e ler erros — são exatamente o tipo de coisa que se faz olhando por uma janela: observar o que acontece por dentro do programa sem precisar alterar o código.",
      },
      {
        id: "q35",
        texto:
          "Considerando o exemplo console.log(42, true, [1, 2, 3]), o que esse exemplo demonstra sobre a flexibilidade do console.log()?",
        gabarito:
          "Mostra que console.log() não se limita a um único valor ou tipo — aceita vários argumentos de tipos diferentes (número, booleano, array) na mesma chamada, e todos são exibidos juntos no console.",
      },
    ],
  },
  {
    titulo: "Bloco 7 — REPL: os dois prints",
    questoes: [
      {
        id: "q36",
        texto:
          'O que significa dizer que "toda função em JavaScript sempre retorna algo, mesmo sem return escrito"?',
        gabarito:
          "Significa que não existe função em JavaScript que 'não retorna nada' — mesmo sem um return escrito no código, a função ainda devolve um valor, que por padrão é undefined.",
      },
      {
        id: "q37",
        texto:
          'Na aula, são citados dois "prints" diferentes acontecendo quando se roda console.log("san") no console do navegador. Quais são eles?',
        gabarito:
          'O efeito colateral da própria função console.log (que manda "san" pra tela) e o "Print" do REPL, que exibe o valor de retorno da expressão inteira (undefined, já que console.log não tem return).',
      },
      {
        id: "q38",
        texto:
          'Por que a aula afirma que, fora de um REPL, só um desses dois "prints" existe?',
        dica: "Pensa no que é exclusivo de um REPL — o que ele faz automaticamente que um arquivo rodado com node não faz?",
        gabarito:
          "Porque o 'Print' automático do retorno da expressão é uma característica do ciclo Read-Eval-Print-Loop — fora de um REPL (como ao rodar um arquivo com node app.js) não existe esse mecanismo, então só o efeito colateral (o que foi passado a console.log) aparece.",
      },
      {
        id: "q39",
        texto:
          "O motor do JavaScript continua calculando o valor de retorno de uma função mesmo quando ninguém está vendo esse valor (fora de um REPL)? Explique com base no que a aula diz sobre isso.",
        gabarito:
          "Sim — o cálculo do valor de retorno acontece de qualquer forma, é parte de como toda função em JavaScript funciona. A diferença é só se algo exibe esse valor na tela ou não; fora de um REPL, ele simplesmente não é mostrado.",
      },
      {
        id: "q40",
        texto: "Cite dois ambientes REPL mencionados na aula.",
        gabarito:
          "O console do navegador e o REPL do Node (node rodado sem arquivo, direto no terminal).",
      },
    ],
  },
  {
    titulo: "Bloco 8 — defer, async e type=module (aprofundamento)",
    questoes: [
      {
        id: "q41",
        texto:
          "Segundo a aula, quando exatamente um script defer é executado em relação à leitura do HTML e ao evento DOMContentLoaded?",
        gabarito:
          "Depois que o navegador termina de interpretar (fazer o parsing de) todo o documento HTML, e antes do evento DOMContentLoaded ser disparado.",
      },
      {
        id: "q42",
        texto: 'Por que a aula chama o defer de "o melhor dos dois mundos"?',
        dica: "Compara o que defer resolve do <head> com o que resolve do parsing — os \"dois mundos\" são esses dois problemas.",
        gabarito:
          "Porque ele combina as vantagens dos dois cenários: o script fica no <head>, onde faz sentido semanticamente, não bloqueia o parsing do HTML (baixa em paralelo), e o DOM já está completo quando o código executa.",
      },
      {
        id: "q43",
        texto:
          "O que pode acontecer se dois scripts com async dependerem um do outro? Por que isso é arriscado?",
        gabarito:
          "Pode acontecer de um deles executar antes do outro terminar, já que a ordem entre scripts async não é garantida — se um script precisa de algo que o outro define, ele pode falhar por executar cedo demais.",
      },
      {
        id: "q44",
        texto:
          "Que garantia de ordem existe entre múltiplos scripts com defer, segundo a aula?",
        gabarito:
          "A ordem entre múltiplos scripts defer é preservada — eles executam na mesma ordem em que aparecem no HTML.",
      },
      {
        id: "q45",
        texto:
          'Além de ativar ES Modules, cite as duas características de type="module" que a aula menciona sobre modo strict e escopo de variáveis.',
        gabarito:
          "Roda automaticamente em strict mode, e tem escopo próprio — variáveis declaradas no módulo não vazam para o objeto window.",
      },
    ],
  },
  {
    titulo: "Bloco 9 — Primeiro código real e fechamento",
    questoes: [
      {
        id: "q46",
        texto:
          'No exemplo final da aula, qual elemento HTML tem o texto alterado para "Olá, mundo!" via JavaScript?',
        gabarito:
          'O elemento <h1 id="titulo">, que começa com o texto "Carregando..." e é alterado para "Olá, mundo!" pelo script.',
      },
      {
        id: "q47",
        texto:
          'No mesmo exemplo, o que é escrito dentro do elemento com id="hora"?',
        gabarito:
          "Um texto com a hora em que a página foi carregada, montado com template string: `Página carregada às ${new Date().toLocaleTimeString()}`.",
      },
      {
        id: "q48",
        texto:
          "Por que a aula recomenda não se preocupar em entender cada detalhe do primeiro código real, e sim focar no ciclo completo?",
        dica: "Pensa no que a aula diz logo antes do exemplo, sobre o que é mais importante nesse momento do curso.",
        gabarito:
          "Porque o objetivo do exemplo não é decorar cada detalhe de sintaxe, e sim enxergar o ciclo completo — HTML carrega, script roda, página muda — que é a ideia central da aula.",
      },
      {
        id: "q49",
        texto:
          'No HTML do exemplo "Primeiro código real", qual atributo garante que a página seja interpretada com a codificação UTF-8?',
        gabarito:
          'O atributo charset dentro da tag <meta>: <meta charset="UTF-8">.',
      },
      {
        id: "q50",
        texto: "Segundo a aula, o que será estudado na próxima aula (Aula 03)?",
        gabarito:
          "Como o navegador realmente lê e processa o arquivo .js — o que acontece antes da primeira linha do código rodar.",
      },
    ],
  },
]
