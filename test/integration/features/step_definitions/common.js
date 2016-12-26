import nock from 'nock';
import {defineSupportCode} from 'cucumber';
import {World} from '../support/world';
import loadApi from '../../../../lib/server/app';

defineSupportCode(({Before, After, setWorldConstructor}) => {
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
});
