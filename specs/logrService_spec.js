should = require('should');
logrService = require('../lib/logrService');

describe("logr service tests", function() {

    describe("emit debug event to console", function() {

        var logger;
        var options;

        beforeEach(function() {

            options = {
                mongo: {
                    connection: "mongodb://localhost:27017/stubr",
                    collectionName: "myLog"
                }
            };

            logger = logrService;
        });

        it("should log to console", function() {
            logger.setOptions(options);
            logger.addListener('console');
            logger.addListener('mongo');
            logger.info("test message", null);
        });

    });

});