var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    proxyquire = require('proxyquire'),
    LayoutStub = require('../../../helpers/layoutStub.jsx');

var Resource = proxyquire('../../../../lib/views/resource.jsx', {'./layout/layout.jsx': LayoutStub});

suite('resource', function () {
    test('that the resource is displayed', function () {
        var element = React.createElement(Resource, {

            }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub),
            content = layoutComponent.props.children;

        console.log(content);
    });
});
