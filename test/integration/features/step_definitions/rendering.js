import cheerio from 'cheerio';
import {assert} from 'referee';

module.exports = function () {
    this.World = require('../support/world.js').World;

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
        const
            $ = cheerio.load(this.getResponseBody()),
            $resources = $('ul.list-group');

        assert.equals($resources.length, 1);
        assert.equals($resources.find('li').length, this.resourceCount);

        done();
    });

    this.Then(/^the resource route is rendered$/, function (done) {
        const
            $ = cheerio.load(this.getResponseBody()),
            $heading = $('h3');

        assert.equals($heading.length, 1);
        //TODO: this check needs to be more generic so that multiple resource types are handled properly
        //assert.equals(
        //    $heading.text(),
        //    `${this.existingResource['first-name']} ${this.existingResource['last-name']}`
        //);

        done();
    });
};
