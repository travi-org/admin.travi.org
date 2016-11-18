/*global window */
import {applyMiddleware, compose} from 'redux';
import fetchMiddleware from '@travi/redux-fetch-middleware';

function devTools() {
    if ('undefined' !== typeof window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return undefined;
}

export function getComposed() {
    return compose(...[applyMiddleware(fetchMiddleware), devTools()].filter((middleware) => !!middleware));
}
