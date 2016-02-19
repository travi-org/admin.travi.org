'use strict';

const
    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    redux = require('redux'),
    Immutable = require('immutable'),
    proxyquire = require('proxyquire'),

    any = require('../../../../helpers/any'),
    assert = require('chai').assert,

    PrimaryNav = require('../../../../helpers/primary-nav-stub.jsx'),
    Provider = require('react-redux').Provider;

suite('wrapper view', () => {
    const Wrap = proxyquire('../../../../../lib/shared/views/theme/wrap.jsx', {'./primary-nav.jsx': PrimaryNav})(React);
    let node;

    setup(() => {
        node = document.createElement('div');
    });

    teardown(() => {
        dom.unmountComponentAtNode(node);
    });

    test('that the layout markup is correct', () => {
        const data = {primaryNav: any.listOf(any.string)};

        dom.render(
            <Provider store={redux.createStore((state) => state, Immutable.fromJS(data))}>
                <Wrap><section id="content" /></Wrap>
            </Provider>,
            node,
            () => {
                assert.equal(node.children[0].className, 'container');
                assert.equal(1, node.querySelectorAll('section').length);
                assert.equal(1, node.querySelectorAll('#primary-nav').length);
                assert.equal(data.primaryNav.length, node.querySelectorAll('#nav-items li').length);
            }
        );
    });
});
