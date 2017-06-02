const chai = require('chai');
const path = require('path');

const Article = require('../newspaperjs/lib/article');

describe("Article", function(){
    it.only("Should return object of parsed article", function(){
        let url = path.join(__dirname, 'data/html/newyorktimepost.html')
         return Article(url).then(parsedArticle=>{
            console.log(parsedArticle);             
        })
    })
})
