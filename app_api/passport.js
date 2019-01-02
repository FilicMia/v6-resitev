//move to configuration folder
var localStrategy = require('passport-local').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

//custom field names
passport.use(new localStrategy({
    usernameField: ,
    passwordField: }, 
    function(username, pass, done){
        //todo
}));

// define in app.js
/*
require('./app_api/models/db');
..

var indexApi = require('./app_api/routes/index');
...
app.use(passport.initialize());
*/