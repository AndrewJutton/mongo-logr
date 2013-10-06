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
    var logger = (require('mongo-logr')).logger;

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


Set Log Level
-------------

You can set the minimum log level to log at with the following:

###Example
    logger.setLogLevel("warning");

This will only log for messages that are set to warning or higher.  The levels are as follows:

###Example
   logger.setLogLevel("info");      - Will log: info, debug, warning and error
   logger.setLogLevel("debug");     - Will log: debug, warning and error
   logger.setLogLevel("warning");   - Will log: warning and error
   logger.setLogLevel("error");     - Will log: error only

To Log
------

Now you're all set to start logging.  mongo-logr provides a number of convenience methods

###Example

    logger.info("custom message", "custom object");
    logger.debug("custom message", "custom object");
    logger.warning("custom message", "custom object");
    logger.error("custom message", "custom object", error);


Full Example

Configure mongo-logr in app.js

###Example

     var logger = (require('mongo-logr')).logger;
	 
	 var options = {
		mongo: {
			connection: config.development.databaseUrl,
			collectionName: "logr"
		}
	};

	logger.setOptions(options);
	logger.addListener('mongo');
	logger.addListener('console');
	logger.setLogLevel("info");


Then to use in another file

###Example 

	var logger = (require('mongo-logr')).logger;
	logger.info("Log message", myJsonObject);

	


Please refer to the tests in the "specs" folder for working examples