const Build = require('./newspaperjs/lib/source');
const cnn = Build('https://cnn.com', ['politics']);

cnn.then(result=>{
    console.log(result);
}).catch(reason=>{
    console.log(reason);
})

