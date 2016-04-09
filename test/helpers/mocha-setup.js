import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import referee from 'referee';

function setupDom() {
    const
        baseMarkup = '<!DOCTYPE html>',
        window = jsdom.jsdom(baseMarkup).defaultView;

    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
}

setupDom();

chai.use(chaiImmutable);
sinon.assert.expose(chai.assert, { prefix: '' });

referee.format = require('formatio').configure({quoteStrings: false}).ascii;
require('referee-sinon')(referee, sinon);
global.formatio = require('formatio');
