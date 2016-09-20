/*global window */
import ga from 'react-ga';
import * as storeCreator from '../../../lib/shared/store/create';
import * as dependencies from '../../../lib/client/dependencies';
import * as historyListener from '../../../lib/client/history-listener';
import * as renderer from '../../../lib/client/renderer';
import * as any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';

suite('client-side app', () => {
    let sandbox;
    const
        initialState = any.simpleObject(),
        store = {...any.simpleObject(), dispatch: () => undefined};

    function simulatePageLoad() {
        require('../../../lib/client/app');
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dependencies, 'configure');
        sandbox.stub(storeCreator, 'configureStore').withArgs(initialState).returns(store);
        sandbox.stub(historyListener, 'addHistoryListener');
        sandbox.stub(renderer, 'remountContent');
        sandbox.stub(ga, 'initialize');

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
    });

    teardown(() => {
        sandbox.restore();
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        simulatePageLoad();

        assert.calledWith(renderer.remountContent, store);
        assert.calledOnce(dependencies.configure);
        assert.calledWith(historyListener.addHistoryListener, store);
        assert.calledWith(ga.initialize, 'UA-2890413-9');
    });
});
