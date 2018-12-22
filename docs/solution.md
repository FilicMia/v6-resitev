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

`app_client/app.js`

~~~~{.js}
/* global angular */
var commentsApp = angular.module('comments', []);
~~~~

Later on, all child modules will be injected in this module by typing
theirs name (String) in the vector `[]`.

### Quick test

Copy all the content of `public/comments.js` into 
`app_client/app.js` and run the app.

## Defining Routers
For this we need to first download files which defines Angular routing.

~~~~ {.bash}
 cd app_client
 mkdir lib
 cd lib

 wget https://code.angularjs.org/1.7.5/angular-route.min.js
 wget https://code.angularjs.org/1.7.5/angular-route.min.js.map

~~~~

To enable Angular routing, we need to import `angular-route.min.js` as we do for 
the `angular.min.js` (inside `layout.pug`).

Then we define a router inside `app.js`.
`app_client/app.js`

~~~~
/* global angular  */
var commentsApp = angular.module('comments', ['ngRoute']);

//specification of the router provider.
function provider($routeProvider) {
    $routeProvider
    .when('/', {})
    .otherwise({
    controller : function(){
        window.location.replace('/');
    }, 
    template : "<div></div>"
});

}

commentsApp
.config(['$routeProvider',provider]);
~~~~

whish on '/' just renders the server sent view.

Now, we remove all the routing (despite the /api part) form the server by changing all routes files
in `app_server/routes`:

`index.js`

~~~~.js
var express = require('express');
var router = express.Router();
var ctrlOther = require('../controllers/other');

/* GET home page. */
//router.get('/', ctrlOther.index);

router.get('/', ctrlOther.angularApp);


module.exports = router;
~~~~

`comments.js`

~~~~.js
var express = require('express');
var router = express.Router();
var ctrlComments = require('../controllers/comments');

/* GET home page. Observe the definition of the index function, it just renders the page
not fatching the data. Where do we fatch data then??? (ANGULAR)
*/
/*router.get('/', ctrlComments.index);

router.post('/new', ctrlComments.newComment);

router.post('/delete', ctrlComments.deleteById);

module.exports = router;*/
~~~~

Now, no comments are displayed, only the template page.
On the home page we will now display all the comments.

## Templates
To display comments, we first create the template in `.html` to be displayed within `block content`.
The template is stored in `app_client/comments` under name `comments.view.html`.

`comments.view.html`

~~~~.html

  <section class="comment-list">
      <label for="filter">Search comments</label>
      <input id="filter" type="text" name="filter">
      
      <div class="container-article">
        <article class='row'>
        <div class="col-md-2 col-sm-2 hidden-xs">
          
          <figure class="thumbnail">
            <img class="img-responsive" src="http://www.tangoflooring.ca/wp-content/uploads/2015/07/user-avatar-placeholder.png" />
            <figcaption class="text-center">username</figcaption>
          </figure>
          
        </div>
        <div class="col-md-10 col-sm-10">
          
          <div class="panel panel-default arrow left">
            <div class="panel-body">
              <header class="text-left">
                <div class="comment-user"><i class="fa fa-user"></i>{{ comment.name }}</div>
                <time class="comment-date" datetime="16-12-2014 01:05">
                    <i class="fa fa-clock-o"></i> {{ comment.date }}</time>
              </header>
              <div class="comment-post">
                <p>
                  {{ comment.comment }}
                </p>
              </div>
              <form class="navbar-form navbar-left" action="/comments/delete" method="post">
                <div class="form-group">
                  <input class="form-control hidden" type="text" value="{{comment._id}}" name="_id"/>
                </div>
                <button class="btn btn-default" id="delete" type="Submit">Delete</button>
              </form>
            </div>
          </div>

        </div>
        </article>
        </div>

  </section>
  
  <div class="container">
    <div class="widget-area no-padding blank">
        <div class="status-upload">
            <form action='/comments/new' id="commentForma" method="post" role="form">
                <div class="form-group"><label for="username">Name:</label><input class="form-control" type="text" name="name" id="name" /></div>
                <div class="form-group"><label for="comment">Comment:</label><textarea class="form-control" rows="5" name="comment" id="comment"></textarea></div>
                <div class="form-group"><label for="picupload">Upload Image</label>
                    <div class="input-group"><span class="input-group-btn"><span class="btn btn-default btn-file">Browse� <input id="imgInp" type="file"/></span></span><input class="form-control" type="text" name="pic" /></div>
                    <div><img id="img-upload" /></div>
                </div><button class="btn btn-success green" type="submit"><i class="fa fa-share"></i> Share</button></form>
        </div>
    </div>
  </div>
~~~~

Observe that the data is not any more fatched by `#{entety_name}`, i.e. `#{comment.name}`, but with
`{{comment.name}}`.

