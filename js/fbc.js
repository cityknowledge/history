/*jshint browser: true*/
/*global Firebase*/

function sendFBCUD(key, val) {
    var w = new Worker("js/worker/fbcworker.js"),
        obj = {"key": key, "val": val};
    w.postMessage(obj);
}