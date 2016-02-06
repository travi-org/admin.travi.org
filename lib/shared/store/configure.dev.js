'use strict';

const
    redux = require('redux'),
    reducer = require('./reducer'),
    DevTools = require('../views/dev/DevTools.jsx');

module.exports = function (initialState) {
    return redux.createStore(reducer, initialState, DevTools.instrument());
};

