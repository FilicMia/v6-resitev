(function() {
  var naviga = function() {
    return {
      restrict: 'EA',
      templateUrl: '/all/directives/nav/nav.template.html'
    };
  };
  
  /* global angular */
  angular
    .module('comments')
    .directive('naviga', naviga);
})();