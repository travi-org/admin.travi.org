/*global window */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    AsyncProps = require('async-props').default,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    routes = require('../shared/routes.jsx'),
    configureStore = require('../shared/store/configure');

dom.render(
    <Provider store={configureStore(JSON.parse(window.__INITIAL_STATE__))}>
        <Router history={createBrowserHistory()} children={routes} RoutingContext={AsyncProps} />
    </Provider>,
    document.getElementById('wrap')
);
