var app = require('express')();
app.set("view engine","ejs");

app.get('/',function (req,res) {
    res.render("main");
})

app.listen(3000,function () {
    console.log('server has started');
})