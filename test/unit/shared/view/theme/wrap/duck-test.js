import {fromJS, Map} from 'immutable';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';
import reducer, {
  LOAD_NAV,
  NAV_LOADED,
  NAV_LOAD_FAILED,
  loadNav
} from '../../../../../../lib/shared/views/theme/wrap/duck';

suite('site-level duck', () => {
  suite('reducer', () => {
    test('that state is returned directly without known action', () => {
      const initialState = any.simpleObject();

      assert.equal(reducer(initialState, {}), initialState);
    });

    test('that a default initial state is provided', () => {
      assert.equal(reducer(undefined, {}), fromJS({nav: []}));
    });

    test('that LOAD_NAV marks as loading and clears a previous person', () => {
      assert.equal(reducer(Map(), {type: LOAD_NAV}), fromJS({loading: true, loaded: false, nav: []}));
    });

    test('that NAV_LOADED marks as loaded', () => {
      const resource = any.simpleObject();
      assert.equal(reducer(Map(), {type: NAV_LOADED, resource}), fromJS({
        loading: false,
        loaded: true,
        nav: resource
      }));
    });

    test('that NAV_LOAD_FAILED marks as loaded', () => {
      const error = any.simpleObject();
      assert.equal(reducer(Map(), {type: NAV_LOAD_FAILED, error}), fromJS({loading: false, error}));
    });
  });

  suite('action creators', () => {
    const resource = any.simpleObject();
    let getNav;

    setup(() => {
      getNav = sinon.stub().returns(resource);
    });

    test('that loadNav defines handlers for fetching the primary-nav', () => {
      const fetcher = {getNav};

      const action = loadNav(fromJS({wrap: {loaded: false}}));

      assert.containSubset(action, {
        initiate: LOAD_NAV,
        success: NAV_LOADED,
        failure: NAV_LOAD_FAILED
      });

      assert.equal(action.fetch(fetcher), resource);
    });

    test('that a no-op action is returned if the nav is already loaded', () => {
      const action = loadNav(fromJS({wrap: {loaded: true}}));

      assert.equal(action.type, 'NO_OP');
    });
  });
});
