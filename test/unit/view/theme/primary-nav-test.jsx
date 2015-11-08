'use strict';

const
    any = require('../../../helpers/any'),

    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    assert = require('chai').assert,
    _ = require('lodash'),

    PrimaryNav = require('../../../../lib/views/theme/primary-nav.jsx');

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
            let links;
            const renderedDOMNode = node.childNodes[0];

            assert.equal(renderedDOMNode.tagName, 'NAV');

            links = node.querySelectorAll('li');
            assert.equal(links.length, primaryNav.length);
            _.each(links, function (item, index) {
                const
                    listItem = dom.findDOMNode(item),
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
