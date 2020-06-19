import sinon from 'sinon';
import {assert} from 'chai';
import {plugin} from '../../../../src/server/resources/routes';
import * as resourcesController from '../../../../src/server/resources/controller';
import {getResourceHandler, getResourcesHandler} from '../../../../src/server/resources/route-handlers';

suite('server routes config', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(resourcesController, 'getListOf');
    sandbox.stub(resourcesController, 'getResource');
  });

  teardown(() => sandbox.restore());

  test('that the plugin is defined', () => assert.equal(plugin.name, 'resources-routes'));

  test('that the list route is configured', async () => {
    const server = {route: sinon.stub()};

    await plugin.register(server);

    assert.calledWith(server.route, {
      method: 'GET',
      path: '/{resourceType}',
      handler: getResourcesHandler
    });
  });

  test('that the single resource route is configured', async () => {
    const server = {route: sinon.stub()};

    await plugin.register(server);

    assert.calledWith(server.route, {
      method: 'GET',
      path: '/{resourceType}/{id}',
      handler: getResourceHandler
    });
  });
});
