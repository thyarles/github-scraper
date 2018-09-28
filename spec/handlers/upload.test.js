const mod = require('../../src/handlers/upload');
const jestPlugin = require('serverless-jest-plugin');
const event = require('../__mocks__/eventExample.json');

const lambdaWrapper = jestPlugin.lambdaWrapper;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'upload' });

describe('upload', () => {
  beforeAll((done) => {
    done();
  });

  it('Verify lambda function execution', () => {
    return wrapped.run({ body: { payload: JSON.stringify(event.payload) } }).then((response) => {
      expect(response).toBeDefined();
    });
  });
});
