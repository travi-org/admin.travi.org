/*global window */
import {createStore, applyMiddleware, compose} from 'redux';
import {combineReducers} from 'redux-immutable';
import fetchMiddleware from './fetch-middleware';
import reducer from './reducer';
import person from '../views/resources/persons/individual/duck';
import resource from '../views/resources/individual/duck';
import {fromJS} from 'immutable';

function devTools() {
    if ('undefined' !== typeof window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return undefined;
}

export function configureStore(initialState) {
    return createStore(
        combineReducers({legacy: reducer, person, resource}),
        fromJS(initialState),
        compose(...[
            applyMiddleware(fetchMiddleware),
            devTools()
        ].filter((middleware) => !!middleware))
    );
}
