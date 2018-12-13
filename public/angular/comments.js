// Definicija root-modula aplikacije.
/* global angular, $http */
var commentsApp = angular.module('comments', []);

var commentsData = function($http){
    return $http.get('api/comments');
}

var listCommentsCtrl = function($scope, commentsData){
    $scope.msg = "Searching comments.";
    commentsData.then(
        function succes(response){
            $scope.msg = response.data.length > 0 ? "" : "No comments.";
            $scope.data = { comments: response.data };
        }, 
        function error(response){
            $scope.msg = "Error while fetching comments.";
            console.log(response.e);
        });
};

var showComment = function() {
    return {
        scope: {comment: "=tempcomment"},
        templateUrl: "/angular/template/show-comment.html"
        
    };
};

//dodati kontrolerja aplikaciji
commentsApp
.controller("listCommentsCtrl", listCommentsCtrl)
.directive("showComment", showComment)
.service("commentsData", commentsData);