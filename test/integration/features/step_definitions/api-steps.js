import {listOf, word} from '@travi/any';
import _ from 'lodash';
import {setWorldConstructor, Before, Given} from 'cucumber';
import {World} from '../support/world';

setWorldConstructor(World);

Before(function () {
  this.availableResourceTypes = [];
});

Given(/^user has no api privileges$/, function (callback) {
  this.stubApiCatalogCall();

  callback();
});

Given(/^user has api privileges$/, function (callback) {
  this.availableResourceTypes = _.uniq(listOf(word, {
    min: 1
  }));

  this.stubApiCatalogCall();

  callback();
});
