import React from 'react';
import ReactDOMServer from 'react-dom/server';
import redial from 'redial';
import * as reactRouter from 'react-router';
import Root from '../../../../lib/shared/views/root/root';
import {url as anyUrl, simpleObject, string} from '@travi/any';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import {assert, refute} from 'referee';

suite('route renderer', () => {
    const
        routes = simpleObject(),
        RouterContext = reactRouter.RouterContext,
        renderer = proxyquire('../../../../lib/server/view/route-renderer', {
            './../../shared/routes': {default: routes}
        });
    let sandbox, history, url, location;

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
        sandbox.stub(redial, 'trigger');

    });

    teardown(() => {
        sandbox.restore();
    });

    test('that rendered html yielded for proper route', () => {
        const
            renderedContent = string(),
            callback = sinon.spy(),
            components = simpleObject(),
            params = simpleObject(),
            renderProps = {...simpleObject(), components, params},
            context = simpleObject(),
            providerComponent = simpleObject(),
            dispatch = simpleObject(),
            state = simpleObject(),
            store = {...simpleObject(), dispatch, getState: () => state},
            error = simpleObject(),
            thenCatch = sinon.stub(),
            fetchComplete = sinon.stub().returns({catch: thenCatch});
        React.createElement.withArgs(RouterContext, sinon.match(renderProps)).returns(context);
        React.createElement.withArgs(Root, {store}, context).returns(providerComponent);
        ReactDOMServer.renderToString.withArgs(providerComponent).returns(renderedContent);
        redial.trigger.withArgs(
            'fetch',
            components,
            {params, dispatch, state}
        ).returns({then: fetchComplete});

        renderer.routeTo(url, store, callback);

        refute.called(callback);

        assert.calledWith(reactRouter.match, {routes, location});
        reactRouter.match.yield(null, null, renderProps);

        refute.called(callback);

        fetchComplete.yield();

        assert.calledWith(callback, null, renderedContent);

        thenCatch.yield(error);

        assert.calledWith(callback, error);
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
