/* eslint-env mocha */
const util = require('../lib/util');
const chai = require('chai');

describe('#Uti', function () {
  describe('#StringSplitter', function () {
    // TODO: Find the current message a lil naive. change it later
    it('should return an array of a split actual', function () {
      const actual = util.StringSplitter('foo/bar/baz', '/');
      const expected = ['foo', 'bar', 'baz'];
      chai.assert.deepEqual(actual, expected);
    });
  });
  describe('#StringReplace', function () {
    it('should return a new string as expected', function () {
      const actual = util.StringReplace('News is changing\nso is the world', '\n', ' ');
      const expected = 'News is changing so is the world';
      chai.assert.deepEqual(actual, expected);
    });
  });
});
