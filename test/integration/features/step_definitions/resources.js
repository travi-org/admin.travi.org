var resourcesController = require('../../../../lib/resourcesController'),

    nock = require('nock'),
    assert = require('referee').assert,
    _ = require('lodash'),
    any = require('../../../helpers/any-for-admin');

module.exports = function () {
    'use strict';

    var returnedResources,
        resources = {};

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

    function prepareListForResponse(resourceType) {
        var resourceList;

        if (any.resources.hasOwnProperty(resourceType)) {
            resourceList = any.listOf(any.resources[resourceType]);
        } else {
            resourceList = any.listOf(any.resource);
        }

        resources[resourceType] = resourceList;

        return resourceList;
    }

    function setupExpectedApiResponsesFor(resourceType) {
        var host = 'http://api.travi.org',
            requestPath = '/' + resourceType + any.string(),
            resourceLink = host + requestPath,
            headers = {'Content-Type': 'application/hal+json'},
            document = {};
        document[resourceType] = prepareListForResponse(resourceType);

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

    function assertFormatIsUntouchedFor(resourceType) {
        assert.equals(returnedResources, resources[resourceType]);
    }

    function assertFormatMappedToViewFor(resourceType) {
        _.each(resources[resourceType], function (resource, index) {
            var mappedResource;

            if ('users' === resourceType) {
                mappedResource = {
                    id: resource.id,
                    displayName: resource['first-name'] + ' ' + resource['last-name'],
                    thumbnail: resource.avatar
                };
            } else if ('rides' === resourceType) {
                mappedResource = {
                    displayName: resource
                };
            }

            assert.equals(returnedResources[index], mappedResource);
        });
    }

    this.Before(function (callback) {
        nock.disableNetConnect();

        callback();
    });

    this.After(function (callback) {
        nock.enableNetConnect();
        resources = {};

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
        if (any.resources.hasOwnProperty(resourceType)) {
            assertFormatMappedToViewFor(resourceType);
        } else {
            assertFormatIsUntouchedFor(resourceType);
        }

        callback();
    });
};
