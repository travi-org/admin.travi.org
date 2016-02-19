'use strict';

const immutable = require('immutable');

function setPrimaryNav(state, nav) {
    return state.set('primaryNav', immutable.fromJS(nav));
}

function setResource(state, resource) {
    return state.set('resource', immutable.fromJS(resource));
}

function setResources(state, type, resources) {
    return state.merge({
        resourceType: type,
        [type]: immutable.fromJS(resources)
    });
}

module.exports = {
    setPrimaryNav,
    setResource,
    setResources
};
