/* eslint-env mocha */
const path = require('path');
const Article = require('../lib/article');

describe('Article', function () {
  it.only('Should return object of parsed article', function () {
    const url = path.join(__dirname, 'data/html/newyorktimepost.html');
    return Article(url).then(parsedArticle => {
      // console.log(parsedArticle);
    });
  });
});
