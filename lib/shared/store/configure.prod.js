/*global window */
import {createStore} from 'redux';
import reducer from './reducer';
import {fromJS} from 'immutable';

function devTools() {
    if (window && window.devToolsExtension) {
        return window.devToolsExtension()
    }
}

module.exports = function (initialState) {
    return createStore(reducer, fromJS(initialState), devTools());
};
