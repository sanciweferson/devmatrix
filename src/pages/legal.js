// src/pages/legal.js
// ─────────────────────────────────────────────────────────────────────────────
// Responsabilidades deste módulo:
//   1. LegalPage({ slug }) → gera o HTML de Privacidade / Termos / Cookies
//   2. initLegalPage()     → anima a entrada dos elementos após o DOM pronto
//
// Página genérica — mesmo padrão do ModulePage(): um componente, três
// conteúdos diferentes selecionados por `slug`.
//
// Rotas esperadas em routes.js:
//   { path: "/privacidade", component: () => LegalPage({ slug: "privacidade" }) },
//   { path: "/termos",      component: () => LegalPage({ slug: "termos" }) },
//   { path: "/cookies",     component: () => LegalPage({ slug: "cookies" }) },
//
// IMPORTANTE — render.js:
//   initPage(path) decide o init pela quantidade de segmentos da URL.
//   Como essas rotas têm 1 segmento, initPage() vai chamar initModulePage()
//   por engano se você não adicionar um guard antes checando o slug.
//   Veja o snippet sugerido no chat.
// ─────────────────────────────────────────────────────────────────────────────

const LAST_UPDATED = "7 de julho de 2026";

// ─── CONTEÚDO DAS PÁGINAS ───────────────────────────────────────────────────

