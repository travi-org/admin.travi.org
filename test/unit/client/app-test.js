/*global window */
import React from 'react';
import dom from 'react-dom';
import * as redux from 'redux';
import Root from '../../../lib/client/root/root';
import proxyquire from 'proxyquire';
import {simpleObject} from '@travi/any';
import {assert} from 'chai';
import sinon from 'sinon';

suite('client-side app', () => {
    let sandbox,
        routes;
    const
        initialState = simpleObject(),
        store = simpleObject(),
        hydrator = {
            hydrate: sinon.spy()
        };

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app', {
            '../shared/store/configure': sinon.stub().withArgs(initialState).returns(store),
            './route-hydrator': sinon.stub().withArgs(store).returns(hydrator),
            '../shared/routes': {default: sinon.stub().withArgs(hydrator.hydrate).returns(routes)}
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(redux, 'createStore');

        routes = simpleObject();

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
    });

    teardown(() => {
        sandbox.restore();
        routes = null;
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        const rootComponent = simpleObject();
        React.createElement.withArgs(Root, {store, routes}).returns(rootComponent);

        simulatePageLoad();

        assert.calledWith(dom.render, rootComponent, document.getElementById('wrap'));
    });
});
