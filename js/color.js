/*jshint browser: true*/
/*global $, getTimePeriodFromYear*/

function colorArticles() {
    'use strict';
    if (window.$scope.zoom !== 0) {
        var x, color,
            articles = $("article"),
            events = window.$scope.events;
        events = window.$scope.search ? window.$filter('filter')(events, window.$scope.getFilter()) : events;

        for (x = 0; x < events.length; x++) {
            color = getTimePeriodFromYear(events[x].Year).color;
            articles[x].setAttribute("style", "background-color: rgba(" + color.r + "," + color.g + "," + color.b + ",.5);");
        }

    }
    
    $("span")[0].innerHtml = "";
    
}