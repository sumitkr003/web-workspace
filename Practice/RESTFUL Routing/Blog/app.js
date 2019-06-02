var express             = require("express"),
    methodOverride      = require("method-override"),
    mongoose            = require("mongoose"),
    bodyparser          = require("body-parser"),
    app                 = express();
    expressSanitizer    = require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app", { useMongoClient: true } );
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE/MODEL CONFIG
var blogSchema = mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test Blog",
//     image: "https://images.unsplash.com/photo-1468549940493-46152524296c?auto=format&fit=crop&w=652&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
//     body: "Great view of mountains"
// });

//UPDATE ROUTE
app.put("/blog/:id",function (req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err,Updatedblog) {
        if(err){
            console.log("something went wrong");
        }else{
            res.redirect("/blog/" + req.params.id);
        }
    });

});

//RESTFUL ROUTING
app.get("/",function (req,res) {
    res.redirect("/blog");
});

//INDEX ROUTE
app.get("/blog",function (req,res) {
    Blog.find({},function (err,allblogs) {
       if(err){
           console.log(err);
       } else{
           res.render("index",{blogs: allblogs});
       }
    });
});

//NEW ROUTE
app.get("/blog/new",function (req,res) {
    res.render("new");
});

//CREATE ROUTE
app.post("/blog",function (req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog,function (err,blog) {
        if(err){

        }else{
            console.log(blog);
            res.redirect("/blog");
        }
    })
});

//SHOW ROUTE
app.get("/blog/:id",function (req,res) {
    Blog.findById(req.params.id,function (err,foundblog) {
       if(err){
           console.log(err);
       } else{
           res.render("show",{blog: foundblog});
       }
    });
});

//EDIT ROUTE
app.get("/blog/:id/edit",function (req,res) {
    Blog.findById(req.params.id,function (err,foundblog) {
        if(err){
            console.log("something went wrong");
        }else{
            res.render("edit",{blog:foundblog});
        }
    });
});

//DELETE ROUTE
app.delete("/blog/:id",function (req,res) {
    Blog.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
    });
    res.redirect("/blog");
});

app.listen(3000,function () {
    console.log("server has started");
})