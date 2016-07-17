import React from 'react';
import ReactDOMServer from 'react-dom/server';
import * as reactRouter from 'react-router';
import Root from '../../../../lib/shared/views/root/root';
import {url as anyUrl, simpleObject, string} from '@travi/any';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert, refute} from 'referee';

suite('route renderer', () => {
    const
        RouterContext = reactRouter.RouterContext,
        routesStub = sinon.stub(),
        renderer = proxyquire('../../../../lib/server/view/route-renderer', {
            './../../shared/routes': {default: routesStub}
        });
    let sandbox,
        history,
        url,
        location,
        routes;

    setup(() => {
        url = anyUrl();
        location = simpleObject();
        history = {
            createLocation: sinon.stub().withArgs(url).returns(location)
        };

        sandbox = sinon.sandbox.create();
        sandbox.stub(ReactDOMServer, 'renderToString');
        sandbox.stub(React, 'createElement');
        sandbox.stub(reactRouter, 'match');
        sandbox.stub(reactRouter, 'createMemoryHistory').returns(history);

        routes = simpleObject();
        routesStub.withArgs(sinon.match.func).returns(routes);
    });

    teardown(() => {
        sandbox.restore();
        routesStub.reset();
    });

    test('that rendered html yielded for proper route', () => {
        const
            renderedContent = string(),
            callback = sinon.spy(),
            renderProps = simpleObject(),
            context = simpleObject(),
            providerComponent = simpleObject(),
            store = simpleObject();
        React.createElement.withArgs(RouterContext, sinon.match(renderProps)).returns(context);
        React.createElement.withArgs(Root, {store}, context).returns(providerComponent);
        ReactDOMServer.renderToString.withArgs(providerComponent).returns(renderedContent);

        renderer.routeTo(url, store, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        assert.calledWith(callback, null, renderedContent);
    });

    test('that errors bubble', () => {
        const
            error = simpleObject(),
            callback = sinon.spy();
        renderer.routeTo(url, simpleObject(), callback);

        reactRouter.match.yield(error);

        assert.calledWith(callback, error);
    });
});
