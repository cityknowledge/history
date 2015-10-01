var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http) {
    'use strict';
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    $scope.zoomIn = function () {
        if ($scope.zoom !== maxZoom) $scope.zoom++;
    }
    $scope.zoomOut = function () {
        'use strict';
        if ($scope.zoom  !== 0) $scope.zoom--;   
    }
    $http.get("data.json").success( function(response) {
        'use strict';
        $scope.events = response.data;
    });
});