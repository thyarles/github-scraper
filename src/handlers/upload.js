const path = require('path');
const log = require('lambda-log');

const githubFile = require(path.resolve(__dirname, '../github/github_data.js'));
const awsFile = require(path.resolve(__dirname, '../aws/aws_data.js'));

const githubDataParser = new githubFile();
const awsData = new awsFile() ;

module.exports.upload = async (event) => {
  log.info(`Processo iniciado, event: ${event}`);

  const { body: { pull_request, repository } } = event;

  let action = event.body.action;
  let merged = pull_request.merged;
  let owner = pull_request.head.repo.owner.login;
  let repo = repository.name;
  let number = pull_request.number;
  let pullRequestFilesData = await githubDataParser.getPullRequestFiles(owner, repo, number);
  let githubJson = githubDataParser.getPullRequestParsedData(event, pullRequestFilesData);

  log.info(`action: ${action}`);
  log.info(`merged: ${merged}`);
  log.info(`owner: ${owner}`);
  log.info(`repo: ${repo}`);
  log.info(`number: ${number}`);
  log.info(`pullRequestFilesData: ${pullRequestFilesData}`);
  log.info(`githubJson: ${githubJson}`);

  if (githubDataParser.isMergePullReques(action, merged)) {
    let request = await awsData.s3Upload(githubJson, number, repo);

    if (request) {
      log.info('Arquivo gravado');

      return {
        request
      };
    } else {
      log.info('Arquivo não gravado');

      return {
        statusCode: 400
      };
    }
  }
};
