'use strict';

require('jsx-require-extension');

const
    Negotiator = require('negotiator'),
    history = require('history'),
    redux = require('redux'),
    _ = require('lodash'),

    resourcesController = require('../resources/controller'),
    routeRenderer = require('./route-renderer.jsx'),
    reducer = require('../../shared/store/reducer');

function prepareInitialPropsFrom(data) {
    const initialProps = [{primaryNav: data.primaryNav}];

    if (1 < Object.keys(data).length) {
        initialProps.push(data);
    }

    return initialProps;
}

function setActiveStateFor(types, activeType) {
    return _.map(types, (type) => {
        return _.extend({}, type, {active: type.text === activeType});
    });
}

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            const store = redux.createStore(reducer, request.response.source);

            resourcesController.listResourceTypes((err, types) => {
                if (err) {
                    reply(err);
                } else {
                    const data = _.extend({}, request.response.source);
                    data.primaryNav = setActiveStateFor(types, request.params.resourceType);

                    routeRenderer.routeTo(history.createLocation(request.url), data, (error, renderedContent) => {
                        reply.view(
                            'layout/layout',
                            {
                                renderedContent,
                                initialData: JSON.stringify(prepareInitialPropsFrom(data)),
                                initialState: JSON.stringify(store.getState())
                            }
                        );
                    });
                }
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
