/* Vrni začetno stran s seznamom lokacij */
//var dataJSON = require('../models/comments.json');
var request = require('request');
var paramsApi = {
  server: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  paramsApi.server = 'https://drugo-ime238.herokuapp.com/';
}

// return function
var listRender = function(req, res, content){
    /*Get rest api data*/
var apiData = {comments: content};
    res.render('comments', apiData);
}

/* GET home page */
module.exports.index = function(req, res) {
  var path = '/api/comments';
  var paramsReq = {
    url: paramsApi.server + path,
    method: 'GET',
    json: {},
  };
  request(
    paramsReq,
    function(error, response, content) {
      listRender(req, res, content);    
    }
  );
};