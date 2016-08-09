import Negotiator from 'negotiator';

function register(server, options, next) {
    server.ext('onRequest', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            request.setUrl(`/html${request.url.path}`);
        }

        reply.continue();
    });

    next();
}

register.attributes = {
    name: 'route-transformer'
};

export {register};
