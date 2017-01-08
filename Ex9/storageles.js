var mongoose = require("mongoose");
var lesSchema = mongoose.Schema({
            lesid: {
                type: Number,
                required: true,
                unique: true
            },
            vak: {
                type: Object,
                required: true
            },
            docent: {
                type: Object,
                required: true
            },
            duur: {
                type: Number,
                required: true
            },
            begintijd: {
                type: Date
            },
            lokaal: {
                type: Object,
                required: true
            }
});
var Les = module.exports = mongoose.model('Les', lesSchema);

module.exports = {
    saveLes: function (les, callback) {
        Les.create(les, callback);

    },

    AllLes : function(callback) {
        Les.find(callback);
    },

    findLes : function(id, callback){
        Les.find({lesid:id}, callback);
    }
};