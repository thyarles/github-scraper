class GithubDataParser {
  getPullRequestParsedData(pullRequestData, changedFilesData) {
    return {
      owner: pullRequestData.pull_request.head.repo.owner.login,
      repo: pullRequestData.repository.name,
      number: pullRequestData.pull_request.number,
      title: pullRequestData.pull_request.title,
      user: pullRequestData.pull_request.user.login,
      created_at: pullRequestData.pull_request.created_at,
      merged_at: pullRequestData.pull_request.merged_at,
      reviewers: pullRequestData.pull_request.requested_reviewers,
      labels: pullRequestData.pull_request.labels,
      changed_files: JSON.stringify({ 'files': this._parseChangedFiles(changedFilesData) })
    };
  }

  isMerge(action, merged) {
    return action === 'closed' && merged === true;
  }

  _parseChangedFiles(fileResult) {
    return fileResult.data.map(changedFile => changedFile.filename);
  }
}

module.exports = GithubDataParser;
