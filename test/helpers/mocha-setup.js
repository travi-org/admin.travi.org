import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import sinon from 'sinon';
import referee from 'referee';

sinon.behavior = require('sinon/lib/sinon/behavior');

sinon.defaultConfig = {
  injectInto: null,
  properties: ['spy', 'stub', 'mock', 'clock', 'server', 'requests'],
  useFakeTimers: true,
  useFakeServer: true
};
require('sinon-as-promised');

function setupDom() {
  const baseMarkup = '<!DOCTYPE html>';
  const window = jsdom.jsdom(baseMarkup).defaultView;

  global.window = window;
  global.document = window.document;
  global.navigator = window.navigator;
}

setupDom();

require.extensions['.scss'] = () => undefined;

sinon.assert.expose(chai.assert, {prefix: ''});
chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.use(chaiSubset);

referee.format = require('formatio').configure({quoteStrings: false}).ascii;
require('referee-sinon')(referee, sinon);
global.formatio = require('formatio');

console.error = warning => { throw new Error(warning); };   // eslint-disable-line no-console
