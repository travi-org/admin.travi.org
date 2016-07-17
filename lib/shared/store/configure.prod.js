/*global window */
import {createStore} from 'redux';
import reducer from './reducer';
import {fromJS} from 'immutable';

module.exports = function (initialState) {
    return createStore(
        reducer,
        fromJS(initialState),
        (window && window.devToolsExtension) ? window.devToolsExtension() : undefined
    );
};
