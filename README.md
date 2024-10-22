# 🐻 Desafio Teddy - Front-End Developer 
Este sistema foi desenvolvido para gerenciar os parceiros integrados nas aplicações, oferecendo uma forma simples de cadastrar, listar, atualizar e excluir esses parceiros. Além disso, também permite o gerenciamento de empresas externas com a mesma facilidade.

A principal ideia do projeto é facilitar a manutenção e integração entre equipes através da utilização de micro front-ends, o que permite que cada funcionalidade seja desenvolvida de forma independente por times diferentes. Isso garante uma maior modularidade e facilita o crescimento e a evolução do sistema ao longo do tempo.

A estrutura será baseada em micro front-ends, o que possibilitará que diferentes equipes gerenciem suas partes de forma independente. 

<a href="http://www.youtube.com/watch?feature=player_embedded&v=vZV8XW7XES0" target="_blank">
 <img src="http://img.youtube.com/vi/vZV8XW7XES0/mqdefault.jpg" alt="Watch the video" width="320" height="180" border="10" />
</a>

https://youtu.be/vZV8XW7XES0

# 🧑‍💻 Tecnologias
- Single SPA;
- Angular@~15;
- React;
- Webpack@~5;
- PNPM@^8.6.12;
- Tailwindcss;
- Docker;

# ⚙️ Rodando localmente
Certifique-se de que as seguintes ferramentas estejam instaladas:

- PNPM@^8.6.12
- Node@^21.7.3
- Angular@~15.2.0
  
1. **Clone o repositório:**
```bash
git clone https://github.com/itaalobraga/desafio-teddy.git
cd desafio-teddy
```

2. **Root config**
```bash
pnpm i
pnpm start
```

3. **React-MFE**
```bash
cd react-mfe
pnpm i
pnpm start  
```

4. **Angular-MFE**
```bash
cd angular-mfe
pnpm i
pnpm start
```

# 🐋 Rodando via Docker(recomendado)
Certifique-se de que as seguintes ferramentas estejam instaladas:

- Docker

1. **Clone o repositório:**
```bash
git clone https://github.com/itaalobraga/desafio-teddy.git
cd desafio-teddy
```

2. **Através do docker compose, faça o build dos serviços/containers:**
```bash
docker compose up --build
```

3. **Veja suas aplicações em:**
http://localhost:9000

# 🧪 Rodando Testes E2E

**Observação:** Atualmente, apenas um micro front-end (React-MFE) possui testes E2E implementados.

Certifique-se de que as seguintes ferramentas estejam instaladas:

- Docker
- Cypress

1. **Clone o repositório:**
```bash
git clone https://github.com/itaalobraga/desafio-teddy.git
cd desafio-teddy
```

2. **Através do docker compose, faça o build dos serviços/containers:**
```bash
docker compose up --build
```

3. **Instale as dependências do React-MFE**
```bash
cd react-mfe
pnpm i
```

3. **Execute os testes E2E em modo headless:**
```bash
pnpm run e2e:headless
```

4. **Execute os testes E2E com a interface gráfica:**
```bash
pnpm run e2e
```

# ✅ O que foi feito
- Configuração inicial do projeto com Angular e React utilizando Single SPA.
- Estrutura de diretórios organizada para micro frontends.
- Implementação rotas.
- Estilização utilizando Tailwind CSS.
- CRUD de Empresas e Parceiros
- Implementado no login(mock) a funcionalidade de "Lembrar de mim"
- Paginação compartilhada através de "search params"
- Testes e2e no microfrontend em React

# 📝 Tarefas
| Tarefa                                             | Estimativa de Tempo |
|----------------------------------------------------|---------------------|
| Iniciar as aplicações com Vite no Single-SPA       | 2 dias              |
| Implementar autenticação de usuário                | 2 dias              |
| Adicionar testes unitários                         | 3 dias              |
| Adicionar testes e2e no angular-mfe                | 1 dia               |
| Melhorar a documentação do projeto                 | 1 dia               |
| Deploy do projeto no GitHub Pages e/ou Vercel      | 1 dia e meio        |
