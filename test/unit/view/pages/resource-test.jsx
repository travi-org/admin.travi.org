const
    React = require('react'),
    reactDom = require('react-dom/server'),
    cheerio = require('cheerio'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),
    proxyquire = require('proxyquire'),
    DataWrapper = require('../../../../lib/server/view/temp-data-wrapper'),
    LayoutStub = require('../../../helpers/layoutStub.jsx');

var Resource = proxyquire('../../../../lib/views/resource.jsx', {'./theme/wrap.jsx': LayoutStub});

suite('resource', function () {
    'use strict';

    test('that the resource is displayed', function () {
        const data = {
            resource: {id: any.string(), displayName: any.string()}
        };

        const $ = cheerio.load(reactDom.renderToStaticMarkup(<DataWrapper data={data} ><Resource /></DataWrapper>));

        assert.equal($('h3').text(), data.resource.displayName);
    });
});
