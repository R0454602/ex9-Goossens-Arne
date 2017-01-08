module.exports = {
    fieldsNotEmpty: function (object) {
        "les"
        var errors = [];
        var i = 1;
        if(typeof object["vak"] != "object"){
            errors.push(arguments[i])
        }
        i++
        if(typeof object["docent"] != "object"){
            errors.push(arguments[i]);
        }
        i++
        if(object["duur"] == 0 || typeof object["duur"] != "number"){
            errors.push(arguments[i]);
        }
        i++
        if(typeof object["begintijd"] != "datetime"){
            errors.push(arguments[i]);
        }
          i++
        if(object["lokaal"] != "object"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};