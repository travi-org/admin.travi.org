'use strict';

var React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),
    assert = require('chai').assert,
    any = require('../../../helpers/any-for-admin'),
    proxyquire = require('proxyquire'),
    LayoutStub = require('../../../helpers/layoutStub.jsx');

var ResourceList = proxyquire('../../../../lib/views/resourceList.jsx', {'./theme/wrap.jsx': LayoutStub});

suite('resource list', function () {
    test('that a message is given when no resources are available', function () {
        var resourceType = any.string(),
            element = React.createElement(ResourceList, {
                resources: [],
                resourceType: resourceType,
                types: [
                    'foo',
                    'bar'
                ]
            }),
            rendered = ReactTestUtils.renderIntoDocument(element),
            layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub);

        var content = layoutComponent.props.children;
        assert.equal(content.type, 'p');
        assert.equal(content.props.children.join(''), 'No ' + resourceType + ' are available');
    });

    test('that resources are listed', function () {
        var resourceType = any.string(),
            resources = [
                {id: 1, displayName: 'one', links: {}},
                {id: 2, displayName: 'two', links: {}},
                {id: 3, displayName: 'three', links: {}}
            ],
            element = React.createElement(ResourceList, {
                resources: resources,
                resourceType: resourceType,
                types: [
                    'foo',
                    'bar'
                ]
            }),
            rendered = ReactTestUtils.renderIntoDocument(element);

        var layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub),
            content = React.Children.only(layoutComponent.props.children);

        assert.equal(content.type, 'ul');
        assert.equal(React.Children.count(content.props.children), resources.length);
        React.Children.forEach(content.props.children, function (item, index) {
            var resource = resources[index];

            assert.equal(item.type, 'li');
            assert.equal(item.props.children[1], resource.displayName);
            assert.equal(item.key, resource.id);
            assert.notEqual(item.props.children[0].type, 'img');
        });
    });

    test('that thumbnails are shown when defined', function () {
        var resourceType = any.string(),
            resources = [
                {id: 1, displayName: 'one', thumbnail: {src: any.url(), size: any.int()}, links: {}}
            ],
            element = React.createElement(ResourceList, {
                resources: resources,
                resourceType: resourceType,
                types: [
                    'foo',
                    'bar'
                ]
            }),
            rendered = ReactTestUtils.renderIntoDocument(element);

        var layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub),
            items = ReactTestUtils.scryRenderedDOMComponentsWithTag(layoutComponent, 'li');

        var item = items[0],
            img = item.props.children[0];

        assert.equal(img.type, 'img');
        assert.equal(resources[0].thumbnail.src, img.props.src);
    });

    test('that list item links to resource when link is provided', function () {
        var selfLink = any.url(),
            resourceType = any.string(),
            resources = [
                {id: 1, displayName: 'one', links: {self: {href: selfLink}}}
            ],
            element = React.createElement(ResourceList, {
                resources: resources,
                resourceType: resourceType,
                types: [
                    'foo',
                    'bar'
                ]
            }),
            rendered = ReactTestUtils.renderIntoDocument(element);

        var layoutComponent = ReactTestUtils.findRenderedComponentWithType(rendered, LayoutStub),
            items = ReactTestUtils.scryRenderedDOMComponentsWithTag(layoutComponent, 'li');

        var item = items[0],
            link = item.props.children[1];

        assert.equal(link.type, 'a');
        assert.equal(selfLink, link.props.href);
    });
});
