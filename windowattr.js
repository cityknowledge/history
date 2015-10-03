window.onload = function () {
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