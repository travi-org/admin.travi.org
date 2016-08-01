import {getResourceHandler, getResourcesHandler} from './route-handlers';

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{resourceType}',
        handler: getResourcesHandler
    });

    server.route({
        method: 'GET',
        path: '/{resourceType}/{id}',
        handler: getResourceHandler
    });

    next();
};

exports.register.attributes = {
    name: 'resources-routes'
};
