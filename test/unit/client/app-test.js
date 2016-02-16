/*global window */
'use strict';

const
    React = require('react'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    dom = require('react-dom'),
    redux = require('redux'),
    proxyquire = require('proxyquire'),
    any = require('../../helpers/any'),
    routes = require('../../../lib/shared/routes.jsx');

suite('client-side app', () => {
    let sandbox;
    const
        history = any.simpleObject(),
        initialState = any.simpleObject(),
        store = any.simpleObject();

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app.jsx', {
            'history/lib/createBrowserHistory': sinon.stub().returns(history),
            '../shared/store/configure': sinon.stub().withArgs(initialState).returns(store)
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(redux, 'createStore');

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
    });

    teardown(() => {
        sandbox.restore();
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        const
            routerComponent = any.simpleObject(),
            providerComponent = any.simpleObject();
        React.createElement.withArgs(Router, {
            history,
            children: routes
        }).returns(routerComponent);
        React.createElement.withArgs(Provider, {store}, routerComponent).returns(providerComponent);

        simulatePageLoad();

        assert.calledWith(dom.render, providerComponent, document.getElementById('wrap'));
    });
});
