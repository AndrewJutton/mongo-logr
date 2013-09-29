mongo-logr
==========

Node module to log messages to a mongo database


To Install
----------

Using node package manager

###Example
    npm install mongo-logr


To Use
------

Add the require reference to the module.

### Example
    var logger = require('mongo-logr');

Listeners
---------

mongo-logr comes with two logging providers, the console logger and the mongo logger.  The mongo logger uses mongoose to write your log entries to a database collection

To add a listener to the console logger

###Example
    logger.addListener('console');

To add a listener to the mongo logger

###Example
    logger.addListener('mongo');


If no listener is added mongo-logr will by default use the console logger;


Options
-------

If you are using the mongo logger, you will need to call logger.setOptions

###Example

    var options = {
        mongo: {
            connection: "<< YOUR CONNECTION STRING HERE >>",
            collectionName: "<< YOUR DESIRED COLLECTION NAME WHERE THE LOGS WILL BE STORED"
        }
    };

    logger.setOptions(options);


To Log
------

Now you're all set to start logging.  mongo-logr provides a number of convenience methods

###Example

    logger.info("custom message", "custom object");
    logger.debug("custom message", "custom object");
    logger.error("custom message", "custom object");



EXAMPLES
--------

Please refer to the tests in the "specs" folder for working examples