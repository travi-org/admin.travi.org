'use strict';

const resourcesController = require('../resources/resources-controller');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            resourcesController.listResourceTypes(function (err, types) {
                reply({
                    primaryNav: types
                });
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'landing'
};
