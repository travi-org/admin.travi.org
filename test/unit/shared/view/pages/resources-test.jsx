'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    assert = require('chai').assert,
    any = require('../../../../helpers/any-for-admin'),
    HistoryWrapper = require('../../../../helpers/history-wrapper'),
    DataWrapper = require('../../../../../lib/server/view/temp-data-wrapper'),
    ResourceList = require('../../../../../lib/shared/views/resource-list.jsx');

suite('resource list', function () {
    test('that a message is given when no resources are available', function () {
        let $message;
        const
            data = {
                resourceType: any.string(),
                resources: []
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        $message = $('p');
        assert.equal(1, $message.length);
        assert.equal($message.text(), `No ${data.resourceType} are available`);
    });

    test('that resources are listed', function () {
        let $items;
        const
            data = {
                resourceType: any.string(),
                resources: [
                    {id: 1, displayName: 'one', links: {}},
                    {id: 2, displayName: 'two', links: {}},
                    {id: 3, displayName: 'three', links: {}}
                ]
            },

            $ = cheerio.load(reactDom.renderToString(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

        assert.equal(1, $('ul').length);

        $items = $('li');
        assert.equal($items.length, data.resources.length);
        $items.each(function (index, item) {
            let key;
            const
                resource = data.resources[index],
                $item = $(item);

            assert.equal($item.text(), resource.displayName);
            key = $item.data('reactid');
            assert.equal(key.substring(key.indexOf('$') + 1), resource.id);
            assert.equal($item.children('img').length, 0);
        });
    });

    test('that thumbnails are shown when defined', function () {
        const
            data = {
                resourceType: any.string(),
                resources: [
                    {id: 1, displayName: 'one', thumbnail: {src: any.url(), size: any.int()}, links: {}}
                ]
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><ResourceList /></DataWrapper>));

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
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <HistoryWrapper>
                    <DataWrapper data={data} >
                        <ResourceList />
                    </DataWrapper>
                </HistoryWrapper>
            ));

        assert.equal($('li > a').attr('href'), selfLink);
    });
});
