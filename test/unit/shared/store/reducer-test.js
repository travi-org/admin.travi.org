'use strict';

const
    immutable = require('immutable'),
    reducer = require('../../../../lib/shared/store/reducer'),
    actions = require('../../../../lib/shared/store/actions'),
    any = require('../../../helpers/any'),
    assert = require('chai').assert,
    sinon = require('sinon');

suite('reducer', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(actions, 'setPrimaryNav');
        sandbox.stub(actions, 'setResource');
        sandbox.stub(actions, 'setResources');
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
        const
            initialState = immutable.Map(),
            updatedState = any.simpleObject(),
            action = {
                type: 'SET_PRIMARY_NAV',
                nav: any.simpleObject()
            };
        actions.setPrimaryNav.withArgs(initialState, action.nav).returns(updatedState);

        assert.equal(reducer(initialState, action), updatedState);
    });

    test('that the setResource function is called for the SET_RESOURCE action', () => {
        const
            initialState = immutable.Map(),
            updatedState = any.simpleObject(),
            action = {
                type: 'SET_RESOURCE',
                resource: any.simpleObject()
            };
        actions.setResource.withArgs(initialState, action.resource).returns(updatedState);

        assert.equal(reducer(initialState, action), updatedState);
    });

    test('that the setResources function is called for the SET_RESOURCES action', () => {
        const
            initialState = immutable.Map(),
            updatedState = any.simpleObject(),
            action = {
                type: 'SET_RESOURCES',
                resourceType: any.string(),
                resources: any.listOf(any.simpleObject)
            };
        actions.setResources.withArgs(initialState, action.resourceType, action.resources).returns(updatedState);

        assert.equal(reducer(initialState, action), updatedState);
    });
});
