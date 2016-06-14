import traviApiResources from '../../../../lib/server/resources/travi-api-resources.js';
import traverson from 'traverson';
import {url, string, integer, resource, listOf, simpleObject} from '../../../helpers/any-for-admin';
import sinon from 'sinon';
import {assert} from 'chai';

suite('travi-api resource interactions', () => {
    let stubForGet;

    setup(() => {
        stubForGet = sinon.stub();
        sinon.stub(traverson, 'from');
    });

    teardown(() => {
        traverson.from.restore();
    });

    test('that links are requested from the api catalog', () => {
        const
            callback = sinon.spy(),
            links = {
                'self': url(),
                'foo': url()
            };
        traverson.from.withArgs('https://api.travi.org/').returns({
            getResource: stubForGet
        });
        stubForGet.yields(null, { '_links': links });

        traviApiResources.getLinksFor('catalog', callback);

        assert.calledWith(callback, null, links);
    });

    test('that list of resources requested by following link from api catalog', () => {
        const
            resourceType = string(),
            resources = listOf(resource),
            responseFromApi = {
                _embedded: {}
            },
            callback = sinon.spy();
        /*eslint-disable no-underscore-dangle */
        responseFromApi._embedded[resourceType] = resources;
        /*eslint-enable no-underscore-dangle */
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(null, responseFromApi)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, null, resources);
    });

    test('that error bubbles from resources request', () => {
        const
            resourceType = string(),
            error = simpleObject(),
            callback = sinon.spy();
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(error)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, error);
    });

    test('that a single resource is mapped to a list', () => {
        const
            resourceType = string(),
            responseFromApi = {
                _embedded: {}
            },
            resourceInstance = resource(),
            callback = sinon.spy();
        /*eslint-disable no-underscore-dangle */
        responseFromApi._embedded[resourceType] = resourceInstance;
        /*eslint-enable no-underscore-dangle */
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(null, responseFromApi)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, null, [resourceInstance]);
    });

    test('that specific resource requested by following links', () => {
        const
            resourceType = string(),
            resourceId = integer(),
            resourceInstance = resource(),
            callback = sinon.spy();
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType, `${resourceType}[id:${resourceId}]`).returns({
                getResource: stubForGet.yields(null, resourceInstance)
            })
        });

        traviApiResources.getResourceBy(resourceType, resourceId, callback);

        assert.calledWith(callback, null, resourceInstance);
    });

    test('that error bubbles from embedded resource request', () => {
        const
            resourceType = string(),
            resourceId = integer(),
            callback = sinon.spy(),
            error = simpleObject();
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType, `${resourceType}[id:${resourceId}]`).returns({
                getResource: stubForGet.yields(error)
            })
        });

        traviApiResources.getResourceBy(resourceType, resourceId, callback);

        assert.calledWith(callback, error);
    });
});
