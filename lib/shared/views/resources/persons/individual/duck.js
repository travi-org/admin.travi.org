import {fromJS} from 'immutable';

export default function reducer(state = fromJS({person: {}}), action) {
    switch (action.type) {
        case 'LOAD_PERSON':
            return state.merge({loading: true, person: {}});
        case 'PERSON_LOADED':
            return state.merge({loading: false, loaded: true, person: action.resource});
        case 'PERSON_LOAD_FAILED':
            return state.merge({loading: false, loaded: true, error: action.error});
        default: return state;
    }
}