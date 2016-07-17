/*global window */
import {createStore} from 'redux';
import reducer from './reducer';
import {fromJS} from 'immutable';

function devTools() {
    if ('undefined' !== typeof window && window.devToolsExtension) {
        return window.devToolsExtension();
    }

    return undefined;
}

module.exports = function (initialState) {
    return createStore(reducer, fromJS(initialState), devTools());
};
