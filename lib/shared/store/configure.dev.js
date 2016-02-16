'use strict';

const
    redux = require('redux'),
    Immutable = require('immutable'),
    reducer = require('./reducer'),
    DevTools = require('../views/dev/dev-tools.jsx');

module.exports = function (initialState) {
    return redux.createStore(reducer, Immutable.fromJS(initialState), DevTools.instrument());
};
