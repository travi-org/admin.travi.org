const
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    RoutingContext = reactRouter.RoutingContext,
    DataWrapper = require('../../lib/server/temp-data-wrapper'),
    any = require('../helpers/any'),

    renderer = require('../../lib/server/route-renderer'),
    routes = require('../../lib/routes.jsx');

suite('route renderer', function () {
    'use strict';

    setup(function () {
        sinon.stub(ReactDOMServer, 'renderToString');
        sinon.stub(React, 'createElement');
        sinon.stub(reactRouter, 'match');
    });

    teardown(function () {
        ReactDOMServer.renderToString.restore();
        React.createElement.restore();
        reactRouter.match.restore();
    });

    test('that rendered html yielded for proper route', function () {
        const
            renderedContent = any.string(),
            callback = sinon.spy(),
            location = any.url(),
            renderProps = any.simpleObject(),
            context = any.simpleObject(),
            wrapped = any.simpleObject(),
            data = any.simpleObject();
        React.createElement.withArgs(RoutingContext, renderProps).returns(context);
        React.createElement.withArgs(DataWrapper, { data }, context).returns(wrapped);
        ReactDOMServer.renderToString.withArgs(wrapped).returns(renderedContent);

        renderer.routeTo(location, data, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        assert.calledWith(callback, null, renderedContent);
    });

    test('that errors bubble', function () {
        const
            error = any.simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(any.url(), any.simpleObject(), callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
