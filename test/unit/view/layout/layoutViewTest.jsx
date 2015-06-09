'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,

    Layout = require('../../../../lib/views/layout/layout.jsx'),
    Styles = require('../../../../lib/views/layout/styles.jsx'),
    PrimaryNav = require('../../../../lib/views/theme/primaryNav.jsx');

suite('layout view', function () {
    test('that the layout markup is correct', function () {
        var types = [],
            shallowRenderer = ReactTestUtils.createRenderer(),
            element = React.createElement(
                Layout,
                { types: types},
                <div/>
            ),
            rendered;
        ReactTestUtils.renderIntoDocument(element);
        shallowRenderer.render(element);
        rendered = shallowRenderer.getRenderOutput();

        assert.equal('html', rendered.type);
        var headElement = rendered.props.children[0];
        var bodyElement = rendered.props.children[1];

        assert.deepEqual(
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Permanent+Marker:regular" />
                <Styles />
            </head>,
            headElement
        );

        assert.deepEqual(
            <body>
                <PrimaryNav types={types} />
                <div id="content" className="container">
                    <div/>
                </div>
                <script src="/resources/js/common.js"> </script>
            </body>,
            bodyElement
        );
    });
});
