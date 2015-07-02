'use strict';

var hapi = require('hapi'),
    async = require('async'),
    _ = require('lodash'),

    router = require('./lib/router'),
    renderer = require('./lib/renderer'),
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
            renderer.render('index', {
                types: types
            }, request, reply);
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
                        types = _.map(types, function (type) {
                            type.active = resourceType === type.text;

                            return type;
                        });

                        callback(null, types);
                    });
                },
                function (callback) {
                    resourcesControlller.getListOf(resourceType, callback);
                }
            ],
            function (err, results) {
                renderer.render('resourceList', {
                    resourceType: resourceType,
                    resources: results[1],
                    types: results[0]
                }, request, reply);
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
