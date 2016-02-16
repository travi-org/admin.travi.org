'use strict';

require('jsx-require-extension');

const
    Negotiator = require('negotiator'),
    redux = require('redux'),
    immutable = require('immutable'),
    _ = require('lodash'),

    resourcesController = require('../resources/controller'),
    routeRenderer = require('./route-renderer.jsx'),
    reducer = require('../../shared/store/reducer');

function setActiveStateFor(types, activeType) {
    return _.map(types, (type) => {
        return _.extend({}, type, {active: type.text === activeType});
    });
}

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            const store = redux.createStore(reducer, immutable.fromJS(request.response.source));

            resourcesController.listResourceTypes((err, types) => {
                if (err) {
                    reply(err);
                } else {
                    store.dispatch({
                        type: 'SET_PRIMARY_NAV',
                        nav: setActiveStateFor(types, request.params.resourceType)
                    });

                    routeRenderer.routeTo(request.url, store, (error, renderedContent) => {
                        reply.view(
                            'layout/layout',
                            {
                                renderedContent,
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
