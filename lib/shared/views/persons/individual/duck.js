import {fromJS} from 'immutable';

export const
    PERSON_LOADED = 'PERSON_LOADED',
    PERSON_LOAD_FAILED = 'PERSON_LOAD_FAILED',
    LOAD_PERSON = 'LOAD_PERSON';

export default function reducer(state = fromJS({person: {}}), action) {
    switch (action.type) {
    case LOAD_PERSON:
        return state.merge({loading: true, loaded: false, person: {}});
    case PERSON_LOADED:
        return state.merge({loading: false, loaded: true, person: action.resource});
    case PERSON_LOAD_FAILED:
        return state.merge({loading: false, error: action.error});
    default:
        return state;
    }
}

export function loadPerson(id) {
    return {
        fetch: (client) => client.getResource('persons', id),
        initiate: LOAD_PERSON,
        success: PERSON_LOADED,
        failure: PERSON_LOAD_FAILED
    };
}
