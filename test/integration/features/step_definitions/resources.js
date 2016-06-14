import nock from 'nock';
import {assert} from 'referee';
import _ from 'lodash';
import {url, listOf, resource, resources, integer} from '../../../helpers/any-for-admin';

const
    DOMAIN = 'api.travi.org',
    HOST = `https://${DOMAIN}`,
    HTTP_SUCCESS = 200;

let existingResourceId,
    existingResource;

function getSingularForm(resourceType) {
    return resourceType.substring(0, resourceType.length - 1);
}

function buildHalLink(href) {
    return {href};
}

function buildLinksIncluding(resourceType, resourceLink) {
    const links = {
        'self': buildHalLink(url({domain: DOMAIN}))
    };

    if (resourceLink) {
        links[resourceType] = buildHalLink(resourceLink);
    }

    return links;
}

function buildListOf(factory) {
    const resourceList = listOf(factory, {min: 1});

    if (existingResourceId) {
        existingResource = factory();

        existingResource.id = existingResourceId;

        this.existingResource = existingResource;

        resourceList.push(existingResource);
    }

    return resourceList;
}

function prepareListForResponse(resourceType) {
    let resourceList;

    if (resources.hasOwnProperty(getSingularForm(resourceType))) {
        resourceList = buildListOf.call(this, resources[getSingularForm(resourceType)]);
    } else {
        resourceList = buildListOf.call(this, resource);
    }

    _.map(resourceList, (instance) => {
        if (_.isObject(instance)) {
            instance._links = buildLinksIncluding();
        }

        return instance;
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
        _.each(document._embedded[resourceType], (instance) => {
            if (instance.id === existingResourceId) {
                const
                    link = instance._links.self.href,
                    linkHost = link.substring(0, link.lastIndexOf('/')),
                    resourcePath = link.substring(linkHost.length),
                    extendedExistingResource = _.cloneDeep(existingResource);
                extendedExistingResource.extended = true;

                nock(linkHost)
                    .log(console.log)   //eslint-disable-line no-console
                    .get(resourcePath)
                    .reply(
                        HTTP_SUCCESS,
                        extendedExistingResource,
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

    _.each(resources[resourceType], (instance, index) => {

        if ('users' === resourceType) {
            mappedResource = {
                id: instance.id,
                displayName: `${instance['first-name']} ${instance['last-name']}`,
                thumbnail: instance.avatar
            };
        } else if ('rides' === resourceType) {
            mappedResource = {
                id: instance.id,
                displayName: instance.nickname
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

        if (resources.hasOwnProperty(getSingularForm(resourceType))) {
            embedded[resourceType] = resources[getSingularForm(resourceType)]();
        } else {
            embedded[resourceType] = resource();
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
        existingResourceId = integer({min: 1});
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

        if (resources.hasOwnProperty(getSingularForm(resourceType))) {
            assertFormatMappedToViewFor(resourceType, list);
        } else {
            assertFormatIsUntouchedFor(resourceType, list);
        }

        done();
    });

    this.Then(/^the "([^"]*)" is returned$/, function (resourceType, done) {
        const
            payload = JSON.parse(this.getResponseBody()),
            resourceInstance = payload.resource;

        assert.equals(resourceInstance.id, existingResourceId);
        assert.isTrue(resourceInstance.extended);

        done();
    });
};
