class githubAuthentication {
  authenticate(octokit) {
    octokit.authenticate({
      type: 'token',
      token: process.env.GIT_API_KEY
    });
  }
}

module.exports = githubAuthentication;