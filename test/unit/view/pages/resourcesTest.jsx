'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),
    proxyquire = require('proxyquire'),

    LayoutStub = require('../../../helpers/layoutStub.jsx'),
    ResourceList = proxyquire('../../../../lib/views/resourceList.jsx', {'./index.jsx': LayoutStub});

suite('resource list', function () {
    test('that a message is given when no resources are available', function () {
        var resourceType = any.string(),
            element = React.createElement(ResourceList, {
                resources: [],
                resourceType: resourceType,
                types: [
                    'foo',
                    'bar'
                ]
            }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub);

        var content = layoutComponent.props.children;
        assert.equal(content.type, 'p');
        assert.equal(content.props.children.join(''), 'No ' + resourceType + ' are available');
    });
});
