import {Map, fromJS} from 'immutable';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import reducer, {
  loadResource,
  LOAD_RESOURCE,
  RESOURCE_LOAD_FAILED,
  RESOURCE_LOADED
} from '../../../../../../src/shared/views/resources/individual/duck';

suite('resource duck', () => {
  suite('reducer', () => {
    test('that state is returned directly without known action', () => {
      const initialState = any.simpleObject();

      assert.equal(reducer(initialState, {}), initialState);
    });

    test('that a default initial state is provided', () => {
      assert.equal(reducer(undefined, {}), fromJS({resource: {}}));
    });

    test('that LOAD_RESOURCE marks as loading and clears a previous resource', () => {
      assert.equal(reducer(Map(), {type: LOAD_RESOURCE}), fromJS({loading: true, loaded: false, resource: {}}));
    });

    test('that RESOURCE_LOADED marks as loaded', () => {
      const resource = any.simpleObject();
      assert.equal(reducer(Map(), {type: RESOURCE_LOADED, resource}), fromJS({
        loading: false,
        loaded: true,
        resource
      }));
    });

    test('that RESOURCE_LOAD_FAILED marks as loaded', () => {
      const error = any.simpleObject();
      assert.equal(reducer(Map(), {type: RESOURCE_LOAD_FAILED, error}), fromJS({
        loading: false,
        error
      }));
    });
  });

  suite('action creators', () => {
    test('that loadPerson defines handlers for fetching data for a resource', () => {
      const
        id = any.integer(),
        resource = any.simpleObject(),
        getResource = sinon.stub(),
        fetcher = {getResource},
        type = any.string();
      getResource.withArgs(type, id).returns(resource);

      assert.containSubset(loadResource(type, id), {
        initiate: LOAD_RESOURCE,
        success: RESOURCE_LOADED,
        failure: RESOURCE_LOAD_FAILED
      });

      assert.equal(loadResource(type, id).fetch(fetcher), resource);
    });
  });
});
