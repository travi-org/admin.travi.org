'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    Styles = require('../../../../lib/views/layout/styles.jsx');

suite('styles', function () {
    test('that the style sheets are listed as link tags', function () {
        var element = React.createElement(Styles),
            rendered = ReactTestUtils.renderIntoDocument(element),
            renderedDOMNode;

        var links = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'LINK');

        assert.equal(links.length, 1);

        renderedDOMNode = React.findDOMNode(links[0]);
        assert.equal(renderedDOMNode.rel, 'stylesheet');
        assert.equal(renderedDOMNode.href, '/resources/css/theme.css');
    });
});
