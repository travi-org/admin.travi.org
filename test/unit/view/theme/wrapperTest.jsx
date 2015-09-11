'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    proxyquire = require('proxyquire'),

    PrimaryNav = require('../../../helpers/primaryNavStub.jsx');
var Wrap = proxyquire('../../../../lib/views/theme/wrap.jsx', {'./primaryNav.jsx': PrimaryNav});


suite('wrapper view', function () {
    test('that the layout markup is correct', function () {
        var data = {types: []},
            element = React.createElement(
                Wrap,
                data,
                <div/>
            ),
            rendered = ReactTestUtils.renderIntoDocument(element);

        var wrap = ReactTestUtils.findRenderedDOMComponentWithTag(rendered, 'div');
        var nav = ReactTestUtils.findRenderedComponentWithType(wrap, PrimaryNav);

        assert.equal(wrap.props.id, 'wrap');
        assert.deepEqual(nav.props, data);
    });
});
