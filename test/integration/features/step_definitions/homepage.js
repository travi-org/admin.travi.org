import {assert} from 'referee';
import {defineSupportCode} from 'cucumber';
import {World} from '../support/world';

defineSupportCode(({When, Then, setWorldConstructor}) => {
  setWorldConstructor(World);

  When(/^the homepage is loaded$/, function (callback) {
    this.makeRequestTo('/', callback);
  });

  Then(/^no resources are listed$/, function (done) {
    assert.equals(this.getResponseBody(), JSON.stringify({primaryNav: []}));

    done();
  });

  Then(/^top level resources are listed$/, function (done) {
    assert.equals(this.getResponseBody(), JSON.stringify({
      primaryNav: this.availableResourceTypes.map(type => ({
        text: type,
        path: `/${type}`
      }))
    }));

    done();
  });
});
