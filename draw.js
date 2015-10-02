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
        left = 0,
        right = t - 40,
        top = 0,
        bottom = 30,
        vctr = 15,
        hctr = right / 2;
    
    ctx.clearRect(left, top, right, bottom);
    ctx.fillStyle = "#000000";
    ctx.moveTo(left, vctr);
    ctx.lineTo(right, vctr);
    ctx.stroke();
    
    drawTicks(right, ctx);
}

// Calculates how many ticks get drawn, where they get drawn, and what years are displayed.
function drawTicks(eltWidth, ctx) {
    'use strict';
}

// Draws a tick at the specified location
function drawTick(x, lbl, ctx) {
    'use strict';
    
    ctx.moveTo(x, 10);
    ctx.lineTo(x, 20);
    ctx.stroke();
    
    var lsize = ctx.measureText(lbl);
    ctx.font = "12pt Arial";
    ctx.fillText(lbl, x - (lsize.width / 2), 0);

}