/* eslint-env mocha */
const chai = require('chai');
const path = require('path');
const _extractor = require('../lib/_special/_extractor');
const network = require('../lib/network');

describe('#_extractor', function () {
  const localArticleUrl = path.join(__dirname, 'data/html/newyorktimepost.html');
  const localSourceCategoryUrl = path.join(__dirname, 'data/html/newyorktime-tech.html');

  describe('#_getAllUrl', function () {
    it('Should return an array of string', function () {
      network.getParsedHtml(localArticleUrl).then($ => {
        const actual = _extractor._getAllUrls($);
        chai.assert.typeOf(actual, 'array');
      }).catch(reason => {
        console.log(reason);
      });
    });
  });
  describe('#_getCategoryUrl', function () {
    it('Should return an array of string', function () {
      const actual = _extractor._getCategoryUrls('https://www.nytimes.com', ['https://www.nytimes.com/pages/technology',
        'https://www.nytimes.com/pages/politics'], ['politics']);
      console.log(actual);
      chai.assert.typeOf(actual, 'array');
    });
  });
  describe('#_getArticlesUrl', function () {
    it('Should return an array of string', function () {
      network.getParsedHtml(localSourceCategoryUrl).then($ => {
        const actual = _extractor._getArticlesUrl($, 'https://www.nytimes.com/pages/technology');
        chai.assert.typeOf(actual, 'array');
      }).catch(reason => {
        console.log(reason);
      });
    });
  });
  describe('#_getCategoryName', function () {
    it('should return the category name of a category url', function () {
      const actual = _extractor._getCategoryName('https://www.nytimes.com/pages/technology');
      const expected = 'technology';
      chai.assert.deepEqual(actual, expected);
    });
  });
});
