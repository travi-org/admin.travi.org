'use strict';

const
    immutable = require('immutable'),
    actions = require('./actions');

module.exports = function reducer(state, action) {
    state = state || immutable.Map();

    switch (action.type) {
    case 'SET_PRIMARY_NAV':
        return actions.setPrimaryNav(state, action.nav);
    }

    return state;
};
