(function() {
  function commentsViewCtrl($routeParams, commentsData) {
    var vm = this;
    vm.idComment = $routeParams.idComment;
    
    commentsData.commentById(vm.idComment)
    .then(function success(response) {
        vm.comment = response.data;
        vm.general = {
          title: vm.comment.name
        };
      },
      function error(odgovor) {
        console.log(odgovor.e);
      });
      
      vm.editComm = function(id){
          
           alert(id);
        
      };
  }
  commentsViewCtrl.$inject = ["$routeParams", "commentsData"];
  
  /* global angular */
  angular
    .module('comments')
    .controller('commentsViewCtrl', commentsViewCtrl);
})();