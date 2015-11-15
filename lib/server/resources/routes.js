'use strict';

const resourcesController = require('./controller');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{resourceType}',
        handler(request, reply) {
            resourcesController.getListOf(request.params.resourceType, function (err, resources) {
                if (err) {
                    reply(err);
                } else {
                    reply({
                        resourceType: request.params.resourceType,
                        resources
                    });
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{resourceType}/{id}',
        handler(request, reply) {
            resourcesController.getResource(request.params.resourceType, request.params.id, function (err, resource) {
                if (err) {
                    reply(err);
                } else {
                    reply({
                        resourceType: request.params.resourceType,
                        resource
                    });
                }
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'resources-routes'
};
