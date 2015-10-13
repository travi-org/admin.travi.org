const
    React = require('react'), //eslint-disable-line no-unused-vars
    ReactDOMServer = require('react-dom/server'),
    reactRouter = require('react-router'),
    RoutingContext = reactRouter.RoutingContext,
    routes = require('./routes.jsx');

function routeTo(location, callback) {
    reactRouter.match({routes, location}, function (error, redirectLocation, renderProps) {
        callback(error, ReactDOMServer.renderToString(<RoutingContext {...renderProps} />));
    });
}

module.exports = {
    routeTo: routeTo
};
