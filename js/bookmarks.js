/*jslint plusplus: true*/
/*global $*/

function addBookmark(group, uid) {
    'use strict';
    if (!localStorage.history) {
        // If the application does not have any local storage saved, initialize our local storage.
        localStorage.history = {bookmarks: {}, filters: []};
    }
    if (!localStorage.history.bookmarks[group]) {
        // If the group does not exist, add it
        localStorage.history.bookmarks[group] = [];
    }
    localStorage.history.bookmarks[group].push(uid);
}

function remBookmark(group, uid) {
    'use strict';
    var i;
    if (!localStorage.history || !localStorage.history.bookmarks[group]) {
        // couldn't remove, doesn't exist.
        return false;
    }
    for (i = 0; i < localStorage.history.bookmarks[group].length; i++) {
        if (localStorage.history.bookmarks[group][i] === uid) {
            localStorage.history.bookmarks[group].splice(i, 0);
            if (localStorage.history.bookmarks[group].length === 0) {
                delete localStorage.history.bookmarks[group];
                if (localStorage.history.bookmarks[group]) {
                    localStorage.history.bookmarks[group] = undefined;
                }
                if ($.isEmptyObject(localStorage.history.bookmarks) && localStorage.history.filters.length === 0) {
                    delete localStorage.history;
                    if (localStorage.history) {
                        localStorage.history = undefined;
                    }
                }
            }
            return true;
        }
    }
    return false;
}

function getBookmarks(group) {
    'use strict';
    if (!localStorage.history || !localStorage.history.bookmarks[group]) {
        // group does not exist, return empty list
        return [];
    }
    return localStorage.history.bookmarks[group];
}

function getGroups() {
    'use strict';
    if (!localStorage.history) {
        // no local storage, no groups
        return [];
    }
    return localStorage.history.bookmarks.keys;
}