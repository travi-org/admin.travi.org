'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),

    ResourceList = require('../../../../lib/views/resourceList.jsx');

suite('resource list', function () {
    test('that a message is given when no resources are available', function () {
        var resourceType = any.string(),
            element = React.createElement(ResourceList, {
                resources: [],
                resourceType: resourceType
            }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            renderedDOMNode = React.findDOMNode(rendered);

        assert.equal(renderedDOMNode.tagName, 'P');
        assert.equal(renderedDOMNode.textContent, 'No ' + resourceType + ' are available');
    });
});
