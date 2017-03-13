import {fromJS} from 'immutable';

export const RESOURCE_LOADED = 'RESOURCE_LOADED';
export const RESOURCE_LOAD_FAILED = 'RESOURCE_LOAD_FAILED';
export const LOAD_RESOURCE = 'LOAD_RESOURCE';

export default function reducer(state = fromJS({resource: {}}), action) {
  switch (action.type) {
    case LOAD_RESOURCE:
      return state.merge({loading: true, loaded: false, resource: {}});
    case RESOURCE_LOADED:
      return state.merge({loading: false, loaded: true, resource: action.resource});
    case RESOURCE_LOAD_FAILED:
      return state.merge({loading: false, error: action.error});
    default:
      return state;
  }
}

export function loadResource(type, id) {
  return {
    fetch: client => client.getResource(type, id),
    initiate: LOAD_RESOURCE,
    success: RESOURCE_LOADED,
    failure: RESOURCE_LOAD_FAILED
  };
}
