const express = require('express');
const app = express();
const path = require('path');
var firebase = require('firebase');
const admin = require('firebase-admin');

const PublicPath = path.join(__dirname , "./public");

var config = {
    apiKey: "AIzaSyDLAnATlnf23w5xhAebPcFQw2POdrGK-NQ",
    authDomain: "bingetesting.firebaseapp.com",
    databaseURL: "https://bingetesting.firebaseio.com",
    projectId: "bingetesting",
    storageBucket: "bingetesting.appspot.com",
    messagingSenderId: "254566168359"
};
firebase.initializeApp(config);

var db = firebase.firestore();

app.use(express.static(PublicPath));

app.use('/',express.static(path.join(__dirname , 'public/dashboard')));

app.listen(3000,function () {
    console.log('server has started');
})
