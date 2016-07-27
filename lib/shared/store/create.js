/*global window */
import {createStore} from 'redux';
import {combineReducers} from 'redux-immutable';
import reducer from './reducer';
import person from '../views/resources/persons/individual/duck';
import {fromJS} from 'immutable';

function devTools() {
    if ('undefined' !== typeof window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return undefined;
}

export function configureStore(initialState) {
    return createStore(combineReducers({legacy: reducer, person}), fromJS(initialState), devTools());
}
