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

        setListener(listener);
    }

    this.setLogLevel = function(level) {

        switch(level.toLowerCase()) {
            case "info":
                logLevel = 0;
                break;
            case "debug":
                logLevel = 1;
                break;
            case "warning":
                logLevel = 2;
                break;
            case "error":
                logLevel = 3;
                break;
            default:
                logLevel = 0;
        }
    }

    this.info = function(message, object) {

        if (logLevel >= 0) {
            log('Info', message, object, null);
        }

    }

    this.debug = function(message, object) {

        if (logLevel >= 1) {
            log('Debug', message, object, null);
        }

    }

    this.warning = function(message, object) {
        if (logLevel >= 2) {
            log('Warning', message, object, null);
        }
    }

    this.error = function(message, object, exception) {

        if (logLevel >= 3) {
            log('Error', message, object, exception);
        }

    }

    function setListener(listener) {
        var reference = require('./listeners/' + listener);

        listeners.push(new reference(loggingOptions));
    }

    function log(logLevel, message, object, exception) {

        if (listeners.length <= 0) {
            setListener('console');
        }

        var logMessage = {
            "logLevel": logLevel,
            "message": message || '',
            "object": object,
            "exception": exception,
            "dateCreated": new Date().toISOString()
        }

        async.forEach(listeners, function(listener, callback) {
            listener.log(logMessage);
        });


        return logMessage;
    }
}

module.exports = new Logr();