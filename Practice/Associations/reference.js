var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/associations_1",{ useMongoClient: true });

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
        }
    ]
});
var User = mongoose.model("User", userSchema);

// User.create({
//    email:"sksumitkumar003@gmail.com",
//    name:"sumit kumar"
// },function (err,user) {
//     console.log(user);
// });
//
Post.create({
   title:"how to cook..",
   content:"i love cooking"
},function (err,post) {
    if(err){
        console.log(err);
    }else{
        console.log(post);
        User.findOne({name:"sumit kumar"},function (err,user) {
            if(err){
                console.log(err);
            }else{
                console.log(user);
                user.posts.push(post);
                user.save(function (err,user) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(user);
                    }
                });
            }
        });
    }
});

// User.findOne({name:"sumit kumar"},function (err,user) {
//     console.log(user);
// });