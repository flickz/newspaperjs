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
exports.getArticlesUrl = async function(categoryUrl){
    //let obj = {}, finalResult = [];    
    if(categoryUrl && typeof categoryUrl === 'string'){
        //TODO: Make categoryUrl array of urls instead of string
        //to support multiple categories
        // for(let cateUrl of categoriesUrl){
        //     let result =  eachCat(cateUrl);            
        //     _.set(obj, 'category', extractor.getCategoryName(cateUrl));
        //     _.set(obj, 'articlesUrl', await result);
        //     finalResult.push(obj);
        // }
        // return finalResult;
        return await eachCat(categoryUrl);
    }else{
        return new Error("Unable to get articles url of ...", categoryUrl)
    }
}

function eachCat(cateUrl){
    return extractor.getArticlesUrl(cateUrl)
}
