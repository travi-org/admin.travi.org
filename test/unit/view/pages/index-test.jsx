const
    React = require('react'),
    cheerio = require('cheerio'),
    reactDom = require('react-dom/server'),

    createIndex = require('../../../../lib/views/index.jsx');

require('setup-referee-sinon/globals');

suite('index', function () {
    const Index = createIndex(React);

    test('that the proper content is displayed', function () {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<Index />));

        assert.equals($('h2').text(), 'Reference API Client');
        assert.equals($('p').text(), 'Administration for Travi.org');
    });
});
