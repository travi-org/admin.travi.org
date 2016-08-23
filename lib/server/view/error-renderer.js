import React from 'react';
import {renderToString} from 'react-dom/server';
import Negotiator from 'negotiator';
import Root from '../../shared/views/root/root';
import {configureStore} from '../../shared/store/create';
import ErrorPage from '../../shared/views/errors/page';
import {loadNav} from '../../shared/views/theme/wrap/duck';
import {respond} from './html-renderer';

const SERVER_ERROR = 500;

function renderContent(store, statusCode) {
    return renderToString(
        <Root store={store}><ErrorPage statusCode={statusCode}/></Root>
    );
}

export function handler(request, reply) {
    const
        response = request.response,
        negotiator = new Negotiator(request);

    if (response.isBoom && 'text/html' === negotiator.mediaType()) {
        const store = configureStore();

        return store.dispatch(loadNav(store.getState()))
            .then(() => {
                respond(reply, {
                    renderedContent: renderContent(store, response.output.statusCode),
                    store,
                    boomDetails: {statusCode: response.output.statusCode}
                });
            })
            .catch((e) => {
                respond(reply, {
                    renderedContent: renderContent(store, SERVER_ERROR),
                    store,
                    boomDetails: {statusCode: SERVER_ERROR}
                });
                return Promise.reject(e);
            });
    } else {
        return reply.continue();
    }
}

export function register(server, options, next) {
    server.ext('onPreResponse', handler);

    next();
}

register.attributes = {
    name: 'error-renderer'
};
