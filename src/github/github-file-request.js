class GithubFileRequest {
  getPullRequestFiles(octokit, owner, repo, number) {
    return octokit.pullRequests.getFiles({
      owner,
      repo,
      number
    });
  }
}

module.exports = GithubFileRequest;
