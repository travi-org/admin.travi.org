import {fromJS} from 'immutable';

export const RESOURCES_LOADED = 'RESOURCES_LOADED';
export const RESOURCES_LOAD_FAILED = 'RESOURCES_LOAD_FAILED';
export const LOAD_RESOURCES = 'LOAD_RESOURCES';

export default function reducer(state = fromJS({list: []}), action) {
  switch (action.type) {
    case LOAD_RESOURCES:
      return state.merge({loading: true, loaded: false, list: [], type: action.resourceType});
    case RESOURCES_LOADED:
      return state.merge({loading: false, loaded: true, list: action.resource});
    case RESOURCES_LOAD_FAILED:
      return state.merge({loading: false, error: action.error});
    default:
      return state;
  }
}

export function loadResources(type) {
  return {
    fetch: client => client.getResources(type),
    data: {resourceType: type},
    initiate: LOAD_RESOURCES,
    success: RESOURCES_LOADED,
    failure: RESOURCES_LOAD_FAILED
  };
}
