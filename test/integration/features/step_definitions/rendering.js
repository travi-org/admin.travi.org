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
        const
            $ = cheerio.load(this.getResponseBody()),
            $primaryNav = $('#wrap').find('ul.navbar-nav');

        assert.equals($primaryNav.length, 1);
        assert.equals(
            this.availableResourceTypes.length + Object.keys(this.apiResponseLinks).length,
            $primaryNav.find('> li').length
        );

        done();
    });

    this.Then(/^the index route is rendered$/, function (done) {
        const $ = cheerio.load(this.getResponseBody());

        assert.equals($('div.jumbotron').length, 1);

        done();
    });

    this.Then(/^the resource\-list route is rendered$/, function (done) {
        const $ = cheerio.load(this.getResponseBody());

        console.log($('#wrap').html());

        assert.equals($('ul.list-group').length, 1);

        done();
    });
};
