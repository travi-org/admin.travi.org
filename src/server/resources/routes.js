import {getResourceHandler, getResourcesHandler} from './route-handlers';

export function register(server, options, next) {
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
}

register.attributes = {
  name: 'resources-routes'
};
