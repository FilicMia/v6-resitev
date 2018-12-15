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








