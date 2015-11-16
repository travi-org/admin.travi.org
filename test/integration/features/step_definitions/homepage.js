'use strict';

const
    assert = require('referee').assert,
    nock = require('nock'),
    _ = require('lodash'),
    any = require('../../../helpers/any');
require('setup-referee-sinon/globals');

module.exports = function () {
    this.World = require('../support/world.js').World;

    function buildLinksFrom(availableTypes) {
        const links = {
            'self': any.url()
        };

        availableTypes.forEach(function (type) {
            links[type] = any.url();
        });

        return links;
    }

    this.Before(function () {
        nock.disableNetConnect();
        this.availableResourceTypes = [];
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.serverResponse = null;
    });

    function stubApiCall() {
        nock('https://api.travi.org')
            .log(console.log)   //eslint-disable-line no-console
            .get('/')
            .times(2)
            .reply(
                200,
                {_links: buildLinksFrom(this.availableResourceTypes)},
                {'Content-Type': 'application/hal+json'}
            );
    }

    this.Given(/^user has no api privileges$/, function (callback) {
        stubApiCall.call(this);

        callback();
    });

    this.Given(/^user has api privileges$/, function (callback) {
        this.availableResourceTypes = any.listOf(any.string, {
            min: 1
        });

        stubApiCall.call(this);

        callback();
    });

    this.When(/^the homepage is loaded$/, function (callback) {
        this.makeRequestTo('/', callback);
    });

    this.Then(/^no resources are listed$/, function (done) {
        assert.equals(this.getResponseBody(), JSON.stringify({primaryNav: []}));

        done();
    });

    this.Then(/^top level resources are listed$/, function (done) {
        assert.equals(this.serverResponse.statusCode, 200);
        assert.equals(this.getResponseBody(), JSON.stringify({
            primaryNav: _.map(this.availableResourceTypes, function (type) {
                return {
                    text: type,
                    path: `/${type}`
                };
            })
        }));

        done();
    });

};
