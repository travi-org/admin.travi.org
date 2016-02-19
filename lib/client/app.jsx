/*global window document */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    reactRouter = require('react-router'),
    Router = reactRouter.Router,
    history = reactRouter.browserHistory,
    Provider = require('react-redux').Provider,
    routesFactory = require('../shared/routes.jsx'),
    configureStore = require('../shared/store/configure'),
    hydrator = require('./route-hydrator'),

    store = configureStore(JSON.parse(window.__INITIAL_STATE__)),
    routes = routesFactory(hydrator(store).hydrate);

dom.render(
    <Provider store={store}>
        <Router history={history} children={routes} />
    </Provider>,
    document.getElementById('wrap')
);
