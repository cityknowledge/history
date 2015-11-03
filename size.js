/*jslint plusplus: true*/
/*global $*/
function size() {
    'use strict';
    
    var w = window,
        d = document,
        e = d.documentElement,
        g = $('body')[0],
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        n = y - 280,
        h = n - 140;
    
    /*
    for (x = 0; x < articles.length; x++) {
        articles[x].style.height = n.toString() + "px";
        articles[x].setAttribute("style", "height: " + n.toString() + "px;");
    }
    
    canvas[0].setAttribute("width", t.toString());
    
    for (x = 0; x < imgs.length; x++) {
        imgs[x].setAttribute("style", "max-height: " + h.toString() + "px;");
    }*/
    
    
    $("article").css('height', n.toString() + "px");
    $(".arrow").css("height", n.toString() + "px");
    $("canvas")[0].setAttribute("width", t.toString());
    $("img").css("max-height", h.toString() + "px");
}
