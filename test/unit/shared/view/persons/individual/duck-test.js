import {Map, fromJS} from 'immutable';
import reducer, {
    loadPerson,
    LOAD_PERSON,
    PERSON_LOAD_FAILED,
    PERSON_LOADED
} from '../../../../../../lib/shared/views/resources/persons/individual/duck';
import {assert} from 'chai';
import any from '@travi/any';
import sinon from 'sinon';

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
            assert.equal(reducer(Map(), {type: LOAD_PERSON}), fromJS({loading: true, loaded: false, person: {}}));
        });

        test('that PERSON_LOADED marks as loaded', () => {
            const resource = any.simpleObject();
            assert.equal(reducer(Map(), {type: PERSON_LOADED, resource}), fromJS({
                loading: false,
                loaded: true,
                person: resource
            }));
        });

        test('that PERSON_LOAD_FAILED marks as loaded', () => {
            const error = any.simpleObject();
            assert.equal(reducer(Map(), {type: PERSON_LOAD_FAILED, error}), fromJS({
                loading: false,
                error
            }));
        });
    });

    suite('action creators', () => {
        test('that loadPerson defines handlers for fetching data for a person', () => {
            const
                id = any.integer(),
                resource = any.simpleObject(),
                getResource = sinon.stub(),
                fetcher = {getResource};
            getResource.withArgs('persons', id).returns(resource);

            assert.containSubset(loadPerson(id), {
                initiate: LOAD_PERSON,
                success: PERSON_LOADED,
                failure: PERSON_LOAD_FAILED
            });

            assert.equal(loadPerson(id).fetch(fetcher), resource);
        });
    });
});
