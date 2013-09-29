var util = require('util');
var EventEmitter = require('events').EventEmitter;
var async = require('async');


function Logr() {

    var listeners = [];
    var logLevel = 0;
    var loggingOptions;

    if (Logr.prototype._singletonInstance) {
        return Logr.prototype._singletonInstance;
    }

    Logr.prototype._singletonInstance = this;

    this.setOptions = function(options) {
        loggingOptions = options;
    }

    this.addListener = function(listener) {

        var reference = require('./listeners/' + listener);

        listeners.push(new reference(loggingOptions));
    }

    this.setLogLevel = function(level) {

        console.log("Set Level: " + level);
        switch(level) {
            case "info":
                logLevel = 0;
            case "debug":
                logLevel = 1;
            case "error":
                logLevel = 2;
            default:
                logLevel = 0;
        }
    }

    this.info = function(message, object) {

        if (logLevel >= 0) {
            log('Info', message, object);
        }

    }

    this.debug = function(message, object) {
        console.log("Level: " + logLevel);

        if (logLevel >= 1) {
            log('Debug', message, object);
        }

    }

    this.error = function(message, object) {

        if (logLevel >= 2) {
            log('Error', message, object);
        }

    }

    function log(logLevel, message, object) {

        if (listeners.length <= 0) {
            this.addListener('console');
        }

        var logMessage = {
            "logLevel": logLevel,
            "message": message || '',
            "object": object,
            "dateCreated": new Date().toISOString()
        }

        async.forEach(listeners, function(listener, callback) {
            listener.log(logMessage);
        });


        return logMessage;
    }
}

module.exports = new Logr();