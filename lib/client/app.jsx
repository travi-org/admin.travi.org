/*global window */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    AsyncProps = require('async-props').default,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    redux = require('redux'),
    routes = require('../shared/routes.jsx'),
    reducer = require('../shared/store/reducer'),
    store = redux.createStore(reducer, window.__INITIAL_STATE__);

dom.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()} children={routes} RoutingContext={AsyncProps} />
    </Provider>,
    document.getElementById('wrap')
);
