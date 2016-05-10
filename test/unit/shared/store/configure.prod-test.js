/*global window */
import * as redux from 'redux';
import {fromJS} from 'immutable';
import any from '@travi/any';
import reducer from '../../../../lib/shared/store/reducer';
import configureStore from '../../../../lib/shared/store/configure.prod';
import sinon from 'sinon';
import {assert} from 'chai';

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
        redux.createStore.withArgs(reducer, fromJS(initialState)).returns(store);

        assert.equal(configureStore(initialState), store);
    });

    test('that devtools browser extension is initialized if present', () => {
        const
            enhancer = any.simpleObject();
        window.devToolsExtension = sinon.stub().returns(enhancer);
        redux.createStore.withArgs(reducer, fromJS(initialState), enhancer).returns(store);

        configureStore(initialState);

        assert.equal(configureStore(initialState), store);
    });
});
