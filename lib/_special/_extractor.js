'use strict'
const _ = require('lodash');
const tldParser = require('tld-extract');
const network = require('../network');
const config = require('../config');
const url = require('../url');
const _this = this;
const stopWord = [
            'about', 'help', 'privacy', 'legal', 'feedback', 'sitemap',
            'profile', 'account', 'mobile', 'sitemap', 'facebook', 'myspace',
            'twitter', 'linkedin', 'bebo', 'friendster', 'stumbleupon',
            'youtube', 'vimeo', 'store', 'mail', 'preferences', 'maps',
            'password', 'imgur', 'flickr', 'search', 'subscription', 'itunes',
            'siteindex', 'events', 'stop', 'jobs', 'careers', 'newsletter',
            'subscribe', 'academy', 'shopping', 'purchase', 'site-map',
            'shop', 'donate', 'newsletter', 'newsletters', 'product', 'advert', 'info',
            'tickets', 'coupons', 'forum', 'board', 'archive', 'browse',
            'howto', 'how to', 'faq', 'terms', 'charts', 'services',
            'contact', 'plus', 'admin', 'login', 'signup', 'register',
            'developer', 'proxy', 'disclaimer', 'signin', 'signout', 'logout'];

exports._getAllUrls = function($){
    let links = $('a').toArray();
    let urlValues = []
    for(let i=0; i<links.length; i++){
        urlValues[i]=links[i].attribs.href; 
    }
    return urlValues
} 

//TODO: This method needs a little more abstraction
exports._getCategoryUrls = function(sourceUrl, links, categories=[]){
    let categoriesUrl = []
    for(let i=0; i<links.length; i++){
        if(typeof links[i] == 'string'){
            let domain = url.getDomainName(links[i]),
                protocol = url.getProtocol(links[i]),
                path = url.getPath(links[i]),   
                parsedSourceUrl = tldParser(sourceUrl);
            if(domain==null && path==null){
                if(config.verbose) console.log("elim category url "+links[i]+ " for no domain and path");
                continue;
            }
            if(_.startsWith(path, '#')){
                if(config.verbose) console.log("elim category url "+links[i]+" path starts with #");
                continue;
            }            
            if(protocol && (protocol != 'http:' && protocol !='https:')){
                if(config.verbose) console.log("elim category url "+links[i]+" for bad protocol");
                continue; 
            }
            if(domain){
                let parsedlink = tldParser(links[i]);
                if(parsedlink.domain != parsedSourceUrl.domain){
                    if(config.verbose)console.log("elim category url "+links[i]+" for domain mismatch");
                    continue;
                }
                //TODO: Add support for blogger category link;
                //TODO: Abstract regex block to a function
                //CASE1: path with '/category/politics/index.html or /pages/politics/index.html             
                if(/^\/(category|page|pages|section)\/\w+\/(index.html)?$/.test(path) || /^\/[a-z]+\/?(index.html)?$/.test(path)){                                   
                    if(_.endsWith(path, '/')){
                        path = path.slice(0, -1);
                    }
                    let pathChunk = _.split(path, '/');
                                     
                    if(_.indexOf(pathChunk, 'index.html')){
                        pathChunk = _.pull(pathChunk, 'index.html');
                    }

                    if(categories.length > 0){
                        if(_.indexOf(categories, _.last(pathChunk)) !== -1){
                            let newPath = _.join(pathChunk, '/')
                            categoriesUrl.push(sourceUrl+newPath);
                            continue;
                        }    
                    }else if(_.indexOf(stopWord, _.last(pathChunk)) == -1){
                        let newPath = _.join(pathChunk, '/')
                        categoriesUrl.push(sourceUrl+newPath);
                        continue;
                    }
                }
            }else{
                //CASE 2 -path with /sports/index.html or /sports 
                if(/^\/[a-z]+\/?(index.html)?$/.test(path)){
                    let pathChunk = _.split(path, '/');
                    if(_.indexOf(pathChunk, 'index.html')){
                        pathChunk = _.pull(pathChunk, 'index.html');
                    }
                    
                    if(categories.length > 0){
                        if(_.indexOf(categories, _.last(pathChunk)) != -1){
                            let newPath = _.join(pathChunk, '/')
                            categoriesUrl.push(sourceUrl+newPath);
                            continue;
                        }    
                    }else if(_.indexOf(stopWord, _.last(pathChunk)) == -1){
                        let newPath = _.join(pathChunk, '/')
                        categoriesUrl.push(sourceUrl+newPath);
                        continue;
                    }
                }
            }
        }     
    }
    return _.union(categoriesUrl);
}

exports._getArticlesUrl = function($, categoryUrl){
    let articlesUrl = [];
    let links = _this._getAllUrls($);
    
    for(let i=0; i<links.length; i++){
        if(isInvalid(links[i])){
            continue;
        }
        //check news link validity and also ensure the link is related to the category
        //like 'https://www.nytimes.com/2017/05/17/technology/google-io-conference.html'
        //for technology category
        if(url.isValidNewsUrl(links[i]) && links[i].match(_this._getCategoryName(categoryUrl)) != null){
            links[i] = url.removeArgs(links[i]);
            articlesUrl.push(links[i]);
        }
    }
    return _.union(articlesUrl);
}

exports._getCategoryName = function(link){
    let path = url.getPath(link);
    return _.last(_.split(path, '/'));
}

function isInvalid(link){
    if(link === undefined || link === null || link === ''){
        return true;
    }
    return false
}