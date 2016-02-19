'use strict';

const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),
    assert = require('chai').assert,

    createNotFound = require('../../../../../../lib/shared/views/errors/not-found.jsx');

suite('not found', () => {
    const NotFound = createNotFound(React);

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<NotFound />));

        assert.equal($('h2').text(), '404');
        assert.equal($('p').text(), 'Page Not Found');
    });
});
