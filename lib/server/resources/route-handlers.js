import Negotiator from 'negotiator';
import {getResource} from './controller';

export function getResourceHandler(request, reply) {
    const negotiator = new Negotiator(request);

    if ('text/html' === negotiator.mediaType()) {
        reply({});
        return Promise.resolve();
    }

    return getResource(request.params.resourceType, request.params.id)
        .then((resource) => reply({resource}))
        .catch((err) => reply(err));
}
