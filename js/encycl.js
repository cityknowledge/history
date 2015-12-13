/* jshint browser: true */
/* global $, Firebase, enopanim */

function openEncycl(artname) {
    var content,
        FB = new Firebase("https://venicedata.firebaseio.com/history_encycl/");
    
    FB.child(artname).on("value", function (snapshot) {
		var obj = {};
		snapshot.forEach(function (value) {
			obj[value.key()] = value.val();
		})
        document.getElementById("encycltitle").innerHTML = obj.Caption;
        document.getElementById("encycl").innerHTML = "<p>" + obj.Content + "</p>";
    });
    
    if ($("div#encycl_wrap").css("display") === "none") {
        enopanim();
    }
}