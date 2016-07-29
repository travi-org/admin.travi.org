/*global window */
import * as redux from 'redux';
import {fromJS} from 'immutable';
import {simpleObject} from '@travi/any';
import reducer from '../../../../lib/shared/store/reducer';
import person from '../../../../lib/shared/views/resources/persons/individual/duck';
import {configureStore} from '../../../../lib/shared/store/create';
import fetchMiddleware from '../../../../lib/shared/store/fetch-middleware';
import * as reduxImmutable from 'redux-immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

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
        sandbox.stub(reduxImmutable, 'combineReducers').withArgs({legacy: reducer, person}).returns(combinedReducer);
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
