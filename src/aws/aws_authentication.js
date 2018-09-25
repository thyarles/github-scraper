const log = require('lambda-log');

class awsAuthentication {
  authenticate(AWS){
    try {
      AWS.config.update({
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
      });

      log.info('Autenticação da AWS ocorreu com sucesso');
    } catch (error) {
      log.error(`Autenticação da AWS ocorreu sem sucesso, erro: ${error}`);
    }
  }
}

module.exports = awsAuthentication;
