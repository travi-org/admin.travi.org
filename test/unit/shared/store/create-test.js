/*global window */
import * as redux from 'redux';
import {fromJS} from 'immutable';
import {simpleObject} from '@travi/any';
import reducer from '../../../../lib/shared/store/reducer';
import person from '../../../../lib/shared/views/resources/persons/individual/duck';
import configureStore from '../../../../lib/shared/store/create';
import * as reduxImmutable from 'redux-immutable';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';

suite('store creation for production', () => {
    let sandbox;
    const
        initialState = simpleObject(),
        store = simpleObject(),
        combinedReducer = any.simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(reduxImmutable, 'combineReducers').withArgs({legacy: reducer, person}).returns(combinedReducer);
        sandbox.stub(redux, 'createStore').withArgs(combinedReducer, fromJS(initialState)).returns(store);
    });

    teardown(() => {
        sandbox.restore();

        if (window.devToolsExtension) {
            delete window.devToolsExtension;
        }
    });

    test('that redux store is created from provided initial state', () => {
        assert.equal(configureStore(initialState), store);
    });

    test('that devtools browser extension is initialized if present', () => {
        const
            enhancer = simpleObject();
        window.devToolsExtension = sinon.stub().returns(enhancer);

        configureStore(initialState);

        assert.equal(configureStore(initialState), store);
    });
});
