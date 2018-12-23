(function() {
function commentsCtrl(commentsData, $location, $scope) {
  var vm = this;
  vm.title = 'Comments';
  vm.msg = "Searching comments...";
  commentsData.comments().then(
    function succes(response){
      vm.msg = response.data.length > 0 ? "" : "No comments.";
      vm.data = {'comments': response.data};
    },
    function error(response){
      vm.msg = "Error while fetching comments.";
      console.log(response.e);
    });
    $scope.redirectTo = function(id){

         $location.url('/comments/'+id);

        }
}
commentsCtrl.$inject = ['commentsData', '$location', '$scope'];

/* global angular */
angular
  .module('comments')
  .controller('commentsCtrl', commentsCtrl);
  
})();