And `for` loop to diplay all the comments is still to be added which is simple. 
Add Angular directive `ng-repeat` in 
`<div class="container-article">` tag as an attribute: 
`<div class="container-article" ng-repeat='comment in data'>`.

This way fe fatch all comments within `data` variable in the `$scope` global variable. Now we have to
somehow fatch all the comments using REST API and put that under `$scope.data`. 
We do that using controller (continue reading).

## Controller 

Ok, now we are displaying the template for rendering the comments (you are able to see the input form), 
but no comment is displayed.

As within the server app, we will fatch the data from our REST API inside THE CONTROLLER.
Let us define one, that controlles comment's retrival, call it `comments.controller.js`, adn store it under
`app_client/comments`.

It is defined as followes.
`comments.controller.js`

~~~~.js

var commentsCrtl = function($http, $scope){
    var data = function(){
      return $http.get('/api/comments');}
     data().then(
         function success(response){
             $scope.data = response.data;
         },
         function error(response){
          $scope.msg = "Error while fetching comments.";
          console.log(response.e);
        });
 }
 
 //put the controller inside the app module.
 /* global commentsApp */
 commentsApp
    .controller("commentsCrtl",commentsCrtl);
~~~~

To be visible from the client side
we need to import the script `comments.controller.js`
inside out view (i.e. `layout.pug`).
`layout.pug`

~~~~{.pug}
    block content
    
    script(src='/angular/angular.min.js')
    script(src='/angular/angular-route.min.js')
    script(src='/app.js')
    script(src='/comments/comments.controller.js')
~~~~

## Displaying comments - router set up

For the end, we attach the view and the controller to the specific route in router.
As we want to display it under main page `/`, we change `{}` under route `/` to

~~~~.js
{
        templateUrl: 'comments/comments.view.html',
        controller: 'commentsCrtl'  
    }
~~~~
to our route provider.

At this point you should have the `app_client/app.js` file of the following form:

`app_client/app.js`

~~~~.js
/* global angular  */
var commentsApp = angular.module('comments', ['ngRoute']);

//specification of the router provider.
function provider($routeProvider) {
    //we are adding controller: 'commentsCrtl'
    $routeProvider
    .when('/', {
        templateUrl: 'comments/comments.view.html',
        controller: 'commentsCrtl'  
    })
    .otherwise({
    controller : function(){
        window.location.replace('/');
    }, 
    template : "<div></div>"
});

}

commentsApp
.config(['$routeProvider',provider]);
~~~~

## Test
Run the app, the comments should display now (if you have any, if you have run the mongoimport command 
from the readme.md (root folder) instructions).

## Global scope

Fatching and storing all the data in 
`$scope` variable is a bad practice.
Store only specific data for specific view (NOT ACCESSIBLE from the other VIEW with DIFFERENT CONTROLER)
using `controllerAs` directive.

To do so, in the router,
define the variable in which you will store all the necessary data to display the view
attached to certain url ending, i.e. `/`.
> Remember, storing the data is done IN THE CONTROLLER.

So in our case, we just add `controllerAs: 'vm'` definition in the router provider under route `/`.

At this point you should have the `app_client/app.js` file of the following form:
`app_client/app.js`

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
be stored inside vm, and not $scope (in the controller `commentsCtrl`)
and in the view, we access the data with `vm.data` insted of just `data`.


## Services (storitev)

Now, insted of fatching the data in controller, it would be nice 
to have a separate service just doing that.

We want an service provider that will 
fatch the data from our own REST API. This way, we do not have to copy-paste the code to
fatch the same data inside different controllers.

### Service initialization

We first create folder services inside `app_client`,

~~~~ {.bash}
 cd app_client
 mkdir all
 cd all
 mkdir services
~~~~

Then we create a service that will fatch our data.

~~~~ {.bash}
touch commentsData.service.js
~~~~

Then, we define the service and attach that
to the root modul.

`app_client/all/services/commentsData.service.js`

~~~~
function commentsData($http) {
  
  var data = function(){
                return $http.get('/api/comments');
              };

  return {
    'comments': data
  };
}

//attach to the app
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
We change our controller acordingly.

At this point you should have the `comments.controller.js` file of the following form:

`comments.controller.js`

~~~~
function commentsCtrl(commentsData) {
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
}

/* global commentsApp */
commentsApp
  .controller('commentsCtrl', commentsCtrl);
~~~~


# FINISH
Run the app, it should display comments under the main page.
For any further questions/recommendations/errors, send an e-mail to the assistent.

## Going further
* [https://scotch.io/tutorials/pretty-urls-in-angularjs-removing-the-hashtag](Removing hashtag),
* Nice [https://johnpapa.net/angularjss-controller-as-and-the-vm-variable/](article) on using `ControllerAs`, as well as the discussion
 on [https://stackoverflow.com/questions/22285597/angularjs-why-use-controller-as-vm](stackoverflow)






