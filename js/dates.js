/*jshint browser:true*/

function calcdates() {
    var x,
        val = document.getElementById("ae_Month").value,
        day = document.getElementById("ae_Date");
    
    switch (val) {
        case "":
            day.disabled = true;
            break;
        case "settembre":
        case "aprile":
        case "giugno":
        case "novembre":
            day.removeAttribute("disabled");
            day.innerHTML = "<option value=\"\" selected>Data sconosciuta / Nessuna data</option>";
            for (x = 1; x <= 30; x++) {
                day.innerHTML += "<option value=\"" + x + "\">" + x + "</option>";
            }
            break;
        case "gennaio":
        case "marzo":
        case "maggio":
        case "luglio":
        case "agosto":
        case "ottobre":
        case "dicembre":
            day.removeAttribute("disabled");
            day.innerHTML = "<option value=\"\" selected>Data sconosciuta / Nessuna data</option>";
            for (x = 1; x <= 31; x++) {
                day.innerHTML += "<option value=\"" + x + "\">" + x + "</option>";
            }
            break;
        case "febbraio":
            day.removeAttribute("disabled");
            day.innerHTML = "<option value=\"\" selected>Data sconosciuta / Nessuna data</option>";
            for (x = 1; x <= 29; x++) {
                day.innerHTML += "<option value=\"" + x + "\">" + x + "</option>";
            }
            break;
        default:
            day.setAttribute("disabled");
            break;
    }
}