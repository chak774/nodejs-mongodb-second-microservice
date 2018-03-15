const winston = require('winston'); 
const fs = require( 'fs' );
const path = require('path');
const dailyRotateFile = require('winston-daily-rotate-file');

let logger;

const getNowString = () => {
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth()+1; //January is 0!
    var year = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var millisecond = today.getMilliseconds();

    if(date<10){
        date='0'+date;
    } 
    if(month<10){
        month='0'+month;
    } 
    if(hour<10){
        hour='0'+hour;
    } 
    if(minute<10){
        minute='0'+minute;
    } 
    if(second<10){
        second='0'+second;
    } 
    if(millisecond<10){
        millisecond='00'+millisecond;
    }else if(millisecond>10&&millisecond<100){
        millisecond='0'+millisecond;
    }

    return year + '/' + month + '/' + date + ' ' + hour + ':' + minute + ':' + second + ':' + millisecond;
} 

const logFormatter = (options) => {
    // - Return string will be passed to logger.
    // - Optionally, use options.colorize(options.level, <string>) to
    //   colorize output based on the log level.
    return options.timestamp() + ' ' +
        winston.config.colorize(options.level, options.level.toUpperCase()) + ' ' +
        (options.message ? options.message : '') +
        (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );      
}

const init = () => {

    //Create Log Directory First
    const logDir = process.env.LOG_DIR_PATH; // directory path you want to set
    if ( !fs.existsSync( logDir ) ) {
        // Create the directory if it does not exist
        console.log("Log directory does not existed. Created Log Directory: ", logDir);
        fs.mkdirSync( logDir );
    }

    //Set Log Message Format
    //winston@v2.4.1 does not support it yet
   /*  const logFormat = winston.format.printf(info => {
        return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    }); */
    

    //Create Logger
    logger = new (winston.Logger)({
        level: 'info',
        //winston@v2.4.1 does not support it yet
        /* format:  winston.format.combine(
            winston.format.label({ label: 'GENERAL' }),
            winston.format.timestamp(),
            logFormat
        ), */
        transports: [
            new winston.transports.Console({
                timestamp: () => {return getNowString();},
                formatter: (options) => {return logFormatter(options)}
            }),
            new dailyRotateFile({
              name: 'combined-file',
              timestamp: () => {return getNowString();},
              formatter: (options) => {return logFormatter(options)},
              filename: logDir + 'combined.log',
              datePattern: 'yyyy-MM-dd.',
              prepend: true,
              level: 'info',
              zippedArchive: true
            }),
            new dailyRotateFile({
                name: 'error-file',
                timestamp: () => {return getNowString();},
                formatter: (options) => {return logFormatter(options)},
                filename: logDir + 'error.log',
                datePattern: 'yyyy-MM-dd.',
                prepend: true,
                level: 'error',
                zippedArchive: true
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

