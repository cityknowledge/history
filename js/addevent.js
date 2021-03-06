/*jshint browser: true*/
/*global Firebase, $, shouldScroll:true, unobscure*/

/**
  Opens the add event form.
  */
function openAEF() {
    'use strict';
    window.$scope.obscure(); // Show the obscure layer
    $("#addeventform_wrap").css("display", "block"); // Display the window
    shouldScroll = false; // Disable timeline scrolling
}

/**
Closes the add event form
*/
function closeAEF() {
    'use strict';
    unobscure(); // Hide the obscure layer
    $("#addeventform_wrap").css("display", "none"); // Hide the window
    shouldScroll = true; // Enable timeline scrolling
}

/**
Adds the event predicated on the form the the Firebase, barring any errors.
*/
function addEvent() {
    'use strict';
    var date, event, FB,
        Year = document.getElementById("ae_Year").value, // Get the Year value
        Month = document.getElementById("ae_Month").value, // Get the month value
        Date = document.getElementById("ae_Date").value, // Get the date value
        Content = document.getElementById("ae_Content").value, // Get the content value
        Citation = document.getElementById("ae_Citation").value, // Get the citation value
        Links = document.getElementById("ae_Links").value.split("\n"), // Generate the links
        Location = document.getElementById("ae_Location"), // Get the location value
        Title = document.getElementById("ae_Title"), // Get the title value
        months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]; // A complete list of months.
    
    if (!Year) {
        // Year is empty
        window.alert("C’è un errore. L’anno è obbligatorio.");
        return false;
    }
    if (!Content) {
        // Content is empty
        window.alert("C’è un errore. Il testo è obbligatorio.");
        return false;
    }
    if (!Citation) {
        // Citation is empty
        window.alert("C’è un errore. La citazione è obbligatoria.");
        return false;
    }
    if (Month && months.indexOf(Month.toLowerCase()) < 0) {
        // Month is present, but invalid
        window.alert("C’è un errore. Il mese non è valido. Deve essere scritto utilizando il nome. Per esempio, gennaio, febbraio, etc.");
        return false;
    }
    if (isNaN(Year) || Year < 0) {
        // Year is not a number, or is negative
        window.alert("C’è un errore. L’anno non è valido. Deve essere un numero positivo.");
        return false;
    }
    if (Date && (isNaN(Date) || Date <= 0 || Date > 31)) {
        // Date is not a number, or is out of range (1 - 31)
        window.alert("C’è un errore. La data non è valida. Deve essere una data valida, oppure un numero tra 0 e 31.");
        return false;
    }
    if (Date && !Month) {
        // Date is present, but month is not
        window.alert("C’è un errore. Se c’è una data, il mese è obbligatorio. Hai digitato una data senza un mese.");
        return false;
    }
    
    // UPLOAD IMAGE AT THIS POINT WHEN READY TO DO
    
    
    date = Month ? Date ? Date.toString() + " " + Month : Month.charAt(0).toUpperCase() + Month.substr(1) : null;
    event = {};
    event.Year = Year;
    if (date) {event.Date = date;}
    event.Content = Content;
    event.Citation = Citation;
    // Insert code for image handling here.
    if (Links) {event.Links = Links;}
    event.Count = 0;
    event.Location = Location;
    event.Title = Title;
    event.timestamp = [
            ("0000" + Year).substr(Year.length),
            Month ? ("00" + months.indexOf(Month.toLowerCase()).toString()).substr(months.indexOf(Month.toLowerCase()).toString().length) + 1 : "00",
            Date ? ("00" + Date).substr(Date.length) : "00"
        ].join(".");
    
    FB = new Firebase("https://venicedata.firebaseio.com/history");
    FB.push(event, function (error) {
        if (error) {
            window.alert("C’è un errore. Firebase non può aggiungere l’evento. Firebase dice:\n" + error);
            return false;
        }
    });
    
    window.alert("Il tuo evento è aggiunto.");
    
    closeAEF();
    return true;
}