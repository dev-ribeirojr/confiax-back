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
DB_HOST = 
DB_PORT = 
DB_USERNAME =
DB_PASSWORD = 
DB_NAME = 
URL_ACCESS_APP = 
PORT =
ADMIN_ROLE_ID =
JWT_SECRET =
DEFAULT_ROLE_ID = 
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


