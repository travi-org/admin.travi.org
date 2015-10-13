const
    React = require('react'),
    reactRouter = require('react-router'),
    RoutingContext = reactRouter.RoutingContext,
    routes = require('./routes.jsx');

function routeTo(location, callback) {
    reactRouter.match({routes, location}, function (error, redirectLocation, renderProps) {
        callback(error, React.renderToString(<RoutingContext {...renderProps} />));
    });
}

module.exports = {
    routeTo: routeTo
};
