
// const network = require('./newspaperjs/lib/network'),
//       //extractor = require('./newspaperjs/lib/extractor'),
//       config = require('./newspaperjs/lib/config'),
//       urlM = require('./newspaperjs/lib/url'),
//       rxjs = require('rx'),
//       path = require('path');
// let fileUrl = 'test/data/html';
// let categoryUrl = ['https://www.nytimes.com/pages/technology'];
// {
//     //$("meta[property='og:image']").attr('content')
// }

// function Article(){
//     network.getParsedHtml(path.join(fileUrl, '/cnn-post.html')).subscribe(($)=>{
         
         
//     }, (error)=>{
//         console.log(error);
//     }, (done)=>{
//         console.log('completed')
//     })
// }

// Article();
function add(a){
    return new Promise((resolve, reject)=>{
        resolve(a + 3);
    })
}

async function getAdd(){
     let sum = add(4); 
    return division = await sum / 2;
}

getAdd().then((ans)=>{
    console.log(ans);
})