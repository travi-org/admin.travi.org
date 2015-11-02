'use strict';

var React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),
    proxyquire = require('proxyquire'),
    DataWrapper = require('../../../../lib/server/temp-data-wrapper'),
    LayoutStub = require('../../../helpers/layoutStub.jsx');

var ResourceList = proxyquire('../../../../lib/views/resource-list.jsx', {'./theme/wrap.jsx': LayoutStub});

suite('resource list', function () {
    test('that a message is given when no resources are available', function () {
        const data = {
            resourceType: any.string(),
            resources: []
        };

        const $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        var $message = $('p');
        assert.equal(1, $message.length);
        assert.equal($message.text(), 'No ' + data.resourceType + ' are available');
    });

    test('that resources are listed', function () {
        const data = {
            resourceType: any.string(),
            resources: [
                {id: 1, displayName: 'one', links: {}},
                {id: 2, displayName: 'two', links: {}},
                {id: 3, displayName: 'three', links: {}}
            ]
        };

        const $ = cheerio.load(reactDom.renderToString(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        assert.equal(1, $('ul').length);

        const $items = $('li');
        assert.equal($items.length, data.resources.length);
        $items.each(function (index, item) {
            const resource = data.resources[index],
                $item = $(item);

            assert.equal($item.text(), resource.displayName);
            var key = $item.data('reactid');
            assert.equal(key.substring(key.indexOf('$') + 1), resource.id);
            assert.equal($item.children('img').length, 0);
        });
    });

    test('that thumbnails are shown when defined', function () {
        const data = {
            resourceType: any.string(),
            resources: [
                {id: 1, displayName: 'one', thumbnail: {src: any.url(), size: any.int()}, links: {}}
            ]
        };

        const $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        assert.equal($('img').attr('src'), data.resources[0].thumbnail.src);
    });

    test('that list item links to resource when link is provided', function () {
        const
            selfLink = any.url(),
            data = {
                resourceType: any.string(),
                resources: [
                    {id: 1, displayName: 'one', links: {self: {href: selfLink}}}
                ]
            };

        const $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        assert.equal($('li > a').attr('href'), selfLink);
    });
});
