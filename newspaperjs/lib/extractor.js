'use strict'
//Keep all html page extraction code within this file
const path = require('path');
const _ = require('lodash');
const config = require('./config');
const util = require('./util');
const network = require('./network');
const _extractor = require('./_special/_extractor')

const dir = '../../test/data/html';

//Extraction wrapper holds every extraction
let Extractor = {
    config: config
}

let urlExtractor = Object.create(Extractor);

urlExtractor.getAllUrl = function(sourceUrl){
    this.sourceUrl = sourceUrl
    this.doc = network.getParsedHtml(this.sourceUrl);
    return this.doc.then($=>{
        return _extractor._getAllUrls($)
    }).catch(reason=>{
        console.error(reason);
    });
}
//TODO: Change url after test
urlExtractor.getCategoryUrls = function(){
    return this.getAllUrl(this.sourceUrl).then(urls=>{
          return _extractor._getCategoryUrls(this.sourceUrl, urls, ['politics', 'sports']); 
    }).catch(reason=>{
        console.error(reason);
    })
}
urlExtractor.getArticleUrl = function(){
    return this.getCategoryUrls().then(categoriesUrl=>{
        let allArticlesUrl = []
        if(categoriesUrl.length>0){
            new Promise((resolve, reject)=>{
                 for(let i=0; i<categoriesUrl.length; i++){
                    _extractor._getArticleUrls(categoriesUrl[i]).then(obj=>{
                        allArticlesUrl.push(obj)
                        if(allArticlesUrl.length >=  categoriesUrl.length){
                            resolve(allArticlesUrl);
                        }
                    })                  
                }
                
            }).then(data=>console.log(data));
        }
        
    }).catch(reason=>{
        console.log(reason);
    })
}
urlExtractor.getAllUrl('https://www.nytimes.com');
urlExtractor.getCategoryUrls();
urlExtractor.getArticleUrl();
//module.exports = urlExtractor;  