'use strict';

const
    immutable = require('immutable'),
    reducer = require('../../../../lib/shared/store/reducer'),
    actions = require('../../../../lib/shared/store/actions'),
    any = require('../../../helpers/any'),
    assert = require('chai').assert;

suite('reducer', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(actions, 'setPrimaryNav');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that state is returned directly without known action', () => {
        const initialState = any.simpleObject();

        assert.equal(reducer(initialState, {}), initialState);
    });

    test('that a default initial state is provided', () => {
        assert.equal(reducer(undefined, {}), immutable.Map());
    });

    test('that the setPrimaryNav function is called for the SET_PRIMARY_NAV action', () => {
        const updatedState = any.simpleObject();
        actions.setPrimaryNav.returns(updatedState);

        assert.equal(
            reducer(immutable.Map(), {
                type: 'SET_PRIMARY_NAV',
                nav: any.simpleObject()
            }),
            updatedState
        );
    });
});
