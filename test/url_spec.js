/* eslint-env mocha */
const chai = require('chai');
const url = require('../lib/url');

describe('Urls', function () {
  describe('#isValidNewsUrl()', function () {
    it('should return false', function () {
      const actual = url.isValidNewsUrl('mailto://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html', true);
      chai.assert.isFalse(actual);
    });
    it('should return true', function () {
      const actual = url.isValidNewsUrl('https://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html', true);
      chai.assert.isTrue(actual);
    });
    it('should return false', function () {
      const actual = url.isValidNewsUrl('https://www.huffingtonpost.com/carrer.html', true);
      chai.assert.isFalse(actual);
    });
    it('should return false', function () {
      const actual = url.isValidNewsUrl('https://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.mp3', true);
      chai.assert.isFalse(actual);
    });
    it('should return true', function () {
      const actual = url.isValidNewsUrl('http://www.nytimes.com/2013/12/17/us/politics/federal-judge-rules-against-nsa-phone-data-program.html?hp&_r=0', true);
      chai.assert.isTrue(actual);
    });
    it('should return true', function () {
      const actual = url.isValidNewsUrl('http://shine.yahoo.com/ellen-good-news/won-8217-t-believe-colin-farrell-8217-surprise-190700409.html?vp=1', true);
      chai.assert.isTrue(actual);
    });
    it('should return false', function () {
      const actual = url.isValidNewsUrl('http://shine.yahoo.com/admin/ellen-good-news/', true);
      chai.assert.isFalse(actual);
    });
    it('should return false', function () {
      const actual = url.isValidNewsUrl('http://facebook.com/profile/111132302323/ellen-good-news/', true);
      chai.assert.isFalse(actual);
    });
    it('should return false', function () {
      const actual = url.isValidNewsUrl(undefined, true);
      chai.assert.isFalse(actual);
    });
  });
  describe('#getProtocol', function () {
    it('should return url protocol', function () {
      const actual = url.getProtocol('http://cnn.com');
      const expected = 'http:';
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#getDomainName', function () {
    it('should return url domain name', function () {
      const actual = url.getDomainName('http://cnn.com');
      const expected = 'cnn.com';
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#getPath', function () {
    it('should return url path', function () {
      const actual = url.getPath('http://cnn.com/money/technology');
      const expected = '/money/technology';
      chai.assert.deepEqual(actual, expected);
    });
  });
});
