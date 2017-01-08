
// inladen van de dependencies
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/MijnAPI');

// onze lokale 'datastore'. deze variable bewaart onze state.
//var dal = require("./storage.js");
var dalLocatie = require("./locatie.js");
var validationlocatie = require('./validatelocatie.js');

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET op /locaties
app.get('/locaties', function (request, response) {
    dalLocatie.AllLocaties(function (err, locatie) {
        if(err){
            throw err;
        }
        response.send(locatie);
    });

});

// opvangen van een GET op /locaties/:naam_drone
app.get("/locaties/:id", function (request, response) {

    dalLocatie.findLocaties(request.params.id, function (err, locatie) {
            if (locatie) {
          response.send(locatie);
            } else {
                err;
            }
    });
});

// opvangen van een POST op /locaties.
app.post("/locaties", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var locatie = request.body;
    // Valideren dat velden bestaan
    var errors = validationlocaties.fieldsNotEmpty(locatie, "naam_drone", "mac_address_drone", "naam_locatie", "beschrijving");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }
   
    dalLocatie.saveLocaties(locatie, function(err, locatie) {
        if(err){
            throw err;
        }
        response.send(locatie);
    });
});

app.put("/locaties/:id", function (request, response) {
    var locatie = request.body;
    // Valideren dat velden bestaan
    var errors = validationlocaties.fieldsNotEmpty(locatie, "naam_drone", "mac_address_drone", "naam_locatie", "beschrijving");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }

    dalLocatie.updateLocaties(request.params.id, locatie, function (err, locatie) {
        if(err){
            throw err;
        }
        response.send(locatie);
    });
});

// de server starten op poort 4567
app.listen(4567);

// Bevestiging
console.log("Server started");