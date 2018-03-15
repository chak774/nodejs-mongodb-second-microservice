const winston = require('winston'); 
const fs = require( 'fs' );
const path = require('path');

let logger;

const init = () => {

    //Create Log Directory First
    const logDir = process.env.LOG_DIR_PATH; // directory path you want to set
    if ( !fs.existsSync( logDir ) ) {
        // Create the directory if it does not exist
        console.log("Log directory does not existed. Created Log Directory: ", logDir);
        fs.mkdirSync( logDir );
    }

    const logFormat = winston.format.printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });

    logger = winston.createLogger({
        level: 'info',
        format:  winston.format.combine(
            winston.format.label({ label: 'GENERAL' }),
            winston.format.timestamp(),
            logFormat
        ),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ 
                filename: logDir + 'error.log', 
                level: 'error' 
            }),
            new winston.transports.File({ 
                filename: logDir + 'combined.log'
            }),
            new winston.transports.Console({
                colorize: true
            })
        ]
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    // 
    /* if (process.env.ENV !== 'PROD') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple()
        }));
    } */
    return logger;
}

module.exports = {
    get : () => logger,
    init : () => init(),
};

