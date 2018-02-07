
const express = require('express')
const bodyParser = require('body-parser');
const api = require('../api/api')

const start = (db) => {
    return new Promise((resolve, reject) => {
        console.log('Starting server...');
        console.log('Importing Node Express Module...');
        const app = express();

        //Use bodyParser to read POST body
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        //A middleware function with no mount path. The function is executed every time the app receives a request.
        /* app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err))
            res.status(500).send('Something went wrong!')
        }) */
        api(app, db);
        const server = app.listen(8081, () => resolve(resolve));
    })
    .then(
        result => console.log('Server started successfully. Listening on port: 8081'),
        error => console.log('Failed to start server.',error)

    )
}

module.exports = Object.assign({}, {start})
