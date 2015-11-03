'use strict';

var resourcesController = require('../../lib/resourcesController'),
    traviApiResources = require('../../lib/traviApiResources.js'),
    resourceMapperFactory = require('../../lib/resourceMapperFactory'),

    any = require('../helpers/any-for-admin');

require('setup-referee-sinon/globals');

suite('resources controller', function () {
    setup(function () {
        sinon.stub(traviApiResources, 'getListOf');
        sinon.stub(traviApiResources, 'getResourceBy');
        sinon.stub(resourceMapperFactory, 'getMapperFor');
    });

    teardown(function () {
        traviApiResources.getListOf.restore();
        traviApiResources.getResourceBy.restore();
        resourceMapperFactory.getMapperFor.restore();
    });

    test('that resources are requested from the api by type', function () {
        var callback = sinon.spy(),
            resourceType = any.string(),
            resourceList = any.listOf(any.resource),
            mappedList = [
                'foo',
                'bar'
            ];
        traviApiResources.getListOf.withArgs(resourceType).yields(null, resourceList);
        resourceMapperFactory.getMapperFor.withArgs(resourceType).returns({
            mapToViewList: sinon.stub().withArgs(resourceList).returns(mappedList)
        });

        resourcesController.getListOf(resourceType, callback);

        assert.calledWith(callback, null, mappedList);
    });

    test('that resource is requested from the api', function () {
        var resourceType = any.string(),
            resourceId = any.string(),
            callback = sinon.spy(),
            resource = any.resource(),
            mappedResource = {foo: 'bar'};
        traviApiResources.getResourceBy.withArgs(resourceType, resourceId).yields(null, resource);
        resourceMapperFactory.getMapperFor.withArgs(resourceType).returns({
            mapToView: sinon.stub().withArgs(resource).returns(mappedResource)
        });

        resourcesController.getResource(resourceType, resourceId, callback);

        assert.calledWith(callback, null, mappedResource);
    });
});
