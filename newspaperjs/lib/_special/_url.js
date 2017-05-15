'use strict'
const _ = require('lodash');
const urlPaser = require('url');

const ALLOWED_TYPES = ['html', 'htm', 'md', 'rst', 'aspx', 'jsp', 'rhtml', 'cgi',
                 'xhtml', 'jhtml', 'asp', 'php'];
const BAD_DOMAINS = ['amazon.com', 'doubleclick.com', 'twitter.com', 'facebook.com'];

const GOOD_PATHS = ['story', 'article', 'feature', 'featured', 'slides',
              'slideshow', 'gallery', 'news', 'video', 'media',
              'v', 'radio', 'press', 'sport', 'entertainment', 'world', 'technology', 'tech', 'showbiz'];

const BAD_CHUNKS = ['careers', 'contact', 'about', 'faq', 'terms', 'privacy',
              'advert', 'preferences', 'feedback', 'info', 'browse', 'howto',
              'account', 'subscribe', 'donate', 'shop', 'admin'];

const _this = this;

exports._followUrlFormat = function(url){
    let regEx = /(http|https):\/\/(w{3}\.)?\w+\.(\w{3})/
    if(regEx.test(url)){
        return true;
    }
    return false;
}
exports._startWithForwardSlash = function(urlPath){
   if(_.startsWith(urlPath, '/')) return true; 
   return false;
}

exports._splitPath = function(urlPath){
    return _.split(urlPath,'/');
}

exports._hasFileType = function(pathChuncks){
    if(_.indexOf(_.last(pathChuncks), '.')!= -1) return true;
    return false;
}

exports._validFileType = function(pathChuncks){
    let fileType = _this._getFileType(pathChuncks); 
    if(_.indexOf(ALLOWED_TYPES, fileType) == -1 ){
        return false;
    }
    return true;
}

exports._getFileType = function(pathChuncks){
    let lastChunk = _.last(pathChuncks);
    return _.split(lastChunk, '.')[1].toLowerCase();
}

exports._removeFileType = function(pathChuncks){
    let lastChunk = _.last(pathChuncks);
    let fileType = _this._getFileType(pathChuncks);
    //remove the file type in the last chunk
    lastChunk = _.pull(_.split(lastChunk, '.'), fileType)[0];
    //replace the old last last chunk with new one without file type
    pathChuncks[pathChuncks.length - 1] = lastChunk;
    return pathChuncks;
}

exports._removeIndex = function(pathChuncks){
    return _.pull(pathChuncks, 'index');
}

exports._getDomainName = function(domain, tld){
    return _.pull(_.split(domain, '.'), tld)[0];
}

exports._urlHasDate = function(url){
    /* 
    Search of a YYYY/MM/DD pattern in the url. News sites
    love to use this pattern, this is a very safe bet.
    
    Separators can be [\.-/_]. Years can be 2 or 4 digits, must
    have proper digits 1900-2099. Months and days can be
    ambiguous 2 digit numbers, one is even optional, some sites are
    liberal with their formatting also matches snippets of GET
    queries with keywords inside them. ex: asdf.php?topic_id=blahlbah
    We permit alphanumeric, _ and -.
    */
    let regEx = /([\./\-_]{0,1}(19|20)\d{2})[\./\-_]{0,1}(([0-3]{0,1}[0-9][\./\-_])|(\w{3,5}[\./\-_]))([0-3]{0,1}[0-9][\./\-]{0,1})?/
    if(regEx.test(url)){
        return true;
    }
    return false;
}

exports._badDomain = function(domain){
    if(_.indexOf(BAD_DOMAINS, domain) != -1){
        return true;
    }
     return false;
}

exports._hasNewsSlug = function(urlSlug, domainName){
    let dashCount = occurrences(urlSlug, '-');
    let underscoreCount = occurrences(urlSlug, '_');
   
    if(dashCount > 4 || underscoreCount > 4){
        if(dashCount >= underscoreCount){ 
            //check if the domain name is in slug
            if(_.indexOf(_.split(urlSlug, '-'), domainName) == -1)
                return true;
        }
        if(underscoreCount > dashCount){
            //check if the domain name is in slug            
            if(_.indexOf(_.split(urlSlug, '_'), domainName) == -1)
                return true;
        }
    }
    return false;
}

exports._hasBadPath = function(pathChuncks){
    for(let i=0; i<pathChuncks.length; i++){
        if(_.indexOf(BAD_CHUNKS, pathChuncks[i]) != -1){
            return true;
        }
    }
    return false;
}
exports._hasGoodPath = function(pathChuncks){
    for(let i=0; i<pathChuncks.length; i++){
        if(_.indexOf(GOOD_PATHS, pathChuncks[i]) != -1){
            return true;
        }
    }
    return false;
}

exports._hasUrlQuery = function(url){
    let parsedUrl = urlPaser.parse(url);
    if(parsedUrl.search == null){
        return false;
    }
    return true;
}

exports._removeArgs = function(url, keep_params=[]){
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

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}