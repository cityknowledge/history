/*jshint browser: true*/
/*global auth*/

function flag(key) {
    var text = window.prompt("Spiegare brevemente il problema con quest’evento:");
    
    if (window.$scope.auth) {
        var w = new Worker("js/worker/flagworker.js");
        w.postMessage({"key": key, "text": text});
    }
}