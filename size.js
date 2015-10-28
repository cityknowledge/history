/*jslint plusplus: true*/
/*global $*/
function size() {
    'use strict';
    
    var w = window,
        d = document,
        e = d.documentElement,
        g = $('body'),
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        articles = $("article"),
        canvas = $("#axis"),
        x,
        n = y - 280,
        imgs = $("img"),
        h = n - 100;
    
    for (x = 0; x < articles.length; x++) {
        articles[x].style.height = n.toString() + "px";
        articles[x].setAttribute("style", "height: " + n.toString() + "px;");
    }
    
    canvas[0].setAttribute("width", t.toString());
    
    for (x = 0; x < imgs.length; x++) {
        imgs[x].setAttribute("style", "max-height: " + h.toString() + "px;");
    }
}
