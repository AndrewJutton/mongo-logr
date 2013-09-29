var util = require('util');
var mongoose = require('mongoose');

Mongo = function(loggingOptions) {

    var loggingOptions = loggingOptions;
    this.model = setSchema(loggingOptions.mongo.collectionName);
    connect(loggingOptions.mongo.connection);

    this.log = function(logMessage) {

        var newLog = new this.model(logMessage);

        newLog.save(function(err) {
            if(err) {
                console.log('error saving event to database: '+ err);
            }
        });

    }

    function connect(connection) {
        mongoose.connect(connection);
    }

    function setSchema(collectionName) {

        var logrSchema = new mongoose.Schema({
            logLevel: String,
            message: { type: String },
            object: { type: String },
            dateCreated: { type: Date, default: Date.now }
        });

        return mongoose.model(collectionName, logrSchema);
    }

}

exports = module.exports = Mongo;
