/*global $*/
/*jslint plusplus: true*/

function hover(id) {
    'use strict';
    $('#' + id)
        .css('animation-name', 'hover')
        .css('background-color', 'rgba(120, 120, 120, 1)');
}

function unhover(id) {
    'use strict';
    $('#' + id)
        .css('animation-name', 'unhover')
        .css('background-color', 'rgba(0, 0, 0, 0)');
}

function unobscure() {
    'use strict';
    $("#obscure")
        .css("animation-name", "unobscure");
    setTimeout(function () {
        $("#obscure")
            .css("display", "none");
    }, 1000);
}

function hideInfoPanel() {
    'use strict';
    $("div#infopanel_wrap")
        .css("display", "none");
    document.getElementById("infopanel").innerHTML = "";
}