'use strict'
const chai = require('chai');
const url = require("../newspaperjs/lib/url");
const fs = require("fs");
const path = require('path')
const _ = require('lodash');
8
describe('Urls', function(){
    describe("#isValidNewsUrl()", function(){
        it.only("should return false", function(){
            let actual = url.isValidNewsUrl("mailto://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html", true)
            chai.assert.isFalse(actual);           
        });
        it.only("should return true", function(){
            let actual = url.isValidNewsUrl("https://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.html", true)
            chai.assert.isTrue(actual);           
        });
        it.only("should return false", function(){
            let actual = url.isValidNewsUrl("https://www.huffingtonpost.com/carrer.html", true)
            chai.assert.isFalse(actual);           
        });
        it.only("should return false", function(){
            let actual = url.isValidNewsUrl("https://www.huffingtonpost.com/akoshia-yoba/giving-the-gift-of-life-a_b_4421799.mp3", true)
            chai.assert.isFalse(actual);           
        });
        it.only("should return true", function(){
            let actual = url.isValidNewsUrl("http://www.nytimes.com/2013/12/17/us/politics/federal-judge-rules-against-nsa-phone-data-program.html?hp&_r=0", true);
            chai.assert.isTrue(actual);
        });
        it.only("should return true", function(){
            let actual = url.isValidNewsUrl("http://shine.yahoo.com/ellen-good-news/won-8217-t-believe-colin-farrell-8217-surprise-190700409.html?vp=1", true);
            chai.assert.isTrue(actual);
        });
        it.only("should return true", function(){
            let actual = url.isValidNewsUrl("http://shine.yahoo.com/admin/ellen-good-news/", true);
            chai.assert.isFalse(actual);
        });
        it.only("should return true", function(){
            let actual = url.isValidNewsUrl("http://facebook.com/profile/111132302323/ellen-good-news/", true);
            chai.assert.isFalse(actual);
        });

    })
});