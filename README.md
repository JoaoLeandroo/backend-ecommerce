**API E-COMMERCE BACKEND**

#Configurações básicas do projeto

1. Clone o repositório:
    
    git clone https://github.com/JoaoLeandroo/backend-ecommerce.git


2. Instale as depências do projeto:

    npm install


3. Crie um arquivo .env e configure as variáveis de ambiente de acordo com o .env.example


**Endpoints**

1. Registrar usuário. **/register**

    Para cadastrar um usuario será necessário fazer uma requisição do tipo **POST**, enviando na rota **/register**, as seguintes informações no corpo da requisição: name, email e password.
    
        {
            "name": "User",
            "email": "example@example.com",
            "password": "passwordExample"
        }


### 2. Verificar se o Email já está cadastrado - **POST /check-email**

    Para verificar se o email do usuário já está cadastrado, envie uma requisição do tipo **POST** para a rota `/check-email`, com o seguinte corpo:

```json
{
  "email": "example@example.com"
}