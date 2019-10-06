/* eslint no-underscore-dangle: ["error", { "allow": ["__INITIAL_STATE__"] }] */
import ga from 'react-ga';
import * as any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import * as storeCreator from '../../../src/shared/store/create';
import * as dependencies from '../../../src/client/dependencies';
import * as historyListener from '../../../src/client/history-listener';
import * as renderer from '../../../src/client/renderer';

suite('client-side app', () => {
  let sandbox;
  const initialState = any.simpleObject();
  const store = {...any.simpleObject(), dispatch: () => undefined};

  function simulatePageLoad() {
    require('../../../src/client/app');
  }

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(dependencies, 'default');
    sandbox.stub(storeCreator, 'configureStore').withArgs({initialState}).returns(store);
    sandbox.stub(historyListener, 'default');
    sandbox.stub(renderer, 'default');
    sandbox.stub(ga, 'initialize');

    window.__INITIAL_STATE__ = initialState;
  });

  teardown(() => {
    sandbox.restore();
    window.__INITIAL_STATE__ = null;
  });

  test('that the app renders', () => {
    simulatePageLoad();

    assert.calledWith(renderer.default, store);
    assert.calledOnce(dependencies.default);
    assert.calledWith(historyListener.default, store);
    assert.calledWith(ga.initialize, 'UA-2890413-9');
  });
});
