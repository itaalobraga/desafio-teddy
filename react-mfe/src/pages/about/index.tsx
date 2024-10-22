export function About() {
  return (
    <>
      <h1 className="text-[2.25rem] font-[500] mb-[3.5rem]">Sobre o Sistema</h1>
      <p className="text-lg mb-4">
        O sistema foi criado para cadastrar e gerenciar parceiros integrados em
        nossas aplicações, com detalhes sobre onde são utilizados e quais
        clientes são atendidos.
      </p>
      <p className="text-lg mb-4">
        Utilizando uma arquitetura de micro front-ends, o sistema permite que
        diferentes equipes gerenciem funcionalidades de forma independente.
      </p>

      <h2 className="text-[1.75rem] font-[500] mb-3">Tecnologias Utilizadas</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Single SPA</li>
        <li>Angular</li>
        <li>React</li>
        <li>PNPM</li>
        <li>Tailwind CSS</li>
        <li>Docker</li>
      </ul>

      <p className="text-lg">
        Para mais detalhes sobre o projeto, acesse o{" "}
        <a
          href="https://github.com/seu-repositorio/readme"
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
