import immutable from 'immutable';
import {applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import fetchMiddlewareFactory from '@travi/redux-fetch-middleware';

export function getComposed(session) {
  const enhancedCompose = composeWithDevTools({serialize: {immutable}});

  return enhancedCompose(applyMiddleware(fetchMiddlewareFactory(session)));
}
