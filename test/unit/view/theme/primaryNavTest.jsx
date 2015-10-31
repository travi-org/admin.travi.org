'use strict';

const
    any = require('../../../helpers/any'),

    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    assert = require('chai').assert,
    _ = require('lodash'),

    PrimaryNav = require('../../../../lib/views/theme/primaryNav.jsx');

suite('primary navigation', function () {
    let node;

    beforeEach(function () {
        node = document.createElement('div');
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node);
    });

    test('that the resource types are listed as links', function () {
        const primaryNav = any.listOf(function () {
            return {
                text: any.string(),
                path: any.url()
            };
        });

        dom.render(<PrimaryNav primaryNav={primaryNav} />, node, function () {
            var renderedDOMNode = node.childNodes[0];

            assert.equal(renderedDOMNode.tagName, 'NAV');

            const links = node.querySelectorAll('li');
            assert.equal(links.length, primaryNav.length);
            _.each(links, function (item, index) {
                var listItem = dom.findDOMNode(item),
                    type = primaryNav[index],
                    link = listItem.childNodes[0];

                assert.equal(link.textContent, type.text);
                assert.equal(link.href, type.path);

                if (type.active) {
                    assert.equal(listItem.className, 'active');
                } else {
                    assert.equal(listItem.className, '');
                }
            });
        });
    });
});
