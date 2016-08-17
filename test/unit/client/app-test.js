/*global window */
import {parse} from 'url';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import dom from 'react-dom';
import * as redux from 'redux';
import ga from 'react-ga';
import Root from '../../../lib/shared/views/root/root';
import * as storeCreator from '../../../lib/shared/store/create';
import * as dependencies from '../../../lib/client/dependencies';
import * as historyListener from '../../../lib/client/history-listener';
import proxyquire from 'proxyquire';
import * as any from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';
import jsdom from 'jsdom';

suite('client-side app', () => {
    let sandbox,
        routes;
    const
        initialState = any.simpleObject(),
        store = {...any.simpleObject(), dispatch: () => undefined},
        url = any.url(),
        hydrator = {
            hydrate: sinon.spy()
        };

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app', {
            './route-hydrator': sinon.stub().withArgs(store).returns(hydrator),
            '../shared/routes': {default: routes}
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(redux, 'createStore');
        sandbox.stub(dependencies, 'configure');
        sandbox.stub(storeCreator, 'configureStore').withArgs(initialState).returns(store);
        sandbox.stub(historyListener, 'addHistoryListener');
        sandbox.stub(ga, 'pageview');
        sandbox.stub(ga, 'initialize');

        routes = any.simpleObject();

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
        jsdom.changeURL(window, url);
    });

    teardown(() => {
        sandbox.restore();
        routes = null;
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        const
            rootComponent = any.simpleObject(),
            routerComponent = any.simpleObject();

        React.createElement.withArgs(
            Router,
            sinon.match({history: browserHistory, children: routes})
        ).returns(routerComponent);
        React.createElement.withArgs(Root, {store}, routerComponent).returns(rootComponent);

        simulatePageLoad();

        assert.calledOnce(dependencies.configure);
        assert.calledWith(historyListener.addHistoryListener, routes, store);
        assert.calledWith(dom.render, rootComponent, document.getElementById('wrap'));

        assert.calledWith(ga.initialize, 'UA-2890413-9');
        assert.notCalled(ga.pageview);

        React.createElement.getCall(0).args[1].onUpdate();

        assert.calledWith(ga.pageview, parse(url).pathname);
    });
});
