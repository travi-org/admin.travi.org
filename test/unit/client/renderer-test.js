/*global window */
import {parse} from 'url';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import ga from 'react-ga';
import jsdom from 'jsdom';
import {remountContent} from '../../../lib/client/renderer';
import Root from '../../../lib/shared/views/root/root';
import ErrorPage from '../../../lib/shared/views/errors/page';
import * as routes from '../../../lib/shared/routes';
import dom from 'react-dom';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

suite('client-side renderer', () => {
    let sandbox;
    const
        rootComponent = any.simpleObject(),
        store = any.simpleObject(),
        url = any.url();

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(routes, 'getRoutes');
        sandbox.stub(ga, 'pageview');
        sandbox.stub(ga, 'initialize');

        jsdom.changeURL(window, url);
    });

    teardown(() => {
        sandbox.restore();
        window.__BOOM__ = null;
    });

    test('that the router is remounted', () => {
        const
            routerComponent = any.simpleObject(),
            routeConfig = any.simpleObject(),
            gaKey = any.string();
        routes.getRoutes.returns(routeConfig);
        React.createElement.withArgs(
            Router,
            sinon.match({history: browserHistory, children: routeConfig})
        ).returns(routerComponent);
        React.createElement.withArgs(Root, {store}, routerComponent).returns(rootComponent);

        remountContent(store, gaKey);

        assert.calledWith(dom.render, rootComponent, document.getElementById('wrap'));
        assert.calledWith(ga.initialize, gaKey);
        assert.notCalled(ga.pageview);

        React.createElement.getCall(0).args[1].onUpdate();

        assert.calledWith(ga.pageview, parse(url).pathname);
    });

    test('that the error page is mounted when response was a Boom', () => {
        const
            errorPageComponent = any.simpleObject(),
            statusCode = any.integer();
        window.__BOOM__ = {...any.simpleObject(), statusCode};
        React.createElement.withArgs(ErrorPage, {statusCode}).returns(errorPageComponent);
        React.createElement.withArgs(Root, {store}, errorPageComponent).returns(rootComponent);

        remountContent(store);

        assert.calledWith(dom.render, rootComponent, document.getElementById('wrap'));
    });
});
