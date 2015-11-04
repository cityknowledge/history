/*global angular, scrollVal: true, $, hideInfoPanel, unobscure*/
/*jslint plusplus: true, es5: true*/

var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http, $filter, $interpolate) {
    'use strict';
    
    // Define scope variables
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    $scope.ipevent = 0;
    
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
    
    $scope.displayInfoPanel = function (panelNo) {
        var events,
            event,
            image,
            i,
            string = "";
        
        $scope.ipevent = panelNo;
        
        events = $scope.events;
        events = $scope.search ? $filter('filter')(events, $scope.search) : events;
        events = $scope.filter ? $filter('filter')(events, {Filter: $scope.filter}) : events;
        
        event = events[panelNo - 1];
        
        $("div#infopanel_wrap").css("display", "block");
        
        if (event.Image) {
            string += "<div style=\"float:right;width:50%;display:block;\">";
            for (i = 0; i < event.Image.length; i++) {
                string += "<img src=\"" + event.Image[i] + "\" style=\"width:100%;\">";
            }
            string += "</div>";
        }
        
        string += "<h2>" + (event.Date || event.Year) + ": " + event.Title + "</h1>";
        
        string += "<p>" + event.Content + "</p>";
        
        document.getElementById("infopanel").innerHTML = string;
    };
    
    $scope.mouseEventToPanelNo = function (mouseevent) {
        var panelNo,
            scrollOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
    
        panelNo = mouseevent.x + scrollOffset;
        panelNo -= parseInt($("div#timeline").css("left"), 10);
        panelNo /= parseInt($("article").css("width"), 10) + parseInt($("article").css("margin-right"), 10);
        panelNo = Math.ceil(panelNo);

        return panelNo;
    };
    
    $scope.hideInfoPanel = window.hideInfoPanel;
    
    $scope.obscure = function () {
        $("#obscure")
            .css("animation-name", "obscure")
            .css("display", "block");
    };

    $scope.unobscure = window.unobscure;
    
    $scope.barAct = function (key) {
        switch (key) {
        case "close":
            $scope.unobscure();
            $scope.hideInfoPanel();
            break;
        case "last":
            $scope.hideInfoPanel();
            $scope.displayInfoPanel($scope.ipevent - 1);
            break;
        case "next":
            $scope.hideInfoPanel();
            $scope.displayInfoPanel($scope.ipevent + 1);
            break;
        case "back":
            break;
        default:
            break;
        }

    };
});

window.controllerLoad();