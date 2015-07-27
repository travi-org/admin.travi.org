'use strict';

var traviApiResources = require('../../lib/traviApiResources.js'),
    traverson = require('traverson'),
    any = require('../helpers/any-for-admin');

require('setup-referee-sinon/globals');

suite('travi-api resource interactions', function () {
    var stubForGet;

    setup(function () {
        stubForGet = sinon.stub();
        sinon.stub(traverson, 'from');
    });

    teardown(function () {
        traverson.from.restore();
    });

    test('that links are requested from the api catalog', function () {
        var callback = sinon.spy(),
            links = {
                'self': any.url(),
                'foo': any.url()
            };
        traverson.from.withArgs('https://api.travi.org/').returns({
            getResource: stubForGet
        });
        stubForGet.yields(null, { '_links': links });

        traviApiResources.getLinksFor('catalog', callback);

        assert.calledWith(callback, null, links);
    });

    test('that list of resources requested by following link from api catalog', function () {
        var resourceType = any.string(),
            resources = any.listOf(any.resource),
            responseFromApi = {
                _embedded: {}
            },
            callback = sinon.spy();
        responseFromApi._embedded[resourceType] = resources;
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(null, responseFromApi)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, null, resources);
    });

    test('that a single resource is mapped to a list', function () {
        var resourceType = any.string(),
            responseFromApi = {
                _embedded: {}
            },
            resource = any.resource(),
            callback = sinon.spy();
        responseFromApi._embedded[resourceType] = resource;
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(null, responseFromApi)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, null, [resource]);
    });

    test('that specific resource requested by following links', function () {
        var resourceType = any.string(),
            resourceId = any.int(),
            resource = any.resource(),
            callback = sinon.spy();
        traverson.from.withArgs('https://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType, resourceType + '[id:' + resourceId + ']').returns({
                getResource: stubForGet.yields(null, resource)
            })
        });

        traviApiResources.getResourceBy(resourceType, resourceId, callback);

        assert.calledWith(callback, null, resource);
    });
});
