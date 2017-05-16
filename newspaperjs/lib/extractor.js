'use strict'
//Keep all html page extraction code within this file
const cheerio = require('cheerio');
const _ = require('lodash');
const cache = require('memory-cache')
const util = require('./util');
const network = require('./network');
const urls = require('./url');

const ALLOWED_TYPES = ['html', 'htm', 'md', 'rst', 'aspx', 'jsp', 'rhtml', 'cgi',
                 'xhtml', 'jhtml', 'asp', 'php'];
const BAD_DOMAINS = ['amazon.com', 'doubleclick.com', 'twitter.com', 'facebook.com'];

const GOOD_PATHS = ['story', 'article', 'feature', 'featured', 'slides',
              'slideshow', 'gallery', 'news', 'video', 'media',
              'v', 'radio', 'press', 'sport', 'entertainment', 'world', 'technology', 'tech', 'showbiz'];

const BAD_CHUNKS = ['careers', 'contact', 'about', 'faq', 'terms', 'privacy',
              'advert', 'preferences', 'feedback', 'info', 'browse', 'howto',
              'account', 'subscribe', 'donate', 'shop', 'admin'];

function ContentExtractor(sourceUrl){
    this.sourceUrl = sourceUrl;
    this.doc = null;
}
ContentExtractor.prototype.request = function(){
   return network.getParsedHtml(this.sourceUrl)
        .then(function(body){
            return body;
        }).catch(function(err){
            console.error("Failed to get HTML", err);
        })
}
ContentExtractor.prototype.parseHtml = function(){
    this.request().then((result)=>{
        this.doc = result;
        return
    }).catch((err)=>console.log(err));
    console.log(this.doc);
    
}


let cnn = new ContentExtractor('http://cnn.com');
cnn.parseHtml();