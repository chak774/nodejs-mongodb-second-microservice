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
            res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
            res.header("Access-Control-Allow-Headers", process.env.HEADERS);
            res.header("Access-Control-Allow-Methods", process.env.METHODS);
            next();
          });

        //A middleware function with no mount path. The function is executed every time the app receives a request.
         /* app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        })  */
        api(app, db);
        const server = app.listen(process.env.SERVER_PORT, () => resolve(resolve));
    })
    .then(
        result => console.log('Server started successfully. Listening on port: ' + process.env.SERVER_PORT),
        error => console.log('Failed to start server.',error)

    )
}

module.exports = Object.assign({}, {start})
