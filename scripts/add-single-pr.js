const axios = require('axios');

const baseUrl = 'https://tnxh9av0ng.execute-api.us-east-1.amazonaws.com/dev/upload-pull-request';
const owner = 'quero-edu';
const repo = 'github-scraper';
const maxNumber = 16

Array(maxNumber + 1).fill().map((_, currentNumber) => {
  const formatedUrl = `${baseUrl}/${owner}/${repo}/${currentNumber}`;

  axios.get(formatedUrl)
  .then(console.log(`pull request ${currentNumber} executado`))
  .catch(response => console.log(`Erro: ${response} no pull request ${currentNumber}`))
});
