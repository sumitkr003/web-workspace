var express                     = require("express"),
    mongoose                    = require("mongoose"),
    passport                    = require("passport");
    bodyparser                  = require("body-parser"),
    LocalStrategy               = require("passport-local"),
    passportLocalMongoose       = require("passport-local-mongoose"),
    User                        = require("./models/User");

var app = express();
app.set('view engine','ejs');
mongoose.connect("mongodb://localhost/auth_demo",{ useMongoClient: true });
app.use(bodyparser.urlencoded({extended:true}));

app.use(require("express-session")({
    secret: "i am a huge fan of msd",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//========================================================
//            ROUTES
//========================================================

app.get("/",function (req,res) {
   res.render("home");
});

app.get("/secret", isLoggedIn ,function (req,res) {
   res.render("secret");
});

app.get("/register",function (req,res) {
    res.render("register");
});

app.post("/register",function (req,res) {
    User.register(new User({username: req.body.username}),req.body.password,function (err,user) {
       if(err){
           console.log(err);
       }else{
           passport.authenticate("local")(req,res,function () {
              res.redirect("/secret");
           });
       }
    });
});

app.get("/login",function (req,res) {
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}), function (req,res) {
});

app.get("/logout",function (req,res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn (req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

app.listen("3000",function () {
    console.log("server has started");
});