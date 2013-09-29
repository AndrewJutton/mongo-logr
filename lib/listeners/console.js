var util = require('util');
var colors = require('colors');

Console = function(loggingOptions) {

    setColors();

    this.log = function(logMessage) {

        console.log("in console Logger");
        var color = getColor(logMessage.logLevel);

        console.log(util.format('Level: %s, Date: %s, Message: %s', logMessage.logLevel, logMessage.dateCreated, logMessage.message));
    }

    function getColor(logLevel) {

        return "info";

    }

    function setColors() {

        colors.setTheme({
            verbose: 'cyan',
            info: 'green',
            warn: 'yellow',
            debug: 'blue',
            error: 'red'
        });
    }

}

exports = module.exports = Console;