import Negotiator from 'negotiator';
import {getResource, getListOf} from './controller';

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

export function getResourcesHandler(request, reply) {
    const
        negotiator = new Negotiator(request),
        resourceType = request.params.resourceType;

    if ('text/html' === negotiator.mediaType()) {
        reply({});
        return Promise.resolve();
    }

    return getListOf(resourceType)
        .then((list) => reply({[resourceType]: list, resourceType}))
        .catch((err) => reply(err));
}
