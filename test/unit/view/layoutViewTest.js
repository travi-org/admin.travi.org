'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),

    Layout = require('../../../views/index.jsx');

suite('layout view', function () {
    test('that the layout markup is correct', function () {
        var shallowRenderer = ReactTestUtils.createRenderer();
        var element = React.createElement(Layout);
        shallowRenderer.render(element);
        var rendered = shallowRenderer.getRenderOutput();

        assert.equals(rendered.type, 'html');
    });
});