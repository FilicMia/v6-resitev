(function() {
  function authentication($window, $http) {
    /*var b64Utf8 = function (seq) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(seq), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };*/
    
    var storeToken = function(token) {
      //todo
    };
    
    var returnToken = function() {
     return $window.localStorage['comments-token'];
    };
    
    var registration = function(user) {
      //todo
    };

    var login = function(user) {
      //todo
    };

    var logout = function() {
      $window.localStorage.removeItem('comments-token');
    };
    
    var logedin = function() {
        //todo
      };
    var currUser = function() {
        if (logedin()) {
          var token = returnToken();
          var content = JSON.parse($window.atob(token.split('.')[1]));
          return {
            mail: content.mail,
            name: content.name
          };
        }
      };

    
    return {
      storeToken: storeToken,
      returnToken: returnToken,
      registration: registration,
      login: login,
      logout: logout,
      logedin: logedin,
      currUser: currUser
    };
  }
  authentication.$inject = ['$window', '$http'];
  
  /* global angular */
  angular
    .module('comments')
    .service('authentication', authentication);
})();