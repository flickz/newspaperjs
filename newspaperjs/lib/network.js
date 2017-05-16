'use strict'
/*
All code involving requests and responses over the http network
must be abstracted in this file.
*/
const request = require('request-promise-native');
const request2 = require('request')
const cheerio = require('cheerio');
const config = require('./config');
 

function getRequestOptions(timeOut, userAgent){
    return {
        timeOut: timeOut,
        headers: {
            'User-Agent': userAgent
        }
    }
}

exports.getParsedHtml = function(url){
    return request.get(url, getRequestOptions(config.timeOut, config.userAgent));
}
