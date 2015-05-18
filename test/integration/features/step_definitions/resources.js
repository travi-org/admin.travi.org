var resourcesController = require('../../../../lib/resourcesController'),

    nock = require('nock'),
    assert = require('referee').assert,
    any = require('../../../helpers/any');

module.exports = function () {
    'use strict';

    var returnedResources,
        resources = [{}, {}];

    function buildLinksIncluding(resourceType) {
        var links = {
            'self': any.url()
        };

        links[resourceType] = any.url();

        return links;
    }

    this.Given(/^list of "([^"]*)" resources exists in the api$/, function (resourceType, callback) {
        nock('http://api.travi.org')
            .get('/')
            .reply(
                200,
                { _links: buildLinksIncluding(resourceType) },
                { 'Content-Type': 'application/hal+json' }
            );

        nock('http://api.travi.org')
            .get('/' + resourceType)
            .reply(
                200,
                { items: resources },
                { 'Content-Type': 'application/hal+json' }
            );

        callback();
    });

    this.When(/^list of "([^"]*)" resources is requested$/, function (resourceType, callback) {
        resourcesController.getListOf(resourceType, function (err, items) {
            returnedResources = items;

            callback();
        });
    });

    this.Then(/^list of "([^"]*)" resources is returned$/, function (resourceType, callback) {
        assert.equals(returnedResources, resources);

        callback();
    });
};
