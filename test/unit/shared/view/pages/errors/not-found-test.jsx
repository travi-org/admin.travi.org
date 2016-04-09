import React from 'react';
import cheerio from 'cheerio';
import reactDom from 'react-dom/server';
import {assert} from 'chai';

import createNotFound from '../../../../../../lib/shared/views/errors/not-found.jsx';

suite('not found', () => {
    const NotFound = createNotFound(React);

    test('that displayName is set', () => {
        assert.equal(NotFound.displayName, 'NotFound');
    });

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<NotFound />));

        assert.equal($('h2').text(), '404');
        assert.equal($('p').text(), 'Page Not Found');
    });
});
