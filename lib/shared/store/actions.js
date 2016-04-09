import {fromJS} from 'immutable';

function setPrimaryNav(state, nav) {
    return state.set('primaryNav', fromJS(nav));
}

function setResource(state, resource) {
    return state.set('resource', fromJS(resource));
}

function setResources(state, type, resources) {
    return state.merge({
        resourceType: type,
        [type]: fromJS(resources)
    });
}

export {
    setPrimaryNav,
    setResource,
    setResources
};
