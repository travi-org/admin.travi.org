'use strict';

var jsdom = require('jsdom');

function setupDom() {
    var baseMarkup = '<!DOCTYPE html>',
        window = jsdom.jsdom(baseMarkup).defaultView;

    global.window = window;
    global.document = window.document;
    global.navigator = window.navigator;
}

setupDom();