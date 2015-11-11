/*jslint plusplus: true*/

var timePeriods = [];

function TimePeriod(title, start, end, color) {
    "use strict";
    this.title = title;
    this.start = start;
    this.end = end;
    this.color = color;
    
    this.isInRange = function (year) {
        return start <= year && year <= end;
    };
    
    this.isEventInRange = function (event) {
        return this.isInRange(event.Year);
    };
    
    timePeriods.push(this);
}

function getTimePeriodFromYear(year) {
    'use strict';
    
    var x;
    
    for (x = 0; x < timePeriods.length; x++) {
        if (timePeriods[x].isInRange(year)) {
            return timePeriods[x];
        }
    }
    
    return null;
}

var ri = new TimePeriod("Roman Empire", 421, 538, {r: 146, g: 51, b: 140}),
    ib = new TimePeriod("Byzantine Empire", 539, 727, {r: 179, g: 43, b: 56}),
    tr = new TimePeriod("Transition to Self-Rule", 728, 811, {r: 91, g: 93, b: 208}),
    br = new TimePeriod("The Birth of the Republic", 812, 1095, {r: 34, g: 129, b: 47}),
    rr = new TimePeriod("The Rise of the Republic", 1096, 1405, {r: 89, g: 180, b: 35}),
    ga = new TimePeriod("The Golden Age", 1406, 1516, {r: 208, g: 206, b: 34}),
    fr = new TimePeriod("The Fall of the Republic", 1517, 1797, {r: 194, g: 134, b: 49}),
    af = new TimePeriod("Venice under Austria &amp; France", 1798, 1866, {r: 36, g: 49, b: 224}),
    ik = new TimePeriod("Italian Kingdom", 1866, 1946, {r: 219, g: 40, b: 40}),
    ir = new TimePeriod("Italian Republic", 1947, 3000, {r: 49, g: 168, b: 164});
    