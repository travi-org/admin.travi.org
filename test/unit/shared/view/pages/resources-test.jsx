'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    redux = require('redux'),
    Immutable = require('immutable'),
    cheerio = require('cheerio'),
    any = require('../../../../helpers/any-for-admin'),
    HistoryWrapper = require('../../../../helpers/history-wrapper'),
    ResourceList = require('../../../../../lib/shared/views/resource-list.jsx'),
    Provider = require('react-redux').Provider;

suite('resource list', () => {
    test('that a message is given when no resources are available', () => {
        let $message;
        const
            resourceType = any.string(),
            data = {
                [resourceType]: [],
                resourceType
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <ResourceList />
                </Provider>));

        $message = $('p');
        assert.equals(1, $message.length);
        assert.equals($message.text(), `No ${data.resourceType} are available`);
    });

    test('that resources are listed', () => {
        let $items;
        const
            resourceType = any.string(),
            data = {
                resourceType,
                [resourceType]: [
                    {id: 1, displayName: 'one', links: {}},
                    {id: 2, displayName: 'two', links: {}},
                    {id: 3, displayName: 'three', links: {}}
                ]
            },

            $ = cheerio.load(reactDom.renderToString(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <ResourceList />
                </Provider>));

        assert.equals(1, $('ul').length);

        $items = $('li');
        assert.equals($items.length, data[resourceType].length);
        $items.each((index, item) => {
            let key;
            const
                resource = data[resourceType][index],
                $item = $(item);

            assert.equals($item.text(), resource.displayName);
            key = $item.data('reactid');
            assert.equals(key.substring(key.lastIndexOf('$') + 1), `${resource.id}`);
            assert.equals($item.children('img').length, 0);
        });
    });

    test('that thumbnails are shown when defined', () => {
        const
            resourceType = any.string(),
            data = {
                resourceType,
                [resourceType]: [
                    {id: 1, displayName: 'one', thumbnail: {src: any.url(), size: any.int()}, links: {}}
                ]
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <ResourceList />
                </Provider>));

        assert.equals($('img').attr('src'), data[resourceType][0].thumbnail.src);
    });

    test('that list item links to resource when link is provided', () => {
        const
            resourceType = any.string(),
            selfLink = any.url(),
            data = {
                resourceType,
                [resourceType]: [
                    {id: 1, displayName: 'one', links: {self: {href: selfLink}}}
                ]
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <HistoryWrapper><ResourceList {...data}/></HistoryWrapper>
                </Provider>));

        assert.equals($('li > a').attr('href'), selfLink);
    });
});
