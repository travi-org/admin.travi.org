const
    React = require('react'), //eslint-disable-line no-unused-vars
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    RoutingContext = reactRouter.RoutingContext,
    DataWrapper = require('./temp-data-wrapper'),

    routes = require('./../../routes.jsx');

function routeTo(location, data, callback) {
    reactRouter.match({routes, location}, function (error, redirectLocation, renderProps) {
        callback(error, ReactDOMServer.renderToString(
            <DataWrapper data={ data }><RoutingContext {...renderProps} /></DataWrapper>
        ));
    });
}

module.exports = {
    routeTo: routeTo
};
