require('jsx-require-extension');

const
    Negotiator = require('negotiator'),
    history = require('history'),

    resourceList = require('../router'),
    routeRenderer = require('./route-renderer.jsx');

function configureHandlerFor(server) {
    server.ext('onPreResponse', function (request, reply) {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            resourceList.listResourceTypes(function (err, types) {
                routeRenderer.routeTo(
                    history.createLocation(request.url),
                    {
                        primaryNav: types
                    },
                    function (err, renderedContent) {
                        reply.view('layout/layout', {
                            renderedContent: renderedContent
                        });
                    }
                );
            });
        } else {
            reply.continue();
        }
    });
}

module.exports = {
    configureHandlerFor: configureHandlerFor
};
