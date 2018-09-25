const log = require('lambda-log');

class githubAuthentication {
  authenticate(octokit) {
    try {
      octokit.authenticate({
        type: 'token',
        token: process.env.GIT_API_KEY
      });

      log.info('Autenticação do Github ocorreu com sucesso');
    } catch (error) {
      log.error(`Autenticação do Github ocorreu sem sucesso, erro: ${error}`);
    }
  }
}

module.exports = githubAuthentication;
