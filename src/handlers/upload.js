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

module.exports.upload = async (event) => {
  const { body, body: { pull_request, action, number, repository } } = event

  const merged = pull_request.merged;
  const owner = pull_request.head.repo.owner.login;
  const repo = repository.name;

  const pullRequestFilesData = await GithubFileRequest.getPullRequestFiles(octokit, owner, repo, number);
  const githubJson = await GithubDataParser.getPullRequestParsedData(body, pullRequestFilesData);

  if (GithubDataParser.isMerge(action, merged)) {
    return AwsFileUpload.s3Upload(s3, githubJson, number, repo)
      .then(() => { return { 'statusCode': 200 }; })
      .catch(() => { return { 'statusCode': 400 }; });
  }
};
