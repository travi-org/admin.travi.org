'use strict';

const
    jsdom = require('jsdom'),
    chai = require('chai'),
    chaiImmutable = require('chai-immutable'),
    sinon = require('sinon'),
    referee = require('referee');

function setupDom() {
    const baseMarkup = '<!DOCTYPE html>',
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
global.fomatio = require('formatio');
