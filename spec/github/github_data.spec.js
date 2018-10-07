const fs = require('fs');

const githubPullRequest = fs.readFileSync(__dirname + '/../__mocks__/github_pull_request_data.json', 'utf8');
const githubPullRequestFiles = fs.readFileSync(__dirname + '/../__mocks__/github_pull_request_files_data.json', 'utf8');

const githubPullRequestJson = JSON.parse(githubPullRequest);
const githubPullRequestFilesJson = JSON.parse(githubPullRequestFiles);

const githubDataParserFile = require(__dirname + '/../../src/github/github-data-parser.js');

const GithubDataParser = new githubDataParserFile();

test('Verify if the github files are correctly treated', () => {
  const expectedJson = {
    "data": {
      "changed_files": "{\"files\":[\"src/github/github-data-parser.js\"]}",
      "created_at": "2018-10-04T22:36:05Z",
      "labels": "{\"labels\":[]}",
      "merged_at": "2018-10-04T22:39:13Z",
      "number": 14,
      "owner": "quero-edu",
      "repo": "github-scraper",
      "reviewers": "{\"reviewers\":[]}",
      "title": "Change variabled to json",
      "user": "augusto-queirantes"
    },
    "details": {
      "merged": true,
      "state": "closed"
    }
  };

  expect(GithubDataParser).toBeDefined();
  expect(GithubDataParser.getPullRequestParsedData(githubPullRequestJson, githubPullRequestFilesJson)).toEqual(expectedJson);
})
