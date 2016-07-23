import {Map, fromJS} from 'immutable';
import reducer from '../../../../../../lib/shared/views/resources/persons/individual/duck';
import {assert} from 'chai';
import any from '@travi/any';

suite('person duck', () => {
    suite('reducer', () => {
        test('that state is returned directly without known action', () => {
            const initialState = any.simpleObject();

            assert.equal(reducer(initialState, {}), initialState);
        });

        test('that a default initial state is provided', () => {
            assert.equal(reducer(undefined, {}), fromJS({person: {}}));
        });

        test('that LOAD_PERSON marks as loading and clears a previous person', () => {
            assert.equal(reducer(Map(), {type: 'LOAD_PERSON'}), fromJS({loading: true, person: {}}));
        });

        test('that PERSON_LOADED marks as loaded', () => {
            const resource = any.simpleObject();
            assert.equal(reducer(Map(), {type: 'PERSON_LOADED', resource}), fromJS({
                loading: false,
                loaded: true,
                person: resource
            }));
        });

        test('that PERSON_LOAD_FAILED marks as loaded', () => {
            const error = any.simpleObject();
            assert.equal(reducer(Map(), {type: 'PERSON_LOAD_FAILED', error}), fromJS({
                loading: false,
                loaded: true,
                error
            }));
        });
    });

    suite('action creators', () => {

    });
});
