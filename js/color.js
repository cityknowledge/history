/*global $, getTimePeriodFromYear*/
/*jslint plusplus: true*/

function colorArticles() {
    'use strict';
    var x, color,
        articles = $("article"),
        events = window.$scope.events;
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.search) : events;
    events = window.$scope.filter ? window.$filter('filter')(events, {Filter: window.$scope.filter}) : events;
    
    for (x = 0; x < events.length; x++) {
        color = getTimePeriodFromYear(events[x].Year).color;
        articles[x].setAttribute("style", "background-color: rgba(" + color.r + "," + color.g + "," + color.b + ",.5);");
        window.alert(events[x].Year + "\n" + getTimePeriodFromYear(events[x].Year).title);
    }
    
    $("span")[0].innerHtml = "";
    
}