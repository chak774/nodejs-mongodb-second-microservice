### Stack
- NodeJS 8.9.4
- Express ^4.16.2
- Ubuntu 16.04
- Mongo DB 3.6.2

### Environment Setup
1. Prepare Ubuntu VM
2. Install Mongo DB in Ubuntu VM (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
3. Use Mongo Shell to create users

use admindb.createUser(
  {
    user: "admin",
    pwd: "admin",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  })
  
  use second-microservice.createUser(
  {
    user: "appuser",
    pwd: "appuser",
    roles: [ { role: "readWrite", db: "second-microservice" },
             { role: "read", db: "second-microservice" } ]
  })
  
4. Configure MongoDB to be able to connect by host machine (https://superuser.com/questions/1043721/unable-to-connect-to-mongodb-running-in-virtualbox-host-mac-os-guest-centos)

  /etc/mongod.conf
  
  Listen to local and LAN interface.
  bind_ip = 127.0.0.1,10.0.2.15

5. Start MongoDB
sudo mongod --auth --dbpath /data/db1 --bind_ip 127.0.0.1,10.0.2.15

6. node index.js

### How to run?    

  URL: /firstMicroservice
  Method: GET
  Response Example: 
      GET firstMicroservice Successfully.



  URL: /secondMicroservices
  Method: GET
  Response Example: 
   [
       {
           "_id": "5a741c5d36f73335dc37bb55",
           "a": 1
       },
       {
           "_id": "5a741cb525a6563a90f62a69",
           "a": 1
       }
   ]



  URL: /secondMicroservice
  Method: POST
  Request Body Example: {"foo":"bar"}
  Response Example: {"Inserted Record(s)" : 1}



  URL: /secondMicroservice
  Method: PUT
  Request Body Example: {"id":"5a7827f6bfe8e72a1849d26f", "newValue":{"foo":"bar123"}}
  Response Example: 
       {
           "Modified Record(s): ": 1
       }



  URL: /secondMicroservice
  Method: DELETE
  Request Body Example: {"id":"5a7827f6bfe8e72a1849d26f"}
  Response Example: 
       {
           "Deleted Record(s): ": 1
       }

    
   
