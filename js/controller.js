/*jshint browser: true*/
/*global angular, scrollVal: true, $, hideInfoPanel, unobscure, shouldScroll: true, mouseEventToPanelNo, CanvasState, timePeriods, Firebase, calculatePercentileThreshold, generateSubset, draw*/

var FB = new Firebase("http://venicedata.firebaseio.com/");
var app = new angular.module('appTimeline', []);
var maxZoom = 3;
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
    $scope.tp = window.ri;
    
    // HTTP Request for the JSON data.
    // $http.get("data.json").success(function (response) {
    //     $scope.events = response.events;
    //     state = new CanvasState($('canvas')[0]); // a new canvas state based on the newly resized canvas.
    //     state.drawState();
    //     document.getElementById("axis").canvasState = state;
    //     $("#load").css("display", "none");
    // });
    /*
    var FB = new Firebase("https://venicedata.firebaseio.com");
    FB.authWithPassword({email: 'minni@osti.co', password: 'tomaso'}, function(e){alert('logged');})
    var authData = FB.getAuth();
    FB.createUser({email: 'test@xx.com', password: '123'}, function(e){alert('ok');})
    */
    FB.child('history').on('value', function (snapshot) {
        var lcent = 0;
        $scope.events = [];
        $scope.centuries = [];
        snapshot.forEach(function (value) {
            var item = value.val(),
                key = value.key();
            item.key = key;
            $scope.events.push(item);
            if (item.Year % 100 === 0 && item.Year != lcent) {
                lcent = item.Year;
                $scope.centuries.push(item);
            }
        });
        state = new CanvasState($('canvas')[0]); // a new canvas state based on the newly resized canvas.
        state.drawState();
        document.getElementById("axis").canvasState = state;
		$("#wait").css("display", "none");
        $("#load").css("display", "none");
        $(".fadein").css("display", "block");
        $(".slidein").css("display", "block");
        $("body").css("cursor", "initial");
        $scope.events2 = generateSubset($scope.events, calculatePercentileThreshold(6));
        $scope.events1 = generateSubset($scope.events, calculatePercentileThreshold(2));
        window.handleParams();
        $scope.$apply();
    });
    
    $scope.getEvents = function () {
        switch ($scope.zoom) {
            case 0:
                return $scope.centuries;
            case 1:
                return $scope.events1;
            case 2:
                return $scope.events2;
            case 3:
                return $scope.events;
        }
    };
    
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
	
	$scope.remSpec = function (str) {
		return str.replace(/ /g, "_").replace(/[^A-Za-z0-9_]/g, "");
	};
    
    $scope.displayInfoPanel = function (events, panelNo) {
        
        var event,
            image,
            i,
            toRet,
            string = "",
            content = "",
            content2 = "",
            val, pos;
        
        shouldScroll = false;
        
        $scope.ipevent = panelNo;
        
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
        
        if ($scope.auth) {
            document.getElementById("flagbutton").setAttribute("onmouseup", "flag('" + event.key + "');");
        }
            
        $("div#infopanel_wrap")
            .css("display", "block")
            .css("-webkit-animation-name", "fadein")
            .css("-moz-animation-name", "fadein")
            .css("-o-animation-name", "fadein")
            .css("animation-name", "fadein");
        
        if (event.Image || event.Location) {
            string += "<div style=\"float:right;width:50%;display:block;\">";
            if (event.Image) {
                for (i = 0; i < event.Image.length; i++) {
                    string += "<img src=\"" + event.Image[i] + "\" style=\"max-width:100%;vertical-align:top;\">";
                }
            }
            string += "</div>";
        }
        
        document.getElementById("iptitle").innerHTML = (event.Date + " " + event.Year) + (event.Title ? (": " + event.Title) : "");
        
        content = event.Content;
        
        while (content && content.indexOf("@") >= 0) {
            pos = content.indexOf("@");
            content2 += content.substr(0, pos);
            content = content.substr(pos + 1);
            pos = content.indexOf("#");
            val = content.substr(0, pos);
            content2 += "<a style='cursor: pointer' onclick=\"openEncycl(&quot;" + encodeURI($scope.remSpec(val)) + "&quot;)\">" + val + "</a>";
            content = content.substr(pos + 1);
        }
        
        if (content) {
            content2 += content;
        }
        
        string += "<p>" + content2 + "</p>";
        
        string += "<p>Citazione: " + event.Citation + "</p>";
        
        string += "<a href=\"?event=" + event.key + "\">Collegamento permanente a quest&#8217;evento</a>";
        
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
            $scope.hideInfoPanel(true);
            if (!$scope.displayInfoPanel($scope.getEvents(), $scope.ipevent - 1)) {
                $scope.ipevent++;
            }
            break;
        case "next":
            $scope.hideInfoPanel(true);
            if (!$scope.displayInfoPanel($scope.getEvents(), $scope.ipevent + 1)) {
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
    
    $scope.zoomWithDest = function (period) {
        $scope.zoomIn();
        $scope.callback(function () {
            $scope.scrollToYear(period.start);
        });
    };
    
    $scope.getFilter = function () {
        if (isNaN($scope.search)) {
            return $scope.search;
        } else {
            return {Year: $scope.search};
        }
    };
    
    $scope.bookmark = function () {
        var events = $scope.getEvents();
        events = $scope.search ? $filter('filter')(events, $scope.getFilter()) : events;
        
        if (!window.hasBookmark($scope.filter, events[$scope.ipevent - 1].key)) {
            window.addBookmark($scope.filter, events[$scope.ipevent - 1].key);
        } else {
            window.remBookmark($scope.filter, events[$scope.ipevent - 1].key);
        }
    };
    
    $scope.getGroups = function () {
        return window.getGroups();
    };
    
    $scope.hasBookmark = function (a, b) {
        return window.hasBookmark(a, b);
    };
    
    $scope.getFirstEventShown = window.getFirstEventShown;
    
    $scope.getTimePeriod = window.getTimePeriodFromYear;
    
    $scope.newGroup = function () {window.newGroup(); };
    
    $scope.getText = function (text) {
        return ((text.length > 200) ? text.substr(0, 200) + "..." : text).replace(/@|#/g, "");
    };
    
    $scope.sendFBCUD = window.sendFBCUD;
    
    $scope.auth = false;
    
    $scope.getTimePeriodFromYear = window.getTimePeriodFromYear;
    
    $scope.getColor = function(event) {
        var color = window.getTimePeriodFromYear(event.Year).color,
            obj = {"background-color": "rgba(" + color.r + "," + color.g + "," + color.b + ",1)"};
        return obj["background-color"];
    };
    
    $scope.zoomTo = function (level) {
        $scope.zoom = level;
    };
});

window.controllerLoad();


