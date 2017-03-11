import * as reactRouter from 'react-router';
import sinon from 'sinon';
import redial from 'redial';
import {assert} from 'chai';
import any from '@travi/any';
import addHistoryListener from '../../../src/client/history-listener';
import * as routes from '../../../src/shared/routes';

suite('history listener', () => {
  let sandbox;
  const location = any.simpleObject();
  const routesConfig = any.simpleObject();
  const components = any.simpleObject();
  const params = any.simpleObject();

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(redial, 'trigger');
    sandbox.stub(reactRouter.browserHistory, 'listen').yields(location);
    sandbox.stub(reactRouter, 'match')
      .withArgs({location, routes: routesConfig})
      .yields(null, null, {components, params});
    sandbox.stub(routes, 'getRoutes').returns(routesConfig);
  });

  teardown(() => sandbox.restore());

  test('that fetch is triggered for redial when the route changes', () => {
    const dispatch = any.simpleObject();
    const state = any.simpleObject();

    addHistoryListener({dispatch, getState: () => state});

    assert.calledWith(redial.trigger, 'fetch', components, {dispatch, params, state});
  });
});
