function scroll(event) {
    'use strict';
	var isIE = ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null)));
    if (!isIE) { window.scrollBy(event.deltaY || event.wheelDeltaY, 0); }
	if (isIE) { window.scrollBy(event.deltaY * 120, 0); }
}