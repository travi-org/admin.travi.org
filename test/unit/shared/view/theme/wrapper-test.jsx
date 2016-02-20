'use strict';

const
    React = require('react'),

    any = require('../../../../helpers/any'),
    assert = require('chai').assert,
    skinDeep = require('skin-deep'),

    Wrap = require('../../../../../lib/shared/views/theme/wrap.jsx')(React);

suite('wrapper component', () => {
    test('that the layout markup is correct', () => {

        //shallowRenderer.render(React.createElement(
        //    <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
        //        <Wrap>
        //            <section id="content"/>
        //        </Wrap>
        //    </Provider>
        //));

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
