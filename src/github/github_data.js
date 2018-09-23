const octokit = require('@octokit/rest')()
const path = require('path');

const githubAuthenticationFile = require(path.resolve( __dirname, "../github/github_authentication.js"));

const githubAuthentication = new githubAuthenticationFile();

githubAuthentication.authenticate(octokit);

class githubData {
  getPullRequestParsedData(pullRequestData, changedFilesData) {
    console.log(`pull_request_data: ${pullRequestData}`);
    console.log(`changedFilesData: ${changedFilesData}`);

    const { body: { pull_request, repository } } = pullRequestData;
    console.log(`pull_request: ${pull_request}`);
    console.log(`repository: ${repository}`);

    let json =  {
      owner: pull_request.head.repo.owner.login,
      repo: repository.name,
      number: number,
      title: pull_request.title,
      user: pull_request.user.login,
      created_at: pull_request.created_at,
      merged_at: pull_request.merged_at,
      reviewers: pull_request.requested_reviewers,
      labels: pull_request.labels,
      changed_files: this.parseChangedFiles(changedFilesData)
    };
    console.log(`json: ${json}`);

    return json;
  }

  parseChangedFiles(fileResult) {
    let filesChanged = [];

    for (let jsonData of fileResult.data) {
      console.log(`jsonData: ${jsonData}`);
      filesChanged.push(jsonData['filename']);
    }

    console.log(`filesChanged: ${filesChanged}`)
    return filesChanged;
  }

  async getPullRequestFiles(owner, repo, number) {
    return octokit.pullRequests.getFiles({
      owner: owner,
      repo: repo,
      number: number
    });
  }
}

module.exports = githubData;
