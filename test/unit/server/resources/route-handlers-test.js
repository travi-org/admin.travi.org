import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import * as resourcesController from '../../../../src/server/resources/controller';
import {getResourceHandler, getResourcesHandler} from '../../../../src/server/resources/route-handlers';

suite('route handlers', () => {
  let sandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

  suite('single resource', () => {
    const params = {resourceType: any.string(), id: any.integer()};

    setup(() => {
      sandbox.stub(resourcesController, 'getResource');
    });

    test('that the resource is eventually returned', async () => {
      const expectedResource = any.simpleObject();
      resourcesController.getResource.withArgs(params.resourceType, params.id).resolves(expectedResource);

      const {resource} = await getResourceHandler({params});

      assert.equal(resource, expectedResource);
    });

    test('that errors are eventually handled', () => {
      const error = any.simpleObject();
      resourcesController.getResource.rejects(error);

      return assert.isRejected(getResourceHandler({params}), error);
    });
  });

  suite('list', () => {
    const params = {resourceType: any.string()};

    setup(() => {
      sandbox.stub(resourcesController, 'getListOf');
    });

    test('that the resource is eventually returned', async () => {
      const resources = any.listOf(any.simpleObject);
      resourcesController.getListOf.withArgs(params.resourceType).resolves(resources);

      const response = await getResourcesHandler({params});

      assert.equal(response[params.resourceType], resources);
      assert.equal(response.resourceType, params.resourceType);
    });

    test('that errors are eventually handled', () => {
      const error = any.simpleObject();
      resourcesController.getListOf.rejects(error);

      return assert.isRejected(getResourcesHandler({params}), error);
    });
  });
});
