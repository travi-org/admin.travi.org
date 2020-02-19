import nock from 'nock';
import {setWorldConstructor, After, Before} from 'cucumber';
import {World} from '../support/world';
import loadApi from '../../../../src/server/app';

setWorldConstructor(World);

Before(function (scenario, callback) {
  nock.disableNetConnect();
  this.mime = 'application/json';

  loadApi.then(() => callback());
});

After(function () {
  nock.enableNetConnect();
  nock.cleanAll();
  this.mime = null;
  this.serverResponse = null;
});
