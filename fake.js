const _ = require('lodash');

const network = require('./newspaperjs/lib/network'),
      extractor = require('./newspaperjs/lib/extractor'),
      config = require('./newspaperjs/lib/config'),
      urlM = require('./newspaperjs/lib/url'),
      path = require('path');
let fileUrl = 'test/data/html';
let categoryUrl = ['https://www.nytimes.com/pages/technology'];


function getArticleUrl(urls){
    let allCategories = []
    let obj = {};
    let articleUrls = []
    if(urls.length > 0){
       return  extractor.getAllUrl(path.join(fileUrl, '/newyorktime-tech.html')).then(links=>{
            if(links.length>0){
                for(let i=0; i<links.length; i++){
                    if(urlM.isValidNewsUrl(links[i]) && links[i].match(getCategoryName(urls[0])) != null){
                        
                    }
                }
                _.set(obj, 'category', getCategoryName(urls[0]));  
                _.set(obj, 'categoriesUrl', articleUrls);
            }
            // allCategories.push(obj);
             return obj;                 
        });
    }
}

let all = []
function getNow(){
   return getArticleUrl(categoryUrl).then(data=>{
         all.push(data)
         return all;
    })
}
getNow().then(data=>{
    console.log(data[0].categoriesUrl);
})

function getCategoryName(url){
    let path = urlM.getPath(url);
    return  _.last(_.split(path, '/'));
}
