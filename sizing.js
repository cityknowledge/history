function size() {

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var articles = document.getElementsByTagName("article");
    var x;
    for (x = 0; x < articles.length; x++) {
        var n = y - 250;
        articles[x].style.height = n.toString + "px";
        articles[x].setAttribute("style", "height: " + n.toString() + "px;");
    }
}

window.onload = size;
window.onresize = size;