## Angular UI

1. Download the script and place in `lib` from [http://angular-ui.github.io/bootstrap/](http://angular-ui.github.io/bootstrap/),
2. `<script src="/lib/ui-bootstrap-tpls-2.5.0.min.js"></script>` in `index.html`,
3. `app.js`
```.js
/* global angular */
angular
    .module('comments',['ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider','$locationProvider', provider]);

})();

````
4. Add a click control with `ng-click`,
5. Define in the scpope function that should be run on the click
6. In the div on which the click should run the function, define
attribute ng-click='funName(funArgs)'
8. Try it.

PS You can also pass that function to the directive to hadle
some `div` in the directive (view). The function can vary depending on
the directive parent (as in our case for directive comment and 
ng-click function attached to the `onclickf` attribute).
More: [https://stackoverflow.com/questions/29857998/proper-way-to-pass-functions-to-directive-for-execution-in-link]()
