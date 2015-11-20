'use strict';

const
    assert = require('referee').assert,
    nock = require('nock'),
    _ = require('lodash'),
    any = require('../../../helpers/any');
require('setup-referee-sinon/globals');

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(function () {
        nock.disableNetConnect();
        this.availableResourceTypes = [];
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.serverResponse = null;
    });

    this.Given(/^user has no api privileges$/, function (callback) {
        this.stubApiCall();

        callback();
    });

    this.Given(/^user has api privileges$/, function (callback) {
        this.availableResourceTypes = any.listOf(any.string, {
            min: 1
        });

        this.stubApiCall();

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
        assert.equals(this.getResponseBody(), JSON.stringify({
            primaryNav: _.map(this.availableResourceTypes, (type) => {
                return {
                    text: type,
                    path: `/${type}`
                };
            })
        }));

        done();
    });

};
