const
    Negotiator = require('negotiator'),
    history = require('history'),

    routeRenderer = require('./route-renderer.jsx');

function configureHandlerFor(server) {
    server.ext('onPreResponse', function (request, reply) {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            routeRenderer.routeTo(history.createLocation('/'), function (err, renderedContent) {
                reply.view('layout/layout', {
                    renderedContent: renderedContent
                });
            });
        } else {
            reply.continue();
        }
    });
}

module.exports = {
    configureHandlerFor: configureHandlerFor
};
