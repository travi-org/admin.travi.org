/*global window */
'use strict';

const
    redux = require('redux'),
    Immutable = require('immutable'),
    any = require('../../../helpers/any'),
    reducer = require('../../../../lib/shared/store/reducer'),
    configureStore = require('../../../../lib/shared/store/configure.prod'),
    sinon = require('sinon'),
    assert = require('chai').assert;

suite('store creation for production', () => {
    let sandbox;
    const
        initialState = any.simpleObject(),
        store = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'createStore');
    });

    teardown(() => {
        sandbox.restore();

        if (window.devToolsExtension) {
            delete window.devToolsExtension;
        }
    });

    test('that redux store is created from provided initial state', () => {
        redux.createStore.withArgs(reducer, Immutable.fromJS(initialState)).returns(store);

        assert.equal(configureStore(initialState), store);
    });

    test('that devtools browser extension is initialized fi present', () => {
        const
            enhancer = any.simpleObject();
        window.devToolsExtension = sinon.stub().returns(enhancer);
        redux.createStore.withArgs(reducer, Immutable.fromJS(initialState), enhancer).returns(store);

        configureStore(initialState);

        assert.equal(configureStore(initialState), store);
    });
});
