# Github scraper

### Setup

* [Configure as credênciais da amazon](https://serverless.com/framework/docs/providers/aws/guide/credentials/) para que o processo de deploy possa ser executado
* Rode um `npn install` para atualizar as dependências
* Caso ainda não exista um arquivo `.env` crie um e adicione as variáveis de ambiente `GIT_API_KEY, S3_ACCESS_KEY_ID e S3_SECRET_ACCESS_KEY`,  com o token de autenticação do github, access e secret access key da amazon
