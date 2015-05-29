'use strict';

var hapi = require('hapi'),
    async = require('async'),

    router = require('./lib/router'),
    resourcesControlller = require('./lib/resourcesController'),

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
        router.listResourceTypes(function (err, types) {
            reply.view('index', {
                types: types
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/{resourceType}',
    handler: function (request, reply) {
        var resourceType = request.params.resourceType;

        async.parallel(
            [
                function (callback) {
                    router.listResourceTypes(function (err, types) {
                        callback(null, types);
                    });
                },
                function (callback) {
                    resourcesControlller.getListOf(resourceType, function (err, resources) {
                        callback(null, resources);
                    });
                }
            ],
            function (err, results) {
                reply.view('resourceList', {
                    resourceType: resourceType,
                    resources: results[1],
                    types: results[0]
                });
            }
        );
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
