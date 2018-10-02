const octokit = require('@octokit/rest')();

class githubAuthentication {
  authenticate() {
    octokit.authenticate({
      type: 'token',
      token: process.env.GIT_API_KEY
    });

    return octokit;
  }
}

module.exports = githubAuthentication;
