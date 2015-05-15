'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    Layout = require('../../../../lib/views/index.jsx'),
    Styles = require('../../../../lib/views/layout/styles.jsx'),
    PrimaryNav = require('../../../../lib/views/theme/primaryNav.jsx');

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
        assert.deepEqual([
            <head>
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Permanent+Marker:regular" />
                <Styles />
            </head>,
            <body>
                <PrimaryNav types={types} />
            </body>
        ], rendered.props.children);
    });
});
