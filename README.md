# 🐻 Desafio Teddy - Front-End Developer 
Este projeto visa desenvolver uma aplicação que permita o cadastro de parceiros integrados, A estrutura será baseada em micro front-ends, o que possibilitará que diferentes equipes gerenciem suas partes de forma independente. 
# 🧑‍💻 Tecnologias utilizadas
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
git clone git@github.com:barretoga/teddy-desafio.git
cd teddy-desafio
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
git clone git@github.com:barretoga/teddy-desafio.git
cd teddy-desafio
```

2. **Através do docker compose, faça o build dos serviços/containers:**
```bash
docker compose up --build
```

3. **Veja suas aplicações em:**
http://localhost:9000

# ✅ O que foi feito
- Configuração inicial do projeto com Angular e React utilizando Single SPA.
- Estrutura de diretórios organizada para micro frontends.
- Implementação rotas.
- Estilização utilizando Tailwind CSS.
- CRUD de Empresas e Parceiros
- Implementado no login(mock) a funcionalidade de "Lembrar de mim"
- Paginação compartilhada através de "search params"

# 📝 Tarefas (TODO / TASKS)
| Tarefa                                             | Estimativa de Tempo |
|----------------------------------------------------|---------------------|
| Iniciar as aplicações com Vite no Single-SPA       | 2 dias              |
| Implementar autenticação de usuário                | 2 dias              |
| Adicionar testes unitários e testes e2e            | 3 dias              |
| Melhorar a documentação do projeto                 | 1 dia               |
| Deploy do projeto no GitHub Pages                  | 1 dia e meio        |
| Deploy do projeto no GitHub Pages                  | 1 dia e meio        |
