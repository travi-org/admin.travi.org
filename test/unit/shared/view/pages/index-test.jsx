import React from 'react';
import cheerio from 'cheerio';
import reactDom from 'react-dom/server';
import {assert} from 'chai';

import createIndex from '../../../../../lib/shared/views/index.jsx';

suite('index', () => {
    const Index = createIndex(React);

    test('that displayName is set', () => {
        assert.equal(Index.displayName, 'Index');
    });

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<Index />));

        assert.equal($('h2').text(), 'Reference API Client');
        assert.equal($('p').text(), 'Administration for Travi.org');
    });
});
