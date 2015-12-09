/*jshint browser: true*/
/*global Firebase, $*/

function loggedIn() {
    'use strict';
    $("#addeventb").css("display", "inline-block");
    $("#logoutb").css("display", "inline-block");
    $("#loginb").css("display", "none");
}

function loggedOut() {
    'use strict';
    $("#loginb").css("display", "inline-block");
    $("#logoutb").css("display", "none");
    $("#addeventb").css("display", "none");
}

function login() {
    'use strict';
    var user = document.getElementById("login_user").value,
        pass = document.getElementById("login_pass").value,
        FB = new Firebase("https://venicedata.firebaseio.com/");
    
    FB.authWithPassword({email: user, password: pass}, function (error, authData) {
        if (error) {
            window.alert("C'era un errore. Si preghiamo di controllare il suo username e password.");
        } else {
            window.alert("Il suo login è effettuato con successo.");
            loggedIn();
        }
    });
    window.$scope.auth = true;
}

function logout() {
    'use strict';
    var FB = new Firebase("https://venicedata.firebaseio.com/");
    FB.unauth();
    window.alert("Lei s'è uscito/a con successo.");
    loggedOut();
    window.$scope.auth = false;
}

function openLogin() {
    'use strict';
    $("#loginform").css("display", "block");
}

function closeLogin() {
    'use strict';
    $("#loginform").css("display", "none");
    $("form#login")[0].reset();
}