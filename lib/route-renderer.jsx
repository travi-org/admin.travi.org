const
    React = require('react'),
    reactRouter = require('react-router'),
    routes = require('./routes.jsx');

function routeTo(location, callback) {
    reactRouter.match({routes, location}, function (error) {
        callback(error, React.renderToString());
    });
}

module.exports = {
    routeTo: routeTo
};
