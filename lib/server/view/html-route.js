import {routeTo} from './route-renderer';
import {configureStore} from '../../shared/store/create';
import {respond} from './html-renderer';
import Boom from 'boom';

function handler(request, reply) {
    const store = configureStore();

    routeTo(request.raw.req.url, store, (err, renderedContent) => {
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
        path: '/html',
        handler
    });

    next();
}

register.attributes = {
    name: 'html-route'
};

export {register, handler};
