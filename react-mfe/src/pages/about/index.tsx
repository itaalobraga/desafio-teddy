export function About() {
  return (
    <>
      <h1 className="text-[2.25rem] font-[500] mb-4">Sobre o Projeto</h1>
      <p className="text-lg mb-4">
        Este sistema foi desenvolvido para gerenciar os parceiros integrados nas aplicações, oferecendo uma forma simples de cadastrar, listar, atualizar e excluir esses parceiros. Além disso, também permite o gerenciamento de empresas externas com a mesma facilidade.
      </p>
      <p className="text-lg mb-4">
        A principal ideia do projeto é facilitar a manutenção e integração entre equipes através da utilização de micro front-ends, o que permite que cada funcionalidade seja desenvolvida de forma independente por times diferentes. Isso garante uma maior modularidade e facilita o crescimento e a evolução do sistema ao longo do tempo.
      </p>

      <h2 className="text-[1.75rem] font-[500] mb-3">Tecnologias</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Single SPA:</strong> Para a implementação da arquitetura de micro front-ends, permitindo que cada domínio seja gerido de forma independente.
        </li>
        <li>
          <strong>Angular:</strong> Escolhido para um dos domínios principais, aproveitando a robustez e o ecossistema da versão mais recente.
        </li>
        <li>
          <strong>React:</strong> Utilizado em outros domínios para explorar a flexibilidade e a facilidade de criação de componentes de interface.
        </li>
        <li>
          <strong>PNPM:</strong> Gerenciador de pacotes, escolhido pela sua velocidade e eficiência em comparação com outras soluções como NPM ou Yarn.
        </li>
        <li>
          <strong>Tailwind CSS:</strong> Framework de estilo que me ajudou a criar interfaces rápidas e responsivas de forma eficiente, utilizando uma abordagem de utilitários.
        </li>
        <li>
          <strong>Docker:</strong> Para a containerização do projeto, facilitando o deploy em diferentes ambientes e permitindo que o time de infraestrutura suba o projeto em cloud com maior facilidade.
        </li>
      </ul>
      <p className="text-lg mb-4">
        Este projeto reflete uma jornada de aprendizado e colaboração, onde tecnologias diferentes foram combinadas para oferecer o melhor desempenho e modularidade. A arquitetura de micro front-ends garante que o sistema possa evoluir de forma fluida e escalável.
      </p>

      <h1 className="text-[2.25rem] font-[500] mb-4">Objetivo do Sistema</h1>
      <p className="text-lg mb-4">
        O sistema foi desenvolvido com o objetivo de proporcionar um ambiente onde as empresas possam gerenciar e monitorar os parceiros e suas integrações, tornando o processo de manutenção desses dados mais eficiente e acessível.
      </p>

      <p className="text-lg">
        Para mais detalhes sobre o projeto, acesse o{" "}
        <a
          href="https://github.com/itaalobraga/desafio-teddy"
          className="text-blue-500 underline"
          target="_blank"
        >
          README
        </a>{" "}
        do repositório.
      </p>
    </>
  );
}