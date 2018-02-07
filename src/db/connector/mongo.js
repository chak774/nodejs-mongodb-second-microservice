const config = require('../../config/config');
const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;

const authMechanism = 'DEFAULT';

const getMongoURL = () => {
  // Connection URL mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  const url = f('mongodb://%s:%s@%s:%s/%s?authMechanism=%s'
  , encodeURIComponent(config.dbSettings.user)
  , encodeURIComponent(config.dbSettings.pw)
  , config.dbSettings.hostname 
  , config.dbSettings.port 
  , config.dbSettings.db 
  , authMechanism);
  console.log('DB URL: ', url);
  return url;
}

const connect = (mediator) => {
    mediator.once('boot.ready', () => {
      //Connect to DB
      MongoClient.connect(
        getMongoURL(), (err, mongoClient) => {
          if(mongoClient){
            //Get the DB Object
            var db = mongoClient.db(config.dbSettings.db);
            if (err) {
              mediator.emit('db.error', err)
            }else{ 
              mediator.emit('db.ready', db);
              
            }
          }else{
            console.error("Failed to start server. Reason: Failed to connect to DB.");
          }
        })
    })
  }

  module.exports = Object.assign({}, {connect})