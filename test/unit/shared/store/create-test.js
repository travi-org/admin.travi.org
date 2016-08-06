import * as redux from 'redux';
import {fromJS} from 'immutable';
import any, {simpleObject} from '@travi/any';
import {configureStore} from '../../../../lib/shared/store/create';
import * as reducers from '../../../../lib/shared/store/reducers';
import * as middlewares from '../../../../lib/shared/store/middlewares';
import sinon from 'sinon';
import {assert} from 'chai';

suite('store creation for production', () => {
    let sandbox;
    const
        initialState = simpleObject(),
        store = simpleObject(),
        composed = simpleObject(),
        combinedReducer = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reducers, 'getCombined').returns(combinedReducer);
        sandbox.stub(middlewares, 'getComposed').returns(composed);
        sandbox.stub(redux, 'createStore').withArgs(combinedReducer, fromJS(initialState), composed).returns(store);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux store is created from provided initial state', () => {
        assert.equal(configureStore(initialState), store);
    });

    test('that devtools browser extension is initialized if present', () => {
        redux.createStore.withArgs(combinedReducer, fromJS(initialState)).returns(store);

        configureStore(initialState);

        assert.equal(configureStore(initialState), store);
    });
});
