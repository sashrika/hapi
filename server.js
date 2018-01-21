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
            databaseObject.collection("spirals").find({},{fields:{_id: 0}}).toArray(function (err, result) {
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
            databaseObject.collection("spaces").find({},{fields:{_id: 0}}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });

    });
}

var getStorageData = function a(a,s) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            databaseObject.collection("storages").find({},{fields:{_id: 0}}).toArray(function (err, result) {
                if (err) throw err;
                db.close();
                resolve(result);
            });
        });

    });
}

server.route({
    method: 'GET',
    path: '/vending/{id}',
    handler: function (request, h) {
        if(encodeURIComponent(request.params.id)==1){
            return getVending1Data().then((spirals) => { return spirals });
        }else if(encodeURIComponent(request.params.id)==2){
            return getVending2Data().then((spaces) => { return spaces });
        }
    }
});

server.route({
    method: 'GET',
    path: '/test',
    handler: function (request, h) {
        var sr = ["hi", "bye"];
		return sr;
    }
});

server.route({
    method: 'GET',
    path: '/storages',
    handler: function (request, h) {
        return getStorageData().then((storages) => { return storages });
    }
});

var updateStorage = function a(storage_id, payload) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            var query = { storageId: parseInt(storage_id) };
            var updateObject =  { $set:eval(payload)};            
            databaseObject.collection("storages").updateOne(query, updateObject,function(err, res) {
                if (err) throw err;
                console.log("1 storage updated");
                db.close();
                resolve("1 storage updated");
              });
        });
    });
}

server.route({
    method: ['PUT'],
    path: '/storage/{storage_id}',
    handler: function (request, reply) {
        return updateStorage(request.params.storage_id , request.payload).then((spaces) => {
            return spaces
        });
    }
});

var updateSpirals = function a(spiral_id, payload) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            var query = { spiralId: parseInt(spiral_id) };
            var updateObject =  { $set:eval(payload)};            
            databaseObject.collection("spirals").updateOne(query, updateObject,function(err, res) {
                if (err) throw err;
                console.log("1 spiral updated");
                db.close();
                resolve("1 spiral updated");
              });
        });
    });
}

var updateSpaces = function a(space_id, payload) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            var query = { spaceId: parseInt(space_id) };
            var updateObject =  { $set:eval(payload)};            
            databaseObject.collection("spaces").updateOne(query, updateObject,function(err, res) {
                if (err) throw err;
                console.log("1 space updated");
                db.close();
                resolve("1 space updated");
              });
        });
    });
}

server.route({
    method: ['PUT'],
    path: '/vending/{machine_id}/{block_id}',
    handler: function (request, reply) {
        if(request.params.machine_id==1){
            return updateSpirals(request.params.block_id , request.payload).then((status) => {
                return status
            });
        }else if(request.params.machine_id==2){
            return updateSpaces(request.params.block_id , request.payload).then((status) => {
                return status
            });
        }
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