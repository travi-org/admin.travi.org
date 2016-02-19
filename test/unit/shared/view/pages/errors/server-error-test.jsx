'use strict';

const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),
    assert = require('chai').assert,

    createNotFound = require('../../../../../../lib/shared/views/errors/server-error.jsx');

suite('server error', () => {
    const ServerError = createNotFound(React);

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<ServerError />));

        assert.equal($('h2').text(), '500');
        assert.equal($('p').text(), 'Server Error');
    });
});
