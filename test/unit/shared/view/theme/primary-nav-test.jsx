import any from '../../../../helpers/any';

import React from 'react';
import dom from 'react-dom/server';
import cheerio from 'cheerio';
import {assert} from 'chai';

import HistoryWrapper from '../../../../helpers/history-wrapper';
const PrimaryNav = require('../../../../../lib/shared/views/theme/primary-nav.jsx')(React);

suite('primary navigation', () => {
    test('that displayName is set', () => {
        assert.equal(PrimaryNav.displayName, 'PrimaryNav');
    });

    test('that the resource types are listed as links', () => {
        const
            primaryNav = any.listOf(() => {
                return {
                    text: any.string(),
                    path: any.url()
                };
            }),

            $ = cheerio.load(dom.renderToStaticMarkup(
                <HistoryWrapper><PrimaryNav primaryNav={primaryNav} /></HistoryWrapper>
            )),
            $items = $('li');

        assert.equal($('nav').length, 1);
        assert.equal($items.length, primaryNav.length);
        $items.each((index, item) => {
            const
                $item = $(item),
                type = primaryNav[index],
                $link = $item.find('> a');

            assert.equal($link.text(), type.text);
            assert.equal($link.attr('href'), type.path);
        });
    });
});
