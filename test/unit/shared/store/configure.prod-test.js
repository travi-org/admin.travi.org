'use strict';

const
    redux = require('redux'),
    any = require('../../../helpers/any'),
    reducer = require('../../../../lib/shared/store/reducer'),
    configureStore = require('../../../../lib/shared/store/configure.prod');

suite('store creation for production', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'createStore');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux store is created from provided initial state', () => {
        const
            initialState = any.simpleObject(),
            store = any.simpleObject();
        redux.createStore.withArgs(reducer, initialState).returns(store);

        assert.equals(configureStore(initialState), store);
    });
});
