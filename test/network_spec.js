/* eslint-env mocha */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

const network = require('../lib/network');

describe('#Network', function () {
  describe(' getParsedHtml', function () {
    this.timeout(15000);
    it.only('Should fulfilled', function () {
      return network.getParsedHtml('https://nytimes.com').should.be.fulfilled;
    });
  });
});
