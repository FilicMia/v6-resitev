(function() {
  function commentsData($http) {
    
    var data = function(){
                  return $http.get('/api/comments');
                };
  
    return {
      'comments': data
    };
  }
  commentsData.$inject = ['$http'];
  
  /* global angular */
  angular
    .module('comments')
    .service('commentsData', commentsData);
})();