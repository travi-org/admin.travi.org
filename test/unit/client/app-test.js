/*global window */
import React from 'react';
import {Router, browserHistory} from 'react-router';
import dom from 'react-dom';
import * as redux from 'redux';
import Root from '../../../lib/shared/views/root/root';
import * as storeCreator from '../../../lib/shared/store/create';
import * as dependencies from '../../../lib/client/dependencies';
import * as historyListener from '../../../lib/client/history-listener';
import proxyquire from 'proxyquire';
import {simpleObject} from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';

suite('client-side app', () => {
    let sandbox,
        routes;
    const
        initialState = simpleObject(),
        store = {...simpleObject(), dispatch: () => undefined},
        hydrator = {
            hydrate: sinon.spy()
        };

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app', {
            './route-hydrator': sinon.stub().withArgs(store).returns(hydrator),
            '../shared/routes': {default: sinon.stub().withArgs(hydrator.hydrate).returns(routes)}
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

        routes = simpleObject();

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
    });

    teardown(() => {
        sandbox.restore();
        routes = null;
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        const
            rootComponent = simpleObject(),
            routerComponent = simpleObject();

        React.createElement.withArgs(Router, {history: browserHistory, children: routes}).returns(routerComponent);
        React.createElement.withArgs(Root, {store}, routerComponent).returns(rootComponent);

        simulatePageLoad();

        assert.calledOnce(dependencies.configure);
        assert.calledWith(historyListener.addHistoryListener, routes, store.dispatch);
        assert.calledWith(dom.render, rootComponent, document.getElementById('wrap'));
    });
});
