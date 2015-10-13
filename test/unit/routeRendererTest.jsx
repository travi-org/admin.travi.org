const
    React = require('react'),
    reactRouter = require('react-router'),
    RoutingContext = reactRouter.RoutingContext,
    any = require('../helpers/any'),

    renderer = require('../../lib/route-renderer'),
    routes = require('../../lib/routes.jsx');

suite('route renderer', function () {
    'use strict';

    setup(function () {
        sinon.stub(React, 'renderToString');
        sinon.stub(React, 'createElement');
        sinon.stub(reactRouter, 'match');
    });

    teardown(function () {
        React.renderToString.restore();
        React.createElement.restore();
        reactRouter.match.restore();
    });

    test('that rendered html yielded for proper route', function () {
        const
            renderedContent = any.string(),
            callback = sinon.spy(),
            location = any.url(),
            renderProps = any.simpleObject(),
            context = any.simpleObject();
        React.createElement.withArgs(RoutingContext, renderProps).returns(context);
        React.renderToString.withArgs(context).returns(renderedContent);

        renderer.routeTo(location, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        assert.calledWith(callback, null, renderedContent);
    });

    test('that errors bubble', function () {
        const
            error = any.simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(any.url(), callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
