const path = require('path');

const githubFile = require(path.resolve(__dirname, '../github/github_data.js'));
const awsFile = require(path.resolve(__dirname, '../aws/aws_data.js'));

const githubDataParser = new githubFile();
const awsData = new awsFile();

module.exports.upload = async (event, context) => {
  const { body: { pull_request, repository } } = event;

  let action = event.body.action;
  let merged = pull_request.merged;
  let owner = pull_request.head.repo.owner.login;
  let repo = repository.name;
  let number = pull_request.number;

  console.log(`action: ${action}`);
  console.log(`merged: ${merged}`);
  console.log(`owner: ${owner}`);
  console.log(`repo: ${repo}`);
  console.log(`number: ${number}`);

  let pullRequestFilesData = await githubDataParser.getPullRequestFiles(owner, repo, number);
  let githubJson = githubDataParser.getPullRequestParsedData(event, pullRequestFilesData);
  console.log(`githubJson: ${githubJson}`);
  console.log(`pullRequestFilesData: ${pullRequestFilesData}`);

  if (action === 'closed' && merged === true) {
    let request = await awsData.s3Upload(githubJson, number, repo)
    console.log(`request: ${request}`);

    if (request) {
      console.log('arquivo gravado');

      return {
        request: request
      };
    } else {
      console.log('arquivo não gravado');

      return {
        error: error
      };
    }
  }
}
