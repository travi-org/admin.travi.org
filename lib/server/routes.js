'use strict';
const
    router = require('../router'),
    resourcesController = require('../resourcesController');

exports.register = function addRoutesTo(server, options, next) {
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
                reply({
                    primaryNav: types
                });
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{resourceType}',
        handler: function (request, reply) {
            resourcesController.getListOf(request.params.resourceType, function (err, resources) {
                reply({
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
            resourcesController.getResource(request.params.resourceType, request.params.id, function (err, resource) {
                reply({
                    resourceType: request.params.resourceType,
                    resource: resource
                });
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'routes'
};
