'use strict';

require('jsx-require-extension');

const
    Negotiator = require('negotiator'),
    history = require('history'),
    _ = require('lodash'),

    resourcesController = require('../resources/resources-controller'),
    routeRenderer = require('./route-renderer.jsx');

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', function (request, reply) {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            resourcesController.listResourceTypes(function (err, types) {
                const data = request.response.source;
                data.primaryNav = _.map(types, function (type) {
                    return _.extend({}, type, {active: type.text === data.resourceType});
                });

                routeRenderer.routeTo(history.createLocation(request.url), data, function (error, renderedContent) {
                    reply.view('layout/layout', {renderedContent});
                });
            });
        } else {
            reply.continue();
        }
    });

    next();
};

exports.register.attributes = {
    name: 'rendering-handler'
};
