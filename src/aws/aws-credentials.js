const aws = require('aws-sdk');

class AwsCredentials {
  constructor() {
    this.aws = aws;

    this.aws.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });
  }

  getCredentials(){
    return this.aws;
  }
}

module.exports = AwsCredentials;
