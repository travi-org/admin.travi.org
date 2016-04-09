import {Map} from 'immutable';
import {setPrimaryNav, setResources, setResource} from './actions';

export default function reducer(state = Map(), action) {
    switch (action.type) {
    case 'SET_PRIMARY_NAV':
        return setPrimaryNav(state, action.nav);
    case 'SET_RESOURCE':
        return setResource(state, action.resource);
    case 'SET_RESOURCES':
        return setResources(state, action.resourceType, action.resources);
    }

    return state;
}
