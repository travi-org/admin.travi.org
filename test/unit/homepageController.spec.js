'use strict';

var homepage = require('../../lib/homepageController.js'),
    traviApiResources = require('../../lib/traviApiResources.js');

require('setup-referee-sinon/globals');

suite('homepage controller', function () {
    var reply;

    setup(function () {
        sinon.stub(traviApiResources, 'getLinksFor');

        reply = sinon.spy();
    });

    teardown(function () {
        traviApiResources.getLinksFor.restore();
    });

    test('that an empty list of resource types is returned when none are available', function () {
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, {
            'self': {'href': 'http://api.travi.org/'}
        });

        homepage.resourceTypes(null, reply);

        assert.calledWith(reply, []);
    });

    test('that link rels are listed when links are present', function () {
        var linkName = 'foo',
            links = { 'self': {'href': 'http://api.travi.org/'}};
        links[linkName] = {'href': 'http://api.travi.org/bar'};
        traviApiResources.getLinksFor.withArgs('catalog').yields(null, links);

        homepage.resourceTypes(null, reply);

        assert.calledWith(reply, [linkName]);
    });
});