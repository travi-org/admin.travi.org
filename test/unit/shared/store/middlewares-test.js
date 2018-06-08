import immutable from 'immutable';
import * as redux from 'redux';
import * as devTools from 'redux-devtools-extension';
import * as fetchMiddlewareFactory from '@travi/redux-fetch-middleware';
import sinon from 'sinon';
import {assert} from 'chai';
import any from '@travi/any';
import {getComposed} from '../../../../src/shared/store/middlewares';

suite('redux middlewares', () => {
  let sandbox;
  const appliedFetch = any.simpleObject();
  const composed = any.simpleObject();
  const session = any.simpleObject();

  setup(() => {
    const fetchMiddleware = any.simpleObject();

    sandbox = sinon.createSandbox();

    sandbox.stub(devTools, 'composeWithDevTools');
    sandbox.stub(fetchMiddlewareFactory, 'default').withArgs(session).returns(fetchMiddleware);
    sandbox.stub(redux, 'applyMiddleware').withArgs(fetchMiddleware).returns(appliedFetch);
  });

  teardown(() => sandbox.restore());

  test('that the middlewares are composed', () => {
    const enhancedCompose = sinon.stub();
    devTools.composeWithDevTools.withArgs({serialize: {immutable}}).returns(enhancedCompose);
    enhancedCompose.withArgs(appliedFetch).returns(composed);

    assert.equal(getComposed(session), composed);
  });
});
