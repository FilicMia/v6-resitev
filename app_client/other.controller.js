(function() {
function otherCtrl(){
        window.location.replace('/');
    }
/* global angular */
angular
  .module('comments')
  .controller('otherCtrl', otherCtrl);
  
})();