const config = require('../config/config');
const express = require('express')
const bodyParser = require('body-parser');
const api = require('../api/api')

const start = (db) => {
    return new Promise((resolve, reject) => {
        console.log('Starting server...');
        console.log('Creating Express Application...');
        const app = express();

        //Use bodyParser to read POST body
        console.log('Use body-parser middleware for handling JSON');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        //CORS Handler
        console.log('Registering general api to handle CORS...');
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
          });

        //A middleware function with no mount path. The function is executed every time the app receives a request.
         /* app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })  */
        api(app, db);
        const server = app.listen(config.serverSettings.port, () => resolve(resolve));
    })
    .then(
        result => console.log('Server started successfully. Listening on port: ' + config.serverSettings.port),
        error => console.log('Failed to start server.',error)

    )
}

module.exports = Object.assign({}, {start})
