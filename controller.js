var app = new angular.module('appTimeline', []);
var maxZoom = 2;
app.controller("controllerTimeline", function ($scope, $http) {
    $scope.zoom = 0;
    $scope.search = "";
    $scope.filter = "";
    $scope.zoomIn = function () {
        if ($scope.zoom !== maxZoom) $scope.zoom++;
    }
    $scope.zoomOut = function () {
        if ($scope.zoom  !== 0) $scope.zoom--;   
    }
}