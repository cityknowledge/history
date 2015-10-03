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

if (window.onwheel) {
    window.addEventListener('wheel', scroll)
}
else if (window.onmousewheel) {
    window.addEventListener('mousewheel', scroll);
}
