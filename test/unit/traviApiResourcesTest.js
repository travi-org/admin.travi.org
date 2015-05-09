'use strict';

var traviApiResources = require('../../lib/traviApiResources.js'),
    traverson = require('traverson'),
    any = require('../helpers/any');

require('setup-referee-sinon/globals');

suite('travi-api resource interactions', function () {
    var stubForGet = sinon.stub();

    setup(function () {
        sinon.stub(traverson, 'from').withArgs('http://api.travi.org/').returns({
            get: stubForGet
        });
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
        stubForGet.yields(null, { body: JSON.stringify({ '_links': links })});

        traviApiResources.getLinksFor('catalog', callback);

        assert.calledWith(callback, null, links);
    });
});