/* jshint browser: true */
/* global $, Firebase, enopanim */

function openEncycl(artname) {
    var content,
        FB = new Firebase("https://venicedata.firebaseio.com/history_encycl/");
    
    FB.child(artname).on("value", function (snapshot) {
        document.getElementById("encycltitle").innerHTML = snapshot.Title;
        document.getElementById("encycl").innerHTML = "<p>" + snapshot.Text + "</p>";
    });
    
    if ($("div#encycl_wrap").css("display") === "none") {
        enopanim();
    }
}