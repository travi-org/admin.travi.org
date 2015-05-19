var resourcesController = require('../../../../lib/resourcesController'),

    nock = require('nock'),
    assert = require('referee').assert,
    any = require('../../../helpers/any');

module.exports = function () {
    'use strict';

    var returnedResources,
        resources = [{}, {}];

    function buildHalLink(href) {
        return { href: href};
    }

    function buildLinksIncluding(resourceType, resourceLink) {
        var links = {
            'self': buildHalLink(any.url())
        };

        links[resourceType] = buildHalLink(resourceLink);

        return links;
    }

    function setupExpectedApiResponsesFor(resourceType) {
        var host = 'http://api.travi.org',
            requestPath = '/' + resourceType + any.string(),
            resourceLink = host + requestPath,
            headers = {'Content-Type': 'application/hal+json'},
            document = {};
        document[resourceType] = resources;

        nock(host)
            .get('/')
            .reply(
                200,
                {_links: buildLinksIncluding(resourceType, resourceLink)},
                headers
            );

        nock(host)
            .get(requestPath)
            .reply(
                200,
                document,
                headers
            );
    }

    this.Before(function (callback) {
        nock.disableNetConnect();

        callback();
    });

    this.After(function (callback) {
        nock.enableNetConnect();

        callback();
    });

    this.Given(/^list of "([^"]*)" resources exists in the api$/, function (resourceType, callback) {
        setupExpectedApiResponsesFor(resourceType);

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
