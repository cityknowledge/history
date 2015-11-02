/*global angular, scrollVal: true, $*/
/*jslint plusplus: true, es5: true*/

var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http, $filter, $interpolate) {
    'use strict';
    
    // Define scope variables
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    
    // HTTP Request for the JSON data.
    $http.get("data.json").success(function (response) {
        $scope.events = response.events;
    });
    
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
    
    $scope.scroll = function (val) {
        scrollVal = val;
    };
    
    $scope.stopScroll = function () {
        scrollVal = 0;
    };
    
    $scope.displayInfoPanel = function (mouseEvt) {
        var panelNo,
            events,
            event,
            scrollOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
        panelNo = mouseEvt.x + scrollOffset;
        panelNo -= parseInt($("div#timeline").css("left"), 10);
        panelNo /= parseInt($("article").css("width"), 10) + parseInt($("article").css("margin-right"), 10);
        panelNo = Math.ceil(panelNo);
        
        events = $scope.events;
        events = $scope.search ? $filter('filter')(events, $scope.search) : events;
        events = $scope.filter ? $filter('filter')(events, {Filter: $scope.filter}) : events;
        
        event = events[panelNo - 1];
        
        $("div#infopanel").css("display", "block");
        document.getElementById("infopanel").innerHTML = "Hello! " + panelNo + "<br> \n\
            Title: " + event.Title;
    };
    
    $scope.hideInfoPanel = function () {
        $("div#infopanel")
            .css("display", "none");
        document.getElementById("infopanel").innerHTML = "";
    };
    
    $scope.obscure = function () {
        $("#obscure")
            .css("animation-name", "obscure")
            .css("display", "block");
    };

    $scope.unobscure = function () {
        $("#obscure")
            .css("animation-name", "unobscure");
        setTimeout(function () {
            $("#obscure")
                .css("display", "none");
        }, 1000);
    };
});

window.controllerLoad();