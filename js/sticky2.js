/*jshint browser:true*/
/*global $, getGroups, hasBookmark, getBookmarkText*/

function stickyText(text) {
    document.getElementById("stickytext").innerHTML = text;
}

function stickyButtons(exists, group, key) {
    if (exists) {
        document.getElementById("stickybuttons").innerHTML =
            "<button onclick=\"addBookmark(&quot;" + group + "&quot;,&quot;" + key + "&quot;, document.getElementById(&quot;stickytext&quot;).value);closeSticky();\">Aggiornare</button><button onclick=\"closeSticky()\">Annulare</button><button onclick=\"remBookmark(&quot;" + group + "&quot;,&quot;" + key + "&quot;);closeSticky();\">Cancellare</button>";
    } else {
        document.getElementById("stickybuttons").innerHTML =
            "<button onclick=\"addBookmark(&quot;" + group + "&quot;,&quot;" + key + "&quot;,document.getElementById(&quot;stickytext&quot;).value);closeSticky();\">Aggiungere</button><button onclick=\"closeSticky();\">Annulare</button>";
    }
}

function updateSticky(group, key) {
    stickyText(getBookmarkText(group, key));
    stickyButtons(hasBookmark(group, key), group, key);
}

function stickySelect() {
    'use strict';
    var group,
        str = "<option value=\"\">Scegli un gruppo...</option>";
    
    getGroups().forEach(function (group) {
        str += "<option value=\"" + group + "\">" + group + "</option>";
    });
    
    str += "<option value=new>Nuovo...</option>";
    
    document.getElementById("bkgr").innerHTML = str;
}

function popsticky() {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        id = window.$scope.ipevent - 1,
        events, key, text;
    events = window.$scope.getEvents();
    events = window.$scope.search ? window.$filter('filter')(events, window.$scope.getFilter()) : events;
    key = events[id].key;
    text = ls[key] || "";
    
    document.getElementById("stick").innerHTML = 
        "<h3>Le sue note su quest’evento</h3><p>Potrà leggere queste note dopo; non saranno disponibili al pubblico.</p>Gruppo di segnalibri: <select id=bkgr onchange=\"if(document.getElementById(&quot;bkgr&quot;).value===&quot;new&quot;){newGroup();stickySelect();}else{updateSticky(document.getElementById(&quot;bkgr&quot;).value,&quot;" + key + "&quot;)}\"></select><br><textarea id=stickytext cols=70 rows=15>" + text + "</textarea><br><div id=stickybuttons></div>";
    
    stickySelect();
    
    $("#sticky_wrap").css("display", "block");
}

function closeSticky() {
    'use strict';
    $("#sticky_wrap").css("display", "none");
}