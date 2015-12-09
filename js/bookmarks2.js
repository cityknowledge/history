/*jshint browser: true*/
/*global $*/

function addBookmark(group, key, text) {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        g = ls[group] || {};
    
    g[key] = text || "";
    ls[group] = g;
    localStorage.setItem("history", JSON.stringify(ls));
}

function remBookmark(group, key) {
    'use strict';
    var g,
        ls = JSON.parse(localStorage.getItem("history") || "{}");
    
    g = ls[group];
    if (g) {
        if (g[key]) {
            delete g[key];
            ls[group] = g;
            if (Object.keys(ls[group]).length === 0) {
                delete ls[group];
            }
            localStorage.setItem("history", JSON.stringify(ls));
            return true;
        }
    }
    
    return false;
}

function getBookmarks(group) {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        g = ls[group] || {},
        keys = Object.keys(g);
    return keys;
}

function getBookmarkText(group, key) {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        g = ls[group] || {},
        text = g[key] || "";
    return text;
}

function newGroup() {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        name = window.prompt("Nome", "");
    if (name === "") {
        window.alert("C'era un errore! Non è possibile creare un gruppo senz'un nome! Si preghiamo di scegliere un nome, poi riprove.");
    }
    if (name === "new") {
        window.alert("C'era un errore! Non è possibile creare un gruppo col nome \"new\" perché questa parola è riservata. Si preghiamo di scegliere un altro nome.");
        return;
    }
    ls[name] = {};
    localStorage.setItem("history", JSON.stringify(ls));
}

function getGroups() {
    'use strict';
    return Object.keys(JSON.parse(localStorage.getItem("history") || "{}"));
}

function getAllBookmarks() {
    'use strict';
    var group, key,
        array = [],
        ls = JSON.parse(localStorage.getItem("history") || "{}"),
        groups = Object.keys(ls);
    
    for (group in groups) {
        for (key in Object.keys(ls[group])) {
            if (array.indexOf(key) < 0 ) {
                array.push(key);
            }
        }
    }
    return array;
}

function hasBookmark(group, key) {
    'use strict';
    var ls = JSON.parse(localStorage.getItem("history") || "{}"),
        g = ls[group] || {};
    
    return g[key] !== undefined;
}