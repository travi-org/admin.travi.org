/*global window */
import * as redux from 'redux';
import {fromJS} from 'immutable';
import any, {simpleObject} from '@travi/any';
import {configureStore} from '../../../../lib/shared/store/create';
import fetchMiddleware from '../../../../lib/shared/store/fetch-middleware';
import * as reducers from '../../../../lib/shared/store/reducers';
import sinon from 'sinon';
import {assert} from 'chai';

suite('store creation for production', () => {
    let sandbox;
    const
        initialState = simpleObject(),
        store = simpleObject(),
        appliedFetch = simpleObject(),
        composed = simpleObject(),
        combinedReducer = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reducers, 'getCombined').returns(combinedReducer);
        sandbox.stub(redux, 'createStore').withArgs(combinedReducer, fromJS(initialState), composed).returns(store);
        sandbox.stub(redux, 'compose');
        sandbox.stub(redux, 'applyMiddleware').withArgs(fetchMiddleware).returns(appliedFetch);
    });

    teardown(() => {
        sandbox.restore();

        if (window.devToolsExtension) {
            delete window.devToolsExtension;
        }
    });

    test('that redux store is created from provided initial state', () => {
        redux.compose.withArgs(appliedFetch).returns(composed);

        assert.equal(configureStore(initialState), store);
    });

    test('that devtools browser extension is initialized if present', () => {
        const enhancer = simpleObject();
        window.devToolsExtension = sinon.stub().returns(enhancer);
        redux.compose.withArgs(appliedFetch, enhancer).returns(composed);
        redux.createStore.withArgs(combinedReducer, fromJS(initialState)).returns(store);

        configureStore(initialState);

        assert.equal(configureStore(initialState), store);
    });
});
