# backend-mesha-pay

Esse projeto busca resolver o desafio proposto pela Mesha tecnologia, de implementar com NestJS um backend capaz de alimentar um sistema de atendimentos, onde por um lado o cliente pode criar novos atendimentos com varios serviços, e por outro lado o atendente irá poder iniciar e finalizar esses serviços, calculando o tempo gasto e sua comissão.

| Requisitos    |     Verao     |    Instalação  |
| ------------- | ------------- |  ------------- |
| NodeJs        |     20.11.0   |    <a href="https://redis.io/docs/install/install-redis/"> Install </a>  |
| PostgreSQL    |     16.0-1    |    <a href="https://www.postgresql.org/download/"> Install </a>   |
| NestJs        |     10.3.2    |    <a href="https://docs.nestjs.com/cli/overview"> Install </a>   |


# Funcionalidades

 * Login com email e senha
 * Criação de novo cliente
 * Busca de todos os atendentes (doutores) cadastrados
 * Criação de novo serviço
 * Deleção de novo serviço
 * Busca de um serviço
 * Atualização de um serviço
 * Busca de todos os serviços
 * Criação de um atendimento, por parte do cliente
 * Busca de todos os atendimentos abertos, pelos atendentes
 * Busca de todos os atendimentos de um usuário já finalizados
 * Finalização de um atendimento

# Variáveis de ambiente

Para a correta execução da aplicação é necessário que sejam configuradas as variáveis de ambiente disponíveis no arquivo .env.example, na raiz do projeto. Essas variáveis são utilizadas para conexão com o banco de dados e para configuração do Json Web Token.

# Instalação e Configuração

Siga os seguintes passos para instalação e correta execução do projeto:

* 1 - clone esse repositório no seu computador e navegue até a pasta do projeto
  ```git clone git@github.com:silvavinicyus/backend-mesha-pay.git```
  ```cd backend-mesha-pay```

* 2 - Instale as dependencias do projeto
  ```npm install```

* 3 - Crie um novo arquivo .env e adicione nele as variáveis de ambiente do seu computador, utilize como base o arquivo .env.example
* 4 - Execute o projeto para rodar as migrações do banco de dados
  ```npm run start:dev```
* 5 - Com a ajuda de um programa como Insomnia / Postman ou com o seu terminal/powershell faça uma requisição post para cada uma das seguintes rodas da API:
 - /users/seeds
 - /procedures/seeds
* 6 - O projeto está configurado e pronto para uso.
  
