import React from 'react';

import any from '../../../../../helpers/any';
import {assert} from 'chai';
import skinDeep from 'skin-deep';

import createWrap from '../../../../../../lib/shared/views/theme/wrap/wrap.jsx';

suite('wrapper component', () => {
    const Wrap = createWrap(React);

    test('that displayName is set', () => {
        assert.equal(Wrap.displayName, 'Wrap');
    });

    test('that the layout markup is correct', () => {
        const
            primaryNav = any.listOf(any.simpleObject),
            children = 'foo',

            tree = skinDeep.shallowRender(React.createElement(Wrap, {primaryNav}, children)),
            result = tree.getRenderOutput();

        assert.equal(result.type, 'div');
        assert.equal(result.props.className, 'container');

        assert.isObject(tree.subTree('PrimaryNav', {primaryNav}));
        assert.equal(tree.props.children[1], children);
    });
});
