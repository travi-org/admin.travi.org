'use strict';

const
    React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    assert = require('chai').assert,
    any = require('../../../../helpers/any-for-admin'),
    DataWrapper = require('../../../../../lib/server/view/temp-data-wrapper'),
    Resource = require('../../../../../lib/shared/views/resource.jsx');

suite('resource', function () {
    test('that the resource is displayed', function () {
        const
            data = {
                resource: {id: any.string(), displayName: any.string()}
            },

            $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><Resource /></DataWrapper>));

        assert.equal($('h3').text(), data.resource.displayName);
    });
});
