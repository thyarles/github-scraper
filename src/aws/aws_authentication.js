const aws = require('aws-sdk');

class awsAuthentication {
  authenticate(){
    aws.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });

    return aws;
  }
}

module.exports = awsAuthentication;
