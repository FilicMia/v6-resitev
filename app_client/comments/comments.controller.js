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
    
    vm.newComment = function(){
      //name: req.body.name,
       //   comment: req.body.comment,
       //   pic: req.body.pic,
       vm.newcomment.pic = '';
       commentsData.newComment(vm.newcomment).then(
          function succes(response){
            vm.msg = response.data.length > 0 ? "" : "No comments.";
            vm.data.comments.push(response.data);
            console.log(vm.data);
          },
          function error(response){
            vm.msg = "Error while fetching comments.";
            console.log(response.e);
          });
    };
    
    $scope.redirectTo = function(comment){
        //redirectTo
         $location.url('/comments/'+comment._id);
        };
}
commentsCtrl.$inject = ['commentsData', '$location', '$scope'];

/* global angular */
angular
  .module('comments')
  .controller('commentsCtrl', commentsCtrl);
  
})();