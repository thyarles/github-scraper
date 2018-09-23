const AWS = require('aws-sdk');
const path = require('path');

const awsAuthenticationFile = require(path.resolve( __dirname, './aws_authentication.js'));

const awsAuthentication = new awsAuthenticationFile();

awsAuthentication.authenticate(AWS);

const s3 = new AWS.S3();

class awsData {
  s3Upload(data, fileName, projectName) {
    let params = {
      Bucket: this.getBucketName(),
      Body : JSON.stringify(data),
      Key : this.getFilePath(fileName, projectName)
    };

    return new Promise(function(resolve, reject){
      s3.upload(params, (error, data) => {
        if (data) {
          resolve(data)
        } else if (error) {
          reject(error)
        }
      });
    });
  }

  getBucketName() {
    return 'github-scraper'
  }

  getFilePath(fileName, projectName) {
    return `pull_requests/${fileName} - ${projectName}.json`
  }
}

module.exports = awsData
