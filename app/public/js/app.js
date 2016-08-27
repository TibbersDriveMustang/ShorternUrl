/**
 * Created by Tibbers on 8/19/16.
 */
var app = angular.module('Url-Shortener',['ngRoute', 'ngResource']);

app.config(
    function ($routeProvider) {
        $routeProvider
            .when("/", {  //actually : #/
                    templateUrl : "./public/views/home.html",
                    controller : "homeController"
            })
            .when("/urls/:shortUrl", {    // : infront indicate shortUrl is a variable
                templateUrl : "./public/views/url.html",
                controller : "urlController"
            });
    }
);