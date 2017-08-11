import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import sinon from 'sinon';
import referee from 'referee';
import './dom';

require.extensions['.scss'] = () => undefined;

sinon.assert.expose(chai.assert, {prefix: ''});
chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.use(chaiSubset);

referee.format = require('formatio').configure({quoteStrings: false}).ascii;
require('referee-sinon')(referee, sinon);
global.formatio = require('formatio');

console.error = err => { throw new Error(err); };           // eslint-disable-line no-console
console.warn = warning => { throw new Error(warning); };    // eslint-disable-line no-console
