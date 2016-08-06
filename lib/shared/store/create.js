/*global window */
import {createStore, applyMiddleware, compose} from 'redux';
import fetchMiddleware from './fetch-middleware';
import {getCombined} from './reducers';
import {fromJS} from 'immutable';

function devTools() {
    if ('undefined' !== typeof window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return undefined;
}

export function configureStore(initialState) {
    return createStore(
        getCombined(),
        fromJS(initialState),
        compose(...[
            applyMiddleware(fetchMiddleware),
            devTools()
        ].filter((middleware) => !!middleware))
    );
}
