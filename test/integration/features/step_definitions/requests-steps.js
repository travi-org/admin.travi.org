import {setWorldConstructor, When} from 'cucumber';
import {World} from '../support/world';

setWorldConstructor(World);

When(/^a request is made to "([^"]*)"$/, function (path, callback) {
  this.makeRequestTo(path, callback);
});
