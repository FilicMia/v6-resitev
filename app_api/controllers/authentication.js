var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var JSONcallback = function(res, status, msg) {
  res.status(status);
  res.json(msg);
};

//rest TODO