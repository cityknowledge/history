/*global Firebase, $*/

function openAEF() {
    'use strict';
    $("#addeventform").css("display", "block");
}

function closeAEF() {
    'use strict';
    $("#addeventform").css("display", "none");
}

function addEvent() {
    'use strict';
    var date, event, FB,
        Year = document.getElementById("ae_Year").value,
        Month = document.getElementById("ae_Month").value,
        Date = document.getElementById("ae_Date").value,
        Content = document.getElementById("ae_Content").value,
        Citation = document.getElementById("ae_Citation").value,
        Image = [document.getElementById("ae_Image").value],
        Links = document.getElementById("ae_Links").value.split("\n"),
        months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    
    if (!Year) {
        window.alert("C'era un errore. L'anno è richiesto.");
        return false;
    }
    if (!Content) {
        window.alert("C'era un errore. Il testo è richiesto.");
        return false;
    }
    if (!Citation) {
        window.alert("C'era un errore. La citazione è richiesta.");
        return false;
    }
    if (months.indexOf(Month.toLowerCase()) < 0) {
        window.alert("C'era un errore. Il mese deve essere scritto utilizandio il suo nome. Per esempio, gennaio, febbraio, etc.");
        return false;
    }
    if (isNaN(Year) || Year < 0) {
        window.alert("C'era un errore. L'anno deve essere un numero positivo.");
        return false;
    }
    if (Date && (isNaN(Date) || Date < 0 || Date > 31)) {
        window.alert("C'era un errore. La data deve essere una data valida (un numero tra 0 e 31).");
        return false;
    }
    if (Date && !Month) {
        window.alert("C'era un errore. Lei ha dato una data senz'un mese.");
        return false;
    }
    
    date = Date.toString() + " " + Month;
    event = {
        Year: Year,
        Date: date,
        Content: Content,
        Citation: Citation,
        Image: Image,
        Links: Links,
        Count: 0,
        timestamp: [
            ("0000" + Year).substr(Year.length),
            ("00" + months.indexOf(Month.toLowerCase()).toString()).substr(months.indexOf(Month.toLowerCase()).toString().length),
            ("00" + Date).substr(Date.length)
        ].join(".")
    };
    
    FB = new Firebase("https://venicedata.firebaseio.com/history");
    FB.push(event, function (error) {
        if (error) {
            window.alert("C'era un errore. Firebase ha dito:\n" + error);
            return false;
        }
    });
    
    window.alert("Il suo evento è aggiungiato.");
    
    closeAEF();
    return true;
}