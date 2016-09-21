/**
 * Created by Tibbers on 8/19/16.
 */
var app = angular.module("Url-Shortener");

app.controller("urlController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams){
    $http.get("/api/v1/urls/" + $routeParams.shortUrl)
        .success(function (data) {
            $scope.shortUrl = data.shortUrl;
            $scope.longUrl = data.longUrl;
            $scope.shortUrlToShow = "http://localhost/" + data.shortUrl;
        });
    $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks")
        .success(function (data) {
            $scope.totalClicks = data;
        });
}]);