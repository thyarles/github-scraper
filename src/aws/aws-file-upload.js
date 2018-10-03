class AwsFileUpload {
  s3Upload(s3, data, fileName, projectName) {
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Body : JSON.stringify(data),
      Key : this._getFilePath(fileName, projectName)
    };

    return new Promise(function(resolve, reject){
      s3.upload(params, (error, data) => {
        if (data) {
          resolve(data);
        } else if (error) {
          reject(error);
        }
      });
    });
  }

  _getFilePath(fileName, projectName) {
    return `${process.env.S3_BUCKET_FOLDER}/${fileName} - ${projectName}.json`;
  }
}

module.exports = AwsFileUpload;
