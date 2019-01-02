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
            // error is error data
            //user from done function in `passport.js` of type User and 
            //data from the req
            if(error){
                JSONcallback(res, 404, error);
                return;
            }
            if(user){
                JSONcallback(res, 200, {
                    token: user.genJWT()
                });
                return;
            } else {
                //unauthorized error
                JSONcallback(res, 401, data);
                return;
            }
        }
    )(req,res);
};

module.exports.register = function(req, res) {
    /* request consists of body with login data named usernameField: 'mail',
    passwordField: 'pass' as defined in `passport.js` */
    if( !req.body.mail || !req.body.pass || !req.body.name){
        JSONcallback(res, 400, {
      msg: "All data req."
    });
    }
    
    //save the data
    var user = new User({
        name: req.body.name,
        mail: req.body.mail
    });
    
    user.storePassword(req.body.pass);
    user.save(function(error, user){
        if(error){
            JSONcallback(res,400,error);
        } else {
            JSONcallback(res,200,{
                token: user.genJWT()
            });
        }
    });
};