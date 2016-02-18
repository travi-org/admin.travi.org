'use strict';

const immutable = require('immutable');

function setPrimaryNav(state, nav) {
    return state.set('primaryNav', immutable.fromJS(nav));
}

function setResources(state, type, resources) {
    return state.merge({
        resourceType: type,
        [type]: immutable.fromJS(resources)
    });
}

module.exports = {
    setPrimaryNav,
    setResources
};
