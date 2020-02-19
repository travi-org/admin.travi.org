import cheerio from 'cheerio';
import {assert} from 'referee';
import {setWorldConstructor, Given, Then} from 'cucumber';
import {World} from '../support/world';

setWorldConstructor(World);

Given(/^html is requested$/, function (callback) {
  this.mime = 'text/html';

  callback();
});

Then(/^the primary nav is rendered$/, function (done) {
  const $ = cheerio.load(this.getResponseBody());
  const $primaryNav = $('#wrap')
    .find('ul.navbar-nav');
  const expectedLinkCount = this.availableResourceTypes.length + Object.keys(this.apiResponseLinks).length;

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

Then(/^the resource-list route is rendered$/, function (done) {
  const $ = cheerio.load(this.getResponseBody());
  const $resources = $('ul.list-group');

  assert.equals($resources.length, 1);
  assert.equals($resources.find('li').length, this.resourceCount);

  done();
});

Then(/^the resource route is rendered$/, function (done) {
  const $ = cheerio.load(this.getResponseBody());
  const $heading = $('h3');

  assert.equals($heading.length, 1);
  // TODO: this check needs to be more generic so that multiple resource types are handled properly
  // assert.equals(
  //    $heading.text(),
  //    `${this.existingResource['first-name']} ${this.existingResource['last-name']}`
  // );

  done();
});

Then('the static assets are included', function (done) {
  const $ = cheerio.load(this.getResponseBody());
  const scripts = $('script')
    .map((index, script) => $(script)
      .attr('src'))
    .get();
  const stylesheets = $('link[rel=stylesheet]')
    .map((index, sheet) => $(sheet)
      .attr('href'))
    .get();

  assert.match(scripts[1], 'manifest');
  assert.match(scripts[2], 'vendor');
  assert.match(scripts[3], 'main');
  assert.match(stylesheets[1], 'main');

  done();
});
