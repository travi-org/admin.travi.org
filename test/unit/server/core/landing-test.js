import {listOf, simpleObject} from '@travi/any';
import sinon from 'sinon';
import {assert} from 'chai';
import {plugin, handler} from '../../../../src/server/core/landing';
import * as resourcesController from '../../../../src/server/resources/controller';

suite('landing config', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(resourcesController, 'listResourceTypes');
  });

  teardown(() => {
    sandbox.restore();
  });

  test('that the plugin is defined', async () => {
    const server = {route: sinon.spy()};

    assert.equal(plugin.name, 'landing');

    await plugin.register(server);

    assert.calledWith(server.route, sinon.match({
      method: 'GET',
      path: '/',
      handler
    }));
  });

  test('that the landing page route is configured', async () => {
    const types = listOf(simpleObject);
    resourcesController.listResourceTypes.resolves(types);

    const {primaryNav} = await handler();

    assert.deepEqual(primaryNav, types);
  });

  test('that error bubbles', () => {
    const error = new Error('cause');
    resourcesController.listResourceTypes.rejects(error);

    return assert.isRejected(handler(), error);
  });
});
