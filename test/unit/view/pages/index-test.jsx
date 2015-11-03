const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),

    createIndex = require('../../../../lib/views/index.jsx'),
    Index = createIndex(React);

require('setup-referee-sinon/globals');

suite('index', function () {
    test('that the proper content is displayed', function () {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<Index />));

        assert.equals($('h2').text(), 'Reference API Client');
        assert.equals($('p').text(), 'Administration for Travi.org');
    });
});
