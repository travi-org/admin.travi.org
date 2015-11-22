'use strict';

const
    React = require('react'),
    Router = require('react-router').Router,
    dom = require('react-dom'),
    AsyncProps = require('async-props').default,
    proxyquire = require('proxyquire'),
    any = require('../../helpers/any'),
    routes = require('../../../lib/shared/routes.jsx');

suite('client-side app', () => {
    const history = any.simpleObject();
    let sandbox;

    function simulatePageLoad() {
        proxyquire('../../../lib/client/app.jsx', {
            'history/lib/createBrowserHistory': sinon.stub().returns(history)
        });
    }

    setup(() => {
        sandbox = sinon.sandbox.create();
        sandbox.stub(dom, 'render');
        sandbox.stub(React, 'createElement');
    });

    teardown(() => {
        sandbox.restore();
    });

    test('that app exists', () => {
        const routerComponent = any.simpleObject();
        React.createElement.withArgs(Router, {
            history,
            children: routes,
            RoutingContext: AsyncProps
        }).returns(routerComponent);

        simulatePageLoad();

        assert.calledWith(dom.render, routerComponent, document.getElementById('wrap'));
    });
});
