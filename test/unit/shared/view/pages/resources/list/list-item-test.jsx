'use strict';

const
    React = require('react'),

    skinDeep = require('skin-deep'),
    assert = require('chai').assert,
    any = require('../../../../../../helpers/any'),

    ListItem = require('../../../../../../../lib/shared/views/resources/list/list-item.jsx')(React);

suite('list item component', () => {
    test('that displayName is set', () => {
        assert.equal(ListItem.displayName, 'ListItem');
    });

    test('that list item renders', () => {
        const
            resource = {
                id: any.string(),
                displayName: any.string(),
                links: {}
            },

            tree = skinDeep.shallowRender(React.createElement(ListItem, {resource})),
            listGroupItem = tree.findNode('ListGroupItem');

        assert.equal(listGroupItem.key, resource.id);
        assert.equal(listGroupItem.props.children, resource.displayName);
    });

    test('that link renders when self link exists', () => {
        const
            resource = {
                id: any.string(),
                displayName: any.string(),
                links: {
                    self: {
                        href: any.url()
                    }
                }
            },

            tree = skinDeep.shallowRender(React.createElement(ListItem, {resource})),
            listGroupItem = tree.subTree('ListGroupItem');

        assert.isObject(listGroupItem.subTree('Link', {
            to: resource.links.self.href,
            children: resource.displayName,
            onlyActiveOnIndex: false,
            className: '',
            style: {}
        }));
    });
});
