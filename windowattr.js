/*global size, draw, scroll, $*/

window.controllerLoad = function () {
    'use strict';
    size();
    draw();
};

window.onresize = function () {
    'use strict';
    size();
    draw();
};

window.addWheelListener(window, scroll);