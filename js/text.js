/*jshint browser: true*/
/*global getBookmarks, getBookmarkText*/

function genFile(joiner) {
    'use strict';
    
    var list = [],
        file = "",
        marks = getBookmarks(window.$scope.filter);
    
    window.$scope.events.forEach(function (event) {
       marks.forEach(function (mark) {
           if (event.key === mark) {
               list.push(event.Date + event.Year);
               list.push(event.Content.replace(/@|#/g, ""));
               var text = getBookmarkText(window.$scope.filter, mark);
               if (joiner === "<br>") {
                   text = text.replace(/\&/g, "&amp;").replace(/</g, "&lt;");
               }
               list.push("Note: " + text);
               list.push("Citazione: " + event.Citation);
               list.push("");
               list.push("");
           }
       }); 
    });
    
    file = list.join(joiner);
    
    return file;
}

function download(filename, text, win) {
    var element = win.document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.innerHTML = "Download";
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
    download("eventi.txt", genFile("\n"), win);
}

function presentDown() {
    'use strict';
    download("eventi.txt", genFile("\n"), window);
}