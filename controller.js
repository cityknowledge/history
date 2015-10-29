/*global angular*/
/*jslint plusplus: true*/
var app = new angular.module('appTimeline', []);
var maxZoom = 2;
var scrollVal = 0;
app.controller("controllerTimeline", function ($scope, $http) {
    'use strict';
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    $scope.zoomIn = function () {
        if ($scope.zoom !== maxZoom) {
            $scope.zoom++;
        }
    };
    $scope.zoomOut = function () {
        if ($scope.zoom  !== 0) {
            $scope.zoom--;
        }
    };
    $http.get("data.json").success(function (response) {
        $scope.events = response.events;
    });
    $scope.scroll = function (val) {
        scrollVal = val;
    };
    $scope.stopScroll = function () {
        scrollVal = 0;
    };
});

window.setInterval(function () {
    "use strict";
    window.scrollBy(scrollVal, 0);
}, 5);

window.controllerLoad();