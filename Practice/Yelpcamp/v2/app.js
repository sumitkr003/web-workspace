var express     = require("express"),
    app         = express(),
    bodyparser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp",{ useMongoClient: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "camp 1",
//     img: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
//     description: "A great camp alongside a beach with an awesome view of sun-risng"
// },function (err,camp) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(camp);
//     }
// });

app.get("/",function(req,res){
   res.render("landing");
});

app.get("/campgrounds",function(req,res){
    Campground.find({},function(err, allcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds",{campgrounds : allcampground});
        }
    });

});

app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var newcampground = {name: name, img: image, description: description};

   Campground.create(newcampground,function (err,campground) {
        if(err){
            console.log(err);
        }else{
            console.log("Newly created campground:");
            console.log(campground);
        }
    });

   res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
   res.render("new");
});

app.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id,function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            res.render("show",{campground: foundcampground});
        }
    });
});

app.listen("3000",function(){
   console.log("server has started");
});