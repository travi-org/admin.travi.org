'use strict';

var hapi = require('hapi'),
    homeController = require('./lib/homepageController'),

    server = new hapi.Server();

server.connection({port: process.env.PORT || 3333});

server.views({
    engines: {
        jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: 'lib/views'
});

server.route({
    method: 'GET',
    path: '/resources/{param*}',
    handler: {
        directory: {
            path: 'resources'
        }
    }
});

server.route({
    method: 'GET',
    path: '/favicon.ico',
    handler: {
        file: {
            path: 'bower_components/travi.org-theme/img/favicon.ico'
        }
    }
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        homeController.resourceTypes(function (err, types) {
            reply.view('index', {
                types: types
            });
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
