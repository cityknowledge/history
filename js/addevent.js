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
        Image = document.getElementById("ae_Image").value, // Get the image
        Links = document.getElementById("ae_Links").value.split("\n"), // Generate the links
        Location = document.getElementById("ae_Location"), // Get the location value
        Title = document.getElementById("ae_Title"), // Get the title value
        months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]; // A complete list of months.
    
    if (!Year) {
        // Year is empty
        window.alert("C'era un errore. L'anno è richiesto.");
        return false;
    }
    if (!Content) {
        // Content is empty
        window.alert("C'era un errore. Il testo è richiesto.");
        return false;
    }
    if (!Citation) {
        // Citation is empty
        window.alert("C'era un errore. La citazione è richiesta.");
        return false;
    }
    if (Month && months.indexOf(Month.toLowerCase()) < 0) {
        // Month is present, but invalid
        window.alert("C'era un errore. Il mese non è valido. Deve essere scritto utilizando il suo nome. Per esempio, gennaio, febbraio, etc.");
        return false;
    }
    if (isNaN(Year) || Year < 0) {
        // Year is not a number, or is negative
        window.alert("C'era un errore. L'anno non è valido. Deve essere un numero positivo.");
        return false;
    }
    if (Date && (isNaN(Date) || Date <= 0 || Date > 31)) {
        // Date is not a number, or is out of range (1 - 31)
        window.alert("C'era un errore. La data non è valida. Deve essere una data valida, ovvero un numero tra 0 e 31.");
        return false;
    }
    if (Date && !Month) {
        // Date is present, but month is not
        window.alert("C'era un errore. Se c'è una data, il mese è richiesto. Lei ha dato una data senz'un mese.");
        return false;
    }
    
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
            window.alert("C'era un errore. Firebase non poteva aggiungere l'evento. Ha dito questo:\n" + error);
            return false;
        }
    });
    
    window.alert("Il suo evento è aggiungiato.");
    
    closeAEF();
    return true;
}