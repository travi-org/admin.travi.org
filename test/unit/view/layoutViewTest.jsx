'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    Layout = require('../../../views/index.jsx');

suite('layout view', function () {
    test('that the layout markup is correct', function () {
        var types = [],
            shallowRenderer = ReactTestUtils.createRenderer(),
                element = React.createElement(Layout, {
                    types: types
                }
            ),
            rendered;

        shallowRenderer.render(element);
        rendered = shallowRenderer.getRenderOutput();

        assert.equal('html', rendered.type);
        assert.deepEqual(<body>
            <ul>
                {types.map(function (type) {
                    return <li>{type}</li>
                })}
            </ul>
        </body>, rendered.props.children);
    });
});