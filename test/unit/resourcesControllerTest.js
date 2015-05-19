'use strict';

var resourcesController = require('../../lib/resourcesController'),
    traviApiResources = require('../../lib/traviApiResources.js'),

    any = require('../helpers/any-for-admin');

require('setup-referee-sinon/globals');

suite('resources controller', function () {
    setup(function () {
        sinon.stub(traviApiResources, 'getListOf');
    });

    teardown(function () {
        traviApiResources.getListOf.restore();
    });

    test('that resources are requested from the api by type', function () {
        var callback = sinon.spy(),
            resourceType = any.string(),
            resourceList = any.listOf(any.resource);
        traviApiResources.getListOf.withArgs(resourceType).yields(null, resourceList);

        resourcesController.getListOf(resourceType, callback);

        assert.calledWith(callback, null, resourceList);
    });
});
