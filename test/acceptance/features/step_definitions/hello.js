'use strict';

var server = require(process.cwd() + '/index.js'),
    assert = require('referee').assert;

module.exports = function () {
    var serverResponse;

    this.When(/^"([^"]*)" is requested$/, function (path, callback) {
        server.inject({
            method: 'GET',
            url: path
        }, function (response) {
            serverResponse = response;
            callback();
        });
    });

    this.Then(/^"([^"]*)" is returned as the response$/, function (message, callback) {
        assert.equals(JSON.parse(serverResponse.payload).message, message);

        callback();
    });
};