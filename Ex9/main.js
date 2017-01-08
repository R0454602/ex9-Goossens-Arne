
// inladen van de dependencies
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/MijnAPI');

// onze lokale 'datastore'. deze variable bewaart onze state.
//var dal = require("./storage.js");
var dalLocatie = require("./storagelocatie.js");
var validationlocatie = require('./validatelocatie.js');

var dalLes = require('./storageles.js');
var validationles = require('./validatieles.js');

var dalAanwezig = require('./storageaanwezigheden.js');
var validationaanwezigheden = require('./validateaanwezigheden');

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

// opvangen van een GET op /les
app.get('/les', function (request, response) {
    dalLes.AllLes(function (err, les) {
        if(err){
            throw err;
        }
         response.send(les);
    });
});

// opvangen van een GET op /bewegingen/:lesid
app.get('/les/:id', function (request, response) {
    dalLes.findLes(request.params.id, function (err, les) {
        if (les) {
        response.send(les);
    } else {
        err;
    }
    });
});

// opvangen van een POST op /les.
app.post("/les", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var les = request.body;
    // Valideren dat velden bestaan
    var errors = validationles.fieldsNotEmpty(les, "lesid", "vak", "docent", "duur", "begintijd", "lokaal");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }
    dalLes.saveLes(les, function(err, les) {
        if(err){
            throw err;
        }
        response.send(les);
    });
});

// opvangen van een GET op /aanwezigheden
app.get('/aanwezigheden', function (request, response) {
    dalAanwezig.AllAanwezigheden(function (err, aanwezig) {
        if(err){
            throw err;
        }
        response.send(aanwezig);
    });
});

// opvangen van een GET op /aanwezigheden/:ID
app.get('/aanwezigheden/:aanwezigid', function (request, response) {
    dalAanwezig.findAanwezigheden(request.params.aanwezigid, function (err, aanwezig) {
        if (aanwezig) {
        response.send(aanwezig);
    } else {
        err;
    }
    });
});

// opvangen van een POST op /aanwezigheden.
app.post("/aanwezigheden", function(request, response) {
    // de data in de body wordt toegekend aan onze locatie variabele.
    // deze is enkel opgevuld indien het JSON is.
    var personen = request.body;
    // Valideren dat velden bestaan
    var errors = validationaanwezigheden.fieldsNotEmpty(personen, "aanwezigid", "naam_drone", "aantal", "naam_locatie", "uur");
    if (errors) {
        response.status(400).send({
            msg: "Volgende velden zijn verplicht of fout: " + errors.concat()
        });
        return;
    }
    dalAanwezig.saveAanwezigheden(personen, function(err, personen) {
        if(err){
            throw err;
        }
        response.send(personen);
    });
});

// de server starten op poort 4567
app.listen(4567);

// Bevestiging
console.log("Server started");