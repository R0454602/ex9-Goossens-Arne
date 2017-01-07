
// inladen van de dependencies
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// onze lokale 'datastore'. deze variable bewaart onze state.
var dal = require("./storage.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// de server starten op poort 4567
app.listen(4567);

// Bevestiging
console.log("Server started");