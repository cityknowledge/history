/*global $*/
/*jslint plusplus: true*/

function yearToSliderPos(year) {
    'use strict';
    var ystart = parseInt(window.$scope.events[0].Year, 10),
        ylen = parseInt(window.$scope.events[window.$scope.events.length - 1].Year, 10) - ystart,
        sstart = 22,
        slen = document.getElementById("axis").width - 72;
    
    return (year - ystart) / ylen * slen + sstart;
}

function sliderPosToYear(sliderPos) {
    'use strict';
    var ystart = parseInt(window.$scope.events[0].Year, 10),
        ylen = parseInt(window.$scope.events[window.$scope.events.length - 1].Year, 10) - ystart,
        sstart = 22,
        slen = document.getElementById("axis").width - 72;
    return (sliderPos - sstart) / slen * ylen + ystart;
}

function panelNoToXPos(panelNo) {
    'use strict';
    var toRet = panelNo;
    toRet *= parseInt($("article").css("width"), 10) + parseInt($("article").css("margin-right"), 10);
    toRet += parseInt($("div#timeline").css("left"), 10);
    return toRet;
}

function scrollToYear(year) {
    'use strict';
    var events, panelNo, xPos;
    
    // Calculate which is the first event in this year
    events = window.$scope.events;
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.search) : events;
    events = window.$scope.filter ? window.$filter('filter')(events, {Filter: window.$scope.filter}) : events;
    
    for (panelNo = 0; panelNo < events.length; panelNo++) {
        if (parseInt(events[panelNo].Year, 10) >= year) {
            // break when we've found the right event.
            break;
        }
    }
    
    // Calculate its x position on the page
    xPos = panelNoToXPos(panelNo);
    
    // Scroll to that location
    window.scrollTo(xPos, 0);
}

function xPosToPanelNo(xpos) {
    'use strict';
    var toRet = xpos;
    toRet -= parseInt($("div#timeline").css("left"), 10);
    toRet /= parseInt($("article").css("width"), 10) + parseInt($("article").css("margin-right"), 10);
    toRet = Math.ceil(toRet);
    
    return toRet;
}

function mouseEventToPanelNo(mouseevent) {
    'use strict';
    var panelNo,
        scrollOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
    
    // mouseevent.x for Webkit, IE
    // mouseevent.clientX for Mozilla
    panelNo = (mouseevent.x || mouseevent.clientX) + scrollOffset;
    panelNo = xPosToPanelNo(panelNo);

    return panelNo;
}

function getFirstEventShown() {
    'use strict';
    return xPosToPanelNo(document.documentElement.scrollLeft || document.body.scrollLeft);
}

function sliderPosToRealSliderPos(sliderPos) {
    'use strict';
    
    var spstart = window.$scope.events[0].Year,
        spend = window.$scope.events[window.$scope.events.length - 1].Year,
        rspstart = $("canvas")[0].canvasState.leftSide,
        rspend = $("canvas")[0].canvasState.rightSide;
    
    return ((sliderPos - spstart) / (spend - spstart) * (rspend - rspstart)) + rspstart;
}

function realSliderPosToSliderPos(realSliderPos) {
    'use strict';
    
    var spstart = parseInt(window.$scope.events[0].Year, 10),
        spend = window.$scope.events[window.$scope.events.length - 1].Year,
        rspstart = $("canvas")[0].canvasState.leftSide,
        rspend = $("canvas")[0].canvasState.rightSide;
    
    return ((realSliderPos - rspstart) / (rspend - rspstart) * (spend - spstart)) + spstart;
}