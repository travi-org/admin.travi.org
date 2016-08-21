import helmet from 'react-helmet';
import {getAssets} from './asset-manager';
import {routeTo} from './route-renderer';
import {configureStore} from '../../shared/store/create';
import Boom from 'boom';

function handler(request, reply) {
    const
        store = configureStore(),
        path = request.params.path;

    routeTo(path ? `/${path}` : '/', store, (err, renderedContent) => {
        if (err) {
            reply(Boom.wrap(err));
        } else {
            getAssets((error, resources) => {
                if (error) {
                    reply(Boom.wrap(error));
                } else {
                    reply.view('layout', {
                        renderedContent,
                        resources,
                        title: helmet.rewind().title.toString(),
                        initialState: JSON.stringify(store.getState())
                    });
                }
            });
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
