import {getResourceHandler, getResourcesHandler} from './route-handlers';

export const plugin = {
  name: 'resources-routes',
  async register(server) {
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
  }
};
