const path = require('path');

const githubFile = require(path.resolve(__dirname, '../github/github_data.js'));
const getGithuFilesDataFile = require(path.resolve(__dirname, '../github/get_github_data.js'));
const githubAuthenticationFile = require(path.resolve(__dirname, '../github/github_authentication.js'));
const awsFile = require(path.resolve(__dirname, '../aws/aws_data.js'));
const awsAuthenticationFile = require(path.resolve(__dirname, '../aws/aws_authentication.js'));

const githubDataParser = new githubFile();
const awsData = new awsFile();
const getGithuFilesData = new getGithuFilesDataFile();
const githubAuthentication = new githubAuthenticationFile();
const awsAuthentication = new awsAuthenticationFile();

const octokit = githubAuthentication.authenticate();
const aws = awsAuthentication.authenticate();

const s3 = new aws.S3();

module.exports.upload = async (event) => {
  let res = JSON.parse(event.body.payload);

  let action = res.action;
  let merged = res.pull_request.merged;
  let owner = res.pull_request.head.repo.owner.login;
  let repo = res.repository.name;
  let number = res.number;
  let pullRequestFilesData = await getGithuFilesData.getPullRequestFiles(octokit, owner, repo, number);
  let githubJson = await githubDataParser.getPullRequestParsedData(res, pullRequestFilesData);

  if (action === 'closed' && merged === true) {
    let request = await awsData.s3Upload(s3, githubJson, number, repo);

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
