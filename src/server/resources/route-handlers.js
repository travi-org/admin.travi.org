import {getResource, getListOf} from './controller';

export function getResourceHandler(request, reply) {
    return getResource(request.params.resourceType, request.params.id)
        .then((resource) => reply({resource}))
        .catch((err) => reply(err));
}

export function getResourcesHandler(request, reply) {
    const resourceType = request.params.resourceType;

    return getListOf(resourceType)
        .then((list) => reply({[resourceType]: list, resourceType}))
        .catch((err) => reply(err));
}
