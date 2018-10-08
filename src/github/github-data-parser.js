class GithubDataParser {
  getPullRequestParsedData(webhookData, changedFilesData, reviewersData) {
    return {
      data: {
        owner: webhookData.head.repo.owner.login,
        repo: webhookData.head.repo.name,
        number: webhookData.number,
        title: webhookData.title,
        user: webhookData.user.login,
        created_at: webhookData.created_at,
        merged_at: webhookData.merged_at,
        reviewers: JSON.stringify({ reviewers: this._parseReviewers(reviewersData) }),
        labels: JSON.stringify({ labels: this._parseLabels(webhookData.labels) }),
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

  _parseReviewers(reviewersData) {
    let reviewers = [];

    reviewersData.data.filter((reviewerData) => {
      if (!(reviewers.includes(reviewerData.user.login))) {
        reviewers.push(reviewerData.user.login);
      }
    });

    return reviewers;
  }

  _parseLabels(labelsData) {
    return labelsData.map(label => label.name);
  }
}

module.exports = GithubDataParser;
