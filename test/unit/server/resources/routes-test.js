import sinon from 'sinon';
import {assert} from 'chai';
import {register} from '../../../../src/server/resources/routes';
import * as resourcesController from '../../../../src/server/resources/controller';
import {getResourceHandler, getResourcesHandler} from '../../../../src/server/resources/route-handlers';

suite('server routes config', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(resourcesController, 'getListOf');
    sandbox.stub(resourcesController, 'getResource');
  });

  teardown(() => sandbox.restore());

  test('that the plugin is defined', () => {
    assert.deepEqual(register.attributes, {
      name: 'resources-routes'
    });
  });

  test('that the list route is configured', () => {
    const next = sinon.spy();
    const server = {route: sinon.stub()};

    register(server, null, next);

    assert.calledOnce(next);
    assert.calledWith(server.route, {
      method: 'GET',
      path: '/{resourceType}',
      handler: getResourcesHandler
    });
  });


  test('that the single resource route is configured', () => {
    const next = sinon.spy();
    const server = {route: sinon.stub()};

    register(server, null, next);

    assert.calledOnce(next);
    assert.calledWith(server.route, {
      method: 'GET',
      path: '/{resourceType}/{id}',
      handler: getResourceHandler
    });
  });
});
