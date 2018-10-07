class GithubDataParser {
  getPullRequestParsedData(webhookData, changedFilesData) {
    console.log(JSON.stringify(webhookData));
    return {
      data: {
        owner: webhookData.head.repo.owner.login,
        repo: webhookData.head.repo.name,
        number: webhookData.number,
        title: webhookData.title,
        user: webhookData.user.login,
        created_at: webhookData.created_at,
        merged_at: webhookData.merged_at,
        reviewers: JSON.stringify({ reviewers: webhookData.requested_reviewers }),
        labels: JSON.stringify({ labels: webhookData.labels }),
        changed_files: JSON.stringify({ 'files': this._parseChangedFiles(changedFilesData) })
      },
      details: {
        state: webhookData.state,
        merged: webhookData.merged
      }
    };
  }

  isMerged(action, merged) {
    return action === 'closed' && merged === true;
  }

  _parseChangedFiles(fileResult) {
    return fileResult.data.map(changedFile => changedFile.filename);
  }
}

module.exports = GithubDataParser;
