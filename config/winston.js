/** START
 * Nadege Marending
 */

/**
 * This is configuration file for winston logging, mainly for user's activities
 * Log file written into logs/navyblue.log file (see options below)
 */
const appRoot = require('app-root-path');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/navyblue.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    }
}

const logger = new createLogger({
    transports: [
        new transports.File(options.file)
    ],
    format: combine(
        timestamp(),
        json()
    ),
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;

/** 
 * Nadege Marending
END  */
