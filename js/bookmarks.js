/*jslint plusplus: true*/
/*global $*/

function addBookmark(group, uid) {
    'use strict';
    var history;
    
    if (localStorage.history) {
        history = JSON.parse(localStorage.getItem("history"));
    } else {
        history = {};
    }
    
    if (!history.bookmarks) {
        history.bookmarks = {};
    }
    if (!history.bookmarks[group]) {
        history.bookmarks[group] = [];
    }
    history.bookmarks[group].push(uid);
    localStorage.setItem("history", JSON.stringify(history));
}

function remBookmark(group, uid) {
    'use strict';
    var i, history;
    if (!localStorage.history) {
        return false;
    }
    history = JSON.parse(localStorage.history);
    if (!history.bookmarks || !history.bookmarks[group]) {
        return false;
    }
    for (i = 0; i < history.bookmarks[group].length; i++) {
        if (history.bookmarks[group][i] === uid) {
            history.bookmarks[group].splice(i, 0);
            if (history.bookmarks[group].length === 0) {
                delete history.bookmarks[group];
                if (history.bookmarks[group]) {
                    history.bookmarks[group] = undefined;
                }
                if ($.isEmptyObject(history.bookmarks)) {
                    localStorage.removeItem("history");
                }
            }
            localStorage.setItem("history", JSON.stringify(history));
            return true;
        }
    }
    return false;
}

function getBookmarks(group) {
    'use strict';
    if (!localStorage.history) {
        // group does not exist, return empty list
        return [];
    }
    var history = JSON.parse(localStorage.history);
    if (!history.bookmarks[group]) {
        return [];
    }
    return history.bookmarks[group];
}

function getGroups() {
    'use strict';
    if (!localStorage.history) {
        // no local storage, no groups
        return [];
    }
    return Object.keys(JSON.parse(localStorage.history).bookmarks);
}

function hasBookmark(group, uid) {
    'use strict';
    if (!localStorage.history) {
        return false;
    }
    var i,
        history = JSON.parse(localStorage.history);
    if (!history.bookmarks[group]) {
        return false;
    }
    for (i = 0; i < history.bookmarks[group].length; i++) {
        if (history.bookmarks[group][i] === uid) {
            return true;
        }
    }
    return false;
}