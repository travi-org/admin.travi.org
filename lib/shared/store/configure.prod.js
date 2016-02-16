/*global window */
'use strict';

const
    redux = require('redux'),
    reducer = require('./reducer'),
    Immutable = require('immutable');

module.exports = function (initialState) {
    return redux.createStore(
        reducer,
        Immutable.fromJS(initialState),
        window.devToolsExtension ? window.devToolsExtension() : undefined
    );
};
