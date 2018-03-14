const server = require('./server/server');
const dbConnector = require('./db/connector/mongo');
const EventEmitter = require('events');

//Load External Configuration File First. Then load them by process.env.xxx
require('dotenv').config();
//Or if you want to use path
//require('dotenv').config({path: '/full/custom/path/to/your/env/vars'})

const mediator = new EventEmitter();

mediator.on('db.ready', (db) => {
    console.log('Connected to DB Successfully.');
    server.start(db);
});

mediator.on('db.error', (err) => {
    console.error('Failed to connect to DB. Error: ', err);
})

dbConnector.connect(mediator)

mediator.emit('boot.ready')
