'use strict';

const
    nock = require('nock'),
    assert = require('referee').assert,
    _ = require('lodash'),
    any = require('../../../helpers/any-for-admin'),

    HOST = 'https://api.travi.org',
    HTTP_SUCCESS = 200;

let resources = {},
    existingResourceId,
    existingResource;

function getSingularForm(resourceType) {
    return resourceType.substring(0, resourceType.length - 1);
}

function buildHalLink(href) {
    return {href};
}

function buildLinksIncluding(resourceType, resourceLink) {
    const links = {
        'self': buildHalLink(any.url(HOST))
    };

    if (resourceLink) {
        links[resourceType] = buildHalLink(resourceLink);
    }

    return links;
}

function buildListOf(resource) {
    let resourceList;

    resourceList = any.listOf(resource, {min: 1});

    if (existingResourceId) {
        existingResource = resource();

        existingResource.id = existingResourceId;

        this.existingResource = existingResource;

        resourceList.push(existingResource);
    }

    return resourceList;
}

function prepareListForResponse(resourceType) {
    let resourceList;

    if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
        resourceList = buildListOf.call(this, any.resources[getSingularForm(resourceType)]);
    } else {
        resourceList = buildListOf.call(this, any.resource);
    }

    _.map(resourceList, (resource) => {
        if (_.isObject(resource)) {
            resource._links = buildLinksIncluding();
        }

        return resource;
    });

    resources[resourceType] = resourceList;

    this.resourceCount = resourceList.length;

    return resourceList;
}

function setupExpectedApiResponsesFor(resourceType) {
    const
        requestPath = `/${resourceType}`,
        resourceLink = HOST + requestPath,
        headers = {'Content-Type': 'application/hal+json'},
        embedded = {
            [resourceType]: prepareListForResponse.call(this, resourceType)
        },
        document = {
            _embedded: embedded
        };

    this.apiResponseShouldIncludeLinkFor({
        rel: resourceType,
        path: resourceLink
    });

    nock(HOST)
        .log(console.log)   //eslint-disable-line no-console
        .get(requestPath)
        .reply(
            HTTP_SUCCESS,
            document,
            headers
        );

    if (existingResourceId) {
        _.each(document._embedded[resourceType], (resource) => {
            if (resource.id === existingResourceId) {
                const
                    link = resource._links.self.href,
                    linkHost = link.substring(0, link.lastIndexOf('/')),
                    resourcePath = link.substring(linkHost.length);

                nock(linkHost)
                    .log(console.log)   //eslint-disable-line no-console
                    .get(resourcePath)
                    .reply(
                        HTTP_SUCCESS,
                        existingResource,
                        headers
                    );
            }
        });
    }
}

function assertFormatIsUntouchedFor(resourceType, list) {
    assert.isArray(list);
    assert.match(list, resources[resourceType]);
}

function assertFormatMappedToViewFor(resourceType, list) {
    let mappedResource;

    _.each(resources[resourceType], (resource, index) => {

        if ('users' === resourceType) {
            mappedResource = {
                id: resource.id,
                displayName: `${resource['first-name']} ${resource['last-name']}`,
                thumbnail: resource.avatar
            };
        } else if ('rides' === resourceType) {
            mappedResource = {
                id: resource.id,
                displayName: resource.nickname
            };
        }

        assert.isArray(list);
        assert.match(list[index], mappedResource);
    });
}

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(() => {
        nock.disableNetConnect();
    });

    this.After(() => {
        nock.enableNetConnect();
        nock.cleanAll();
        resources = {};
        existingResourceId = null;
        this.serverResponse = null;
        this.apiResponseLinks = {};
    });

    this.Given(/^list of "([^"]*)" resources exists in the api$/, function (resourceType, callback) {
        setupExpectedApiResponsesFor.call(this, resourceType);

        callback();
    });

    this.Given(/^list of "([^"]*)" contains one entry$/, (resourceType, callback) => {
        const
            embedded = {},
            host = 'https://api.travi.org',
            requestPath = `/${resourceType}`,
            resourceLink = host + requestPath,
            headers = {'Content-Type': 'application/hal+json'};

        nock(host)
            .get('/')
            .times(2)
            .reply(
                HTTP_SUCCESS,
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
                HTTP_SUCCESS,
                { _embedded: embedded },
                headers
            );

        callback();
    });

    this.Given(/^a "([^"]*)" exists in the api$/, function (resourceType, callback) {
        existingResourceId = any.int({min: 1});
        setupExpectedApiResponsesFor.call(this, resourceType);

        callback();
    });

    this.When(/^list of "([^"]*)" resources is requested$/, function (resourceType, callback) {
        this.makeRequestTo(`/${resourceType}`, callback);
    });

    this.When(/^the "([^"]*)" is requested by id$/, function (resourceType, callback) {
        this.makeRequestTo(`/${resourceType}/${existingResourceId}`, callback);
    });

    this.Then(/^list of "([^"]*)" resources is returned$/, function (resourceType, done) {
        const list = JSON.parse(this.getResponseBody())[resourceType];
        console.log(list);  //eslint-disable-line no-console

        if (any.resources.hasOwnProperty(getSingularForm(resourceType))) {
            assertFormatMappedToViewFor(resourceType, list);
        } else {
            assertFormatIsUntouchedFor(resourceType, list);
        }

        done();
    });

    this.Then(/^the "([^"]*)" is returned$/, function (resourceType, done) {
        const payload = JSON.parse(this.getResponseBody());

        assert.equals(payload.resource.id, existingResourceId);

        done();
    });
};
