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

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            const store = configureStore({legacy: request.response.source});

            listResourceTypes((err, types) => {
                if (err) {
                    reply(err);
                } else {
                    store.dispatch({
                        type: 'SET_PRIMARY_NAV',
                        nav: setActiveStateFor(types, request.params.resourceType)
                    });

                    routeTo(request.url, store, (error, renderedContent) => {
                        if (error) {
                            reply(error);
                        } else {
                            respond(reply, renderedContent, store);
                        }
                    });
                }
            });
        } else {
            reply.continue();
        }
    });

    next();
};

exports.register.attributes = {
    name: 'rendering-handler'
};
