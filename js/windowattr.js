/*global size, draw, scroll, $, CanvasState, yearToSliderPos, getFirstEventShown, colorArticles, realSliderPosToSliderPos, getTimePeriodFromYear*/
/*jslint plusplus: true*/

// Global scroll delta.
var scrollVal = 0;
var relocate = true;

// Function called after the controller is loaded.
// This is necessary in order to let the controller load before resizing content panels.
// Otherwise, it would have no effect.
// Essentially runs everything related to sizing and drawing on the page, as well as creating a new canvas state.
window.controllerLoad = function () {
    'use strict';
    // Initialize variables.
    var canvasEls, arrowEls, i, preventHl, state;
    
    // Calculate the sizes for various elements on the page and resize them accordingly.
    size();
    
    // Prevent the user from selecting text on the page with a click that started on the slider.
    canvasEls = document.getElementsByTagName('canvas');
    preventHl = function () { return false; };
    for (i = 0; i < canvasEls.length; i++) {
        canvasEls[i].onmousedown = preventHl;
    }
    arrowEls = document.getElementsByClassName("arrow");
    for (i = 0; i < arrowEls.length; i++) {
        arrowEls[i].onmousedown = preventHl;
    }
    
    
    // Repeating function that scrolls by scroll delta every five milliseconds.
    window.setInterval(function () {
        window.scrollBy(scrollVal * 4, 0);
    }, 20);
};

// Function called when the window is resized.
window.onresize = function () {
    'use strict';
    
    // Initialize variable
    var state;
    
    // Recalculate the sizes for various elements on the page and resize them accordingly
    size();
    
    // Generate a new canvas state from the newly resized canvas and draw it.
    state = new CanvasState($('canvas')[0]);
    state.drawState();
    
    document.getElementById("axis").canvasState = state;
};

window.onscroll = function () {
    'use strict';
    var time, events,
        npos = yearToSliderPos(realSliderPosToSliderPos(parseInt(window.$scope.events[getFirstEventShown()].Year, 10)));
    
    // Move the slider to npos.
    if (relocate) {
        document.getElementById("axis").canvasState.slider.x = npos;
        document.getElementById("axis").canvasState.valid = false;
    }
    
    events = window.$scope.events;
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.getFilter()) : events;
    
    time = getTimePeriodFromYear(events[getFirstEventShown()].Year);
    if (window.$scope.tp !== time) {
        window.$scope.tp = time;
        window.$scope.$apply();
    }
    
    return true;
};

// Adds the scroll function as a wheel listener.
// For more information see scroll.js::scroll() and interceptWheel.js::window.addWheelListener.
window.addWheelListener(window, scroll);