/*jshint browser: true*/
/*global Firebase*/

function sendFBCUD(key, val) {
    var w = new Worker("js/fbcworker.js"),
        obj = {"key": key, "val": val};
    w.postMessage(obj);
}