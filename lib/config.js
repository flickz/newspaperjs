'use strict'
function Config(){
    this.timeOut = 50000;
    this.userAgent = "newspaperjs"
    this.verbose = false;
    this.test = false;
}

//let newsConfig = new Config();
//console.log(newsConfig.timeOut);

module.exports = new Config();