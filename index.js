'use strict';

var hapi = require('hapi'),
    homeController = require('./lib/homepageController'),

    server = new hapi.Server();

server.connection({port: 3333});

server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'views'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        homeController.resourceTypes(function (err, types) {
            reply.view('index', types);
        });
    }
});

server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        reply({message: 'Hello World'});
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