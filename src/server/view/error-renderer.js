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

export async function handler(request, h) {
  const {response} = request;
  const negotiator = new Negotiator(request);

  if (response.isBoom && 'text/html' === negotiator.mediaType()) {
    const store = configureStore({});

    request.log(['error', response.output.statusCode], response);

    try {
      await store.dispatch(loadNav(store.getState()));

      return respond(h, {
        renderedContent: renderContent(store, response.output.statusCode),
        store,
        status: response.output.statusCode,
        boomDetails: {statusCode: response.output.statusCode}
      });
    } catch (err) {
      request.log(['error', INTERNAL_SERVER_ERROR], err);

      return respond(h, {
        renderedContent: renderContent(store, INTERNAL_SERVER_ERROR),
        store,
        status: INTERNAL_SERVER_ERROR,
        boomDetails: {statusCode: INTERNAL_SERVER_ERROR}
      });
    }
  }

  return h.continue;
}

export const plugin = {
  name: 'error-renderer',
  async register(server) {
    server.ext('onPreResponse', handler);
  }
};
