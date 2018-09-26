const fs = require('fs');
const path = require('path');

const githubPullRequest = fs.readFileSync(path.resolve( __dirname, '../__mocks__/github_pull_request_data.json'), 'utf8');
const githubPullRequestFiles = fs.readFileSync(path.resolve( __dirname, '../__mocks__/github_pull_request_files_data.json'), 'utf8');
const githubDataClass = require(path.resolve(__dirname, '../../src/github/github_data'));

const githubPullRequestJson = JSON.parse(githubPullRequest);
const githubPullRequestFilesJson = JSON.parse(githubPullRequestFiles);

const githubData = new githubDataClass();

test('Verify if the github files are correctly treated', () => {
  const expectedJson = {
    'owner':'augusto-queirantes',
    'repo':'github-scraper',
    'number':1,
    'title':'Add es6, lint and application logs',
    'user':'augusto-queirantes',
    'created_at':'2018-09-24T18:46:43Z',
    'merged_at':'2018-09-24T18:47:27Z',
    'reviewers':[],
    'labels':[],
    'changed_files':[
      '.eslintrc.json',
      'package-lock.json',
      'package.json',
      'src/aws/aws_authentication.js',
      'src/aws/aws_data.js',
      'src/github/github_authentication.js',
      'src/github/github_data.js',
      'src/handlers/upload.js'
    ]
  };

  expect(githubData).toBeDefined();
  expect(githubData.getPullRequestParsedData(githubPullRequestJson, githubPullRequestFilesJson)).toEqual(expectedJson);
})
