'use strict';

const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),

    createNotFound = require('../../../../../../lib/shared/views/errors/not-found.jsx');

require('setup-referee-sinon/globals');

suite('not found', () => {
    const NotFound = createNotFound(React);

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<NotFound />));

        assert.equals($('h2').text(), '404');
        assert.equals($('p').text(), 'Page Not Found');
    });
});
