'use strict';

const Hapi = require('hapi');
var mongo = require('mongodb');

var url = "mongodb://admin:admin123@139.59.4.88:27017/";
var MongoClient = require('mongodb').MongoClient;

// Create a server with a host and port
const server = Hapi.server({ 
    host: 'localhost', 
    port: 8000 
});

var getVending1Data = function a(a,s) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            databaseObject.collection("spirals").find({},{ _id: false }).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });

    });
}

var getVending2Data = function a(a,s) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            databaseObject.collection("spaces").find({},{ _id: false }).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });

    });
}

var getVending2Data = function a(a,s) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            databaseObject.collection("storages").find({},{ _id: false }).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });

    });
}

server.route({
    method: 'GET',
    path: '/vending_1',
    handler: function (request, h) {
        return getVending1Data().then((spirals) => { return spirals });
    }
});

server.route({
    method: 'GET',
    path: '/vending_2',
    handler: function (request, h) {
        return getVending2Data().then((spirals) => { return spirals });
    }
});

server.route({
    method: 'GET',
    path: '/storages',
    handler: function (request, h) {
        return getVending2Data().then((storages) => { return storages });
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