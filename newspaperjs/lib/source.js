const _ = require('lodash')
const extractor = require('./extractor');
const article = require('./article');
const network = require('./network')
const path = require('path')

/**
 * 
 * @param {string} url - News website url you want to build
 * @param {array} cateOfInterest - News categories you interested in
 * @return {promise}
 */
exports.getCategoriesUrl = async function(url, cateOfInterest) {
    return await extractor.getCategoryUrls(url, cateOfInterest);
}

/**
 * @param {array} categoriesUrl - Url of categories you interested in
 * @return {promise}
 */
exports.getArticleUrl = async function(categoriesUrl){
    let obj = {}, finalResult = [];
    if(categoriesUrl.length > 0){
        for(let cateUrl of categoriesUrl){
            let result =  eachCat(cateUrl);            
            _.set(obj, 'category', extractor.getCategoryName(cateUrl));
            _.set(obj, 'articlesUrl', await result);
            finalResult.push(obj);
        }
        return finalResult;
    }else{
        return new Error("Unable to get categories url...")
    }
}

function eachCat(cateUrl){
    return extractor.getArticlesUrl(cateUrl)
}
