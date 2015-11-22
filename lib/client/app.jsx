'use strict';

const
    dom = require('react-dom'),
    React = require('react'),
    AsyncProps = require('async-props').default,
    createBrowserHistory = require('history/lib/createBrowserHistory'),
    Router = require('react-router').Router,
    routes = require('../shared/routes.jsx');

dom.render(
    <Router history={createBrowserHistory()} children={routes} RoutingContext={AsyncProps} />,
    document.getElementById('wrap')
);
