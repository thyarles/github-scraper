# Github serverless scraper

Scraper do github que adquiri dados de pull requests através de um webhook e armazena-os em jsons arquivados dentro do s3 a fim de possibilitar estudos em cima dos dados feitos através de queries rodadas no athena

## Instalação

1. Instale o npm:
    * ```sudo apt install npm```
2. Instale as dependências:
    * ```npm install```
3. Instale o framework serverless:
    * ```sudo npm install -g serverless```
4. Criar variáveis de ambiente dentro do projeto:
    * ```touch .env```
    * Adicione as seguintes variáveis de ambiente:
        * `GIT_API_KEY`: Contém a chave de autenticação do github, pode ser obitda no [link](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
        * `S3_ACCESS_KEY_ID`e `S3_SECRET_ACCESS_KEY`: São as chaves de autenticaçao da AWS, podem ser obtidas através do [link](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)

## Deploy

Para ser possível fazer o deploy da aplicação é necessário:

1. Configurar o serverless na linha de comando:
    * ```serverless config credentials --provider aws --key < ACCESS_KEY_ID > --secret < SECRET_ACCESS_KEY >```
    * Substitua os campos `ACCESS_KEY_ID` e `SECRET_ACCESS_KEY` pelas credenciais já obtidas da AWS

* Deploy de todo o projeto:

  * ```serverless deploy```

* Deploy de funções específicas:
  * ```serverless deploy -f < FUNCTION_NAME >```
  * Substitua `FUNCTION_NAME` pelo nome da função que deve ser deployada

## Testes

  Os testes unitários da aplicação foram escritos usando o framework [jest](https://jestjs.io/)

  Para rodar os testes:
  * ```npm run test```

## Style guide

  O style guide usado no projeto é [airbnb](https://github.com/airbnb/javascript. O lint do projeto é verificado através do [eslint](https://eslint.org/)

  Para rodar o lint:
  * ```npm run lint```
  
