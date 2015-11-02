/*global size, draw, scroll, $, CanvasState*/

var scrollVal = 0;

window.controllerLoad = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]),
        canvasEls,
        preventHl,
        i;
    state.drawState();
    window.setInterval(function () {
        window.scrollBy(scrollVal, 0);
    }, 5);
    canvasEls = document.getElementsByTagName('canvas');
    preventHl = function () { return false; };
    i = 0;

    while (i < canvasEls.length) {
        canvasEls[i].onmousedown = preventHl;
        i += 1;
    }
};

window.onresize = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]);
    state.drawState();
};

window.addWheelListener(window, scroll);