'use strict'
function Config(){
    this.timeOut = 20;
    this.userAgent = "newspaperjs"
    this.verbose = true;
    this.test = false;
}

//let newsConfig = new Config();
//console.log(newsConfig.timeOut);

module.exports = new Config();