### Initial set up

~~~~ {.bash}
v5 $ mkdir app_client
v5 $ cd app_client
v5/app_client $ touch app.js
~~~~

Now, when having the root file of our client side application, we need to make it 
visible on a client side. We do so by defining the folder `app_client` 
as public:

~~~~ {.js}
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client'))); // ADD
~~~~

#### Adding Angular to our application.
Angular is "functioning" from within the (pug/html) templates . Let make it visible form
the `.pug`. This is simmilar to setting up bootstrap.

Add following two lines just bellow `block content` in `layout.pug`.

`layout.pug`

~~~~{.pug}
    block content
    
    script(src='/angular/angular.min.js')
    script(src='/app.js')
~~~~

With `script(src='/app.js')` we are attaching our client side (Angular) application
(code) to all the views.

### Root module

Each Angular application needs to have at least one module, the root module.
> **Dodatno pojasnilo**: 
* [Modular AngularJS App Design](http://clintberry.com/2013/modular-angularjs-application-design/)
* [Why is AngularJS the Most Popular Framework?](https://www.slideshare.net/windzoontechnologies/why-is-angularjs-the-most-popular-framework)

![Modular angular](https://image.slidesharecdn.com/whyisangularjsthemostpopularframework-180810065058/95/why-is-angularjs-the-most-popular-framework-10-638.jpg?cb=1533883924)

Let define the root module in our application in `layout.pug` at `html` tag.

`layout.pug`
~~~~{.pug}
doctype html
html(lang="sl" ng-app="comments")
~~~~

#### Definition
We attachet module name to the application, but it is nowhere defined. 
Define it in the root file of the client side application `app.js`.

`app.js`

~~~~{.js}
/* global angular */
var commentsApp = angular.module('comments', []);
~~~~

Later on, all child modules will be injected in this module by typing
theirs name (String) in the vector `[]`.

### Quick test

Copy all the content of `public/comments.js` into 
`app_client/app.js` and run the app.

## Global scope

Fatching the data from within 
`$scope` variable is bad practice.
The data can be specified for certain views
using `controllerAs` directive.

Thus, in router, for the specific controller, 
define an variable in which you  will store all necessary data.
`app.js`

~~~~
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
~~~~


After doing so, we define the data to
be stored inside vm, and not $scope.

## Services (storitev)

At this point, it would be nice 
to have some data on the site.

We want an service provider that will 
fatch the data from our own REST API
so we can show it on the page.

### Service initialization

We first create folder services inside `app_client`,

~~~~ {.bash}
 cd app_client
 mkdir all
 cd all
 mkdir services
~~~~

Then we first create an service that will fatch our data.

~~~~ {.bash}
touch commentsData.service.js
~~~~

Then, we define the service and attach that
to the root modul.

`app_client/all/services/commentsData.service.js`

~~~~
//get data fja
function commentsDataF($http){
  return $http.get('api/comments');
}

function commentsData($http) {
  var data = commentsDataF($http);
  
  return {'comments': data};
}


// attach it to the application
/* global commentsApp */
commentsApp
.service('commentsData', commentsData);
~~~~

And define it in `layout.pug`, the main 
views file.

~~~~{.bash}
    script(src='/angular/angular.min.js')
    script(src='/lib/angular-route.min.js')
    script(src='/app.js')
    script(src='/comments/comments.controller.js')
    
    script(src='/all/services/commentsData.service.js')
~~~~

### Usage of the service
 It is high time to make an usage of our service.
 






