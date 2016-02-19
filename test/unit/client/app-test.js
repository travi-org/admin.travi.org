/*global window */
'use strict';

const
    React = require('react'),
    reactRouter = require('react-router'),
    Router = reactRouter.Router,
    history = reactRouter.browserHistory,
    Provider = require('react-redux').Provider,
    dom = require('react-dom'),
    redux = require('redux'),
    proxyquire = require('proxyquire'),
    any = require('../../helpers/any'),
    sinon = require('sinon');

suite('client-side app', () => {
    let sandbox,
        routes;
    const
        initialState = any.simpleObject(),
        store = any.simpleObject(),
        hydrator = {
            hydrate: sinon.spy()
        };

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app.jsx', {
            '../shared/store/configure': sinon.stub().withArgs(initialState).returns(store),
            './route-hydrator': sinon.stub().withArgs(store).returns(hydrator),
            '../shared/routes.jsx': sinon.stub().withArgs(hydrator.hydrate).returns(routes)
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
        sandbox.stub(redux, 'createStore');

        routes = any.simpleObject();

        window.__INITIAL_STATE__ = JSON.stringify(initialState);
    });

    teardown(() => {
        sandbox.restore();
        routes = null;
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
