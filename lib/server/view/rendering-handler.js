require('jsx-require-extension');

const
    Negotiator = require('negotiator'),
    history = require('history'),

    resourcesController = require('../../resourcesController'),
    routeRenderer = require('./route-renderer.jsx');

exports.register = function configureHandlerFor(server, options, next) {
    'use strict';

    server.ext('onPreResponse', function (request, reply) {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            resourcesController.listResourceTypes(function (err, types) {
                let data = request.response.source;
                data.primaryNav = types;

                routeRenderer.routeTo(history.createLocation(request.url), data, function (err, renderedContent) {
                    reply.view('layout/layout', {
                        renderedContent: renderedContent
                    });
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
