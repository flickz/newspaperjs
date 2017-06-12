const Build = require('./newspaperjs').Build;

Build.getCategoriesUrl('http://www.indiatimes.com/', ['sports']).then(result=>{
    console.log(result);
}).catch(reason=>{
    console.log(reason);
})
