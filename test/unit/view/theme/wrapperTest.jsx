'use strict';

var React = require('react'),
    dom = require('react-dom'),
    assert = require('chai').assert,
    proxyquire = require('proxyquire'),
    any = require('../../../helpers/any'),

    PrimaryNav = require('../../../helpers/primaryNavStub.jsx');
var Wrap = proxyquire('../../../../lib/views/theme/wrap.jsx', {'./primaryNav.jsx': PrimaryNav});


suite('wrapper view', function () {
    let node;

    beforeEach(function () {
        node = document.createElement('div')
    });

    afterEach(function () {
        dom.unmountComponentAtNode(node)
    });

    test('that the layout markup is correct', function () {
        var data = {types: any.listOf(any.string)},
            element = React.createElement(
                Wrap,
                data,
                <section id="content" />
            );

        dom.render(element, node, function () {
            assert.equal(1, node.querySelectorAll('#wrap').length);
            assert.equal(1, node.querySelectorAll('#wrap section').length);
            assert.equal(1, node.querySelectorAll('#primary-nav').length);
            assert.equal(data.types.length, node.querySelectorAll('#nav-items li').length)
        });
    });
});
