/*jshint worker: true*/
/*global Firebase*/

this.onmessage = function(message) {
    importScripts("https://cdn.firebase.com/js/client/2.3.1/firebase.js");
    var FB = new Firebase("https://venicedata.firebaseio.com/history_flags/" + message.data.key);
    var toSend = {auth: message.data.uid, text: message.data.text};
    FB.push(toSend);
};