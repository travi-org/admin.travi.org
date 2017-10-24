import React from 'react';
import {renderToString} from 'react-dom/server';
import Negotiator from 'negotiator';
import {INTERNAL_SERVER_ERROR} from 'http-status-codes';
import Root from '../../shared/views/root/root';
import {configureStore} from '../../shared/store/create';
import ErrorPage from '../../shared/views/errors/page';
import {loadNav} from '../../shared/views/theme/wrap/duck';
import respond from './html-renderer';

function renderContent(store, statusCode) {
  return renderToString(<Root store={store}><ErrorPage statusCode={statusCode} /></Root>);
}

export function handler(request, reply) {
  const {response} = request;
  const negotiator = new Negotiator(request);

  if (response.isBoom && 'text/html' === negotiator.mediaType()) {
    const store = configureStore({});

    request.log(['error', response.output.statusCode], response);

    return store.dispatch(loadNav(store.getState()))
      .then(() => {
        respond(reply, {
          renderedContent: renderContent(store, response.output.statusCode),
          store,
          status: response.output.statusCode,
          boomDetails: {statusCode: response.output.statusCode}
        });
      })
      .catch(e => {
        request.log(['error', INTERNAL_SERVER_ERROR], e);
        respond(reply, {
          renderedContent: renderContent(store, INTERNAL_SERVER_ERROR),
          store,
          status: INTERNAL_SERVER_ERROR,
          boomDetails: {statusCode: INTERNAL_SERVER_ERROR}
        });
        return Promise.reject(e);
      });
  }

  return reply.continue();
}

export function register(server, options, next) {
  server.ext('onPreResponse', handler);

  next();
}

register.attributes = {
  name: 'error-renderer'
};
