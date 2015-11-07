var path = require('path'),
    loadApi = require(path.join(__dirname, '../../../../lib/server/app.js')),
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

    this.Before(function () {
        nock.disableNetConnect();
        availableResourceTypes = [];
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        serverResponse = null;
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

        loadApi.then(function (server) {
            server.inject({
                method: 'GET',
                url: '/'
            }, function (response) {
                serverResponse = response;
                callback();
            });
        });
    });

    this.Then(/^no resources are listed$/, function (done) {
        assert.equals(serverResponse.payload, JSON.stringify({primaryNav: []}));

        done();
    });

    this.Then(/^top level resources are listed$/, function (done) {
        assert.equals(serverResponse.statusCode, 200);
        assert.equals(serverResponse.payload, JSON.stringify({
            primaryNav: _.map(availableResourceTypes, function (type) {
                return {
                    text: type,
                    path: '/' + type
                };
            })
        }));

        done();
    });

};
