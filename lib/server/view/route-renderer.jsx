'use strict';

const
    React = require('react'), //eslint-disable-line no-unused-vars
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    RouterContext = reactRouter.RouterContext,

    routes = require('./../../shared/routes.jsx'),

    _ = require('lodash');

function routeTo(location, data, callback) {
    function createElement(Component, props) {
        const extended = _.extend({}, data, props);

        return <Component {...extended}/>;
    }

    reactRouter.match({routes, location}, (error, redirectLocation, renderProps) => {
        callback(error, ReactDOMServer.renderToString(
            <RouterContext {...renderProps} createElement={createElement} />
        ));
    });
}

module.exports = {routeTo};
