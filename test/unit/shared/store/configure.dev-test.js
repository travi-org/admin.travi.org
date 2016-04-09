import proxyquire from 'proxyquire';
import * as redux from 'redux';
import {fromJS} from 'immutable';
import any from '../../../helpers/any';
import reducer from '../../../../lib/shared/store/reducer';
import sinon from 'sinon';
import {assert} from 'chai';

suite('store creation for development', () => {
    let sandbox;
    const
        enhancer = any.simpleObject(),
        DevTools = {
            instrument() {}
        },
        configureStore = proxyquire('../../../../lib/shared/store/configure.dev', {
            '../views/dev/dev-tools.jsx': DevTools
        });

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
            initialState = any.simpleObject(),
            store = any.simpleObject();
        redux.createStore.withArgs(reducer, fromJS(initialState), enhancer).returns(store);

        assert.equal(configureStore(initialState), store);
    });
});
