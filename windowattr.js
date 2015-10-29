/*global size, draw, scroll, $, CanvasState*/

var scrollVal = 0;

window.controllerLoad = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]);
    state.drawState();
    window.setInterval(function () {
        window.scrollBy(scrollVal, 0);
    }, 5);
};

window.onresize = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]);
    state.drawState();
};

window.addWheelListener(window, scroll);