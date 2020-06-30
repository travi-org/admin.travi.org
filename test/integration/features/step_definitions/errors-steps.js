import nock from 'nock';
import {assert} from 'referee';
import cheerio from 'cheerio';
import {setWorldConstructor, Given, Then} from 'cucumber';
import {World} from '../support/world';

setWorldConstructor(World);

Given(/^the api is down$/, function (callback) {
  nock('https://api.travi.org')
    .get('/')
    .times(2)
    .replyWithError('something awful happened');

  callback();
});

Then(/^a "([^"]*)" status code should be returned$/, function (statusCode, done) {
  assert.equals(this.serverResponse.statusCode, parseInt(statusCode, 10));

  done();
});

Then(/^the "([^"]*)" page should be displayed$/, function (statusCode, done) {
  const $ = cheerio.load(this.getResponseBody());

  assert.equals($('h2').text(), statusCode);

  done();
});
