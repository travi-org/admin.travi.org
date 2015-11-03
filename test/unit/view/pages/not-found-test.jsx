const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),

    createNotFound = require('../../../../lib/views/not-found.jsx'),
    NotFound = createNotFound(React);

require('setup-referee-sinon/globals');

suite('not found', function () {
    test('that the proper content is displayed', function () {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<NotFound />));

        assert.equals($('h2').text(), '404');
        assert.equals($('p').text(), 'Page Not Found');
    });
});
