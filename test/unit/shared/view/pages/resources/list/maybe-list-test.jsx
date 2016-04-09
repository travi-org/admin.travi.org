import React from 'react';

import skinDeep from 'skin-deep';
import {assert} from 'chai';
import any from '../../../../../../helpers/any';

const MaybeList = require('../../../../../../../lib/shared/views/resources/list/maybe-list.jsx')(React);

suite('maybe-list component', () => {
    test('that displayName is set', () => {
        assert.equal(MaybeList.displayName, 'MaybeResourceList');
    });

    test('that message is displayed if the resource list is empty', () => {
        const
            resourceType = any.string(),

            tree = skinDeep.shallowRender(React.createElement(MaybeList, {
                resources: [],
                resourceType
            }));

        assert.isObject(tree.subTree('p', {
            className: 'alert alert-info',
            children: [
                'No ',
                resourceType,
                ' are available'
            ]
        }));
    });

    test('that list is rendered when not empty', () => {
        const
            resources = any.listOf(any.simpleObject),

            tree = skinDeep.shallowRender(React.createElement(MaybeList, {resources}));

        assert.isObject(tree.subTree('ResourceList', {resources}));
    });
});
