import {listResourceTypes} from '../resources/controller';

export async function handler() {
  return {primaryNav: await listResourceTypes()};
}

export const plugin = {
  name: 'landing',
  async register(server) {
    server.route({
      method: 'GET',
      path: '/',
      handler
    });
  }
};
