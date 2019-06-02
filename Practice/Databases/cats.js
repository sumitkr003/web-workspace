var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost', { useMongoClient: true });
// mongoose.Promise = global.Promise;

var catSchema = new mongoose.Schema({
   name: String,
   age: Number
});

// ------convention to start a model name with capital word-----
var Cat = mongoose.model("Cat", catSchema);

//            ------adding a cat to our databse---------
// var george = new Cat({
//    name: "mrs. norris",
//    age: 7
// });
//
// george.save(function (err,cat) {
//     if(err){
//         console.log("something went wrong");
//     }else{
//         console.log("we added "+ cat.name +" to our database");
//         console.log(cat);
//     }
// });

// -----------creating and adding a cat to oud database-----
Cat.create({
    name: "billi",
    age: 6
},function(err,cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
})

// -------retrieving all cats from our databse ------
// Cat.find({},function(err,cat){
//    if(err){
//        console.log("something went wrong");
//        console.log(err);
//    } else{
//        console.log("here is the list of all cats in our database");
//        console.log(cat);
//    }
// });