import React from 'react';

import skinDeep from 'skin-deep';
import {assert} from 'chai';
import any from '../../../../../../helpers/any';

import createResourceList from '../../../../../../../lib/shared/views/resources/list/list.jsx';
const ResourceList = createResourceList(React);

function assertSimpleResourceRenders(listItem, resource) {
    assert.deepEqual(listItem.props.children, ['', resource.displayName]);
}

function assertLinkRendersWhenSelfLinkIsDefined(listItem, resource) {
    assert.isObject(listItem.subTree('Link', {
        to: resource.links.self.href,
        children: resource.displayName,
        onlyActiveOnIndex: false,
        style: {}
    }));
}

function assertThumbnailRendersWhenDefined(listItem, resource) {
    assert.isObject(listItem.subTree('img', {
        src: resource.thumbnail.src,
        className: 'thumbnail'
    }));
}

suite('resource list component', () => {
    const resources = [
        {
            id: any.string(),
            displayName: any.string(),
            links: {}
        },
        {
            id: any.string(),
            displayName: any.string(),
            links: {
                self: {
                    href: any.url()
                }
            }
        },
        {
            id: any.string(),
            displayName: any.string(),
            links: {},
            thumbnail: {
                src: any.url()
            }
        }
    ];

    test('that displayName is set', () => {
        assert.equal(ResourceList.displayName, 'ResourceList');
    });

    test('that list renders', () => {
        const
            tree = skinDeep.shallowRender(React.createElement(ResourceList, {resources})),
            trees = tree.everySubTree('ListGroupItem');

        assertSimpleResourceRenders(trees[0], resources[0]);
        assertLinkRendersWhenSelfLinkIsDefined(trees[1], resources[1]);
        assertThumbnailRendersWhenDefined(trees[2], resources[2]);
    });
});
