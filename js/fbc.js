/*jshint browser: true*/
/*global Firebase*/

function sendFBCUD(key, val) {
    var w = new Worker("js/fbcworker.js"),
        obj = {"key": key, "val": val};
    console.log(obj);
    w.postMessage(obj);
    w.onerror = function (error) {
        console.log(error.message, error.lineno);
    };
    w.onmessage = function (message) {
        console.log(message.data);
    };
}