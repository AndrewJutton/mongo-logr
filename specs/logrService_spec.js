should = require('should');
logrService = require('../lib/logrService');

describe("logr service tests", function() {

    describe("emit debug event to console", function() {

        var logger;
        var options;

        beforeEach(function() {
            logger = logrService;
        });

        it("should log to console", function() {
            logger.setOptions(null);
            logger.setLogLevel("error");
            logger.addListener('console');
            logger.error("test message", null, new Error("Test"));
        });

        it("should log to mongo", function() {

            options = {
                mongo: {
                    connection: "mongodb://localhost:27017/stubr",
                    collectionName: "logr"
                }
            };

            logger.setOptions(options);
            logger.addListener('mongo');
            logger.setLogLevel("debug");
            logger.warning("test message", null, new Error("Test"));
        });

    });

});