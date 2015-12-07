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

var ri = new TimePeriod("L’Impero Romano", 400, 538, {r: 50, g: 30, b: 30}),
    ib = new TimePeriod("L’Impero Bizantino", 539, 727, {r: 89, g: 0, b: 0}),
    tr = new TimePeriod("Transizione al Autogoverno", 728, 811, {r: 130, g: 0, b: 0}),
    br = new TimePeriod("La nascita della Repubblica", 812, 1095, {r: 178, g: 10, b: 10}),
    rr = new TimePeriod("L’ascesa della Repubblica", 1096, 1405, {r: 124, g: 94, b: 14}),
    ga = new TimePeriod("L’epoca d’oro", 1406, 1516, {r: 218, g: 167, b: 30}),
    fr = new TimePeriod("La caduta della Repubblica", 1517, 1797, {r: 174, g: 133, b: 22}),
    af = new TimePeriod("Venezia sotto Austria e Francia", 1798, 1866, {r: 169, g: 51, b: 51}),
    ik = new TimePeriod("Il Regno Italiano", 1867, 1946, {r: 195, g: 25, b: 25}),
    ir = new TimePeriod("La Repubblica Italiana", 1947, 2015, {r: 175, g: 0, b: 0});
    