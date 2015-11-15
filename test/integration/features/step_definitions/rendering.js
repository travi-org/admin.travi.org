'use strict';

const
    cheerio = require('cheerio'),
    assert = require('referee').assert;

module.exports = function () {
    this.World = require('../support/world.js').World;

    this.Before(function () {
        this.mime = 'application/json';
    });

    this.After(function () {
        this.mine = null;
    });

    this.Given(/^html is requested$/, function (callback) {
        this.mime = 'text/html';

        callback();
    });

    this.Then(/^the primary nav is rendered$/, function (done) {
        const $ = cheerio.load(this.serverResponse.payload);

        assert.equals($('#wrap ul.navbar-nav').length, 1);

        done();
    });

    this.Then(/^the "([^"]*)" route is rendered$/, function (arg1, done) {
        const $ = cheerio.load(this.serverResponse.payload);

        assert.equals($('div.jumbotron').length, 1);

        done();
    });
};
