var fs = require('fs');

var logger = function() {
    // this.logText = logText;
    this.logToFile = function (logText) {
        var currentDateTime = new Date();
        // logText = "\n" + currentDateTime + ": " + logText;
        fs.appendFile('./log.txt',logText+'\n', function(error) {
            if (error) throw error;
        })
    }

}

module.exports = logger;