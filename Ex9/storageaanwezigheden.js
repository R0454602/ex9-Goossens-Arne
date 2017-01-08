var mongoose = require("mongoose");
var aanwezigSchema = mongoose.Schema({
            aanwezigid: {
                type: Number,
                required: true,
                unique: true
            },
            naam_drone: {
                type: String,
                required: true,
            },
            aantal: {
                type: Number,
                required: true,
            },
            naam_locatie: {
                type: String,
                required: true
            },
            tijdstip: {
                type: Datetime,
                timestamp: true
            }
});
var Aanwezig = module.exports = mongoose.model('Aanwezig', aanwezigSchema);

module.exports = {
    saveAanwezigheden: function (aanwezig, callback) {
        Aanwezig.create(aanwezig, callback);

    },

    AllAanwezigheden : function(callback) {
        Aanwezig.find(callback);
    },

    findAanwezigheden : function(id, callback){
        Aanwezig.find({ID:id}, callback);
    }
};