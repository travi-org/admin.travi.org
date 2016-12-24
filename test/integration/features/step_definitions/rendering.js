import cheerio from 'cheerio';
import {assert} from 'referee';
import {defineSupportCode} from 'cucumber';
import {World} from '../support/world';

defineSupportCode(({Given, Then, setWorldConstructor}) => {
    setWorldConstructor(World);

    Given(/^html is requested$/, function (callback) {
        this.mime = 'text/html';

        callback();
    });

    Then(/^the primary nav is rendered$/, function (done) {
        const
            $ = cheerio.load(this.getResponseBody()),
            $primaryNav = $('#wrap').find('ul.navbar-nav'),
            expectedLinkCount = this.availableResourceTypes.length + Object.keys(this.apiResponseLinks).length;

        assert.equals($primaryNav.length, 1);
        assert.greater(expectedLinkCount, 0);
        assert.equals(expectedLinkCount, $primaryNav.find('> li').length);

        done();
    });

    Then(/^the index route is rendered$/, function (done) {
        const $ = cheerio.load(this.getResponseBody());

        assert.equals($('div.jumbotron').length, 1);

        done();
    });

    Then(/^the resource\-list route is rendered$/, function (done) {
        const
            $ = cheerio.load(this.getResponseBody()),
            $resources = $('ul.list-group');

        assert.equals($resources.length, 1);
        assert.equals($resources.find('li').length, this.resourceCount);

        done();
    });

    Then(/^the resource route is rendered$/, function (done) {
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
});
