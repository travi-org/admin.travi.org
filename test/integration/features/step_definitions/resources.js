var resourcesController = require('../../../../lib/resourcesController'),
    path = require('path'),
    server = require(path.join(__dirname, '../../../../index.js')),

    nock = require('nock'),
    assert = require('referee').assert,
    _ = require('lodash'),
    any = require('../../../helpers/any-for-admin'),
    formatio = require('formatio');
require('setup-referee-sinon/globals');

module.exports = function () {
    'use strict';

    var existingResourceId,
        serverResponse,
        resources = {};

    function getSingularForm(resourceType) {
        return resourceType.substring(0, resourceType.length - 1);
    }

    function buildHalLink(href) {
        return { href: href};
    }

    function buildLinksIncluding(resourceType, resourceLink) {
        var links = {
            'self': buildHalLink(any.url())
        };

        if (resourceLink) {
            links[resourceType] = buildHalLink(resourceLink);
        }

        return links;
    }

    function prepareListForResponse(resourceType) {
        var resourceList;

        if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
            resourceList = any.listOf(any.resources[getSingularForm(resourceType)]);
        } else {
            resourceList = any.listOf(any.resource);
        }

        _.map(resourceList, function (resource) {
            if (_.isObject(resource)) {
                resource._links = {_links: buildLinksIncluding(resourceType)};
            }

            return resource;
        });

        resources[resourceType] = resourceList;

        return resourceList;
    }

    function setupExpectedApiResponsesFor(resourceType) {
        var host = 'https://api.travi.org',
            requestPath = '/' + resourceType + any.string(),
            resourceLink = host + requestPath,
            headers = {'Content-Type': 'application/hal+json'},
            document = {};
        document[resourceType] = prepareListForResponse(resourceType);

        nock(host)
            .get('/')
            .times(2)
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
        assert.equals(JSON.parse(serverResponse.payload).resources, resources[resourceType]);
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
                    id: index + 1,
                    displayName: resource
                };
            }

            assert.equals(JSON.parse(serverResponse.payload).resources[index], mappedResource);
        });
    }

    this.Before(function (callback) {
        nock.disableNetConnect();

        callback();
    });

    this.After(function (callback) {
        nock.enableNetConnect();
        nock.cleanAll();
        resources = {};
        existingResourceId = null;
        serverResponse = null;

        callback();
    });

    this.Given(/^list of "([^"]*)" resources exists in the api$/, function (resourceType, callback) {
        setupExpectedApiResponsesFor(resourceType);

        callback();
    });

    this.Given(/^a "([^"]*)" exists in the api$/, function (resourceType, callback) {
        setupExpectedApiResponsesFor(resourceType);

        callback.pending();
    });

    this.When(/^list of "([^"]*)" resources is requested$/, function (resourceType, callback) {
        server.inject({
            method: 'GET',
            url: '/' + resourceType
        }, function (response) {
            serverResponse = response;
            callback();
        });
    });

    this.When(/^the "([^"]*)" is requested by id$/, function (resourceType, callback) {
        server.inject({
            method: 'GET',
            url: '/' + resourceType + '/' + existingResourceId
        }, function (response) {
            serverResponse = response;
            callback();
        });

        callback();
    });

    this.Then(/^list of "([^"]*)" resources is returned$/, function (resourceType, callback) {
        if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
            assertFormatMappedToViewFor(resourceType);
        } else {
            assertFormatIsUntouchedFor(resourceType);
        }

        callback();
    });

    this.Then(/^the "([^"]*)" is returned$/, function (resourceType, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
};
