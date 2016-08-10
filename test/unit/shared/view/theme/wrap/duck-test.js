import reducer, {
    LOAD_NAV,
    NAV_LOADED,
    NAV_LOAD_FAILED
} from '../../../../../../lib/shared/views/theme/wrap/duck';
import {fromJS, Map} from 'immutable';
import {assert} from 'chai';
import any from '@travi/any';

suite('site-level duck', () => {
    suite('reducer', () => {
        test('that state is returned directly without known action', () => {
            const initialState = any.simpleObject();

            assert.equal(reducer(initialState, {}), initialState);
        });

        test('that a default initial state is provided', () => {
            assert.equal(reducer(undefined, {}), fromJS({nav: {}}));
        });

        test('that LOAD_NAV marks as loading and clears a previous person', () => {
            assert.equal(reducer(Map(), {type: LOAD_NAV}), fromJS({loading: true, loaded: false, nav: {}}));
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
});
