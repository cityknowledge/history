/*jshint worker: true*/
/*global Firebase*/

this.onmessage = function(message) {
    importScripts("https://cdn.firebase.com/js/client/2.3.1/firebase.js");
    var FB = new Firebase("https://venicedata.firebaseio.com/history/" + message.data.key + "/Count");
    FB.set(message.data.val, function (error) {
        if (error) {
            throw new Error(error);
        } else {
            this.postMessage("Success");
            this.close();
        }
    });
};