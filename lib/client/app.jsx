/*global window */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    AsyncProps = require('async-props').default,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    redux = require('redux'),
    routes = require('../shared/routes.jsx'),
    reducer = require('../shared/store/reducer');

redux.createStore(reducer, window.__INITIAL_STATE__);

dom.render(
    <Router history={createBrowserHistory()} children={routes} RoutingContext={AsyncProps} />,
    document.getElementById('wrap')
);
