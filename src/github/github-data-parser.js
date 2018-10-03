class GithubDataParser {
  getPullRequestParsedData(pullRequestData, changedFilesData) {
    const { pull_request } = pullRequestData;
    
    return {
      owner: pull_request.head.repo.owner.login,
      repo: pullRequestData.repository.name,
      number: pull_request.number,
      title: pull_request.title,
      user: pull_request.user.login,
      created_at: pull_request.created_at,
      merged_at: pull_request.merged_at,
      reviewers: pull_request.requested_reviewers,
      labels: pull_request.labels,
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
