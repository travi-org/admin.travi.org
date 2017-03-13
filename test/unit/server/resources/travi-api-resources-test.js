import traverson from 'traverson';
import Boom from 'boom';
import sinon from 'sinon';
import {assert} from 'chai';
import traviApiResources from '../../../../src/server/resources/travi-api-resources';
import {url, string, word, integer, resource, listOf, simpleObject} from '../../../helpers/any-for-admin';

suite('travi-api resource interactions', () => {
  let stubForGet, sandbox, apiTraversal;

  setup(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(traverson, 'from');
    sandbox.stub(Boom, 'notFound');

    stubForGet = sinon.stub();
    apiTraversal = {
      getResource: stubForGet,
      follow: sinon.stub()
    };

    traverson.from.withArgs('https://api.travi.org/').returns({
      withRequestOptions: sinon.stub().returns(apiTraversal)
    });
  });

  teardown(() => sandbox.restore());

  test('that links are requested from the api catalog', () => {
    const callback = sinon.spy();
    const links = {
      self: url(),
      foo: url()
    };
    stubForGet.yields(null, {_links: links});

    traviApiResources.getLinksFor('catalog', callback);

    assert.calledWith(callback, null, links);
  });

  suite('list', () => {
    test('that list of resources requested by following link from api catalog', () => {
      const resourceType = string();
      const resources = listOf(resource);
      const responseFromApi = {
        _embedded: {}
      };
      const callback = sinon.spy();
      responseFromApi._embedded[resourceType] = resources;
      apiTraversal.follow.withArgs(resourceType).returns({
        getResource: stubForGet.yields(null, responseFromApi)
      });

      traviApiResources.getListOf(resourceType, callback);

      assert.calledWith(callback, null, resources);
    });

    test('that error bubbles from resources request', () => {
      const resourceType = string();
      const error = new Error(string());
      const callback = sinon.spy();
      apiTraversal.follow.withArgs(resourceType).returns({getResource: stubForGet.yields(error)});

      traviApiResources.getListOf(resourceType, callback);

      assert.calledWith(callback, error);
    });

    test('that error bubbles as notFound when following chain to non-existent link', () => {
      const resourceType = string();
      const error = new Error(`Could not find a matching link nor an embedded document for ${string}`);
      const wrappedError = simpleObject();
      const callback = sinon.spy();
      Boom.notFound.withArgs(error).returns(wrappedError);
      apiTraversal.follow.withArgs(resourceType).returns({getResource: stubForGet.yields(error)});

      traviApiResources.getListOf(resourceType, callback);

      assert.calledWith(callback, wrappedError);
    });

    test('that a single resource is mapped to a list', () => {
      const resourceType = string();
      const responseFromApi = {_embedded: {}};
      const resourceInstance = resource();
      const callback = sinon.spy();
      responseFromApi._embedded[resourceType] = resourceInstance;
      apiTraversal.follow.withArgs(resourceType).returns({getResource: stubForGet.yields(null, responseFromApi)});

      traviApiResources.getListOf(resourceType, callback);

      assert.calledWith(callback, null, [resourceInstance]);
    });
  });

  suite('single resource', () => {
    const resourceType = string();
    const resourceId = integer();
    const resourceInstance = resource();
    const error = new Error(word());
    const originalError = new Error(`Could not find a matching link nor an embedded document for ${string}`);

    test('that promise is returned when requesting a single resource', () => {
      apiTraversal.follow.withArgs(resourceType, `${resourceType}[id:${resourceId}]`).returns({
        getResource: stubForGet.yields(null, resourceInstance)
      });

      const promise = traviApiResources.getResourceBy(resourceType, resourceId);

      assert.instanceOf(promise, Promise);
      return assert.becomes(promise, resourceInstance);
    });

    test('that promise is rejected for an error when requesting a single resource', () => {
      apiTraversal.follow.withArgs(resourceType, `${resourceType}[id:${resourceId}]`).returns({
        getResource: stubForGet.yields(error)
      });

      const promise = traviApiResources.getResourceBy(resourceType, resourceId);

      assert.instanceOf(promise, Promise);
      return assert.isRejected(promise, error);
    });

    test('that promise is rejected as notFound when following chain to non-existent link', () => {
      apiTraversal.follow.withArgs(resourceType, `${resourceType}[id:${resourceId}]`).returns({
        getResource: stubForGet.yields(originalError)
      });
      Boom.notFound.withArgs(originalError).returns(error);

      const promise = traviApiResources.getResourceBy(resourceType, resourceId);

      assert.instanceOf(promise, Promise);
      return assert.isRejected(promise, error);
    });
  });
});
