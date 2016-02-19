'use strict';

const
    immutable = require('immutable'),
    actions = require('./actions');

module.exports = function reducer(state, action) {
    state = state || immutable.Map();

    switch (action.type) {
    case 'SET_PRIMARY_NAV':
        return actions.setPrimaryNav(state, action.nav);
    case 'SET_RESOURCE':
        return actions.setResource(state, action.resource);
    case 'SET_RESOURCES':
        return actions.setResources(state, action.resourceType, action.resources);
    }

    return state;
};
