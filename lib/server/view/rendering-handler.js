import Negotiator from 'negotiator';
import {configureStore} from '../../shared/store/create';
import helmet from 'react-helmet';
import {routeTo} from './route-renderer';
import {getAssets} from './asset-manager';

function respond(reply, renderedContent, store) {
    getAssets((err, assets) => {
        reply.view('layout/layout', {
            renderedContent,
            initialState: JSON.stringify(store.getState()),
            title: helmet.rewind().title.toString(),
            resources: assets
        });
    });
}

export function handleRendering(request, reply) {
    const negotiator = new Negotiator(request);

    return new Promise((resolve, reject) => {
        if ('text/html' === negotiator.mediaType()) {
            const store = configureStore();

            routeTo(request.url, store, (error, renderedContent) => {
                if (error) {
                    reply(error);
                    reject(error);
                } else {
                    respond(reply, renderedContent, store);
                    resolve();
                }
            });
        } else {
            reply.continue();
            resolve();
        }
    });
}

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', handleRendering);

    next();
};

exports.register.attributes = {
    name: 'rendering-handler'
};
