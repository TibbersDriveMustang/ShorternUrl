/**
 * Created by Tibbers on 8/19/16.
 */
var app = angular.module("Url-Shortener");

app.controller("homeController", ["$scope", "$http","$location", function ($scope, $http, $location){
    $scope.submit = function () {
        $http.post(
            "/api/v1/urls",
            {
                longUrl: $scope.longUrl
            })
            .success(function (data) {      //callback function
                $location.path("/urls/" + data.shortUrl);
            });
    }
}]);