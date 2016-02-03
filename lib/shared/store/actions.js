'use strict';

const immutable = require('immutable');

function setPrimaryNav(state, nav) {
    return state.set('primaryNav', immutable.fromJS(nav));
}

module.exports = {
    setPrimaryNav
};
