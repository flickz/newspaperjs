const chai = require('chai');
const path = require('path');
const _extractor = require('../newspaperjs/lib/_special/_extractor');
const network = require('../newspaperjs/lib/network');

describe("#_extractor", function(){
    let localArticleUrl = path.join(__dirname, 'data/html/newyorktimepost.html');
    let localSourceUrl = path.join(__dirname, 'data/html/newyorktimes.html');
    let localSourceCategoryUrl = path.join(__dirname, 'data/html/newyorktime-tech.html');
   
    describe("#_getAllUrl", function(){
        it.only("Should return an array of string", function(){
            network.getParsedHtml(localArticleUrl).then($=>{
                let actual = _extractor._getAllUrls($);
                chai.assert.typeOf(actual, 'array');
            }).catch(reason=>{
                console.log(reason);
            })
        })
    })
    describe("#_getCategoryUrl", function(){
        it.only("Should return an array of string", function(){
             let actual = _extractor._getCategoryUrls('https://www.nytimes.com', ['https://www.nytimes.com/pages/technology', 
             'https://www.nytimes.com/pages/politics'], ['politics']);
             console.log(actual);
             chai.assert.typeOf(actual, 'array');
        })
    })
    describe("#_getArticlesUrl", function(){
        it.only("Should return an array of string", function(){
            network.getParsedHtml(localSourceCategoryUrl).then($=>{
                let actual = _extractor._getArticlesUrl($, 'https://www.nytimes.com/pages/technology');
                chai.assert.typeOf(actual, 'array');
            }).catch(reason=>{
                console.log(reason);
            })
        })
    })
    describe("#_getCategoryName", function(){
        it.only("should return the category name of a category url", function(){
            let actual = _extractor._getCategoryName('https://www.nytimes.com/pages/technology')
            let expected = 'technology';
            chai.assert.deepEqual(actual, expected);
        })
    })
})
