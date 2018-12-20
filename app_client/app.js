/* global angular $http */
var commentsApp = angular.module('comments', ['ngRoute']);

//specification of the router provider.
function provider($routeProvider, $locationProvider) {

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
    
    //Remove #:
    //1.We will use the $locationProvider module and set html5Mode to true.
    //2. then remove all preceding # for relative routes (i.e. '#/comments' 
    //to '/comments')
    //3. put base in html head tag, like: `base(href='/')`
    $locationProvider.html5Mode(true);
}

commentsApp
    .config(['$routeProvider','$locationProvider', provider]);
    
// for no ! prefix
// uncomment the next section

commentsApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

