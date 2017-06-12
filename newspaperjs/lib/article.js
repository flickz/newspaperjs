'use strict';
const _ = require('lodash');
const network = require('./network');
const extractor = require('./extractor')

/**
 * 
 * @param {string} url - Url of Article to Parse
 * @return {promise}  - Parsed article 
 */
let Article =  async function (url){
      let $ = network.getParsedHtml(url);
      let Article = {};
         _.set(Article, 'title', extractor.getTitle(await $));
         _.set(Article, 'text', extractor.getText(await $));
         _.set(Article, 'topImage', extractor.getTopImage(await $));
         _.set(Article, 'date', extractor.getDate(await $));
         _.set(Article, 'author', extractor.getAuthor(await $));
         _.set(Article, 'description', extractor.getDescription(await $));
         _.set(Article, 'keywords', extractor.getKeywords(await $));
        return  Article;
}

module.exports = Article;