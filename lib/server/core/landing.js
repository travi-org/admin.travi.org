import {listResourceTypes} from '../resources/controller';

export function handler(request, reply) {
  return listResourceTypes()
    .then(types => reply({primaryNav: types}))
    .catch(err => reply(err));
}

export function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/',
    handler
  });

  next();
}

register.attributes = {
  name: 'landing'
};
