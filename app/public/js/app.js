/**
 * Created by Tibbers on 8/19/16.
 */
//This js will handle the index.html, using ngRoute 'ngRoute', using ng-resource 'ngResource'
var app = angular.module('Url-Shortener',['ngRoute', 'ngResource','chart.js']);


//'config()' function from ngRoute
app.config(
    //routeProvider from 'ngRoute'
    function ($routeProvider) {
        $routeProvider
            //actually : #/
            //insert the following subpage
            .when("/", {
                    templateUrl : "./public/views/home.html",
                    controller : "homeController"               //using this controller
            })
            // : infront indicate shortUrl is a variable
            .when("/urls/:shortUrl", {
                templateUrl : "./public/views/url.html",
                controller : "urlController"
            });
    }
);