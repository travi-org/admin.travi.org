import {defineSupportCode} from 'cucumber';
import {World} from '../support/world';

defineSupportCode(({When, setWorldConstructor}) => {
  setWorldConstructor(World);

  When(/^a request is made to "([^"]*)"$/, function (path, callback) {
    this.makeRequestTo(path, callback);
  });
});
