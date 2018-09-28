const path = require('path');

const githubFile = require(path.resolve(__dirname, '../github/github_data.js'));
const awsFile = require(path.resolve(__dirname, '../aws/aws_data.js'));

const githubDataParser = new githubFile();
const awsData = new awsFile();

module.exports.upload = async (event) => {
  let res = JSON.parse(event.body.payload);

  let action = res.action;
  let merged = res.pull_request.merged;
  let owner = res.pull_request.head.repo.owner.login;
  let repo = res.repository.name;
  let number = res.number;
  let pullRequestFilesData = await githubDataParser.getPullRequestFiles(owner, repo, number);
  let githubJson = await githubDataParser.getPullRequestParsedData(res, pullRequestFilesData);

  if (action === 'closed' && merged === true) {
    let request = await awsData.s3Upload(githubJson, number, repo);

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
