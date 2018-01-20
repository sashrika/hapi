'use strict';

const Hapi = require('hapi');

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