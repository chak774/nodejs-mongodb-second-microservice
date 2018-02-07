    const getCollection = (db) => {
        return db.collection('second-microservice');
    }

    const getAll = (db) => {
        return new Promise((resolve, error) => {
            var collection = getCollection(db);
            const results = [];

            const addToResults = (result) => {
                results.push(result)
            }

            const loopEnd = (err) => {
                if (err) {
                    reject(new Error('An error occured fetching all second-microservice results, err:' + err))
                }
                resolve(results)
            }

            const cursor = collection.find({});

            cursor.forEach(addToResults, loopEnd);
        });
    }

    const addOne = (db, reqBody) => {
        return new Promise((resolve, error) => {
            var collection = getCollection(db);
            // Insert a single document
            collection.insertOne(reqBody, function(err, result) {
                if (err) {
                    reject(new Error('An error occured posting a second-microservice data, Error: ' + err))
                }
                resolve(result.insertedCount);
            });
        });
    }

    const updateOne = (db, reqBody) => {
        return new Promise((resolve, error) => {

            //Read Request
            var id = reqBody.id;
            var newValue = reqBody.newValue;
           
            //Create Query
            var ObjectID = require('mongodb').ObjectID;
            var filter = {_id : ObjectID(id)};

            //Create Update Statement
            var updateStatement = { $set: newValue };

            if(id && newValue){
                var collection = getCollection(db);
                collection.updateOne(filter, updateStatement, function(err, result){
                    if (err) {
                        console.error(new Error('An error occured putting a second-microservice data, Error: ' + err))
                        reject(err);
                    }
                    //console.log(result.matchedCount)
                    resolve(result.modifiedCount);
                });
            }
        });
    }

    const deleteOne = (db, reqBody) => {
        return new Promise((resolve, error) => {

            //Read Request
            var id = reqBody.id;
           
            //Create Query
            var ObjectID = require('mongodb').ObjectID;
            var filter = {_id : ObjectID(id)};

            if(id){
                var collection = getCollection(db);
                collection.deleteOne(filter, function(err, result){
                    if (err) {
                        console.error(new Error('An error occured removing a second-microservice data, Error: ' + err))
                        reject(err);
                    }
                    //console.log(result.matchedCount)
                    resolve(result.deletedCount);
                });
            }
        });
    }

  module.exports = Object.assign({}, {getAll, addOne, updateOne, deleteOne})