var util = require('util');
var mongoose = require('mongoose');

Mongo = function(loggingOptions) {

    var loggingOptions = loggingOptions;
    this.model = setSchema(loggingOptions);
    connect(loggingOptions);

    this.log = function(logMessage) {

        var newLog = new this.model(logMessage);

        newLog.save(function(err) {
            if(err) {
                console.log('error saving event to database: '+ err);
            }
        });

    }

    function connect(options) {

        mongoose.connect(options.mongo.connection, function(err) {
            if (err) {
                throw err;
            }
        } );
    }

    function setSchema(options) {

        var logrSchema = new mongoose.Schema({
            logLevel: String,
            message: { type: String },
            object: { type: String },
            exception: { type: String },
            dateCreated: { type: Date, default: Date.now }
        });

        return mongoose.model(options.mongo.collectionName, logrSchema);
    }

}

exports = module.exports = Mongo;
