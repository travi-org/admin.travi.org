'use strict';

const
    any = require('../../../../helpers/any'),

    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom/server'),
    cheerio = require('cheerio'),
    assert = require('chai').assert,

    HistoryWrapper = require('../../../../helpers/history-wrapper'),
    PrimaryNav = require('../../../../../lib/shared/views/theme/primary-nav.jsx')(React);

suite('primary navigation', () => {
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
