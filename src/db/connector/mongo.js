const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;

const getMongoURL = () => {
  // Connection URL mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]
  const url = f('mongodb://%s:%s@%s:%s/%s?authMechanism=%s'
  , encodeURIComponent(process.env.DB_USER)
  , encodeURIComponent(process.env.DB_PASSWORD)
  , process.env.DB_HOST
  , process.env.DB_PORT
  , process.env.DB_NAME
  , process.env.DB_AUTH_MECHANISM);
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
            var db = mongoClient.db(process.env.DB_NAME);
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