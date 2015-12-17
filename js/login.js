/*jshint browser: true*/
/*global Firebase, $, FB*/

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
        pass = document.getElementById("login_pass").value;
    
    FB.authWithPassword({email: user, password: pass}, function (error, authData) {
        if (error) {
            window.alert("C’è un errore. Ti preghiamo di controllare il tuo username e password.");
        } else {
            window.alert("Il tuo login è effettuato con successo.");
            loggedIn();
        }
    });
    window.$scope.auth = true;
}

function logout() {
    'use strict';
    FB.unauth();
    window.alert("Sei uscito/a con successo.");
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