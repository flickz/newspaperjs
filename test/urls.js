'use strict'
const chai = require('chai');
const urls = require("../newspaperjs/lib/urls");


describe('Urls', function(){
    describe("#removeArg()", function(){
        it.only('Should remove all arguments except specified ones', function(){
            let actual = urls.removeArgs("https://www.example.com/foo/?name=seun&age=42&sex=male", ['name', 'age']);
            let expected = "https://www.example.com/foo/?name=seun&age=42";
            chai.assert.equal(actual, expected);
        })

        it.only('Should remove all arguments', function(){
            let actual = urls.removeArgs("https://www.example.com/foo/?name=seun&age=42&sex=male");
            let expected = "https://www.example.com/foo/";
            chai.assert.equal(actual, expected);
        })
        //TODO - The 
        it.only('Should remove all arguments', function(){
            let actual = urls.removeArgs("https://www.example.com/foo/?name=seun&age=42&sex=male", 'name');
            let expected = "https://www.example.com/foo";
            chai.assert.throws(actual,  TypeError, 'Array expected');
        })    

    })
})
