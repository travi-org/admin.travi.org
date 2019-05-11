import nock from 'nock';
import {assert} from 'referee';
import any from '@travi/any';
import _ from 'lodash';
import {OK} from 'http-status-codes';
import {defineSupportCode} from 'cucumber';
import {World} from '../support/world';
import {resource, resources} from '../../../helpers/any-for-admin';

const debug = require('debug')('test');

const DOMAIN = 'api.travi.org';
const HOST = `https://${DOMAIN}`;

let existingResourceId, existingResource;

function getSingularForm(resourceType) {
  return resourceType.substring(0, resourceType.length - 1);
}

function buildHalLink(href) {
  return {href};
}

function buildLinksIncluding(resourceType, resourceLink) {
  const links = {
    self: buildHalLink(any.url({domain: DOMAIN}))
  };

  if (resourceLink) {
    links[resourceType] = buildHalLink(resourceLink);
  }

  return links;
}

function buildListOf(factory) {
  const resourceList = any.listOf(factory, {min: 1, uniqueOn: 'id'});

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

  if (Object.prototype.hasOwnProperty.call(resources, getSingularForm(resourceType))) {
    resourceList = buildListOf.call(this, resources[getSingularForm(resourceType)]);
  } else {
    resourceList = buildListOf.call(this, resource);
  }

  resourceList = resourceList.map(instance => {
    if (_.isObject(instance)) {
      return {...instance, _links: buildLinksIncluding()};
    }

    return instance;
  });

  resources[resourceType] = resourceList;

  this.resourceCount = resourceList.length;

  return resourceList;
}

function setupExpectedApiResponsesFor(resourceType) {
  const requestPath = `/${resourceType}`;
  const resourceLink = HOST + requestPath;
  const headers = {'Content-Type': 'application/hal+json'};
  const embedded = {
    [resourceType]: prepareListForResponse.call(this, resourceType)
  };
  const document = {
    _embedded: embedded
  };

  this.apiResponseShouldIncludeLinkFor({
    rel: resourceType,
    path: resourceLink
  });

  nock(HOST)
    .log(debug)
    .get(requestPath)
    .reply(
      OK,
      document,
      headers
    );

  if (existingResourceId) {
    document._embedded[resourceType].forEach(instance => {
      if (instance.id === existingResourceId) {
        const link = instance._links.self.href;
        const linkHost = link.substring(0, link.lastIndexOf('/'));
        const resourcePath = link.substring(linkHost.length);
        const extendedExistingResource = _.cloneDeep(existingResource);
        extendedExistingResource.extended = true;

        nock(linkHost)
          .log(debug)
          .get(resourcePath)
          .reply(
            OK,
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

  resources[resourceType].forEach((instance, index) => {
    if ('persons' === resourceType) {
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

defineSupportCode(({After, Given, When, Then, setWorldConstructor}) => {
  setWorldConstructor(World);

  After(function () {
    existingResourceId = null;
    this.serverResponse = null;
    this.apiResponseLinks = {};
  });

  Given(/^list of "([^"]*)" resources exists in the api$/, function (resourceType, callback) {
    setupExpectedApiResponsesFor.call(this, resourceType);

    callback();
  });

  Given(/^list of "([^"]*)" resources does not exist in the api$/, (resourceType, callback) => {
    callback();
  });

  Given(/^list of "([^"]*)" contains one entry$/, (resourceType, callback) => {
    const embedded = {};
    const host = 'https://api.travi.org';
    const requestPath = `/${resourceType}`;
    const resourceLink = host + requestPath;
    const headers = {'Content-Type': 'application/hal+json'};

    nock(host)
      .log(debug)
      .get('/')
      .times(2)
      .reply(
        OK,
        {_links: buildLinksIncluding(resourceType, resourceLink)},
        headers
      );

    if (Object.prototype.hasOwnProperty.call(resources, getSingularForm(resourceType))) {
      embedded[resourceType] = resources[getSingularForm(resourceType)]();
    } else {
      embedded[resourceType] = resource();
    }
    resources[resourceType] = [embedded[resourceType]];

    nock(host)
      .log(debug)
      .get(requestPath)
      .reply(
        OK,
        {_embedded: embedded},
        headers
      );

    callback();
  });

  Given(/^a "([^"]*)" exists in the api$/, function (resourceType, callback) {
    existingResourceId = any.integer({min: 1});
    setupExpectedApiResponsesFor.call(this, resourceType);

    callback();
  });

  Given(/^a "([^"]*)" does not exist in the api$/, (resourceType, callback) => {
    callback();
  });

  When(/^list of "([^"]*)" resources is requested$/, function (resourceType, callback) {
    this.makeRequestTo(`/${resourceType}`, callback);
  });

  When(/^the "([^"]*)" is requested by id$/, function (resourceType, callback) {
    this.makeRequestTo(`/${resourceType}/${existingResourceId}`, callback);
  });

  Then(/^list of "([^"]*)" resources is returned$/, function (resourceType, done) {
    const list = JSON.parse(this.getResponseBody())[resourceType];

    if (Object.prototype.hasOwnProperty.call(resources, getSingularForm(resourceType))) {
      assertFormatMappedToViewFor(resourceType, list);
    } else {
      assertFormatIsUntouchedFor(resourceType, list);
    }

    done();
  });

  Then(/^the "([^"]*)" is returned$/, function (resourceType, done) {
    const payload = JSON.parse(this.getResponseBody());
    const resourceInstance = payload.resource;

    assert.equals(resourceInstance.id, existingResourceId);
    assert.isTrue(resourceInstance.extended);

    done();
  });
});
