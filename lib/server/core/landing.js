import {listResourceTypes} from '../resources/controller';

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler(request, reply) {
            listResourceTypes((err, types) => {
                if (err) {
                    reply(err);
                } else {
                    reply({
                        primaryNav: types
                    });
                }
            });
        }
    });

    next();
};

exports.register.attributes = {
    name: 'landing'
};
