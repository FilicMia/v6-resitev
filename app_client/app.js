(function() {

//specification of the router provider.
function provider($routeProvider, $locationProvider) {

    $routeProvider
    .when('/', {
        templateUrl: 'comments/comments.view.html',
        controller: 'commentsCtrl',
        controllerAs: 'vm'
    })
    .otherwise({
        controller : 'otherCtrl', 
        template : "<div></div>"
    });
    
    //Remove #:
    //1.We will use the $locationProvider module and set html5Mode to true.
    //2. then remove all preceding # for relative routes (i.e. '#/comments' 
    //to '/comments')
    //3. put base in html head tag, like: `base(href='/')`
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
}

/* global angular */
angular
    .module('comments',['ngRoute'])
    .config(['$routeProvider','$locationProvider', provider]);

})();