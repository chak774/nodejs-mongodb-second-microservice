const logger = require('../logger/logger').get();
const status = require('http-status');
const secondMicroservice = require('../db/service/second-microservice');

module.exports = (app, db) => {

    /*
    *   URL: /firstMicroservice
    *   Method: GET
    *   Response Example: 
    *       GET firstMicroservice Successfully.
    */
    logger.log('info', 'Registering api GET /firstMicroservice...');
    app.get('/firstMicroservice', (req, res) => {
        logger.log('info', "Got a GET request for /firstMicroservice");
        res.send('GET firstMicroservice Successfully.');
    })

    /*
    *   URL: /secondMicroservice
    *   Method: GET
    *   Response Example: 
    *    [
    *        {
    *            "_id": "5a741c5d36f73335dc37bb55",
    *            "a": 1
    *        },
    *        {
    *            "_id": "5a741cb525a6563a90f62a69",
    *            "a": 1
    *        }
    *    ]
    */
    logger.log('info', 'Registering api GET /secondMicroservices...');
    app.get('/secondMicroservices', (req, res) => {
        logger.log('info', "Got a GET request for /secondMicroservices");
        secondMicroservice.getAll(db).then(results => {
            logger.log('debug', 'Response: '+ JSON.stringify(results));
            res.status(status.OK).json(results)
          }).catch()
    })

    /*
    *   URL: /secondMicroservice
    *   Method: POST
    *   Request Body Example: {"foo":"bar"}
    *   Response Example: {"Inserted Record(s)" : 1}
    */
    logger.log('info', 'Registering api POST /secondMicroservice...');
    app.post('/secondMicroservice', (req, res) => {
        logger.log('info', "Got a POST request for /secondMicroservice");
        //The 'body-parser' middleware only handles JSON and urlencoded data
        logger.log('info', 'POST Request Body:'+ JSON.stringify(req.body));
        secondMicroservice.addOne(db, req.body).then(insertedCount => {
            logger.log('info', 'Inserted Record(s): '+insertedCount);
            res.status(status.OK).json({"Inserted Record(s)" : insertedCount })
          }).catch( error => {
            logger.log('info', 'Failed to insert record! Error: '+ error);
            res.status(status.BAD_REQUEST).json({"Error Message" : 'Failed to insert record! Error: ',error})
          })
    })

    /*
    *   URL: /secondMicroservice
    *   Method: PUT
    *   Request Body Example: {"id":"5a7827f6bfe8e72a1849d26f", "newValue":{"foo":"bar123"}}
    *   Response Example: 
    *        {
    *            "Modified Record(s): ": 1
    *        }
    */
    logger.log('info', 'Registering api PUT /secondMicroservice...');
    app.put('/secondMicroservice', function (req, res) {
        logger.log('info', "Got a PUT request for /secondMicroservice");
        logger.log('info', 'PUT Request Body:'+ JSON.stringify(req.body));
        secondMicroservice.updateOne(db, req.body).then(modifiedCount => {
            logger.log('info', "Modified Record(s): "+ modifiedCount);
            res.status(status.OK).json({"Modified Record(s)" : modifiedCount})
        }).catch( error => {
            logger.log('info', 'Failed to update record! Error: '+ error);
            res.status(status.BAD_REQUEST).json({"Error Message" : 'Failed to update record! Error: ',error})
          })   
      });

    /*
    *   URL: /secondMicroservice/:id
    *   Method: DELETE
    */
    logger.log('info', 'Registering api DELETE /secondMicroservice...');
    app.delete('/secondMicroservice/:id', function (req, res) {
        logger.log('info', "Got a DELETE request for /secondMicroservice");
        //logger.log('DELETE Request Body:', req.body);
        logger.log('info', 'DELETE Request Params:'+ req.params);
        logger.log('info', 'DELETE Request ID:'+ req.params.id);
        secondMicroservice.deleteOne(db, req.params.id).then(deletedCount => {
            logger.log('info', "Deleted Record(s): "+ deletedCount);
            res.status(status.OK).json({"Deleted Record(s)" : deletedCount})
        }).catch( error => {
            logger.log('info', 'Failed to delete record! Error: '+ error);
            res.status(status.BAD_REQUEST).json({"Error Message" : 'Failed to delete record! Error: ',error})
          })   
      });
}