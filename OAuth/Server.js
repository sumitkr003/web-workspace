var app = require('express')();
var bodyParser = require('body-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

var FACEBOOK_APP_ID = '202020247200475',
    FACEBOOK_APP_SECRET = '0b9b2a669e5bc9da602baa73ec702703';

app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/login/fail"
    },
    function(accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        //     console.log(user);
        //     return cb(err, user);
        // });
        console.log(accessToken, refreshToken, profile, cb);
        return cb(err,user);
    }
));

app.get("/",function (req,res) {
    res.send('hello');
});

app.get('/login',function (req,res) {
    res.render('login');
})

app.get('/login/facebook',passport.authenticate('facebook',function (req,res) {
    res.send("login successful");
}));

app.get('/login/fail',passport.authenticate('facebook',function (err,user,info) {
    console.log(err,user,info);
}));

app.listen(3000,function () {
    console.log('server has started');
})