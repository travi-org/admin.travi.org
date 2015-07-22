var path = require('path'),
    server = require(path.join(__dirname, '../../../../index.js')),
    assert = require('referee').assert,
    nock = require('nock'),
    _ = require('lodash'),
    any = require('../../../helpers/any');
require('setup-referee-sinon/globals');

module.exports = function () {
    'use strict';

    var availableResourceTypes,
        serverResponse;

    function buildLinksFrom(availableResourceTypes) {
        var links = {
            'self': any.url()
        };

        availableResourceTypes.forEach(function (type) {
            links[type] = any.url();
        });
        return links;
    }

    this.Before(function (callback) {
        nock.disableNetConnect();
        availableResourceTypes = [];

        callback();
    });

    this.After(function (callback) {
        nock.enableNetConnect();
        nock.cleanAll();
        serverResponse = null;

        callback();
    });

    this.Given(/^user has no api privileges$/, function (callback) {
        callback();
    });

    this.Given(/^user has api privileges$/, function (callback) {
        availableResourceTypes = any.listOf(any.string);

        callback();
    });

    this.When(/^the homepage is loaded$/, function (callback) {
        nock('https://api.travi.org')
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
        assert.equals(serverResponse.payload, JSON.stringify({types: []}));

        callback();
    });

    this.Then(/^top level resources are listed$/, function (callback) {
        assert.equals(serverResponse.statusCode, 200);
        assert.equals(serverResponse.payload, JSON.stringify({
            types: _.map(availableResourceTypes, function (type) {
                return {
                    text: type,
                    path: '/' + type
                };
            })
        }));

        callback();
    });

};
