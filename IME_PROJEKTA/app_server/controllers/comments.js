/* Vrni začetno stran s seznamom lokacij */
var dataJSON = require('../models/comments.json');

/* GET home page */
module.exports.index = function(req, res) {
  res.render('comments', dataJSON);
};