'use strict';

const resourcesController = require('./controller');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{resourceType}',
        handler(request, reply) {
            const resourceType = request.params.resourceType;

            resourcesController.getListOf(resourceType, function (err, resources) {
                if (err) {
                    reply(err);
                } else {
                    reply({resources});
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{resourceType}/{id}',
        handler(request, reply) {
            const resourceType = request.params.resourceType;

            resourcesController.getResource(resourceType, request.params.id, function (err, resource) {
                if (err) {
                    reply(err);
                } else {
                    reply({resource});
                }
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'resources-routes'
};
