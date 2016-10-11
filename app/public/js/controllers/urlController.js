/**
 * Created by Tibbers on 8/19/16.
 */
var app = angular.module("Url-Shortener");

//'$routeParams' provided by ngRoute,to bind the params from relative html
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

    var renderChart = function (chart, infos) {
        $scope[chart + 'Labels'] = [];
        $scope[chart + 'Data'] = [];
        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
            .success(function (data) {
                data.forEach(function (info) {
                    $scope[chart + 'Labels'].push();
                    $scope[chart + 'Data'].push();
                });
            });
    };

    renderChart("pie", "referer");
}]);