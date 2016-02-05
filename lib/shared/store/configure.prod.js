'use strict';

const
    redux = require('redux'),
    reducer = require('./reducer');

module.exports = function (initialState) {
    return redux.createStore(reducer, initialState);
};
