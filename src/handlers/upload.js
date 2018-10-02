const path = require('path');

const awsCredentialsFile = require(path.resolve(__dirname, '../aws/aws-credentials.js'));
const awsFileUploadFile = require(path.resolve(__dirname, '../aws/aws-file-upload.js'));
const githubCredentialsFile = require(path.resolve(__dirname, '../github/github-credentials.js'));
const githubFileRequestFile = require(path.resolve(__dirname, '../github/github-file-request.js'));
const githubDataParserFile = require(path.resolve(__dirname, '../github/github-data-parser.js'));

const AwsCredentials = new awsCredentialsFile();
const AwsFileUpload = new awsFileUploadFile();
const GithubCredentials = new githubCredentialsFile();
const GithubDataParser = new githubDataParserFile();
const GithubFileRequest = new githubFileRequestFile();

const octokit = GithubCredentials.getCredentials();
const aws = AwsCredentials.getCredentials();

const s3 = new aws.S3();

module.exports.upload = async (event) => {
  let res = JSON.parse(event.body.payload);

  let action = res.action;
  let merged = res.pull_request.merged;
  let owner = res.pull_request.head.repo.owner.login;
  let repo = res.repository.name;
  let number = res.number;
  let pullRequestFilesData = await GithubFileRequest.getPullRequestFiles(octokit, owner, repo, number);
  let githubJson = await GithubDataParser.getPullRequestParsedData(res, pullRequestFilesData);

  if (action === 'closed' && merged === true) {
    let request = await AwsFileUpload.s3Upload(s3, githubJson, number, repo);

    if (request) {
      return {
        statusCode: 200
      };
    } else {
      return {
        statusCode: 400
      };
    }
  }
};
