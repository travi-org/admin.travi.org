'use strict';

var React = require('react'),   //eslint-disable-line no-unused-vars
    dom = require('react-dom'),
    assert = require('chai').assert,
    proxyquire = require('proxyquire'),
    any = require('../../../helpers/any'),

    PrimaryNav = require('../../../helpers/primaryNavStub.jsx');
var DataWrapper = require('../../../../lib/server/temp-data-wrapper'),
    Wrap = proxyquire('../../../../lib/views/theme/wrap.jsx', {'./primaryNav.jsx': PrimaryNav});


suite('wrapper view', function () {
    let node;

    beforeEach(function () {
        node = document.createElement('div');
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node)
    });

    test('that the layout markup is correct', function () {
        var data = {primaryNav: any.listOf(any.string)};

        dom.render(<DataWrapper data={data} ><Wrap><section id="content" /></Wrap></DataWrapper>, node, function () {
            assert.equal(1, node.querySelectorAll('#wrap').length);
            assert.equal(1, node.querySelectorAll('#wrap section').length);
            assert.equal(1, node.querySelectorAll('#primary-nav').length);
            assert.equal(data.primaryNav.length, node.querySelectorAll('#nav-items li').length)
        });
    });
});
