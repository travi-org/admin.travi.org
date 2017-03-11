import {applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import fetchMiddlewareFactory from '@travi/redux-fetch-middleware';

export function getComposed(session) {
  return composeWithDevTools(applyMiddleware(fetchMiddlewareFactory(session)));
}
