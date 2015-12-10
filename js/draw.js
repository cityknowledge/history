/*jshint browser: true*/
/*global Rectangle, $, timePeriods, yearToSliderPos, sliderPosToRealSliderPos, realSliderPosToSliderPos*/

var drawTick, drawTicks;

function draw(canvasState) {
    'use strict';
    
    var x, rect, start, events, lastYear,
        canvas = document.getElementById('axis'),
        ctx = canvas.getContext("2d"),
        w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        left = 22,
        right = t - 38,
        top = 0,
        bottom = 30,
        vctr = 25,
        hctr = right / 2;
        
    ctx.font = "17pt Serif";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.moveTo(0, vctr);
    ctx.lineTo(t - 16, vctr);
    ctx.stroke();
    
    drawTicks(left, right - 22, ctx, top, bottom, canvasState);
    
    events = window.$scope.getEvents();
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.getFilter()) : events;
    
    try {
        for (x = 0; x < events.length; x++) {
            if (events[x].Year < canvasState.leftSide) {
                continue;
            } else if (events[x].Year > canvasState.rightSide) {
                break;
            }
            if (lastYear === events[x].Year) {
                continue;
            }
            drawTick(yearToSliderPos(realSliderPosToSliderPos(events[x].Year)), "", ctx, top, bottom);
            lastYear = events[x].Year;
        }
    } catch (err) {
    }
    
    // Start drawing the second bar.
    top = 50;
    
    for (x = 0; x < timePeriods.length; x++) {
        start = yearToSliderPos(timePeriods[x].start);
        rect = new Rectangle(start, top + 20, yearToSliderPos(timePeriods[x].end) - start + 1, 20, "rgb(" + timePeriods[x].color.r + "," + timePeriods[x].color.g + "," + timePeriods[x].color.b + ")");
        rect.drawRect(ctx);
    }
    
    ctx.fillStyle = "#ffffff";
    
    for (x = 400; x <= 2015; x += 100) {
        if (x % 200) {
            drawTick(yearToSliderPos(x), "", ctx, top, bottom + 10);
        } else {
            drawTick(yearToSliderPos(x), x, ctx, top, bottom + 10);
        }
    }
}

function calculateInterval(range) {
    if (range >= 1000) {
        return 100;
    } else if (range >= 500) {
        return 50;
    } else if (range >= 250) {
        return 25;
    } else if (range >= 100) {
        return 10;
    } else if (range >= 50) {
        return 5;
    } else if (range >= 20) {
        return 2;
    } else if (range >= 10) {
        return 1;
    }
}

// Calculates how many ticks get drawn, where they get drawn, and what years are displayed.
function drawTicks(left, eltWidth, ctx, top, bottom, canvasState) {
    'use strict';
    var x, y,
        range = canvasState ? canvasState.rightSide - canvasState.leftSide : 1615,
        interval = calculateInterval(range),
        yinterval = eltWidth / range;
    
    try {
    for (x = canvasState.leftSide, y = left; x < canvasState.rightSide; x++, y += yinterval) {
        if (x % interval === 0) {
            drawTick(yearToSliderPos(realSliderPosToSliderPos(x)), x, ctx, top, bottom);
        }
    }
    } catch (e) {
        window.setTimeout(draw, 1000);
    }
    
    /*
    var count = Math.round(eltWidth / 100),
        startYear = canvasState.leftSide,
        endYear = canvasState.rightSide,
        range = endYear - startYear,
        interval = Math.round(range / count),
        delta = eltWidth / count,
		x,
		label,
		position;
    
    for (x = 0; x <= count; x++) {
        label = startYear + (interval * x);
        position = left + (delta * x);
        drawTick(position, label.toString(), ctx, top, bottom);
    }
    */
}

// Draws a tick at the specified location
function drawTick(x, lbl, ctx, top, bottom) {
    'use strict';
	var lsize;
    
    ctx.moveTo(x, top + 20);
    ctx.lineTo(x, top + bottom);
    ctx.stroke();
    
    lsize = ctx.measureText(lbl);
    ctx.fillText(lbl, x - (lsize.width / 2), top + 15);

}