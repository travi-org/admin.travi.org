'use strict';

const
    jsdom = require('jsdom'),
    chai = require('chai'),
    chaiImmutable = require('chai-immutable');

function setupDom() {
    const baseMarkup = '<!DOCTYPE html>',
        window = jsdom.jsdom(baseMarkup).defaultView;

    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
}

setupDom();
chai.use(chaiImmutable);
