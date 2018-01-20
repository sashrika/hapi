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

var getStorageData = function a(a,s) {
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
    path: '/storages',
    handler: function (request, h) {
        return getStorageData().then((storages) => { return storages });
    }
});

server.route({
    method: ['PUT'],
    path: '/vending/{machine_id}/{block_id}',
    handler: function (request, reply) {
        return("update vending machine "+request.params.machine_id+" of "+request.params.block_id);
    }
});

var updateStorage = function a(storage_id, payload) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var databaseObject = db.db("vending_fyp");
            var query = { storageId: parseInt(storage_id) };
            // databaseObject.collection("storages").find(query,{ _id: false }).toArray(function (err, result) {
            //     if (err) throw err;
            //     db.close();
            //     console.log("hi "+result);
            // });
            var updateObject =  { $set:eval(payload)};            
            databaseObject.collection("storages").updateOne(query, updateObject,function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
                db.close();
                resolve("1 document updated");
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