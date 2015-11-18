/*global angular, scrollVal: true, $, hideInfoPanel, unobscure, shouldScroll: true, mouseEventToPanelNo, CanvasState, timePeriods*/
/*jslint plusplus: true, es5: true*/

var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http, $filter, $interpolate, $sce, $timeout) {
    'use strict';
    
    var state;
    
    window.$scope = $scope;
    window.$filter = $filter;
    
    // Define scope variables
    $scope.zoom = 0;
    $scope.search = "";
    $scope.actsearch = "";
    $scope.filter = "";
    $scope.ipevent = 0;
    $scope.timePeriods = timePeriods;
    $scope.ftype = "";
    
    // HTTP Request for the JSON data.
    $http.get("data.json").success(function (response) {
        $scope.events = response.events;
        state = new CanvasState($('canvas')[0]); // a new canvas state based on the newly resized canvas.
        state.drawState();
        document.getElementById("axis").canvasState = state;
        $("#load").css("display", "none");
    });
    
    $scope.zoomIn = function () {
        $("#load").css("display", "block");
        
        window.setTimeout(function () {
            if ($scope.zoom !== maxZoom) {
                $scope.zoom++;
            }
            $scope.$applyAsync();
            $scope.callback(function () {
                $("#load").css("display", "none");
            });
        }, 10);
    };
    
    $scope.callback = function (fun) {
        if ($scope.$$phase) {
            window.setTimeout($scope.callback, 100, fun);
        } else {
            fun();
        }
    };

    $scope.zoomOut = function () {
        $("#load").css("display", "block");
        
        window.setTimeout(function () {
            if ($scope.zoom !== 0) {
                $scope.zoom--;
            }
            $scope.$apply();
            $scope.callback(function () {
                $("#load").css("display", "none");
            });
        }, 1);
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
        events = $scope.search ? $filter('filter')(events, $scope.getFilter()) : events;
        
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
        
        string += "<h2>" + (event.Date + " " + event.Year) + (event.Title ? (": " + event.Title + "</h2>") : "</h2>");
        
        string += "<p>" + event.Content + "</p>";
        
        document.getElementById("infopanel").innerHTML = string;
        
        return toRet;
    };
    
    $scope.mouseEventToPanelNo = mouseEventToPanelNo;
    
    $scope.hideInfoPanel = window.hideInfoPanel;
    
    $scope.obscure = function () {
        $("#obscure")
            .css("-webkit-animation-name", "obscure")
            .css("-moz-animation-name", "obscure")
            .css("-o-animation-name", "obscure")
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
    
    $scope.updateSearch = function (event) {
        if (event.keyCode === 13) { // Enter key
            $scope.search = $scope.actsearch;
            $scope.$apply();
        }
    };
    
    $scope.scrollToYear = window.scrollToYear;
    $scope.colorArticles = window.colorArticles;
    
    $scope.zoomWithDest = function (period) {
        $scope.zoomIn();
        $scope.callback(function () {
            $scope.scrollToYear(period.start);
        });
    };
    
    $scope.getFilter = function () {
        switch ($scope.ftype) {
        case "":
            return $scope.search;
        case "Year":
            return {Year: $scope.search};
        case "Text":
            return {Content: $scope.search};
        }
    };
    
    $scope.bookmark = function () {
        if (!window.hasBookmark("default", $scope.events[$scope.ipevent].UID)) {
            window.addBookmark("default", $scope.events[$scope.ipevent].UID);
        } else {
            window.remBookmark("default", $scope.events[$scope.ipevent].UID);
        }
    };
    
    $scope.getGroups = function () {
        return window.getGroups();
    };
});

window.controllerLoad();


