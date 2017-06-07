'use strict'
function Config(){
    this.timeOut = 1000;
    this.userAgent = "newspaperjs"
    this.verbose = true;
    this.test = true;
}

//let newsConfig = new Config();
//console.log(newsConfig.timeOut);

module.exports = new Config();