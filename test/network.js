const chai = require('chai');
const fs = require('fs');
const path = require('path')
const network = require('../newspaperjs/lib/network');
const config = require('../newspaperjs/lib/config');
const dir = 'test/data/html';

describe("#Network", function(){
    describe("#getParsedHtml", function(done){
        it.only("Should return html page", function(){
            let actual = network.getParsedHtml(path.join(dir,'about.com2.html'), config)
                .then($=>{
                   // console.log($.html())
                }).catch(reason=>{
                    //console.log(reason)
                }).then(done);  
        });
    })
})