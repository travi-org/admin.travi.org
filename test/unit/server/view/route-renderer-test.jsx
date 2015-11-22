'use strict';

const
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    any = require('../../../helpers/any'),
    _ = require('lodash'),

    renderer = require('../../../../lib/server/view/route-renderer'),
    routes = require('../../../../lib/shared/routes.jsx');

suite('route renderer', () => {
    const RoutingContext = reactRouter.RoutingContext;
    let sandbox;

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(ReactDOMServer, 'renderToString');
        sandbox.stub(React, 'createElement');
        sandbox.stub(reactRouter, 'match');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that rendered html yielded for proper route', () => {
        const
            renderedContent = any.string(),
            callback = sinon.spy(),
            location = any.url(),
            renderProps = any.simpleObject(),
            context = any.simpleObject(),
            data = any.simpleObject();
        React.createElement.withArgs(RoutingContext, sinon.match(renderProps)).returns(context);
        ReactDOMServer.renderToString.withArgs(context).returns(renderedContent);

        renderer.routeTo(location, data, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        assert.calledWith(callback, null, renderedContent);
    });

    test('that default data is passed as props when element created by router', () => {
        const
            callback = sinon.spy(),
            location = any.url(),
            renderProps = any.simpleObject(),
            props = any.simpleObject(),
            data = any.simpleObject(),
            dummyComponent = React.createClass({
                render: () => <div>dummy component</div>
            });
        reactRouter.match.yields(null, null, renderProps);
        React.createElement.withArgs(RoutingContext).yieldsTo('createElement', dummyComponent, props);

        renderer.routeTo(location, data, callback);

        assert.calledWith(React.createElement, dummyComponent, _.extend({}, props, data));
    });

    test('that errors bubble', () => {
        const
            error = any.simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(any.url(), any.simpleObject(), callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
