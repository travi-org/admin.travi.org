/* global window */
import {applyMiddleware, compose} from 'redux';
import fetchMiddlewareFactory from '@travi/redux-fetch-middleware';

function devTools() {
  if ('undefined' !== typeof window && window.devToolsExtension) {
    return window.devToolsExtension();
  }

  return undefined;
}

export function getComposed(session) {
  return compose(
    ...[applyMiddleware(fetchMiddlewareFactory(session)), devTools()].filter(middleware => !!middleware)
  );
}
