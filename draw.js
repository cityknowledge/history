var drawTick, drawTicks;

function draw() {
    'use strict';
    
    var canvas = document.getElementById('axis'),
        ctx = canvas.getContext("2d"),
        w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        left = 10,
        right = t - 50,
        top = 0,
        bottom = 30,
        vctr = 25,
        hctr = right / 2;
    
    ctx.clearRect(left, top, right, bottom);
    ctx.fillStyle = "#000000";
    ctx.moveTo(left, vctr);
    ctx.lineTo(right, vctr);
    ctx.stroke();
    
    drawTicks(left, right - 10, ctx);
}

// Calculates how many ticks get drawn, where they get drawn, and what years are displayed.
function drawTicks(left, eltWidth, ctx) {
    'use strict';
    
    var count = Math.round(eltWidth / 100),
        startYear = 500,
        endYear = 2015,
        range = endYear - startYear,
        x,
        interval = Math.round(range / count),
        delta = eltWidth / count;
    
    for (x = 0; x <= count; x++) {
        var label = startYear + (interval * x),
            position = left + (delta * x);
        drawTick(position, label.toString(), ctx);
    }
    
}

// Draws a tick at the specified location
function drawTick(x, lbl, ctx) {
    'use strict';
    
    ctx.moveTo(x, 20);
    ctx.lineTo(x, 30);
    ctx.stroke();
    
    var lsize = ctx.measureText(lbl);
    ctx.font = "12pt Arial";
    ctx.fillText(lbl, x - (lsize.width / 2), 15);

}