import Negotiator from 'negotiator';
import {configureStore} from '../../shared/store/create';
import helmet from 'react-helmet';

import {listResourceTypes} from '../resources/controller';
import {routeTo} from './route-renderer';
import {getAssets} from './asset-manager';

function setActiveStateFor(types, activeType) {
    return types.map((type) => {
        return Object.assign({}, type, {active: type.text === activeType});
    });
}

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

            listResourceTypes()
                .then((types) => {
                    store.dispatch({
                        type: 'SET_PRIMARY_NAV',
                        nav: setActiveStateFor(types, request.params.resourceType)
                    });

                    routeTo(request.url, store, (error, renderedContent) => {
                        if (error) {
                            reply(error);
                            reject(error);
                        } else {
                            respond(reply, renderedContent, store);
                            resolve();
                        }
                    });
                })
                .catch((err) => {
                    reply(err);
                    reject(err);
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
