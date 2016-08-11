import * as resourcesController from '../../../../lib/server/resources/controller';
import traviApiResources from '../../../../lib/server/resources/travi-api-resources.js';
import * as resourceMapperFactory from '../../../../lib/server/resources/mappers/resource-mapper-factory';

import {string, word, url, simpleObject, listOf, resource} from '../../../helpers/any-for-admin';
import sinon from 'sinon';
import {assert} from 'chai';

suite('resources controller', () => {
    setup(() => {
        sinon.stub(traviApiResources, 'getListOf');
        sinon.stub(traviApiResources, 'getResourceBy');
        sinon.stub(traviApiResources, 'getLinksFor');
        sinon.stub(resourceMapperFactory, 'getMapperFor');
    });

    teardown(() => {
        traviApiResources.getListOf.restore();
        traviApiResources.getResourceBy.restore();
        traviApiResources.getLinksFor.restore();
        resourceMapperFactory.getMapperFor.restore();
    });

    test('that an empty list of resource types is returned when none are available', () => {
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, {
            'self': {'href': 'https://api.travi.org/'}
        });

        return assert.becomes(resourcesController.listResourceTypes(), []);
    });

    test('that link rels are listed when links are present', () => {
        const
            linkName = string(),
            links = {
                'self': {'href': url()},
                [linkName]: {'href': url()},
                'persons': {'href': url()}
            };
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, links);

        return assert.becomes(resourcesController.listResourceTypes(), [
            {text: linkName, path: `/${linkName}`},
            {text: 'people', path: '/persons'}
        ]);
    });

    test('that error bubbles for api request for resource-types', () => {
        const error = simpleObject();
        traviApiResources.getLinksFor.withArgs('catalog').yields(error);

        return assert.isRejected(resourcesController.listResourceTypes(), error);
    });

    test('that resources are requested from the api by type', () => {
        const
            resourceType = string(),
            resourceList = listOf(resource),
            mappedList = [
                'foo',
                'bar'
            ];
        traviApiResources.getListOf.withArgs(resourceType).yields(null, resourceList);
        resourceMapperFactory.getMapperFor.withArgs(resourceType).returns({
            mapToViewList: sinon.stub().withArgs(resourceList).returns(mappedList)
        });

        return assert.becomes(resourcesController.getListOf(resourceType), mappedList);
    });

    test('that error bubbles for api request for resources', () => {
        const
            resourceType = string(),
            error = word();
        traviApiResources.getListOf.withArgs(resourceType).yields(error);

        return assert.isRejected(resourcesController.getListOf(resourceType), new RegExp(error));
    });

    test('that resource is requested from the api', () => {
        const
            resourceType = string(),
            resourceId = string(),
            resourceInstance = resource(),
            mappedResource = {foo: 'bar'};
        traviApiResources.getResourceBy.withArgs(resourceType, resourceId).resolves(resource);
        resourceMapperFactory.getMapperFor.withArgs(resourceType).returns({
            mapToView: sinon.stub().withArgs(resourceInstance).returns(mappedResource)
        });

        return assert.becomes(resourcesController.getResource(resourceType, resourceId), mappedResource);
    });

    test('that error bubbles for api request for resource', () => {
        const
            error = word(),
            resourceType = string(),
            resourceId = string(),
            resourceInstance = resource(),
            mappedResource = {foo: 'bar'};
        traviApiResources.getResourceBy.withArgs(resourceType, resourceId).rejects(error);
        resourceMapperFactory.getMapperFor.withArgs(resourceType).returns({
            mapToView: sinon.stub().withArgs(resourceInstance).returns(mappedResource)
        });

        return assert.isRejected(resourcesController.getResource(resourceType, resourceId), new RegExp(error));
    });
});
