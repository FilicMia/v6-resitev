var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');//model name, the same as for 

var JSONcallback = function(res, status, msg) {
  res.status(status);
  res.json(msg);
};

module.exports.getAll = function(req, res) {
    Comment.find()
    .exec(function(err, comment){
        
        JSONcallback(res, 200, comment);
        
    });
};

module.exports.createNew = function(req, res) {
    JSONcallback(res, 200, {"status": "uspešno"});
};

module.exports.getById = function(req, res) {
    JSONcallback(res, 200, {"status": "uspešno"});
};

module.exports.deleteById = function(req, res) {
    JSONcallback(res, 200, {"status": "uspešno"});
};

