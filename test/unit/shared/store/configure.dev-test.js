import * as redux from 'redux';
import {fromJS} from 'immutable';
import {simpleObject} from '@travi/any';
import configureStore from '../../../../lib/shared/store/configure.dev';
import reducer from '../../../../lib/shared/store/reducer';
import DevTools from '../../../../lib/shared/views/dev/dev-tools';
import sinon from 'sinon';
import {assert} from 'chai';

suite('store creation for development', () => {
    let sandbox;
    const enhancer = simpleObject();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(redux, 'createStore');
        sandbox.stub(DevTools, 'instrument').returns(enhancer);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that redux store is created from provided initial state', () => {
        const
            initialState = simpleObject(),
            store = simpleObject();
        redux.createStore.withArgs(reducer, fromJS(initialState), enhancer).returns(store);

        assert.equal(configureStore(initialState), store);
    });
});
