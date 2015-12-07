/*jshint browser: true*/
/*global $, shouldScroll: true*/

function hover(id) {
    'use strict';
    $('#' + id)
        .css("-webkit-animation-name", "hover")
        .css("-moz-animation-name", "hover")
        .css("-o-animation-name", "hover")
        .css('animation-name', 'hover')
        .css('background-color', 'rgba(120, 120, 120, 1)');
}

function unhover(id) {
    'use strict';
    $('#' + id)
        .css("-webkit-animation-name", "unhover")
        .css("-moz-animation-name", "unhover")
        .css("-o-animation-name", "unhover")
        .css('animation-name', 'unhover')
        .css('background-color', 'rgba(0, 0, 0, 0)');
}

function unobscure() {
    'use strict';
    $("#obscure")
        .css("-webkit-animation-name", "unobscure")
        .css("-moz-animation-name", "unobscure")
        .css("-o-animation-name", "unobscure")
        .css("animation-name", "unobscure");
    setTimeout(function () {
        $("#obscure")
            .css("display", "none");
    }, 1000);
}

function hideInfoPanel(doNotUndisplay) {
    'use strict';
    if ($("#sticky").css("display") !== "none") {
        $("#sticky").css("display", "none");
    }
    $("div#infopanel_wrap, div#encycl_wrap")
        .css("-webkit-animation-name", "fadeout")
        .css("-moz-animation-name", "fadeout")
        .css("-o-animation-name", "fadeout")
        .css("animation-name", "fadeout");
    if (!doNotUndisplay) {
        window.setTimeout(function () {
            $("div#infopanel_wrap, div#encycl_wrap")
                .css("display", "none");
            document.getElementById("infopanel").innerHTML = "";
            shouldScroll = true;
            $("div#infopanel_wrap")
                .css("width", "80%")
                .css("left", "10%");
        }, 1000);
    }
}

function enopanim() {
    'use strict';
    $("div#infopanel_wrap")
        .css("-webkit-animation-timing-function", "ease")
        .css("-moz-animation-timing-function", "ease")
        .css("-o-animation-timing-function", "ease")
        .css("animation-timing-function", "ease")
        .css("-webkit-animation-duration", "2s")
        .css("-moz-animation-duration", "2s")
        .css("-o-animation-duration", "2s")
        .css("animation-duration", "2s")
        .css("-webkit-animation-name", "compress")
        .css("-moz-animation-name", "compress")
        .css("-o-animation-name", "compress")
        .css("animation-name", "compress")
        .css("width", "42%")
        .css("left", "5%");
    window.setTimeout(function () {
        $("div#encycl_wrap")
            .css("display", "block")
            .css("-webkit-animation-name", "fadein")
            .css("-moz-animation-name", "fadein")
            .css("-o-animation-name", "fadein")
            .css("animation-name", "fadein");
        $("div#infopanel_wrap")
            .css("-webkit-animation-name", "none")
            .css("-moz-animation-name", "none")
            .css("-o-animation-name", "none")
            .css("animation-name", "none")
            .css("-webkit-animation-duration", "1s")
            .css("-moz-animation-duration", "1s")
            .css("-o-animation-duration", "1s")
            .css("animation-duration", "1s")
            .css("-webkit-animation-timing-function", "initial")
            .css("-moz-animation-timing-function", "initial")
            .css("-o-animation-timing-function", "initial")
            .css("animation-timing-function", "initial");
    }, 2000);
}

function enclanim() {
    'use strict';
    $("div#encycl_wrap")
        .css("-webkit-animation-name", "fadeout")
        .css("-moz-animation-name", "fadeout")
        .css("-o-animation-name", "fadeout")
        .css("animation-name", "fadeout");
    window.setTimeout(function () {
        $("div#encycl_wrap")
            .css("display", "none");
        $("div#infopanel_wrap")
            // SET ANIMATION TIMING FUNCTION TO EASE
            .css("-webkit-animation-timing-function", "ease")
            .css("-moz-animation-timing-function", "ease")
            .css("-o-animation-timing-function", "ease")
            .css("animation-timing-function", "ease")
            // SET ANIMATION DURATION TO 2 SECONDS
            .css("-webkit-animation-duration", "2s")
            .css("-moz-animation-duration", "2s")
            .css("-o-animation-duration", "2s")
            .css("animation-duration", "2s")
            // SET ANIMATION TO UNCOMPRESS
            .css("-webkit-animation-name", "uncompress")
            .css("-moz-animation-name", "uncompress")
            .css("-o-animation-name", "uncompress")
            // ADJUST SIZING
            .css("width", "80%")
            .css("left", "10%");
    }, 1000);
    window.setTimeout(function () {
        $("div#infopanel_wrap")
            .css("-webkit-animation-name", "none")
            .css("-moz-animation-name", "none")
            .css("-o-animation-name", "none")
            .css("animation-name", "none")
            .css("-webkit-animation-duration", "1s")
            .css("-moz-animation-duration", "1s")
            .css("-o-animation-duration", "1s")
            .css("animation-duration", "1s")
            .css("-webkit-animation-timing-function", "initial")
            .css("-moz-animation-timing-function", "initial")
            .css("-o-animation-timing-function", "initial")
            .css("animation-timing-function", "initial");
    }, 3000);
}

function toggleAdvSearch() {
    if ($("#advsearch").css("display") === "none") {
        $("#advsearch").css("display", "inline");
        document.getElementById("togglebutton").innerHTML = "&lt; Nasconde segnalibri";
    } else {
        $("#advsearch").css("display", "none");
        document.getElementById("togglebutton").innerHTML = "Segnalibri >";
    }
}