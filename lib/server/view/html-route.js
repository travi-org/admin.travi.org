import {routeTo} from './route-renderer';
import {configureStore} from '../../shared/store/create';
import {respond} from './html-renderer';
import Boom from 'boom';

function handler(request, reply) {
    const
        store = configureStore(),
        path = request.params.path;

    routeTo(path ? `/${path}` : '/', store, (err, renderedContent) => {
        if (err) {
            reply(Boom.wrap(err));
        } else {
            respond(reply, {renderedContent, store});
        }
    });
}

function register(server, options, next) {
    server.route({
        method: 'GET',
        path: '/html/mime/type/hack/{path*}',
        handler
    });

    next();
}

register.attributes = {
    name: 'html-route'
};

export {register, handler};
