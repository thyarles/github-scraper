const octokit = require('@octokit/rest')();
const log = require('lambda-log');
const path = require('path');

const githubAuthenticationFile = require(path.resolve( __dirname, '../github/github_authentication.js'));

const githubAuthentication = new githubAuthenticationFile();

githubAuthentication.authenticate(octokit);

class githubData {
  getPullRequestParsedData(pullRequestData, changedFilesData) {
    log.info(`pullRequestData: ${JSON.stringify(pullRequestData)}`);
    log.info(`changedFilesData: ${JSON.stringify(changedFilesData)}`);

    const parsedPullRequestData = {
      owner: pullRequestData.pull_request.head.repo.owner.login,
      repo: pullRequestData.repository.name,
      number: pullRequestData.pull_request.number,
      title: pullRequestData.pull_request.title,
      user: pullRequestData.pull_request.user.login,
      created_at: pullRequestData.pull_request.created_at,
      merged_at: pullRequestData.pull_request.merged_at,
      reviewers: pullRequestData.pull_request.requested_reviewers,
      labels: pullRequestData.pull_request.labels,
      changed_files: this.parseChangedFiles(changedFilesData)
    };

    log.info(`parsedPullRequestData: ${JSON.stringify(parsedPullRequestData)}`);
    
    return parsedPullRequestData;
  }

  parseChangedFiles(fileResult) {
    return fileResult.data.map((item) => {
      return item.filename;
    });
  }

  async getPullRequestFiles(owner, repo, number) {
    return octokit.pullRequests.getFiles({
      owner,
      repo,
      number
    });
  }
}

module.exports = githubData;
