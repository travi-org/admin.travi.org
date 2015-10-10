const
    React = require('react'),
    reactRouter = require('react-router');

function routeTo(location, callback) {
    reactRouter.match(null, function (error) {
        callback(error, React.renderToString());
    });
}

module.exports = {
    routeTo: routeTo
};
