import {fromJS} from 'immutable';

export const NAV_LOADED = 'NAV_LOADED';
export const NAV_LOAD_FAILED = 'NAV_LOAD_FAILED';
export const LOAD_NAV = 'LOAD_NAV';

export default function reducer(state = fromJS({nav: []}), action) {
  switch (action.type) {
    case LOAD_NAV:
      return state.merge({loading: true, loaded: false, nav: []});
    case NAV_LOADED:
      return state.merge({loading: false, loaded: true, nav: action.resource});
    case NAV_LOAD_FAILED:
      return state.merge({loading: false, error: action.error});
    default:
      return state;
  }
}

export function loadNav(state) {
  if (state.getIn(['wrap', 'loaded'])) {
    return {type: 'NO_OP'};
  }

  return {
    fetch: client => client.getNav(),
    initiate: LOAD_NAV,
    success: NAV_LOADED,
    failure: NAV_LOAD_FAILED
  };
}
