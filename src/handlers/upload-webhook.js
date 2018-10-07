const awsCredentialsFile = require(__dirname + '/../aws/aws-credentials.js');
const awsFileUploadFile = require(__dirname + '/../aws/aws-file-upload.js');
const githubCredentialsFile = require(__dirname + '/../github/github-credentials.js');
const githubFileRequestFile = require(__dirname + '/../github/github-file-request.js');
const githubDataParserFile = require(__dirname + '/../github/github-data-parser.js');

const AwsCredentials = new awsCredentialsFile();
const AwsFileUpload = new awsFileUploadFile();
const GithubCredentials = new githubCredentialsFile();
const GithubDataParser = new githubDataParserFile();
const GithubFileRequest = new githubFileRequestFile();

const octokit = GithubCredentials.getCredentials();
const aws = AwsCredentials.getCredentials();

const s3 = new aws.S3();

module.exports.uploadWebhook = async (event) => {
  const { body: { pull_request, number, repository } } = event;

  const owner = pull_request.head.repo.owner.login;
  const repo = repository.name;

  const pullRequestFilesData = await GithubFileRequest.getPullRequestFiles(octokit, owner, repo, number);
  const githubJson = await GithubDataParser.getPullRequestParsedData(pull_request, pullRequestFilesData);

  const { data, details: { state, merged } } = githubJson;

  if (GithubDataParser.isMerged(state, merged)) {
    return AwsFileUpload.s3Upload(s3, data, number, repo)
      .then(() => { return { 'statusCode': 200 }; })
      .catch(() => { return { 'statusCode': 400 }; });
  }
};
