/*jshint browser: true*/
/*global scrollVal: true*/

var shouldScroll = true;

function scroll(event) {
    'use strict';
    scrollVal = 0;
	
    if (shouldScroll) {
        if (event.deltaMode === 0) { // DOM_DELTA_PIXEL
            window.scrollBy(event.deltaY + event.deltaX, 0);
        } else if (event.deltaMode === 1) { // DOM_DELTA_LINE
            window.scrollBy((event.deltaY + event.deltaX) * 30, 0);
        } else if (event.deltaMode === 2) { // DOM_DELTA_PAGE
            window.scrollBy((event.deltaY + event.deltaX) * 120, 0);
        }
    }
}
