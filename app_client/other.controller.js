(function() {
function otherCtrl($window){
        $window.location.href = '/';
    }
    
otherCtrl.$inject = ['$window'];

/* global angular */
angular
  .module('comments')
  .controller('otherCtrl', otherCtrl);
})();