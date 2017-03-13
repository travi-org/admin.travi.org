import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import reducer, {
  loadResources,
  LOAD_RESOURCES,
  RESOURCES_LOAD_FAILED,
  RESOURCES_LOADED
} from '../../../../../../src/shared/views/resources/list/duck';

suite('resource duck', () => {
  suite('reducer', () => {
    test('that state is returned directly without known action', () => {
      const initialState = any.simpleObject();

      assert.equal(reducer(initialState, {}), initialState);
    });

    test('that a default initial state is provided', () => {
      assert.equal(reducer(undefined, {}), fromJS({list: []}));
    });

    test('that LOAD_RESOURCES marks as loading and clears a previous resource', () => {
      const resourceType = any.string();
      assert.equal(reducer(Map(), {type: LOAD_RESOURCES, resourceType}), fromJS({
        loading: true,
        loaded: false,
        list: [],
        type: resourceType
      }));
    });

    test('that RESOURCES_LOADED marks as loaded', () => {
      const resource = any.simpleObject();
      assert.equal(reducer(Map(), {type: RESOURCES_LOADED, resource}), fromJS({
        loading: false,
        loaded: true,
        list: resource
      }));
    });

    test('that RESOURCES_LOAD_FAILED marks as loaded', () => {
      const error = any.simpleObject();
      assert.equal(reducer(Map(), {type: RESOURCES_LOAD_FAILED, error}), fromJS({
        loading: false,
        error
      }));
    });
  });

  suite('action creators', () => {
    test('that loadPerson defines handlers for fetching data for a resource', () => {
      const resource = any.simpleObject();
      const getResources = sinon.stub();
      const fetcher = {getResources};
      const type = any.string();
      getResources.withArgs(type).returns(resource);

      assert.containSubset(loadResources(type), {
        data: {resourceType: type},
        initiate: LOAD_RESOURCES,
        success: RESOURCES_LOADED,
        failure: RESOURCES_LOAD_FAILED
      });

      assert.equal(loadResources(type).fetch(fetcher), resource);
    });
  });
});
