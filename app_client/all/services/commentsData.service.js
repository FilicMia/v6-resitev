function commentsData($http) {
  
  var data = function(){
                return $http.get('api/comments');
              };

  return {
    'comments': data
  };
}

/* global commentsApp */
commentsApp
.service('commentsData', commentsData);