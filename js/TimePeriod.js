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

var re = new TimePeriod("Roman Empire", 421, 538, 0xffffff),
    be = new TimePeriod("Byzantine Empire", 538, 727, 0xff0000),
    tr = new TimePeriod("Transition to Self-Rule", 728, 811, 0x0000ff),
    rr = new TimePeriod("Rise of the Republic", 812, 1099, 0x00ff00),
    ga = new TimePeriod("The Golden Age", 1100, 1497, 0xffff00),
    fr = new TimePeriod("The Fall of the Republic", 1498, 1797, 0xff00ff),
    af = new TimePeriod("Venice under Austria &amp; France", 1798, 1866, 0xccffcc),
    ik = new TimePeriod("Italian Kingdom", 1866, 1946, 0xffcc00),
    ir = new TimePeriod("Italian Republic", 1947, 3000, 0xff00ff);
    