var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');//model name, the same as for 

var JSONcallback = function(res, status, msg) {
  res.status(status);
  res.json(msg);
};

module.exports.getAll = function(req, res) {
    Comment.find()
    .exec(function(err, comment){
        if (err) {
            console.log(err);
            JSONcallback(err, 400, comment);
        }else{
            JSONcallback(res, 200, comment);
        }
    });
};

module.exports.createNew = function(req, res) {
    var datatime = req.body.date;
    if(!datatime){
        datatime = new Date()
    }
    Comment.create({
        name: req.body.name,
        comment: req.body.comment,
        pic: req.body.pic,
        date: datatime
    }, function(error, data){
        if(error){
            JSONcallback(res,400,error);
        } else {
            JSONcallback(res, 200, data);
        }
    });
};

module.exports.getByName = function(req, res) {
    Comment.find({
        name: req.query.name
    }, function(error, data){
        if(error){
            JSONcallback(res,400,error);
        } else {
            JSONcallback(res, 200, data);
        }
    });
};

module.exports.deleteById = function(req, res) {
    JSONcallback(res, 200, {"status": "uspešno"});
};

