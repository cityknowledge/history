/*global angular, scrollVal: true, $, hideInfoPanel, unobscure, shouldScroll: true, mouseEventToPanelNo, CanvasState*/
/*jslint plusplus: true, es5: true*/

var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http, $filter, $interpolate, $sce) {
    'use strict';
    
    var state;
    
    window.$scope = $scope;
    window.$filter = $filter;
    
    // Define scope variables
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    $scope.ipevent = 0;
    
    // HTTP Request for the JSON data.
    $http.get("data.json").success(function (response) {
        $scope.events = response.events;
        state = new CanvasState($('canvas')[0]); // a new canvas state based on the newly resized canvas.
        state.drawState();
        document.getElementById("axis").canvasState = state;
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
    
    $scope.renderHtml = function (html_code) {
        return $sce.trustAsHtml(html_code);
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
            toRet,
            string = "";
        
        shouldScroll = false;
        
        $scope.ipevent = panelNo;
        
        events = $scope.events;
        events = $scope.search ? $filter('filter')(events, $scope.search) : events;
        events = $scope.filter ? $filter('filter')(events, {Filter: $scope.filter}) : events;
        
        if (panelNo < 1) {
            event = events[0];
            toRet = false;
        } else if (panelNo > events.length) {
            event = events[events.length - 1];
            toRet = false;
        } else {
            event = events[panelNo - 1];
            toRet = true;
        }
        
        $("div#infopanel_wrap").css("display", "block");
        
        if (event.Image) {
            string += "<div style=\"float:right;width:50%;display:block;\">";
            for (i = 0; i < event.Image.length; i++) {
                string += "<img src=\"" + event.Image[i] + "\" style=\"max-width:100%;vertical-align:top;\">";
            }
            string += "</div>";
        }
        
        string += "<h2>" + (event.Date || event.Year) + (event.Title ? (": " + event.Title + "</h2>") : "</h2>");
        
        string += "<p>" + event.Content + "</p>";
        
        document.getElementById("infopanel").innerHTML = string;
        
        return toRet;
    };
    
    $scope.mouseEventToPanelNo = mouseEventToPanelNo;
    
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
            if (!$scope.displayInfoPanel($scope.ipevent - 1)) {
                $scope.ipevent++;
            }
            break;
        case "next":
            $scope.hideInfoPanel();
            if (!$scope.displayInfoPanel($scope.ipevent + 1)) {
                $scope.ipevent--;
            }
            break;
        case "back":
            break;
        default:
            break;
        }

    };
    
    $scope.colorArticles = window.colorArticles;
});

window.controllerLoad();


