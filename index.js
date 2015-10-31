'use strict';

var hapi = require('hapi'),
    async = require('async'),
    _ = require('lodash'),

    router = require('./lib/router'),
    resourcesControlller = require('./lib/resourcesController'),

    server = new hapi.Server();

server.connection({port: process.env.PORT || 3333});

server.register(require('inert'), function () { return; });
server.register(require('vision'), function (err) {
    if (err) {
        console.log('Failed to load vision.');
    }
});

server.views({
    engines: {
        mustache: require('hapi-mustache')
    },
    relativeTo: __dirname,
    path: 'lib/views'
});

function populatePrimaryNav(callback, resourceType) {
    router.listResourceTypes(function (err, types) {
        types = _.map(types, function (type) {
            type.active = resourceType === type.text;

            return type;
        });

        callback(null, types);
    });
}

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
                foo: types
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/{resourceType}',
    handler: function (request, reply) {
        resourcesControlller.getListOf(request.params.resourceType, function (err, resources) {
            reply.view('resourceList', {
                resourceType: request.params.resourceType,
                resources: resources
            });
        });
    }
});

server.route({
    method: 'GET',
    path: '/{resourceType}/{id}',
    handler: function (request, reply) {
        resourcesControlller.getResource(request.params.resourceType, request.params.id, function (err, resource) {
            reply.view('resource', {
                resourceType: request.params.resourceType,
                resource: resource
            });
        });
    }
});

require('./lib/server/rendering-handler').configureHandlerFor(server);

if (!module.parent) {
    server.start(function (err) {
        if (err) {
            return console.error(err);
        }

        server.log('Server started', server.info.uri);
    });
}

module.exports = server;
