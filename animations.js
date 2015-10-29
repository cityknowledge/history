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