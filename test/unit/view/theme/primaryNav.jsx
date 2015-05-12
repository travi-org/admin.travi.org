'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    PrimaryNav = require('../../../../lib/views/theme/primaryNav.jsx');


suite('primary navigation', function () {
    test('that the resource types are listed as links', function () {
        var types = [
                'foo',
                'bar'
            ],
            element = React.createElement(PrimaryNav, { types: types }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            renderedDOMNode = React.findDOMNode(rendered);

        assert.equal(renderedDOMNode.tagName, 'NAV');

        var links = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'LI');
        assert.equal(links.length, types.length);
        links.forEach(function (item, index) {
            assert.equal(
                React.findDOMNode(item).textContent,
                types[index]
            );
        });
    });
});