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
        traverson.from.withArgs('http://api.travi.org/').returns({
            getResource: stubForGet
        });
        stubForGet.yields(null, { '_links': links });

        traviApiResources.getLinksFor('catalog', callback);

        assert.calledWith(callback, null, links);
    });

    test('that list of resources requested by following link from api catalog', function () {
        var resourceType = any.string(),
            resources = any.listOf(any.resource),
            responseFromApi = {},
            callback = sinon.spy();
        responseFromApi[resourceType] = resources;
        traverson.from.withArgs('http://api.travi.org/').returns({
            follow: sinon.stub().withArgs(resourceType).returns({
                getResource: stubForGet.yields(null, responseFromApi)
            })
        });

        traviApiResources.getListOf(resourceType, callback);

        assert.calledWith(callback, null, resources);
    });
});
