import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiAsPromised from 'chai-as-promised';
import chaiSubset from 'chai-subset';
import sinon from 'sinon';
import referee from 'referee';
import 'sinon-as-promised';

function setupDom() {
    const
        baseMarkup = '<!DOCTYPE html>',
        window = jsdom.jsdom(baseMarkup).defaultView;

    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
}

setupDom();

require.extensions['.scss'] = () => undefined;

chai.use(chaiImmutable);
chai.use(chaiAsPromised);
chai.use(chaiSubset);
sinon.assert.expose(chai.assert, { prefix: '' });

referee.format = require('formatio').configure({quoteStrings: false}).ascii;
require('referee-sinon')(referee, sinon);
global.formatio = require('formatio');
