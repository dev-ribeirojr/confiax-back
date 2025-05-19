# 📦 Confiax Backend
Este é o repositório do back-end do projeto Confiax, desenvolvido com NestJS e MySQL.

## 🚀 Tecnologias utilizadas
- NestJS
- TypeORM
- Class-validator
- JWT
- bcrypt
- MySQL


##⚙️ Instalação


1 - Clone o repositório:
```
https://github.com/dev-ribeirojr/confiax-back.git
```

2 - Em seguina navegue até o projeto e installe as dependências:
```
npm install
```

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
DEFAULT_ROLE_ID = // id de uma role que irá ser default para o registro de usuários quando não enviar uma role por padrão utilize uma role de convidado
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

4 - Após criá-las, adicione os respectivos id nas variáveis ADMIN_ROLE_ID e DEFAULT_ROLE_ID no .env.

▶️ Rodando o projeto
Para iniciar o projeto em modo de desenvolvimento:

```
npm run start:dev
```


