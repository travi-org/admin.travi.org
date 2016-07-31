import {getListOf} from './controller';
import {getResourceHandler} from './route-handlers';

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/{resourceType}',
        handler(request, reply) {
            const resourceType = request.params.resourceType;

            getListOf(resourceType, (err, resources) => {
                if (err) {
                    reply(err);
                } else {
                    reply({
                        [resourceType]: resources,
                        resourceType
                    });
                }
            });
        }
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
