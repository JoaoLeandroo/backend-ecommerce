### **API E-COMMERCE BACKEND**

Configurações básicas do projeto

1. Clone o repositório:
    
        git clone https://github.com/JoaoLeandroo/backend-ecommerce.git


2. Instale as depências do projeto:

        npm install


3. Crie um arquivo .env e configure as variáveis de ambiente de acordo com o .env.example


### **Endpoints**

### 1. Registrar usuário - **POST /register**

    Para cadastrar um usuario será necessário fazer uma requisição do tipo **POST** para a rota **/register**, com o seguinte corpo:

```json
{
    "name": "User",
    "email": "example@example.com",
    "password": "passwordExample"
}
```

### 2. Verificar se o Email já está cadastrado - **POST /check-email**

    Para verificar se o email do usuário já está cadastrado, envie uma requisição do tipo **POST** para a rota `/check-email`, com o seguinte corpo:

```json
{
  "email": "example@example.com"
}
```
### 3. Conectar usuário - **POST /session**

    Para conectar o usuario é necessario configurar o JWT_SECRET dentro das variaveis de ambiente, em seguida envie uma requisição do tipo **POST** para a rota `/session`, com o seguinte corpo:

```json
{
    "email": "example@example",
    "password": "passwordExample"
}
```

### 4. Criar uma categoria - **POST /categories**

    Para criar uma nova categoria, o usuário deve atender aos seguintes requisitos:
- **Ser um administrador** (cadastrado na tabela **Admin**).
- **Estar autenticado** com um token JWT válido.

    Se tudo estiver ok, envie uma requisição do tipo **POST** para a rota `/categories`, com o seguinte corpo:

```json
{
    "name": "Digitais"
}
```

### 5. Editar categoria - **POST /edit-categories**

    Para editar uma categoria, o usuário deve atender aos seguintes requisitos:
- **Ser um administrador** (cadastrado na tabela **Admin**).
- **Estar autenticado** com um token JWT válido. 

    Se tudo estiver ok, envie uma requisição do tipo **POST** para a rota `/edit-categories`, com o seguinte corpo:

```json
{
    "id": "id-da-categoria",
    "name": "Novo nome da categoria"
}
```

### 5. Deletar categoria - **POST /delete-categories**

    Para deletar uma categoria, o usuário deve atender aos seguintes requisitos:
- **Ser um administrador** (cadastrado na tabela **Admin**).
- **Estar autenticado** com um token JWT válido. 

    Se tudo estiver ok, envie uma requisição do tipo **POST** para a rota `/delete-categories`, com o seguinte corpo:

```json
{
    "id": "id-da-categoria",
}
```

### 5. Buscar todas as categorias - **GET /list-categories**

    Para buscar todas as categorias cadastradas, pelo usuario Admin, é necessario fazer uma requisição do tipo **GET** para a rota `/list-categories`
