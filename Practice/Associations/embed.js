var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/associations",{ useMongoClient: true });

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
   email:String,
   name:String,
    posts:[postSchema]
});
var User = mongoose.model("User", userSchema);

// var newuser = new User({
//    email:"ayush@gmail.com",
//    name:"ayush"
// });
//
// newuser.posts.push({
//     title:"web-dev",
//     content:"web-dev includes html,css,javascript"
// });
//
// newuser.save(function (err,user) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });
//
// var newpost = new Post({
//     title:"welcome to programming",
//     content:"programming is very easy"
// });
// newpost.save(function (err,post) {
//     if(err){
//
//     }else{
//         console.log(post);
//     }
// });

User.findOne({ name:"ayush"},function (err,user) {
    if(err){
        console.log(err);
    }else{
        console.log(user);
        user.posts.push({
            title:"Server-Side programming",
            content:"Node-js is a server side programming language"
        });
        user.save(function (err,user) {
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
})