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

    function buildListOf(resource) {
        var resourceList,
            existingResource;

        resourceList = any.listOf(resource);

        if (existingResourceId) {
            existingResource = resource();

            existingResource.id = existingResourceId;

            resourceList.push(existingResource);
        }

        return resourceList;
    }

    function prepareListForResponse(resourceType) {
        var resourceList;

        if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
            resourceList = buildListOf(any.resources[getSingularForm(resourceType)]);
        } else {
            resourceList = buildListOf(any.resource);
        }

        _.map(resourceList, function (resource) {
            if (_.isObject(resource)) {
                resource._links = buildLinksIncluding();
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
            document = {
                _embedded: {}
            };
        document._embedded[resourceType] = prepareListForResponse(resourceType);

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
        var list = JSON.parse(serverResponse.payload).resources;

        assert.isArray(list);
        assert.equals(list, resources[resourceType]);
    }

    function assertFormatMappedToViewFor(resourceType) {
        var list = JSON.parse(serverResponse.payload).resources,
            mappedResource;

        _.each(resources[resourceType], function (resource, index) {

            if ('users' === resourceType) {
                mappedResource = {
                    id: resource.id,
                    displayName: resource['first-name'] + ' ' + resource['last-name'],
                    thumbnail: resource.avatar
                };
            } else if ('rides' === resourceType) {
                mappedResource = {
                    id: resource.id,
                    displayName: resource.nickname
                };
            }

            assert.isArray(list);
            assert.equals(list[index], mappedResource);
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

    this.Given(/^list of "([^"]*)" contains one entry$/, function (resourceType, callback) {
        var embedded = {},
            host = 'https://api.travi.org',
            requestPath = '/' + resourceType + any.string(),
            resourceLink = host + requestPath,
            headers = {'Content-Type': 'application/hal+json'};

        nock(host)
            .get('/')
            .times(2)
            .reply(
                200,
                {_links: buildLinksIncluding(resourceType, resourceLink)},
                headers
            );

        if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
            embedded[resourceType] = any.resources[getSingularForm(resourceType)]();
        } else {
            embedded[resourceType] = any.resource();
        }
        resources[resourceType] = [embedded[resourceType]];

        nock(host)
            .get(requestPath)
            .reply(
                200,
                { _embedded: embedded },
                headers
            );

        callback();
    });

    this.Given(/^a "([^"]*)" exists in the api$/, function (resourceType, callback) {
        existingResourceId = any.int();
        setupExpectedApiResponsesFor(resourceType);

        callback();
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
        var payload = JSON.parse(serverResponse.payload);
        console.log('payload: ' + formatio.ascii(payload));
        assert.equals(payload.id, existingResourceId);

        callback();
    });
};
