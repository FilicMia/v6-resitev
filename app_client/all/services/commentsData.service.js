//get data fja
function commentsDataF($http){
  return $http.get('api/comments');
}

function commentsData($http) {
  var data = commentsDataF($http);
  
  return {'comments': data};
}

/* global commentsApp */
commentsApp
.service('commentsData', commentsData);