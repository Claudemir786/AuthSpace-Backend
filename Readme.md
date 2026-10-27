# UserAuthAPI

API REST de gerenciamento de usuários desenvolvida com Node.js, Express e TypeScript.

O projeto inclui operações CRUD de usuários, funcionalidade de login, criptografia de senhas com bcrypt e geração de tokens JWT.

## Tecnologias

- Node.js
- Express
- TypeScript
- MySQL
- JWT (JSON Web Token)
- bcrypt

## Funcionalidades

- Cadastro de usuários
- Login de usuários
- Criptografia de senhas com bcrypt
- Geração de token JWT após o login
- Atualização de email do usuário
- Exclusão de conta de usuário

## Como executar o projeto

### Pré-requisitos

- Node.js
- npm
- MySQL

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Claudemir786/UserAuthAPI.git
```

Acesse o diretório do projeto:

```bash
cd UserAuthAPI
```

Instale as dependências:

```bash
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
TOKEN=your_jwt_secret
```

Configure a conexão com o banco de dados de acordo com as configurações do seu projeto.

### Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-------------|
| POST | `/api/users` | Cadastrar um novo usuário |
| POST | `/api/login` | Autenticar um usuário e gerar um JWT |
| PUT | `/api/users/email` | Atualizar o email do usuário |
| DELETE | `/api/users` | Excluir uma conta de usuário |

## Sobre o projeto

Este projeto foi desenvolvido como parte dos meus estudos em desenvolvimento backend e representa meu primeiro projeto utilizando TypeScript.

O objetivo foi colocar em prática os conhecimentos adquiridos na criação de APIs REST com Node.js e Express, explorando conceitos como gerenciamento de usuários, operações CRUD, integração com banco de dados MySQL, criptografia de senhas com bcrypt e geração de tokens JWT.

Além disso, o projeto foi uma oportunidade para começar a trabalhar com tipagem estática e aprofundar meus conhecimentos no desenvolvimento backend.

## Autor

Claudemir Junior

GitHub: [@Claudemir786](https://github.com/Claudemir786)