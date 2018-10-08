# Github serverless scraper

Scraper do github que trata e armazena dados provenientes de pull requests feitos no github. Esses dados são armazenados no [S3](https://aws.amazon.com/pt/s3/) sempre que um pull request é mergeado. É possível fazer uma integração com o [Athena](https://aws.amazon.com/pt/athena/) para consultar dados já armazenados.

- [Setup](#setup)
  * [Pré-instalação](#pré-instalação)
  * [Instalação](#instalação)
  * [Deploy](#deploy)
  * [Rotas](#rotas)
- [Integração](#integração)
  * [Webhook](#webhook)
  * [Athena](#athena)
- [Desenvolvimento](#desenvolvimento)
  * [Testes](#testes)
  * [Lint](#lint)

## Setup

#### Pré-instalação

É necessário possuir [node](https://nodejs.org/en/) na versão 8.10 e [npm](https://www.npmjs.com/) previamente instalados

#### Instalação

1. Instale as dependências:
    * ```npm install```
2. Instale o framework serverless:
    * ```sudo npm install -g serverless```
3. Criar variáveis de ambiente dentro do projeto:
    * ```touch .env```
    * Adicione as seguintes variáveis de ambiente:
      * `GIT_API_KEY`: Contém a chave de autenticação do github, pode ser obitda no [link](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
      * `S3_ACCESS_KEY_ID`e `S3_SECRET_ACCESS_KEY`: São as chaves de autenticaçao da AWS, podem ser obtidas através do [link](https://aws.amazon.com/blogs/security/wheres-my-secret-access-key/)
      * `S3_BUCKET_NAME`: É o nome do bucket criado no [S3](https://console.aws.amazon.com/s3/home?region=us-east-1)
      * `S3_BUCKET_FOLDER`: É o nome da pasta criada dentro do bucket
    * Exemplo de arquivo `.env`:
      ```
      GIT_API_KEY=bla
      S3_ACCESS_KEY_ID=ble
      S3_SECRET_ACCESS_KEY=bli
      S3_BUCKET_NAME=blo
      S3_BUCKET_FOLDER=blu
      ```

#### Deploy

Para ser possível fazer o deploy da aplicação é necessário:

1. Configure o serverless na linha de comando:
    * ```serverless config credentials --provider aws --key ACCESS_KEY_ID --secret SECRET_ACCESS_KEY```
    * Substitua os campos `ACCESS_KEY_ID` e `SECRET_ACCESS_KEY` pelas credenciais já obtidas da AWS

* Para executar o deploy de todo o projeto:

  * ```serverless deploy```

* Para executar o deploy de funções específicas:
  * ```serverless deploy -f FUNCTION_NAME```
  * Substitua `FUNCTION_NAME` pelo nome da função que deve ser deployada

#### Rotas

1. `/upload-webhook` rota exclusivamente para ser usada pelo webhook do github via *post* para fazer a asserção de arquivos no [S3](https://console.aws.amazon.com/s3/home?region=us-east-1) sempre que um pull request for mergeado

2. `/upload-pull-request/{owner}/{repo}/{number}` deve ser feito um *get* nessa rota, substituindo as variáveis `{owner}` pelo dono do repositório, `{repo}` pelo nome do repositório e `{number}` pelo número do pull request, sempre que quiser adicionar um pull request *já mergeado* ao [S3](https://console.aws.amazon.com/s3/home?region=us-east-1)

## integração

#### Webhook

Para que o webhook funcione corretamente é necessário seguir os seguintes passos:

1. Entre no projeto no github

2. Entre na aba `Settings` do menu localizado entre o nome do projeto e a descrição do projeto

3. Entre na aba `Webhooks` localizada no menu lateral a página

4. Clique no botão `Add webhook` no canto direito da página

5. Adicione a url obtida após o deploy no campo `Payload URL`

6. Troque o `Content type` para `application/json`

7. Selecione `Let me select individual events` e marque somente a opção `Pull requests`

8. Tenha certeza que a opção `Active` está marcada

9. Clique no botão `Update webhook`

#### Athena

Para que o [athena](https://aws.amazon.com/pt/athena/) funcione corretamente é necessário que:

1. Entre na [interface do athena](https://aws.amazon.com/pt/athena/)

2. Certifique-se que está na opção `Query Editor` localizada no topo da página

3. Rode a seguinte query para criar a tabela:

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS sampledb.pull_requests (
  `owner` string,
  `repo` string,
  `number` int,
  `user` string,
  `title` string,
  `created_at` string,
  `merged_at` string,
  `reviewers` string,
  `labels` string,
  `changed_files` string
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  'serialization.format' = '1'
) LOCATION 's3://github-scraper/pull_requests/'
TBLPROPERTIES ('has_encrypted_data'='false');
```

#### Inserção

Para adicionar dados no S3 basta fazer as seguintes alterações no arquivo `scripts/add-single-pr.js`

1. Altere `baseUrl` com a url obtida após o deploy, basta lembrar que precisa ter a terminação `/upload-pull-request` e não possuir `/` no final

2. Altera a variável `owner` com o nome do usuário que é dono do repositório

3. Altere a variável `repo` com o nome do repositório

4. Altere a variável `maxNumber` com o número do último pull request que deseja-se obter os dados

Após fazer essas alterações basta rodar o script usando `node scripts/add-single-pr.js` dentro da pasta raiz do projeto

## Desenvolvimento

#### Testes

  Os testes unitários da aplicação foram escritos usando o framework [jest](https://jestjs.io/)

  Para rodar os testes:
  * ```npm run test```

#### Lint

  O style guide usado no projeto é [airbnb](https://github.com/airbnb/javascript). O lint do projeto é verificado através do [eslint](https://eslint.org/)

  Para rodar o lint:
  * ```npm run lint```
