const server = require('./server/server');
const dbConnector = require('./db/connector/mongo');
const EventEmitter = require('events');
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
