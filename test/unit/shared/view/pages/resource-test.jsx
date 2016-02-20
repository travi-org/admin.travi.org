'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    redux = require('redux'),
    cheerio = require('cheerio'),
    Immutable = require('immutable'),

    Resource = require('../../../../../lib/shared/views/resource.jsx')(React),
    Provider = require('react-redux').Provider,

    any = require('../../../../helpers/any-for-admin'),
    assert = require('chai').assert;

suite('resource', () => {
    test('that the resource is displayed', () => {
        const data = {resource: {id: any.string(), displayName: any.string()}},

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <Resource />
                </Provider>));

        assert.equal($('h3').text(), data.resource.displayName);
    });
});
