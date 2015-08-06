var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),
    proxyquire = require('proxyquire'),
    LayoutStub = require('../../../helpers/layoutStub.jsx');

var Resource = proxyquire('../../../../lib/views/resource.jsx', {'./layout/layout.jsx': LayoutStub});

suite('resource', function () {
    'use strict';

    test('that the resource is displayed', function () {
        var resource = {id: any.string(), displayName: any.string()},
            element = React.createElement(Resource, {
                resource: resource
            }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub);

        assert.equal(
            React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(layoutComponent, 'h3')).textContent,
            resource.displayName
        );
    });
});
