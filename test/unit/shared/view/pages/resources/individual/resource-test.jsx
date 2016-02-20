'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),

    cheerio = require('cheerio'),
    any = require('../../../../../../helpers/any'),
    assert = require('assert'),

    Resource = require('../../../../../../../lib/shared/views/resources/individual/resource')(React);

suite('resource component test', () => {
    test('that displayName is set', () => {
        assert.equal(Resource.displayName, 'Resource');
    });

    test('that the resource is displayed', () => {
        const data = {resource: {id: any.string(), displayName: any.string()}},

            $ = cheerio.load(reactDom.renderToStaticMarkup(
                <Resource {...data} />
            ));

        assert.equal($('h3').text(), data.resource.displayName);
    });
});
