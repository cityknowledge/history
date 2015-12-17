/*jshint node: true*/

var feed, event,
    request = require('request'),
    Firebase = require('firebase'),
    feedparse = require('node-feedparser'),
    tokenGen = require('firebase-token-generator'),
    months = { // CHECK THESE KEYS LATER! THEY MAY BE INCORRECT, BUT I CANNOT CHECK.
        "Jan": "gennaio",
        "Feb": "febbraio",
        "Mar": "marzo",
        "Apr": "aprile",
        "May": "maggio",
        "Jun": "giugno",
        "Jul": "luglio",
        "Aug": "agosto",
        "Sept": "settembre",
        "Oct": "ottobre",
        "Nov": "novembre",
        "Dec": "dicembre"
    },
    key = process.env.FB_KEY,
    FB;

function main2() {
    event.Content = event.Content.slice(event.Content.indexOf("section [PageContent]"));
    event.Content = event.Content.slice(event.Content.indexOf("<p>") + 3);
    event.Content = event.Content.slice(0, event.Content.indexOf("<br /><br /><br />"));
    event.Content = event.Content.replace(/<[^>]+>/g, " ");
    console.log(event);
    FB.child("history").child(feed.items[0].date.toString().replace(/ |\.|#|$|\[|\]/g, "")).update(event, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Successo!");
        }
        process.exit(0);
    });
}

function main() {
    event = {
        Title: feed.items[0].title,
        Image: feed.items[0].description.split("\"")[1],
        Year: feed.items[0].date.toString().split(" ")[3],
        Date: feed.items[0].date.toString().split(" ")[2],
        Month: months[feed.items[0].date.toString().split(" ")[1]],
        Citation: "Città di Venezia. " + feed.items[0].title + ". Venezia " + feed.items[0].date.toString().split(" ")[3] + ", Città di Venezia, " + feed.items[0].link + "."
    };
    request(feed.items[0].link, function (error, resp, body) {
        event.Content = body;
        main2();
    });
}

FB = new Firebase("http://venicedata.firebaseio.com");
var tokenGenerator = new tokenGen(key);
var token = tokenGenerator.createToken(1, {admin: true});

FB.authWithCustomToken(token, function(error, authData) {
    if (error) {
        console.log("Authentication Failed!", error);
        process.exit(1);
    } else {
        console.log("Authenticated successfully with payload:", authData);
        request("http://www.comune.venezia.it/flex/cm/pages/ServeFeed.php/L/IT/fmt/rss20extended/feed/pages%3A1", function (error, resp, body) {
            feedparse(body, function (error, ret) {
                feed = ret;
                main();
                });
        });
    }
});

