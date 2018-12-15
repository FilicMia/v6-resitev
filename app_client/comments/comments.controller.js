// api request
function commentsData($http){
  return $http.get('api/comments');
}

function commentsCtrl($http) {
  var vm = this;
  
  vm.title = 'Comments';
  vm.msg = "Searching comments...";
  var data = commentsData($http);
  
  // api processing
  data.then(
    function succes(response){
      vm.msg = response.data.length > 0 ? "" : "No comments.";
      vm.data = {'comments': response.data};
    },
    function error(response){
      vm.msg = "Error while fetching comments.";
      console.log(response.e);
    });
}

/* global commentsApp */
commentsApp
  .controller('commentsCtrl', ["$http", commentsCtrl]);