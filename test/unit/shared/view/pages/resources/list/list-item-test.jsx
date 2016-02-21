'use strict';

const
    React = require('react'),

    skinDeep = require('skin-deep'),
    assert = require('chai').assert,
    any = require('../../../../../../helpers/any'),

    ListItem = require('../../../../../../../lib/shared/views/resources/list/list-item.jsx')(React);

suite('list item component', () => {
    test('that list item renders', () => {
        const
            resource = {
                id: any.string(),
                displayName: any.string()
            },

            tree = skinDeep.shallowRender(React.createElement(ListItem, {resource})),
            listGroupItem = tree.findNode('ListGroupItem');

        assert.equal(listGroupItem.key, resource.id);
        assert.equal(listGroupItem.props.children, resource.displayName);
    });
});
