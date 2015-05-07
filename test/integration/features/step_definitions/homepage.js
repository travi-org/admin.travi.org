var server = require(process.cwd() + '/index.js'),
    assert = require('referee').assert,
    nock = require('nock'),
    any = require('../../../helpers/any');

module.exports = function () {
    'use strict';

    var serverResponse,
        availableResourceTypes;

    function buildLinksFrom(availableResourceTypes) {
        var links = {
            'self': any.url()
        };

        availableResourceTypes.forEach(function (type) {
            links[type] = any.url();
        });
        return links;
    }

    this.After(function (callback) {
        availableResourceTypes = [];
        nock.cleanAll();

        callback();
    });

    this.Given(/^user has no api privileges$/, function (callback) {
        callback();
    });

    this.Given(/^user has api privileges$/, function (callback) {
        availableResourceTypes = [any.string(), any.string()];

        callback();
    });

    this.When(/^the homepage is loaded$/, function (callback) {
        nock('http://api.travi.org')
            .get('/')
            .reply(
                200,
                { _links: buildLinksFrom(availableResourceTypes)},
                { 'Content-Type': 'application/hal+json'}
            );

        server.inject({
            method: 'GET',
            url: '/'
        }, function (response) {
            serverResponse = response;
            callback();
        });
    });

    this.Then(/^no resources are listed$/, function (callback) {
        assert.equals(serverResponse.statusCode, 200);
        assert.equals(serverResponse.payload, '[]');

        callback();
    });

    this.Then(/^top level resources are listed$/, function (callback) {
        assert.equals(serverResponse.statusCode, 200);
        assert.equals(serverResponse.payload, JSON.stringify(availableResourceTypes));

        callback();
    });

};