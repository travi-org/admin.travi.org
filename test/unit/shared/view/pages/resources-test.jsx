'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    any = require('../../../../helpers/any-for-admin'),
    repository = require('../../../../../lib/client/repository'),
    HistoryWrapper = require('../../../../helpers/history-wrapper'),
    ResourceList = require('../../../../../lib/shared/views/resource-list.jsx');

suite('resource list', function () {
    let sandbox;

    setup(function () {
        sandbox = sinon.sandbox.create();
        sandbox.stub(repository, 'getResources');
    });

    teardown(function () {
        sandbox.restore();
    });

    test('that a message is given when no resources are available', function () {
        let $message;
        const
            data = {
                resourceType: any.string(),
                resources: []
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<ResourceList {...data} />));

        $message = $('p');
        assert.equals(1, $message.length);
        assert.equals($message.text(), `No ${data.resourceType} are available`);
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

            $ = cheerio.load(reactDom.renderToString(<ResourceList {...data} />));

        assert.equals(1, $('ul').length);

        $items = $('li');
        assert.equals($items.length, data.resources.length);
        $items.each(function (index, item) {
            let key;
            const
                resource = data.resources[index],
                $item = $(item);

            assert.equals($item.text(), resource.displayName);
            key = $item.data('reactid');
            assert.equals(key.substring(key.indexOf('$') + 1), `${resource.id}`);
            assert.equals($item.children('img').length, 0);
        });
    });

    test('that thumbnails are shown when defined', function () {
        const data = {
                resourceType: any.string(),
                resources: [
                    {id: 1, displayName: 'one', thumbnail: {src: any.url(), size: any.int()}, links: {}}
                ]
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<ResourceList {...data} />));

        assert.equals($('img').attr('src'), data.resources[0].thumbnail.src);
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

            $ = cheerio.load(reactDom.renderToStaticMarkup(<HistoryWrapper><ResourceList {...data}/></HistoryWrapper>));

        assert.equals($('li > a').attr('href'), selfLink);
    });

    test('that data is fetched by loadProps', function () {
        const
            callback = sinon.spy(),
            params = {
                type: any.string()
            };

        ResourceList.loadProps(params, callback);

        assert.calledWith(repository.getResources, params.type, callback);
    });
});
