/*jshint browser:true*/
/*global $*/
function popsticky() {
    'use strict';
    var ls, key,
        text = "",
        id = window.$scope.ipevent - 1,
        events = window.$scope.events;
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.getFilter()) : events;
    key = events[id].key;
        
    if (localStorage.getItem("history_sticky")) {
        ls = JSON.parse(localStorage.getItem("history_sticky"));
        if (ls[key]) {
            text = ls[key];
        }
    }
    
    document.getElementById("sticky").innerHTML = "<h3>Le sue note su quest’evento</h3><p>Potrà leggere queste note dopo; non saranno disponibili al pubblico.</p><textarea id=stickytext cols=50 rows=20>" + text + "</textarea><br><button onclick=\"substicky(&quot;" + key + "&quot;);\">Tenere</button><button onclick=\"closesticky()\">Annulare</button>";
    
    $("#sticky").css("display", "block");
}

function closesticky() {
    'use strict';
    $("#sticky").css("display", "none");
}

function substicky(key) {
    'use strict';
    var ls;
    
    if (localStorage.getItem("history_sticky")) {
        ls = JSON.parse(localStorage.getItem("history_sticky"));
    } else {
        ls = {};
    }

    ls[key] = document.getElementById("stickytext").value;
    localStorage.setItem("history_sticky", JSON.stringify(ls));
    
    closesticky();
}