const LEGAL_PAGES = {

  // ═══════════════════════════════════════════════════════════════════════
  // PRIVACIDADE
  // ═══════════════════════════════════════════════════════════════════════
  privacidade: {
    label: "Política de Privacidade",
    content: () => /* html */ `

      <section class="legal__section">
        <h2 class="legal__section-title">1. Introdução</h2>
        <p>
          O DevMatrix é uma plataforma de estudos de JavaScript, de caráter
          pessoal e educacional, sem fins comerciais. Esta Política de
          Privacidade explica, em conformidade com a Lei Geral de Proteção
          de Dados (Lei nº 13.709/2018 — LGPD), quais dados são tratados
          durante o uso do site, para qual finalidade e quais direitos você
          possui como titular desses dados.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">2. Quem é o controlador dos dados</h2>
        <p>
          O DevMatrix é mantido por Sanciweferson, desenvolvedor responsável
          pelo projeto. Dúvidas relacionadas a esta política podem ser
          enviadas pelos canais de contato listados na seção 9.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">3. Quais dados são tratados</h2>
        <p>
          O DevMatrix não possui sistema de cadastro, login ou formulário
          que colete dados pessoais identificáveis (nome, e-mail, CPF, etc.).
          Os únicos dados armazenados relacionados ao uso da plataforma são:
        </p>
        <ul class="legal__list">
          <li><strong>Progresso das aulas</strong> — quais lições você marcou como concluídas.</li>
          <li><strong>Preferência de tema</strong> — se você usa o modo claro ou escuro.</li>
        </ul>
        <p>
          Esses dados são salvos exclusivamente no <code>localStorage</code>
          do seu próprio navegador — um espaço de armazenamento local do
          dispositivo. Eles <strong>não são enviados, transmitidos ou
          armazenados em nenhum servidor</strong> controlado pelo DevMatrix.
        </p>
        <p>
          Adicionalmente, como o site é hospedado na infraestrutura da
          Vercel, é possível que essa hospedagem registre logs técnicos
          padrão (como endereço IP, tipo de navegador e horário de acesso)
          para fins de operação, segurança e prevenção de abuso — prática
          comum a qualquer provedor de hospedagem na internet. Esses logs
          não são acessados nem processados pelo mantenedor do DevMatrix
          para fins de identificação de usuários.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">4. Finalidade do tratamento</h2>
        <p>
          Os dados salvos em <code>localStorage</code> existem unicamente
          para permitir que a plataforma lembre seu progresso de estudo e
          sua preferência visual entre uma visita e outra, melhorando a
          experiência de uso. Não há finalidade de marketing, publicidade,
          perfilamento comportamental ou venda de dados a terceiros.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">5. Base legal (LGPD, art. 7º)</h2>
        <p>
          O tratamento descrito nesta política se enquadra na hipótese de
          <strong>execução de funcionalidades do próprio serviço</strong>
          solicitadas pelo titular (art. 7º, V, LGPD) — ou seja, o
          armazenamento local existe apenas porque é tecnicamente necessário
          para a funcionalidade de "salvar progresso" que o próprio usuário
          aciona ao usar o site.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">6. Compartilhamento de dados</h2>
        <p>
          O DevMatrix não compartilha, vende ou transfere dados a terceiros,
          pelo simples fato de que não coleta dados pessoais em servidor
          próprio. Os dados de progresso e tema permanecem exclusivamente
          no dispositivo do usuário.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">7. Armazenamento e segurança</h2>
        <p>
          Por serem mantidos localmente no navegador, os dados de progresso
          e tema estão sujeitos às mesmas proteções de segurança do seu
          próprio dispositivo e navegador. Limpar o cache/dados de
          navegação do site, trocar de navegador ou usar modo anônimo
          apaga esses dados permanentemente — não há cópia de backup em
          nenhum servidor.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">8. Seus direitos como titular (LGPD, art. 18)</h2>
        <p>
          Ainda que o DevMatrix não armazene dados pessoais identificáveis
          em servidor, a LGPD garante aos titulares os seguintes direitos,
          que podem ser exercidos a qualquer momento:
        </p>
        <ul class="legal__list">
          <li>Confirmação da existência de tratamento de dados;</li>
          <li>Acesso aos dados tratados;</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
          <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
          <li>Eliminação dos dados tratados com consentimento do titular;</li>
          <li>Informação sobre entidades com as quais os dados foram compartilhados;</li>
          <li>Revogação do consentimento a qualquer momento.</li>
        </ul>
        <p>
          Na prática, como os dados de progresso e tema ficam apenas no seu
          navegador, você já detém controle total sobre eles: basta limpar
          os dados do site nas configurações do seu navegador para
          exercer o direito de eliminação a qualquer momento, sem
          necessidade de solicitação.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">9. Como exercer seus direitos / contato</h2>
        <p>
          Para dúvidas, solicitações ou exercício de qualquer direito
          previsto na LGPD relacionado a esta plataforma, entre em contato
          através dos canais indicados no rodapé do site.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">10. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada a qualquer momento para
          refletir mudanças na plataforma ou na legislação aplicável.
          A data da última atualização está sempre indicada no topo
          desta página.
        </p>
      </section>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TERMOS DE USO
  // ═══════════════════════════════════════════════════════════════════════
  termos: {
    label: "Termos de Uso",
    content: () => /* html */ `

      <section class="legal__section">
        <h2 class="legal__section-title">1. Aceitação dos termos</h2>
        <p>
          Ao acessar e utilizar o DevMatrix, você concorda com os termos
          descritos nesta página. Caso não concorde com algum ponto, o uso
          da plataforma não deve continuar.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">2. Descrição do serviço</h2>
        <p>
          O DevMatrix é uma plataforma gratuita de estudos de JavaScript,
          desenvolvida como projeto pessoal e educacional. O conteúdo é
          oferecido "como está", sem custo, com o objetivo de ensinar
          conceitos de JavaScript de forma aprofundada.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">3. Uso permitido</h2>
        <p>
          Você pode acessar e utilizar o conteúdo do DevMatrix livremente
          para fins de estudo pessoal. Não é permitido:
        </p>
        <ul class="legal__list">
          <li>Reproduzir, redistribuir ou revender o conteúdo das aulas sem autorização;</li>
          <li>Utilizar meios automatizados (bots, scraping) para extrair o conteúdo em massa;</li>
          <li>Tentar comprometer a segurança ou disponibilidade da plataforma.</li>
        </ul>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">4. Propriedade intelectual</h2>
        <p>
          Todo o conteúdo textual, exemplos de código, estrutura das aulas e
          identidade visual do DevMatrix são de autoria de Sanciweferson,
          salvo indicação em contrário. Todos os direitos são reservados,
          conforme indicado no repositório oficial do projeto.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">5. Isenção de responsabilidade</h2>
        <p>
          O conteúdo do DevMatrix tem finalidade exclusivamente educacional.
          Embora produzido com cuidado técnico, não há garantia de que as
          informações estejam livres de erros, estejam sempre atualizadas
          em relação às versões mais recentes da linguagem, ou sejam
          adequadas a qualquer finalidade específica. O uso do conteúdo
          para fins profissionais ou acadêmicos é de responsabilidade do
          próprio usuário.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">6. Disponibilidade do serviço</h2>
        <p>
          Por ser um projeto pessoal, o DevMatrix não possui garantia de
          disponibilidade contínua (SLA). O acesso pode ser interrompido,
          modificado ou descontinuado a qualquer momento, sem aviso prévio,
          sem que isso gere direito a indenização.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">7. Links externos</h2>
        <p>
          O DevMatrix pode conter links para sites, ferramentas ou
          documentações de terceiros (como MDN, especificações ECMAScript,
          entre outros). Não há controle ou responsabilidade sobre o
          conteúdo desses sites externos.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">8. Alterações nestes termos</h2>
        <p>
          Estes termos podem ser atualizados a qualquer momento. O uso
          continuado da plataforma após alterações implica concordância
          com a versão vigente. A data da última atualização está sempre
          indicada no topo desta página.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">9. Lei aplicável e foro</h2>
        <p>
          Estes termos são regidos pelas leis da República Federativa do
          Brasil. Eventuais controvérsias serão submetidas ao foro do
          domicílio do mantenedor do projeto, salvo disposição legal em
          contrário.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">10. Contato</h2>
        <p>
          Dúvidas sobre estes termos podem ser enviadas através dos canais
          de contato indicados no rodapé do site.
        </p>
      </section>
    `,
  },

  // ═══════════════════════════════════════════════════════════════════════
  // COOKIES
  // ═══════════════════════════════════════════════════════════════════════
  cookies: {
    label: "Política de Cookies",
    content: () => /* html */ `

      <section class="legal__section">
        <h2 class="legal__section-title">1. O que são cookies e armazenamento local</h2>
        <p>
          Cookies são pequenos arquivos de texto que sites podem salvar no
          navegador do visitante. O DevMatrix, no entanto, <strong>não
          utiliza cookies tradicionais</strong> — em vez disso, usa a API
          de <code>localStorage</code> do navegador, uma tecnologia
          semelhante em finalidade (guardar informação no dispositivo do
          usuário), mas com funcionamento técnico diferente: os dados não
          são enviados automaticamente ao servidor a cada requisição, como
          acontece com cookies convencionais.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">2. Este site usa cookies de rastreamento?</h2>
        <p>
          Não. No momento, o DevMatrix não utiliza cookies de rastreamento,
          publicidade ou ferramentas de analytics de terceiros (como Google
          Analytics). Caso isso mude no futuro — por exemplo, com a adoção
          de uma ferramenta de métricas de uso — esta página será
          atualizada para refletir com transparência quais cookies passam
          a ser utilizados e com qual finalidade.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">3. O que é armazenado via localStorage</h2>
        <p>
          Os seguintes dados são salvos no <code>localStorage</code> do seu
          navegador, permanecendo apenas no seu dispositivo:
        </p>
        <ul class="legal__list">
          <li><strong>Progresso das aulas</strong> — quais lições foram marcadas como concluídas;</li>
          <li><strong>Preferência de tema</strong> — modo claro ou escuro selecionado;</li>
          <li><strong>Última aula acessada</strong> — usada para retomar de onde você parou.</li>
        </ul>
        <p>
          Nenhum desses dados é transmitido a servidores do DevMatrix ou de
          terceiros.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">4. Cookies técnicos da hospedagem</h2>
        <p>
          O DevMatrix é hospedado na Vercel. É possível que a própria
          infraestrutura de hospedagem utilize cookies técnicos
          estritamente necessários para o funcionamento da entrega de
          conteúdo (CDN) — prática padrão de qualquer provedor de
          hospedagem — independente de qualquer configuração feita pelo
          mantenedor do DevMatrix.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">5. Como gerenciar ou apagar os dados salvos</h2>
        <p>
          Você pode apagar os dados salvos pelo DevMatrix a qualquer
          momento diretamente pelo seu navegador:
        </p>
        <ul class="legal__list">
          <li>Acesse as configurações de privacidade do navegador;</li>
          <li>Procure por "Dados de site" ou "Cookies e dados do site";</li>
          <li>Localize o domínio do DevMatrix e remova os dados armazenados.</li>
        </ul>
        <p>
          Isso apaga permanentemente seu progresso salvo e preferência de
          tema, sem afetar sua navegação em outros sites.
        </p>
      </section>

      <section class="legal__section">
        <h2 class="legal__section-title">6. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada caso o DevMatrix passe a
          utilizar cookies ou ferramentas de terceiros no futuro. A data
          da última atualização está sempre indicada no topo desta página.
        </p>
      </section>
    `,
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// LegalPage({ slug })
//
// Gera o HTML completo de uma página legal (Privacidade, Termos ou Cookies).
// ─────────────────────────────────────────────────────────────────────────────
export function LegalPage({ slug }) {
  const page = LEGAL_PAGES[slug];

  if (!page) {
    return /* html */ `
      <div class="legal legal--not-found">
        <p>Página <strong>${slug}</strong> não encontrada.</p>
        <a href="/" data-link>← Voltar para o início</a>
      </div>`;
  }

  return /* html */ `
    <div class="legal">

      <div class="legal__topbar legal__anim-item">
        <nav class="legal__breadcrumb" aria-label="Breadcrumb">
          <a href="/" data-link>Início</a>
          <span class="legal__breadcrumb-sep">/</span>
          <span>${page.label}</span>
        </nav>
      </div>

      <header class="legal__header legal__anim-item">
        <h1 class="legal__title">${page.label}</h1>
        <p class="legal__updated">Última atualização: ${LAST_UPDATED}</p>
      </header>

      <article class="legal__content legal__anim-item">
        ${page.content()}
      </article>

    </div>
  `;
}


// ─────────────────────────────────────────────────────────────────────────────
// initLegalPage()
//
// Anima a entrada dos elementos, mesmo padrão de initModulePage()/initLesson().
// ─────────────────────────────────────────────────────────────────────────────
export function initLegalPage() {
  requestAnimationFrame(() => {
    document.querySelectorAll(".legal__anim-item").forEach((el, i) => {
      el.style.animationDelay = `${i * 0.08}s`;
      el.classList.add("legal__anim-run");
    });
  });

  return function cleanup() { };
}