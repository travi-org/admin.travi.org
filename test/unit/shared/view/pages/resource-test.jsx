'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    redux = require('redux'),
    cheerio = require('cheerio'),
    Immutable = require('immutable'),
    any = require('../../../../helpers/any-for-admin'),
    repository = require('../../../../../lib/client/repository'),
    Resource = require('../../../../../lib/shared/views/resource.jsx'),
    Provider = require('react-redux').Provider;

suite('resource', () => {
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(repository, 'getResource');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that the resource is displayed', () => {
        const data = {resource: {id: any.string(), displayName: any.string()}},

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                    <Resource />
                </Provider>));

        assert.equals($('h3').text(), data.resource.displayName);
    });
});
