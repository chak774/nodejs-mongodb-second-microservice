//Load External Configuration File First. Then load them by process.env.xxx
require('dotenv').config();
//Or if you want to use path
//require('dotenv').config({path: '/full/custom/path/to/your/env/vars'})

//Initilize a Logger
const logger = require('./logger/logger').init();

logger.log('info', "Starting up server...");

const server = require('./server/server');
const dbConnector = require('./db/connector/mongo');
const EventEmitter = require('events');

const mediator = new EventEmitter();

mediator.on('db.ready', (db) => {
    server.start(db);
});

mediator.on('db.error', (err) => {
    logger.log('error', 'Failed to start server. Reason: Failed to connect to DB. Error: ' + err)
})

dbConnector.connect(mediator)

mediator.emit('boot.ready')
