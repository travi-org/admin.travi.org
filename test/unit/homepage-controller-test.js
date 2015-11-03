'use strict';

var homepage = require('../../lib/router.js'),
    traviApiResources = require('../../lib/traviApiResources.js'),
    any = require('../helpers/any');

require('setup-referee-sinon/globals');

suite('homepage controller', function () {
    var callback;

    setup(function () {
        sinon.stub(traviApiResources, 'getLinksFor');

        callback = sinon.spy();
    });

    teardown(function () {
        traviApiResources.getLinksFor.restore();
    });

    test('that an empty list of resource types is returned when none are available', function () {
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, {
            'self': {'href': 'https://api.travi.org/'}
        });

        homepage.listResourceTypes(callback);

        assert.calledWith(callback, null, []);
    });

    test('that link rels are listed when links are present', function () {
        var linkName = any.string(),
            links = { 'self': {'href': any.url()}};
        links[linkName] = {'href': any.url()};
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, links);

        homepage.listResourceTypes(callback);

        assert.calledWith(callback, null, [{
            text: linkName,
            path: '/' + linkName
        }]);
    });
});
