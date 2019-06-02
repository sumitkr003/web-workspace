var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine","ejs");

var campground = [
    {name:"camp1",img:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"camp2",img:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name:"camp3",img:"https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"},
    {name:"camp1",img:"https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg"},
    {name:"camp2",img:"https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg"},
    {name:"camp3",img:"https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg"}
]

app.get("/",function(req,res){
   res.render("landing");
});

app.get("/campgrounds",function(req,res){
    res.render("campgrounds",{campgrounds : campground});
});

app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var newcampground = {name: name, img: image};
   campground.push(newcampground);

   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
   res.render("newcampground");
});

app.listen("3000",function(){
   console.log("server has started");
});