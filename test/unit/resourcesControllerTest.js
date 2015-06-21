'use strict';

var resourcesController = require('../../lib/resourcesController'),
    traviApiResources = require('../../lib/traviApiResources.js'),
    resourceMapperFactory = require('../../lib/resourceMapperFactory'),

    any = require('../helpers/any-for-admin');

require('setup-referee-sinon/globals');

suite('resources controller', function () {
    setup(function () {
        sinon.stub(traviApiResources, 'getListOf');
        sinon.stub(resourceMapperFactory, 'getMapperFor');
    });

    teardown(function () {
        traviApiResources.getListOf.restore();
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
});
