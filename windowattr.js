/*global size, draw, scroll, $, CanvasState*/

window.controllerLoad = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]);
    state.drawState();
};

window.onresize = function () {
    'use strict';
    size();
    var state = new CanvasState($('canvas')[0]);
    state.drawState();
};

window.addWheelListener(window, scroll);