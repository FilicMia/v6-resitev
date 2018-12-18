/* global angular $http */
var commentsApp = angular.module('comments', ['ngRoute']);

//specification of the router provider.
function provider($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'comments/comments.view.html',
        controller: 'commentsCtrl',
        controllerAs: 'vm'
    })
    .otherwise({
    controller : function(){
        window.location.replace('/');
    }, 
    template : "<div></div>"
});

}

commentsApp
    .config(['$routeProvider', provider]);
    
// no ! prefix
commentsApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
  
  //no # prefix in routes
  $locationProvider.html5Mode(true);
}]);

