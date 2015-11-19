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

var ri = new TimePeriod("L'Impero Romano", 400, 538, {r: 146, g: 51, b: 140}),
    ib = new TimePeriod("L'Impero Bizantino", 539, 727, {r: 179, g: 43, b: 56}),
    tr = new TimePeriod("Transizione al Autogoverno", 728, 811, {r: 91, g: 93, b: 208}),
    br = new TimePeriod("La nascita della Repubblica", 812, 1095, {r: 34, g: 129, b: 47}),
    rr = new TimePeriod("L'ascesa della Repubblica", 1096, 1405, {r: 89, g: 180, b: 35}),
    ga = new TimePeriod("L'epoca d'oro", 1406, 1516, {r: 208, g: 206, b: 34}),
    fr = new TimePeriod("La caduta della Repubblica", 1517, 1797, {r: 194, g: 134, b: 49}),
    af = new TimePeriod("Venezia sotto Austria e Francia", 1798, 1866, {r: 36, g: 49, b: 224}),
    ik = new TimePeriod("Il Regno Italiano", 1867, 1946, {r: 219, g: 40, b: 40}),
    ir = new TimePeriod("La Repubblica Italiana", 1947, 2015, {r: 49, g: 168, b: 164});
    