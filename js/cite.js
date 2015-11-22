/*jshint browser: true*/
/*global getBookmarks*/

function genFile(joiner) {
    "use strict";
    
    var list = [],
        file = "",
        marks = getBookmarks(window.$scope.filter);
    
    window.$scope.events.forEach(function (event) {
        marks.forEach(function (mark) {
           if (event.key === mark) {
               list.push(event.Citation);
           } 
        });
    });
    
    list.sort();
    list.reduce(function(a, b){ if (b != a[0]) a.unshift(b); return a; }, []);
    file = list.join(joiner);
    
    return file;
}

function download(filename, text, win) {
    var element = win.document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.innerHTML = "Download citations";
    win.document.body.appendChild(element);
    
    if (win === window) {
        element.click();
        win.document.body.removeChild(element);
    }
}

function presentPage() {
    "use strict";

    var win = window.open();

    win.document.write(genFile("<br>"));
    download("citations.txt", genFile("\n"), win);
}

function presentDown() {
    "use strict";
    
    download('citations.txt', genFile("\n"), window);
}