'use strict';

const
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    Provider = require('react-redux').Provider,
    any = require('../../../helpers/any'),
    _ = require('lodash'),

    renderer = require('../../../../lib/server/view/route-renderer'),
    routes = require('../../../../lib/shared/routes.jsx');

suite('route renderer', () => {
    const RouterContext = reactRouter.RouterContext;
    let sandbox,
        history,
        url,
        location;

    setup(() => {
        url = any.url();
        location = any.simpleObject();
        history = {
            createLocation: sinon.stub().withArgs(url).returns(location)
        };

        sandbox = sinon.sandbox.create();
        sandbox.stub(ReactDOMServer, 'renderToString');
        sandbox.stub(React, 'createElement');
        sandbox.stub(reactRouter, 'match');
        sandbox.stub(reactRouter, 'createMemoryHistory').returns(history);
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that rendered html yielded for proper route', () => {
        const
            renderedContent = any.string(),
            callback = sinon.spy(),
            renderProps = any.simpleObject(),
            context = any.simpleObject(),
            providerComponent = any.simpleObject(),
            data = any.simpleObject(),
            store = any.simpleObject();
        React.createElement.withArgs(RouterContext, sinon.match(renderProps)).returns(context);
        React.createElement.withArgs(Provider, {store}, context).returns(providerComponent);
        ReactDOMServer.renderToString.withArgs(providerComponent).returns(renderedContent);

        renderer.routeTo(url, data, store, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        assert.calledWith(callback, null, renderedContent);
    });

    test('that default data is passed as props when element created by router', () => {
        const
            callback = sinon.spy(),
            renderProps = any.simpleObject(),
            props = any.simpleObject(),
            data = any.simpleObject(),
            dummyComponent = React.createClass({
                render: () => <div>dummy component</div>
            });
        reactRouter.match.yields(null, null, renderProps);
        React.createElement.withArgs(RouterContext).yieldsTo('createElement', dummyComponent, props);

        renderer.routeTo(url, data, {}, callback);

        assert.calledWith(React.createElement, dummyComponent, _.extend({}, props, data));
    });

    test('that errors bubble', () => {
        const
            error = any.simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(url, any.simpleObject(), {}, callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
