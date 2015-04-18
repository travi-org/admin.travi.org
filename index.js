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

if (!module.parent) {
    server.start(function (err) {
        if (err) {
            return console.error(err);
        }

        server.log('Server started', server.info.uri);
    });
}

module.exports = server;