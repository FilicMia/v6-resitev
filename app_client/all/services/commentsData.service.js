(function() {
  function commentsData($http) {
    
    var data = function(){
        return $http.get('/api/comments');
                };
                
    var commentById = function(commentId) {
      return $http.get('/api/comments/' + commentId);
    };
    
    var editCommentById = function(id, comment) {
      return $http.post('/api/comments/edit/' + id, comment);
    };
    
    var newComment = function(comment) {
      return $http.post('/api/comments/new', comment /*, {
        headers: {
          Authorization: 'Bearer ' + authentication.returnToken()
        }}*/);
    };
  
    return {
      'comments': data,
      'commentById': commentById,
      'editCommentById': editCommentById,
      'newComment': newComment
    };
  }
  commentsData.$inject = ['$http'];
  
  /* global angular */
  angular
    .module('comments')
    .service('commentsData', commentsData);
})();