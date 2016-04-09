import Negotiator from 'negotiator';
import {createStore} from 'redux';
import immutable from 'immutable';
import _ from 'lodash';

import {listResourceTypes} from '../resources/controller';
import routeRenderer from './route-renderer.jsx';
import reducer from '../../shared/store/reducer';

function setActiveStateFor(types, activeType) {
    return _.map(types, (type) => {
        return _.extend({}, type, {active: type.text === activeType});
    });
}

exports.register = function configureHandlerFor(server, options, next) {
    server.ext('onPreResponse', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            const store = createStore(reducer, immutable.fromJS(request.response.source));

            listResourceTypes((err, types) => {
                if (err) {
                    reply(err);
                } else {
                    store.dispatch({
                        type: 'SET_PRIMARY_NAV',
                        nav: setActiveStateFor(types, request.params.resourceType)
                    });

                    routeRenderer.routeTo(request.url, store, (error, renderedContent) => {
                        reply.view(
                            'layout/layout',
                            {
                                renderedContent,
                                initialState: JSON.stringify(store.getState())
                            }
                        );
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
