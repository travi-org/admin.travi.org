/*global window */
'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    Provider = require('react-redux').Provider,
    routes = require('../shared/routes.jsx'),
    configureStore = require('../shared/store/configure');

dom.render(
    <Provider store={configureStore(JSON.parse(window.__INITIAL_STATE__))}>
        <Router history={createBrowserHistory()} children={routes} />
    </Provider>,
    document.getElementById('wrap')
);
