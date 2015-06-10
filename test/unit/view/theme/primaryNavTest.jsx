'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    PrimaryNav = require('../../../../lib/views/theme/primaryNav.jsx');


suite('primary navigation', function () {
    test('that the resource types are listed as links', function () {
        var types = [
                {
                    text: 'foo',
                    path: '/foo'
                },
                {
                    text: 'bar',
                    path: '/bar',
                    active: true
                }
            ],
            element = React.createElement(PrimaryNav, { types: types }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            renderedDOMNode = React.findDOMNode(rendered);

        assert.equal(renderedDOMNode.tagName, 'NAV');

        var links = ReactTestUtils.scryRenderedDOMComponentsWithTag(rendered, 'LI');
        assert.equal(links.length, types.length);
        links.forEach(function (item, index) {
            var listItem = React.findDOMNode(item),
                type = types[index],
                link = listItem.childNodes[0];

            assert.equal(link.textContent, type.text);
            assert.equal(link.pathname, type.path);

            if (type.active) {
                assert.equal(link.className, 'active');
            } else {
                assert.equal(link.className, '');
            }
        });
    });
});
