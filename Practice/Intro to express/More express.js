var express = require("express");
var app = express();
var bodyparser = require("body-parser");

var friends = ["bob","billy","emma","matt","chuck"];

app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("home");
});

app.get("/fallinlove/:thing",function(req,res){
   var love =  req.params.thing;
   res.render("love",{thing:love});
});

app.get("/friends",function (req,res) {
    res.render("friends",{friends: friends});
});

app.post("/addfriend",function(req,res){
    console.log(req.body);
    console.log(req.body.name);
    friends.push(req.body.name);
    res.redirect("/friends");
});

app.get("/posts",function(req,res){
   var posts = [
       {title : "dogs",author: "kutta"},
       {title: "cats",author: "billi"},
       {title:"rats",author: "chua"}
   ];

   res.render("post",{posts : posts});
});

app.listen("3000",function(){
    console.log("server has started");
});