/*jslint plusplus: true*/
/*global $*/
function size() {
    'use strict';
    
    var w = window,
        d = document,
        e = d.documentElement,
        g = $('body')[0],
        t = w.innerWidth || e.clientWidth || g.clientWidth;
    
    $("canvas")[0].setAttribute("width", t.toString());
}
