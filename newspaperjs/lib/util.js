'use strict'
//Holds misc. utility methods which prove to be useful throughout this library.
const _ = require('lodash');

exports.StringSplitter = function(string, pattern){
    return _.split(string, pattern);
}

exports.StringReplace = function(string, pattern, replaceWith){
    return _.replace(string, pattern, replaceWith);
}