'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    any = require('../../../../helpers/any-for-admin'),
    repository = require('../../../../../lib/client/repository'),
    Resource = require('../../../../../lib/shared/views/resource.jsx');

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
        const data = {
                resource: {id: any.string(), displayName: any.string()}
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<Resource {...data} />));

        assert.equals($('h3').text(), data.resource.displayName);
    });

    test('that data is fetched by loadProps', () => {
        const
            callback = sinon.spy(),
            params = {
                type: any.string(),
                id: any.int()
            };

        Resource.loadProps(params, callback);

        assert.calledWith(repository.getResource, params.type, params.id, callback);
    });
});
