'use strict';

const
    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    proxyquire = require('proxyquire'),
    any = require('../../../../helpers/any'),
    repository = require('../../../../../lib/client/repository'),
    PrimaryNav = require('../../../../helpers/primary-nav-stub.jsx');

suite('wrapper view', () => {
    const Wrap = proxyquire('../../../../../lib/shared/views/theme/wrap.jsx', {'./primary-nav.jsx': PrimaryNav});
    let node,
        sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(repository, 'getResourceTypes');

        node = document.createElement('div');
    });

    teardown(() => {
        sandbox.restore();

        dom.unmountComponentAtNode(node);
    });

    test('that the layout markup is correct', () => {
        const data = {primaryNav: any.listOf(any.string)};

        dom.render(<Wrap {...data}><section id="content" /></Wrap>, node, () => {
            assert.equals(node.children[0].className, 'container');
            assert.equals(1, node.querySelectorAll('section').length);
            assert.equals(1, node.querySelectorAll('#primary-nav').length);
            assert.equals(data.primaryNav.length, node.querySelectorAll('#nav-items li').length);
        });
    });

    test('that data is fetched by loadProps', () => {
        const callback = sinon.spy();

        Wrap.loadProps(null, callback);

        assert.calledWith(repository.getResourceTypes, callback);
    });
});
