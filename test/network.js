const chai = require('chai');
const fs = require('fs');
const path = require('path')
const network = require('../lib/network');
const config = require('../lib/config');
const dir = 'test/data/html';

describe("#Network", function(){
    describe("#getParsedHtml", function(done){
        it("Should return html page", function(){
            let actual = network.getParsedHtml(path.join(dir,'about.com2.html'), config)
                .then($=>{
                   // console.log($.html())
                }).catch(reason=>{
                    //console.log(reason)
                }).then(done);  
        });
    })
})