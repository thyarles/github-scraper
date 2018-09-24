class awsAuthentication {
  authenticate(AWS){
    AWS.config.update({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    });
  }
}

module.exports = awsAuthentication;
