import nock from 'nock';
import {assert} from 'referee';
import cheerio from 'cheerio';

module.exports = function () {
    this.World = require('../support/world.js').World;

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

    this.Then(/^the "([^"]*)" page should be displayed$/, function (statusCode, done) {
        const $ = cheerio.load(this.getResponseBody());

        assert.equals($('h2').text(), statusCode);

        done();
    });
};
