'use strict';

const Hapi = require('hapi');
var mongo = require('mongodb');


var url = "mongodb://admin:admin123@localhost:27017/vending_fyp";

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(url, function(err, db) {
    console.log("Database");
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: 8000 
});


let u = [{ spiralId: "1", max: "7", remaining: "4" },
{ spiralId: "2", max: "7", remaining: "3" }];

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, h) {
        console.log(u)
        return u;
    }
});

server.route({
    method: ['PUT'],
    path: '/update',
    handler: function (request, reply) {
        u.push(request.payload);
        return(request.payload);
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();