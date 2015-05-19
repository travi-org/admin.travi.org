var homepageController = require('../../../../lib/homepageController'),
    assert = require('referee').assert,
    nock = require('nock'),
    any = require('../../../helpers/any');

module.exports = function () {
    'use strict';

    var model,
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

    this.Before(function (callback) {
        availableResourceTypes = [];

        callback();
    });

    this.After(function (callback) {
        nock.cleanAll();

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
        nock('http://api.travi.org')
            .get('/')
            .reply(
                200,
                { _links: buildLinksFrom(availableResourceTypes)},
                { 'Content-Type': 'application/hal+json'}
            );

        homepageController.resourceTypes(function (err, types) {
            model = types;
            callback();
        });
    });

    this.Then(/^no resources are listed$/, function (callback) {
        assert.equals(model, []);

        callback();
    });

    this.Then(/^top level resources are listed$/, function (callback) {
        assert.equals(model, availableResourceTypes);

        callback();
    });

};
