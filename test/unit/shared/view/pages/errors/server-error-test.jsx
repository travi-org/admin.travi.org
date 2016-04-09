import React from 'react';
import cheerio from 'cheerio';
import reactDom from 'react-dom/server';
import {assert} from 'chai';

import createNotFound from '../../../../../../lib/shared/views/errors/server-error.jsx';

suite('server error', () => {
    const ServerError = createNotFound(React);

    test('that displayName is set', () => {
        assert.equal(ServerError.displayName, 'ServerError');
    });

    test('that the proper content is displayed', () => {
        const $ = cheerio.load(reactDom.renderToStaticMarkup(<ServerError />));

        assert.equal($('h2').text(), '500');
        assert.equal($('p').text(), 'Server Error');
    });
});
