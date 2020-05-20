/* eslint-env mocha */
const chai = require('chai');
const _url = require('../lib/_special/_url');

describe('_Url', function () {
  describe('#_validFileType', function () {
    it('Should return true', function () {
      const actual = _url._validFileType(['story', 'entertainment', 'index.php']);
      chai.assert.isTrue(actual);
    });

    it('Should return false', function () {
      const actual = _url._validFileType(['story', 'entertainment', 'index.htmld']);
      chai.assert.isFalse(actual);
    });
  });
  describe('#_removeFileType', function () {
    it('Should remove file type', function () {
      const actual = _url._removeFileType(['story', 'entertainment', 'index.php']);
      const expected = ['story', 'entertainment', 'index'];
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#_followUrlFormat', function () {
    it('Should return true', function () {
      const actual = _url._followUrlFormat('http://www.x.com', true);
      chai.assert.isTrue(actual);
    });
    it('Should return false', function () {
      const actual = _url._followUrlFormat('https:/x.com', true);
      chai.assert.isFalse(actual);
    });
    it('Should return true', function () {
      const actual = _url._followUrlFormat('http://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html', true);
      chai.assert.isTrue(actual);
    });
    it('Should return false', function () {
      const actual = _url._followUrlFormat('mailto://x.com', true);
      chai.assert.isFalse(actual);
    });
  });
  describe('#_startWithForwardSlash()', function () {
    it('should return true', function () {
      const actual = _url._startWithForwardSlash('/story/cnn/blahblah/index.html');
      chai.assert.isTrue(actual);
    });
    it('should return false', function () {
      const actual = _url._startWithForwardSlash('story/cnn/blahblah/index.html');
      chai.assert.isFalse(actual);
    });
  });
  describe('#_splitPath', function () {
    it('Should return an array', function () {
      const actual = _url._splitPath('story/cnn/blahblah/index.html');
      const expected = ['story', 'cnn', 'blahblah', 'index.html'];
      chai.assert.isArray(actual);
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#_hasFileType', function () {
    it('Should return true', function () {
      const actual = _url._hasFileType(['story', 'index.html']);
      chai.assert.isTrue(actual);
    });
    it('Should return false ', function () {
      const actual = _url._hasFileType(['story', 'index']);
      chai.assert.isFalse(actual);
    });
  });
  describe('#_removeIndex', function () {
    it('should remove index', function () {
      const actual = _url._removeIndex(['story', 'sports', 'index']);
      const expected = ['story', 'sports'];
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#_getDomainName', function () {
    it('should return domain name', function () {
      const actual = _url._getDomainName('flickz.com');
      const expected = 'flickz';
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#_urlHasDate', function () {
    it('should return true', function () {
      const actual = _url._urlHasDate('http://techcrunch.com/2013/12/16/beta-app-store/');
      chai.assert.isTrue(actual);
    });
    it('should return true', function () {
      const actual = _url._urlHasDate('http://www.nytimes.com/2013/12/17/us/politics/federal-judge-rules-against-nsa-phone-data-program.html?hp&_r=0');
      chai.assert.isTrue(actual);
    });
    it('should return true', function () {
      const actual = _url._urlHasDate('http://shine.yahoo.com/ellen-good-news/won-8217-t-believe-colin-farrell-8217-surprise-190700409.html?vp=1');
      chai.assert.isTrue(actual);
    });
    it('should return true', function () {
      const actual = _url._urlHasDate('http://www.techhive.com/article/2052610/sony-exec-ps4-controllers-will-work-on-pcs.html');
      chai.assert.isTrue(actual);
    });
    it('should return false', function () {
      const actual = _url._urlHasDate('http://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html');
      chai.assert.isFalse(actual);
    });
  });
  describe('#_badDomain', function () {
    it('Should return true', function () {
      const actual = _url._badDomain('amazon.com');
      chai.assert.isTrue(actual);
    });
    it('Should return false', function () {
      const actual = _url._badDomain('cnn.com');
      chai.assert.isFalse(actual);
    });
  });
  describe('#_hasNewsSlug', function () {
    it('Should return true', function () {
      const actual = _url._hasNewsSlug('ipad-mini-with-retina-display-and-new-ipad-rumor-roundup', 'cnn');
      chai.assert.isTrue(actual);
    });
    it('Should return false', function () {
      const actual = _url._hasNewsSlug('cnn_is_hiring_new_editors_this-year', 'cnn');
      chai.assert.isFalse(actual);
    });
    it('Should return false', function () {
      const actual = _url._hasNewsSlug('nigeria_is_trying_to_advance-in_tech-year', 'cnn');
      chai.assert.isTrue(actual);
    });
  });
  describe('#_hasBadPath', function () {
    it('should return true', function () {
      const actual = _url._hasBadPath(['admin', 'faq']);
      chai.assert.isTrue(actual);
    });
    it('should return false', function () {
      const actual = _url._hasBadPath(['sports', '/2003/30/22']);
      chai.assert.isFalse(actual);
    });
  });
  describe('#_hasGoodPath', function () {
    it('should return false', function () {
      const actual = _url._hasGoodPath(['admin', 'faq']);
      chai.assert.isFalse(actual);
    });
    it('should return true', function () {
      const actual = _url._hasGoodPath(['sport', '/2003/30/22']);
      chai.assert.isTrue(actual);
    });
  });
  describe('#_hasUrlQuery', function () {
    it('Should return true', function () {
      const actual = _url._hasUrlQuery('http://www.nytimes.com/2013/12/17/us/politics/federal-judge-rules-against-nsa-phone-data-program.html?hp&_r=0');
      chai.assert.isTrue(actual);
    });
    it('Should return false', function () {
      const actual = _url._hasUrlQuery('http://www.nytimes.com/2013/12/17/us/politics/federal-judge-rules-against-nsa-phone-data-program.html/');
      chai.assert.isFalse(actual);
    });
  });
  describe('#_removeArg()', function () {
    it('Should remove all arguments except specified ones', function () {
      const actual = _url._removeArgs('https://www.example.com/foo/?name=seun&age=42&sex=male', ['name', 'age']);
      const expected = 'https://www.example.com/foo/?name=seun&age=42';
      chai.assert.equal(actual, expected);
    });

    it('Should remove all arguments', function () {
      const actual = _url._removeArgs('https://www.example.com/foo/?name=seun&age=42&sex=male');
      const expected = 'https://www.example.com/foo/';
      chai.assert.equal(actual, expected);
    });
    it('Should remove all arguments', function () {
      const actual = _url._removeArgs('https://www.example.com/foo/');
      const expected = 'https://www.example.com/foo/';
      chai.assert.equal(actual, expected);
    });
  });
});
