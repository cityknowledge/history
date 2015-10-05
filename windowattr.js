window.onload = function () {
    'use strict';
    size();
    draw();
};

window.onresize = function () {
    'use strict';
	var isIE = ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
    if (isIE) {
		window.location.reload(true);
	}
    size();
    draw();
};

window.addWheelListener(window, scroll);