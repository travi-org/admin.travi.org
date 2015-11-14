'use strict';

const
    nock = require('nock'),
    assert = require('referee').assert;

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(function () {
        nock.disableNetConnect();
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.serverResponse = null;
    });

    this.Given(/^the api is down$/, function (callback) {
        nock('https://api.travi.org')
            .log(console.log)   //eslint-disable-line no-console
            .get('/')
            .replyWithError('something awful happened');

        callback();
    });

    this.Then(/^a "([^"]*)" error should be returned$/, function (statusCode, done) {
        assert.equals(this.serverResponse.statusCode, parseInt(statusCode, 10));

        done();
    });
};
