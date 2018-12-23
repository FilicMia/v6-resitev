(function() {
  function commentsData($http) {
    
    var data = function(){
                  return $http.get('/api/comments');
                };
                
    var commentById = function(commentId) {
      return $http.get('/api/comments/' + commentId);
    };
  
    return {
      'comments': data,
      'commentById': commentById
    };
  }
  commentsData.$inject = ['$http'];
  
  /* global angular */
  angular
    .module('comments')
    .service('commentsData', commentsData);
})();