var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var camps = [
        {   name:"camp 1",
            img:"https://images.unsplash.com/photo-1479244209311-71e35c910f59?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"camp 2",
            img:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name:"camp 3",
            img:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

function seedsDB() {
    //remove all campgrounds
    Campground.remove({},function (err,campground) {
        if(err){
            console.log(err);
        }
        console.log("campgrounds deleted ");
        //    add few campgrounds
        camps.forEach(function (camp) {
            Campground.create(camp,function (err,camp) {
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground");
                    //    create comments
                    Comment.create({
                        text:"this place is awesome but i wish i could also have a internet connection here",
                        author:"Homie"
                    },function (err,comment) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log("comment added");
                            camp.comments.push(comment);
                            camp.save(function (err,camp) {
                                if(err){
                                    console.log(err);
                                }else{
                                    console.log("added a comment in the campground");
                                }
                            });
                        }
                    });
                }
            });
        });
    });
};

module.exports = seedsDB;