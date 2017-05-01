'use strict'
const urlPaser = require('url');
const _ = require('lodash');
const ALLOWED_TYPES = ['html', 'htm', 'md', 'rst', 'aspx', 'jsp', 'rhtml', 'cgi',
                 'xhtml', 'jhtml', 'asp'];

const GOOD_PATHS = ['story', 'article', 'feature', 'featured', 'slides',
              'slideshow', 'gallery', 'news', 'video', 'media',
              'v', 'radio', 'press'];

const BAD_DOMAINS = ['amazon', 'doubleclick', 'twitter'];
/**
 * Returns url without argument or with specified param argument
 * @param {String} url - Url to remove 
 * @param {Array} [keep_param] - Params to keep
 * @returns {String} - Modified url
 */
exports.removeArgs = function(url, keep_params=[]){
    let parsedUrl = urlPaser.parse(url, true);
    let filtered_query = ((query)=>{
        if(!Array.isArray(keep_params)){
            throw new TypeError("Array expected");
        }
        if(keep_params.length < 1){
            return null
        }
        return  _.pick(query, keep_params);
    })(parsedUrl.query);
    return urlPaser.format({
        protocol: parsedUrl.protocol,
        slashes: parsedUrl.slashes,
        auth: parsedUrl.auth,
        host: parsedUrl.host,
        port: parsedUrl.port,
        hash: parsedUrl.hash,
        query: filtered_query,
        pathname: parsedUrl.pathname
    });
   
}