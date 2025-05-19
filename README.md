# 📦 Confiax Backend
Este é o repositório do back-end do projeto Confiax, desenvolvido com NestJS e MySQL.

## 🚀 Tecnologias utilizadas
- NestJS
- TypeORM
- Class-validator
- JWT
- bcrypt
- MySQL
- Docker


##⚙️ Instalação

1 - Clone o repositório:
```
https://github.com/dev-ribeirojr/confiax-back.git
```

##

2 - Em seguina navegue até o projeto e installe as dependências:
```
npm install
```

##

3 - Crie um arquivo .env na raiz do projeto e adicione as variáveis abaixo:
```
DB_HOST = // host da conexão com o banco
DB_PORT = // porta da conexão com o banco
DB_USERNAME = // username da conexão com o banco
DB_PASSWORD = // password para acessar o banco
DB_NAME = // name do banco
URL_ACCESS_APP = // urls ou url que irá conectar com o projeto
PORT = // porta onde deseja rodar o backend (opcional) por padrão está rodando na porta 3000
ADMIN_ROLE_ID = // id de uma role de administrador
JWT_SECRET = // jwt secrete key
DEFAULT_ROLE_ID =  // id da role "Convidado"
```

⚠️ As variáveis ADMIN_ROLE_ID e DEFAULT_ROLE_ID são essenciais para o sistema de permissões.

🔐 Configuração de Permissões (Roles)
Antes de iniciar a aplicação, crie duas permissões (roles) no banco de dados:

```
{
  "id": "UUID",
  "role": "Admin",
  "createdAt": "...",
  "updatedAt": "..."
}
```
```
{
  "id": "UUID",
  "role": "Convidado",
  "createdAt": "...",
  "updatedAt": "..."
}
```

👤 Criar usuário inicial
Para acessar as rotas protegidas da API, você deve criar um usuário inicial com a role de admin (ADMIN_ROLE_ID).

ao criar um usuário inicial a senha precisa ser um hash com o factor 8, segue uma sugestão abaixo onde equivale a "123123"

```
$2a$08$IXRFOn9CoAGYJDao3Senre21Hx9KtSOwwTsU7kLsFLPC3mu.q5L8a
```

mas se preferir gere a sua própria senha [aqui](https://bcrypt-generator.com/), dev se atentar ao Rounds (Const Factor) 8

##

4 - Após criar a role de admin e usuário, adicione os respectivos id nas variáveis ADMIN_ROLE_ID e DEFAULT_ROLE_ID no .env e crie na tabela de relação user_roles 
```
user_id: id do usuário
role_id: id da role de admin
```

Feito esses passos voce ja irá possuir uma conta para acessar a aplicação
##
5 - Rodando o projeto
Para iniciar o projeto em modo de desenvolvimento:

🔁 Opção 1: Rodar com Docker (Recomendado)
Ideal para quem quer subir rapidamente o projeto sem precisar instalar o MySQL manualmente.

Suba a aplicação com Docker:
```
docker-compose up -d
```
##

🔁 Opção 2: Rodar com MySql local 
Certifique se de que a conexão esteja certa e que o banco exista criado local na sua máquina

```
npm run start:dev
```


