/*global window */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    routesFactory = require('../shared/routes.jsx'),
    configureStore = require('../shared/store/configure'),
    hydrater = require('./route-hydrater'),

    routes = routesFactory(hydrater.hydrate);

dom.render(
    <Provider store={configureStore(JSON.parse(window.__INITIAL_STATE__))}>
        <Router history={createBrowserHistory()} children={routes} />
    </Provider>,
    document.getElementById('wrap')
);
