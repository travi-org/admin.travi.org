'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    Provider = require('react-redux').Provider,
    RouterContext = reactRouter.RouterContext,

    routesFactory = require('./../../shared/routes.jsx');

function routeTo(url, store, callback) {
    const
        history = reactRouter.createMemoryHistory(),
        routes = routesFactory(() => {});

    reactRouter.match({routes, location: history.createLocation(url)}, (error, redirectLocation, renderProps) => {
        callback(error, ReactDOMServer.renderToString(
            <Provider store={store}><RouterContext {...renderProps} /></Provider>
        ));
    });
}

module.exports = {routeTo};
