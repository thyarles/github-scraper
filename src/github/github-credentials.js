const octokit = require('@octokit/rest')();

class GithubCredentials {
  constructor() {
    this.octokit = octokit;

    this.octokit.authenticate({
      type: 'token',
      token: process.env.GIT_API_KEY
    });
  }

  getCredentials() {
    return this.octokit;
  }
}

module.exports = GithubCredentials;
