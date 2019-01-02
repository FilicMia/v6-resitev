var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var JSONcallback = function(res, status, msg) {
  res.status(status);
  res.json(msg);
};

module.exports.login = function(req, res) {
    /* request consists of body with login data named usernameField: 'mail',
    passwordField: 'pass' as defined in `passport.js` */
    if( !req.body.mail || !req.body.pass){
        JSONcallback(res, 400, {
          msg: "All data req."
        });
        return;
    }
    
    //when all set, authenticate the user data
    passport.authenticate('local', //strategy
        function(error, user, data){
            
        }
    )(req,res);
};