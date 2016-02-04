/*global window */
'use strict';

const
    React = require('react'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    dom = require('react-dom'),
    redux = require('redux'),
    AsyncProps = require('async-props').default,
    proxyquire = require('proxyquire'),
    any = require('../../helpers/any'),
    routes = require('../../../lib/shared/routes.jsx'),
    reducer = require('../../../lib/shared/store/reducer');

suite('client-side app', () => {
    let sandbox;
    const
        history = any.simpleObject(),
        initialState = any.simpleObject();

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app.jsx', {
            'history/lib/createBrowserHistory': sinon.stub().returns(history)
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(redux, 'createStore');

        window.__INITIAL_STATE__ = initialState;
    });

    teardown(() => {
        sandbox.restore();
        window.__INITIAL_STATE__ = null;
    });

    test('that the app renders', () => {
        const
            routerComponent = any.simpleObject(),
            providerComponent = any.simpleObject(),
            store = any.simpleObject();
        redux.createStore.withArgs(reducer, initialState).returns(store);
        React.createElement.withArgs(Router, {
            history,
            children: routes,
            RoutingContext: AsyncProps
        }).returns(routerComponent);
        React.createElement.withArgs(Provider, {store}, routerComponent).returns(providerComponent);

        simulatePageLoad();

        assert.calledWith(dom.render, providerComponent, document.getElementById('wrap'));
    });
});
