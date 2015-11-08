'use strict';

const
    any = require('../../../helpers/any'),

    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom/server'),
    history = require('history'),
    cheerio = require('cheerio'),
    assert = require('chai').assert,

    HistoryWrapper = require('../../../helpers/history-wrapper'),
    PrimaryNav = require('../../../../lib/views/theme/primary-nav.jsx');

suite('primary navigation', function () {
    test('that the resource types are listed as links', function () {
        const
            primaryNav = any.listOf(function () {
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
        $items.each(function (index, item) {
            const
                $item = $(item),
                type = primaryNav[index],
                $link = $item.find('> a');

            assert.equal($link.text(), type.text);
            assert.equal($link.attr('href'), type.path);

            if (type.active) {
                assert.isTrue($item.hasClass('active'));
            } else {
                assert.isFalse($item.hasClass('active'));
            }
        });
    });
});
