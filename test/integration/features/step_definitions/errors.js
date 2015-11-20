'use strict';

const
    nock = require('nock'),
    assert = require('referee').assert;

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(() => {
        nock.disableNetConnect();
    });

    this.After(function () {
        nock.enableNetConnect();
        nock.cleanAll();
        this.serverResponse = null;
    });

    this.Given(/^the api is down$/, (callback) => {
        nock('https://api.travi.org')
            .log(console.log)   //eslint-disable-line no-console
            .get('/')
            .times(2)
            .replyWithError('something awful happened');

        callback();
    });

    this.Then(/^a "([^"]*)" status code should be returned$/, function (statusCode, done) {
        assert.equals(this.serverResponse.statusCode, parseInt(statusCode, 10));

        done();
    });
};
