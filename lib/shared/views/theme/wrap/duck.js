import {fromJS} from 'immutable';

export const
    NAV_LOADED = 'NAV_LOADED',
    NAV_LOAD_FAILED = 'NAV_LOAD_FAILED',
    LOAD_NAV = 'LOAD_NAV';

export default function reducer(state = fromJS({nav: {}}), action) {
    switch (action.type) {
    case LOAD_NAV:
        return state.merge({loading: true, loaded: false, nav: {}});
    case NAV_LOADED:
        return state.merge({loading: false, loaded: true, nav: action.resource});
    case NAV_LOAD_FAILED:
        return state.merge({loading: false, error: action.error});
    default:
        return state;
    }
}
