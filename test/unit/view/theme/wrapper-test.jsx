const
    React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    assert = require('chai').assert,
    proxyquire = require('proxyquire'),
    any = require('../../../helpers/any'),
    DataWrapper = require('../../../../lib/server/view/temp-data-wrapper'),
    PrimaryNav = require('../../../helpers/primaryNavStub.jsx');

const
    Wrap = proxyquire('../../../../lib/views/theme/wrap.jsx', {'./primaryNav.jsx': PrimaryNav});


suite('wrapper view', function () {
    'use strict';

    let node;

    beforeEach(function () {
        node = document.createElement('div');
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node);
    });

    test('that the layout markup is correct', function () {
        const data = {primaryNav: any.listOf(any.string)};

        dom.render(<DataWrapper data={data} ><Wrap><section id="content" /></Wrap></DataWrapper>, node, function () {
            assert.equal(1, node.querySelectorAll('#wrap').length);
            assert.equal(1, node.querySelectorAll('#wrap section').length);
            assert.equal(1, node.querySelectorAll('#primary-nav').length);
            assert.equal(data.primaryNav.length, node.querySelectorAll('#nav-items li').length);
        });
    });
});
