'use strict';

var hapi = require('hapi'),

    server = new hapi.Server();

server.connection({port: 3333});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, response) {
        response({message: 'Hello World'});
    }
});

module.exports = server;