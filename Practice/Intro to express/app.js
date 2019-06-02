var express = require("express");
var app = express();

app.get("/",function(req,res){
      res.send("hi there");
});

app.get("/dogs",function(req,res){
   res.send("bye dog");
   console.log("someone searched for a dog");
});

app.listen('3000',function(){
   console.log("server has started");
});