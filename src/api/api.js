const status = require('http-status');
const secondMicroservice = require('../db/service/second-microservice');


module.exports = (app, db) => {

    /*
    *   URL: /firstMicroservice
    *   Method: GET
    *   Response Example: 
    *       GET firstMicroservice Successfully.
    */
    console.log('Registering api GET /firstMicroservice...');
    app.get('/firstMicroservice', (req, res) => {
        console.log("Got a GET request for /firstMicroservice");
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
    console.log('Registering api GET /secondMicroservices...');
    app.get('/secondMicroservices', (req, res) => {
        console.log("Got a GET request for /secondMicroservices");
        secondMicroservice.getAll(db).then(results => {
            console.log('Response: ',results);
            res.status(status.OK).json(results)
          }).catch()
    })

    /*
    *   URL: /secondMicroservice
    *   Method: POST
    *   Request Body Example: {"foo":"bar"}
    *   Response Example: {"Inserted Record(s)" : 1}
    */
    console.log('Registering api POST /secondMicroservice...');
    app.post('/secondMicroservice', (req, res) => {
        console.log("Got a POST request for /secondMicroservice");
        //The 'body-parser' middleware only handles JSON and urlencoded data
        console.log('POST Request Body:', req.body);
        secondMicroservice.addOne(db, req.body).then(insertedCount => {
            console.log('Inserted Record(s): ',insertedCount);
            res.status(status.OK).json({"Inserted Record(s): " : insertedCount })
          }).catch( error => {
            console.log('Failed to insert record! Error: ', error);
            res.status(status.BAD_REQUEST).json({"Error Message: " : 'Failed to insert record! Error: ',error})
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
    console.log('Registering api PUT /secondMicroservice...');
    app.put('/secondMicroservice', function (req, res) {
        console.log("Got a PUT request for /secondMicroservice");
        console.log('PUT Request Body:', req.body);
        secondMicroservice.updateOne(db, req.body).then(modifiedCount => {
            console.log("Modified Record(s): ", modifiedCount);
            res.status(status.OK).json({"Modified Record(s): " : modifiedCount})
        }).catch( error => {
            console.log('Failed to update record! Error: ', error);
            res.status(status.BAD_REQUEST).json({"Error Message: " : 'Failed to update record! Error: ',error})
          })   
      });

    /*
    *   URL: /secondMicroservice
    *   Method: DELETE
    *   Request Body Example: {"id":"5a7827f6bfe8e72a1849d26f"}
    *   Response Example: 
    *        {
    *            "Deleted Record(s): ": 1
    *        }
    */
    console.log('Registering api DELETE /secondMicroservice...');
    app.delete('/secondMicroservice', function (req, res) {
        console.log("Got a DELETE request for /secondMicroservice");
        console.log('DELETE Request Body:', req.body);
        secondMicroservice.deleteOne(db, req.body).then(deletedCount => {
            console.log("Deleted Record(s): ", deletedCount);
            res.status(status.OK).json({"Deleted Record(s): " : deletedCount})
        }).catch( error => {
            console.log('Failed to delete record! Error: ', error);
            res.status(status.BAD_REQUEST).json({"Error Message: " : 'Failed to delete record! Error: ',error})
          })   
      });
}