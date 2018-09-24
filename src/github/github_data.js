const octokit = require('@octokit/rest')();
const path = require('path');

const githubAuthenticationFile = require(path.resolve( __dirname, '../github/github_authentication.js'));

const githubAuthentication = new githubAuthenticationFile();

githubAuthentication.authenticate(octokit);

class githubData {
  getPullRequestParsedData(pullRequestData, changedFilesData) {
    const { body: { pull_request, repository } } = pullRequestData;

    return  {
      owner: pull_request.head.repo.owner.login,
      repo: repository.name,
      number: pull_request.number,
      title: pull_request.title,
      user: pull_request.user.login,
      created_at: pull_request.created_at,
      merged_at: pull_request.merged_at,
      reviewers: pull_request.requested_reviewers,
      labels: pull_request.labels,
      changed_files: this.parseChangedFiles(changedFilesData)
    };
  }

  parseChangedFiles(fileResult) {
    let filesChanged = [];

    for (let jsonData of fileResult.data) {
      filesChanged.push(jsonData['filename']);
    }

    return filesChanged;
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
