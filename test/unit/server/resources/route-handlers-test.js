import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as resourcesController from '../../../../src/server/resources/controller';
import * as handlers from '../../../../src/server/resources/route-handlers';

suite('route handlers', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.sandbox.create();
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('single resource', () => {
    const params = {resourceType: any.string(), id: any.integer()};

    setup(() => {
      sandbox.stub(resourcesController, 'getResource');
    });

    test('that the resource is eventually returned', () => {
      const resource = any.simpleObject();
      const reply = sinon.spy();
      resourcesController.getResource.withArgs(params.resourceType, params.id).resolves(resource);

      return handlers.getResourceHandler({params}, reply).then(() => {
        assert.calledWith(reply, {resource});
      });
    });

    test('that errors are eventually handled', () => {
      const error = any.simpleObject();
      const reply = sinon.spy();
      resourcesController.getResource.rejects(error);

      return handlers.getResourceHandler({params}, reply).then(assert.fail).catch(() => {
        assert.calledWith(reply, error);
      });
    });
  });

  suite('list', () => {
    const params = {resourceType: any.string()};

    setup(() => {
      sandbox.stub(resourcesController, 'getListOf');
    });

    test('that the resource is eventually returned', () => {
      const resources = any.listOf(any.simpleObject);
      const reply = sinon.spy();
      resourcesController.getListOf.withArgs(params.resourceType).resolves(resources);

      return handlers.getResourcesHandler({params}, reply).then(() => {
        assert.calledWith(reply, {[params.resourceType]: resources, resourceType: params.resourceType});
      });
    });

    test('that errors are eventually handled', () => {
      const error = any.simpleObject();
      const reply = sinon.spy();
      resourcesController.getListOf.rejects(error);

      return handlers.getResourcesHandler({params}, reply).then(assert.fail).catch(() => {
        assert.calledWith(reply, error);
      });
    });
  });
});
