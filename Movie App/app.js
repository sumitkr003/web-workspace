const express = require('express');
const app = express();
const imdb = require('imdb-api');

imdb.get('harry potter',{apiKey:'4c57ab1f',timeout:3000}).then(console.log).catch(console.log);

app.get('/',function (req,res) {
    res.send('elcome to movie app');
})

app.listen(3000,function () {
    console.log('server has started');
})