const Negotiator = require('negotiator');

function configureHandlerFor(server) {
    server.ext('onPreResponse', function (request, reply) {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            reply.view();
        } else {
            reply.continue();
        }
    });
}

module.exports = {
    configureHandlerFor: configureHandlerFor
};
