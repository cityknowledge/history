function size() {
    'use strict';
    
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        t = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        articles = document.getElementsByTagName("article"),
        canvas = document.getElementById("axis"),
        x;
    
    for (x = 0; x < articles.length; x++) {
        var n = y - 280;
        articles[x].style.height = n.toString() + "px";
        articles[x].setAttribute("style", "height: " + n.toString() + "px;");
    }
    
    canvas.setAttribute("width", t.toString());
}
