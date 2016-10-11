/**
 * Created by Tibbers on 8/19/16.
 */
//using ng module declared in app.js
var app = angular.module("Url-Shortener");

//'$scope' is joint of two way bindling, provided by ngRoute, '$http' provided by ngResource, '$location' provided by ngRoute
app.controller("homeController", ["$scope", "$http","$location", function ($scope, $http, $location){
    //the 'submit()' @ home.html
    $scope.submit = function () {
        //sent to backend using angular-resource
        $http.post(
            "/api/v1/urls",
            {
                //longUrl from home.html
                longUrl: $scope.longUrl
            })
        //if post success, then use following callback function
            .success(function (data) {
                //go to following subpage
                $location.path("/urls/" + data.shortUrl);
            });
    }
}]);